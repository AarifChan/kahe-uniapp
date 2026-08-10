import os
import sys
import json
import shutil
import shlex
import subprocess
import tempfile
import threading
from typing import Optional, Callable, List
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

# ================= 外观主题（现代浅色） =================

# macOS 原生 aqua 主题会忽略自定义颜色，导致 tk.Button 的 bg/fg 不生效
# （这就是旧界面按钮白字看不清的根因）。统一改用 clam 主题并对 ttk 控件上色；
# 关键按钮用 FlatButton（Frame+Label 自绘）以保证 macOS 上颜色一定生效。
COLORS = {
    "bg": "#F5F6F8",  # 窗口底色
    "card": "#FFFFFF",  # 卡片底色
    "border": "#E3E6EA",  # 卡片/输入边框
    "text": "#1F2328",  # 正文
    "muted": "#6B7280",  # 次要文字
    "primary": "#16A34A",  # 主按钮（绿）
    "primary_hover": "#15803D",
    "primary_press": "#166534",
    "secondary": "#2563EB",  # 次按钮（蓝）
    "secondary_hover": "#1D4ED8",
    "secondary_press": "#1E40AF",
    "ghost": "#EEF2F7",  # 轻按钮（选择文件/清空）
    "ghost_hover": "#E2E8F0",
    "ghost_press": "#CBD5E1",
    "danger": "#DC2626",
    "badge_bg": "#ECFDF5",
    "badge_fg": "#047857",
    "log_bg": "#0F172A",  # 日志区深色底，便于阅读
    "log_fg": "#E2E8F0",
}

FONTS = {
    "base": ("PingFang SC", "Helvetica Neue", "Arial"),
    "mono": ("Menlo", "SF Mono", "Consolas", "Monaco"),
}
FONT_SIZE = 13
FONT_TITLE = 16
FONT_SMALL = 11

# ================= 日志输出 =================

# 模块级日志 sink：默认走真实 stdout；GUI 启动后替换为线程安全的界面写入函数，
# 这样各业务函数里的 print(...) 会自动出现在界面日志区，无需改业务代码。
LOG_SINK: Callable[[str], None] = print


def log_write(text: str) -> None:
    """统一的日志出口：同时写真实终端与界面 sink。"""
    try:
        LOG_SINK(text)
    except Exception:
        # sink 异常不能影响主流程
        pass


def run_logged(cmd, **kw) -> int:
    """
    运行子进程并把 stdout/stderr 逐行 tee 到真实 stdout 与界面日志。
    语义对齐 subprocess.run(..., check=True)：check 为 True 且返回码非零时
    抛出 subprocess.CalledProcessError。返回进程 returncode。
    """
    check = kw.pop("check", False)
    cwd = kw.pop("cwd", None)
    env = kw.pop("env", None)

    printable = cmd if isinstance(cmd, str) else " ".join(shlex.quote(str(c)) for c in cmd)
    log_write(f"$ {printable}")

    proc = subprocess.Popen(
        cmd,
        cwd=cwd,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
    )
    assert proc.stdout is not None
    for line in proc.stdout:
        line = line.rstrip("\n")
        # 写真实终端（用 __stdout__ 避免被 sys.stdout 重定向时与界面日志重复）
        try:
            sys.__stdout__.write(line + "\n")
            sys.__stdout__.flush()
        except Exception:
            pass
        log_write(line)  # 写入界面
    rc = proc.wait()
    if check and rc != 0:
        raise subprocess.CalledProcessError(rc, cmd)
    return rc


class _StdoutToLog:
    """把 print(...) 输出转发到 log_write（界面日志），按行缓冲。"""

    def __init__(self):
        self._buf = ""

    def write(self, s: str) -> None:
        if not s:
            return
        self._buf += s
        while "\n" in self._buf:
            line, self._buf = self._buf.split("\n", 1)
            if line:
                log_write(line)

    def flush(self) -> None:
        if self._buf:
            log_write(self._buf)
            self._buf = ""


# ================= 配置区 =================

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
# 当 mp_upload 目录被移动到 uni-kahe 的上一级目录时，
# 项目根目录为 mp_upload 的同级目录下的 uni-kahe
PROJECT_ROOT = os.path.join(os.path.dirname(CURRENT_DIR), "uni-kahe")
AUTO_SCRIPT = os.path.join(CURRENT_DIR, "auto_wx_upload.sh")
CONFIG_FILE = os.path.join(CURRENT_DIR, "plat_config.json")
QINIU_CONFIG_FILE = os.path.join(CURRENT_DIR, "qiniu_config.json")
WX_UPLOAD_DIR = os.path.join(CURRENT_DIR, "wx_upload")
MP_WEIXIN_DIST = os.path.join(PROJECT_ROOT, "dist", "build", "mp-weixin")
MP_WEIXIN_STATIC = os.path.join(MP_WEIXIN_DIST, "static")

# 默认配置（如果配置文件不存在时使用）
DEFAULT_CONFIG = {
    "remote_host": "jermy",
    # 未安装 pngquant 时是否中断七牛上传（对应 COMPRESS_PNG_STRICT）
    "compress_png_strict": True,
    # 是否使用七牛：上传 static、替换 CDN、删除本地 static
    "use_qiniu": True,
    "plats": [
        {
            "name": "wx_ma",
            "label": "wx_ma (默认)",
            "remote_path": "/root/jmcw/wx_ma",
            "is_default": True,
        },
        {
            "name": "wx_ma_2",
            "label": "wx_ma_2",
            "remote_path": "/root/jmcw/wx_ma_2",
            "is_default": False,
        },
        {
            "name": "wx_ma_3",
            "label": "wx_ma_3",
            "remote_path": "/root/jmcw/wx_ma_3",
            "is_default": False,
        },
    ],
}

# =========================================================


def load_config():
    """加载配置文件"""
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"加载配置文件失败: {e}，使用默认配置")
            return DEFAULT_CONFIG.copy()
    else:
        # 创建默认配置文件
        save_config(DEFAULT_CONFIG)
        return DEFAULT_CONFIG.copy()


def save_config(config):
    """保存配置文件"""
    try:
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(config, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"保存配置文件失败: {e}")


def parse_appid_from_key(key_path: str) -> str:
    """从 private.wx******.key 文件名里解析出 appid"""
    base = os.path.basename(key_path)
    if not (base.startswith("private.wx") and base.endswith(".key")):
        raise ValueError(f"key 文件名不符合格式：{base}，应为 private.wx******.key")
    return base[len("private.") : -len(".key")]


def collect_must_local_static_paths(app_json_path: str) -> list[str]:
    """
    读取构建产物 app.json，收集必须以【本地文件】形式存在于小程序包内的 static 资源。

    目前主要是 tabBar 的 iconPath / selectedIconPath：微信要求 tabBar 图标必须是
    包内本地文件，不能使用 CDN 地址；而 replace-cdn-urls.js 不会处理 app.json
    （SUPPORTED_EXTS 不含 .json），所以这些路径会保留为 /static/... 的本地引用，
    对应文件在删除 static 目录时必须被保留。

    返回：去重后、相对于 static 目录的路径列表（如 ["kaju/tabbar/icon1-normal.png"]）。
    """
    rel_paths: list[str] = []
    try:
        with open(app_json_path, "r", encoding="utf-8") as f:
            app_json = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        print(f"读取 app.json 失败，无法识别需保留的本地资源: {e}")
        return rel_paths

    tab_bar = app_json.get("tabBar") or {}
    items = tab_bar.get("list") or []
    seen: set[str] = set()
    for item in items:
        if not isinstance(item, dict):
            continue
        for key in ("iconPath", "selectedIconPath"):
            raw = item.get(key)
            if not isinstance(raw, str) or not raw:
                continue
            # 已是 http(s):// 的 CDN 地址不需要保留本地文件
            if raw.startswith(("http://", "https://")):
                continue
            rel = raw.lstrip("/")
            if rel.startswith("static/"):
                rel = rel[len("static/") :]
            if rel and rel not in seen:
                seen.add(rel)
                rel_paths.append(rel)
    return rel_paths


def delete_static_preserving_local(static_dir: str, app_json_path: str) -> None:
    """
    删除构建产物的 static 目录，但保留 app.json 中声明的、必须以本地文件存在的
    资源（tabBar 图标等）。

    流程：把需保留的文件复制到临时目录 → rmtree(static_dir) → 还原这些文件到原位。
    """
    must_local = collect_must_local_static_paths(app_json_path)

    # 备份需保留的本地资源（仅备份确实存在的文件）
    backup_dir: Optional[str] = None
    backed_up: list[tuple[str, str]] = []  # (相对路径, 临时文件绝对路径)
    if must_local:
        backup_dir = tempfile.mkdtemp(prefix="wx_local_assets_")
        for rel in must_local:
            src = os.path.join(static_dir, rel)
            if not os.path.isfile(src):
                print(f"警告：app.json 引用的本地资源在构建产物中不存在: {src}")
                continue
            tmp_path = os.path.join(backup_dir, rel)
            os.makedirs(os.path.dirname(tmp_path), exist_ok=True)
            shutil.copy2(src, tmp_path)
            backed_up.append((rel, tmp_path))

    try:
        print(f"删除本地 static 目录: {static_dir}")
        shutil.rmtree(static_dir)
        print("static 目录已删除")

        if backed_up:
            os.makedirs(static_dir, exist_ok=True)
            for rel, tmp_path in backed_up:
                dest = os.path.join(static_dir, rel)
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                shutil.copy2(tmp_path, dest)
            print(
                f"已保留 {len(backed_up)} 个本地资源（tabBar 图标等必须存在于包内的文件）:"
            )
            for rel, _ in backed_up:
                print(f"  - static/{rel}")
    finally:
        if backup_dir and os.path.isdir(backup_dir):
            shutil.rmtree(backup_dir, ignore_errors=True)


def clean_wx_upload_dir():
    """清空 wx_upload 目录中的所有文件"""
    if not os.path.exists(WX_UPLOAD_DIR):
        return

    try:
        for filename in os.listdir(WX_UPLOAD_DIR):
            file_path = os.path.join(WX_UPLOAD_DIR, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
                print(f"已删除: {file_path}")
        print("wx_upload 目录已清空")
    except Exception as e:
        print(f"清理 wx_upload 目录失败: {e}")


def read_env_file(mode: str) -> dict:
    """
    读取 .env 文件内容
    mode: "production" 或 "development"
    返回: 环境变量字典
    """
    env_file = ".env.production" if mode == "production" else ".env.development"
    env_path = os.path.join(PROJECT_ROOT, env_file)

    env_vars = {}
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    # 跳过空行和注释
                    if not line or line.startswith("#"):
                        continue
                    # 解析 KEY=VALUE 格式
                    if "=" in line:
                        key, value = line.split("=", 1)
                        # 去除引号
                        value = value.strip().strip("'\"")
                        env_vars[key.strip()] = value
        except Exception as e:
            print(f"读取环境文件失败: {e}")

    return env_vars


def build_mp_weixin(
    mode: str = "production", audit: bool = False, platform: str = ""
) -> bool:
    """
    编译微信小程序
    mode: "production" 或 "development"
    audit: True 表示审核版本（VITE_APP_AUDIT=true，隐藏部分功能、tabBar 仅保留 首页/盒柜/我的）
    platform: 上传目标选择的平台标识；非空时以 VITE_APP_PLATFORM 注入编译命令，
              覆盖 .env 文件中的同名变量（进程环境变量优先于 .env 文件）
    返回: True 表示成功，False 表示失败
    """
    env_file = ".env.production" if mode == "production" else ".env.development"
    mode_text = "生产环境" if mode == "production" else "测试环境"
    if audit:
        mode_text += "·审核版"

    # 读取环境配置
    env_vars = read_env_file(mode)
    base_url = env_vars.get("VITE_APP_BASEURL", "未配置")
    app_env = env_vars.get("VITE_APP_ENV", "未配置")
    cdn_folder = env_vars.get("VITE_APP_CDN_FOLDER", "未配置")
    # 以上传目标选择为准；未指定时回退到 env 文件中的值
    effective_platform = platform or env_vars.get("VITE_APP_PLATFORM", "未配置")
    platform_source = "上传目标选择" if platform else "env 文件"

    print("=" * 60)
    print("开始编译微信小程序")
    print("-" * 60)
    print(f"编译模式:            {mode_text}")
    print(f"环境文件:            {env_file}")
    print(f"VITE_APP_ENV:        {app_env}")
    print(f"VITE_APP_BASEURL:    {base_url}")
    print(f"VITE_APP_CDN_FOLDER: {cdn_folder}")
    print(f"VITE_APP_PLATFORM:   {effective_platform}（{platform_source}）")
    print(f"VITE_APP_AUDIT:      {'true' if audit else 'false'}")
    print("=" * 60)
    print("正在切换到 Node 18...")

    try:
        # 环境变量前缀会传递给 yarn 的 pre 钩子（apply-audit-tabbar.js），
        # 由钩子按 VITE_APP_AUDIT 自动切换 pages.json 的 tabBar
        audit_prefix = "VITE_APP_AUDIT=true " if audit else ""
        # 上传目标选择的平台优先于 env 文件：显式注入 VITE_APP_PLATFORM
        platform_prefix = (
            f"VITE_APP_PLATFORM={shlex.quote(platform)} " if platform else ""
        )
        if mode == "development":
            build_cmd = f"{platform_prefix}{audit_prefix}yarn build:mp-weixin-test"
        else:
            build_cmd = f"{platform_prefix}{audit_prefix}yarn build:mp-weixin"

        # 使用 bash 加载 nvm 并切换到 node 18，然后执行 yarn 编译命令
        # nvm 是 shell 函数，需要先 source nvm.sh
        shell_cmd = f"""
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
            nvm use 18
            {build_cmd}
        """

        run_logged(
            ["/bin/bash", "-c", shell_cmd],
            cwd=PROJECT_ROOT,
            check=True,
        )
        print("=" * 60)
        print(f"编译完成！API 地址: {base_url}")
        print("=" * 60)
        return True
    except subprocess.CalledProcessError as e:
        print(f"编译失败: {e}")
        return False
    except FileNotFoundError:
        print("错误: 找不到 bash 命令")
        return False


def build_mode_to_environment(mode: str) -> str:
    """编译模式映射到 CI 环境标识"""
    return "prod" if mode == "production" else "test"


def load_qiniu_config() -> dict:
    """
    加载七牛配置：优先 mp_upload/qiniu_config.json，其次环境变量
    """
    cfg = {}
    if os.path.exists(QINIU_CONFIG_FILE):
        try:
            with open(QINIU_CONFIG_FILE, "r", encoding="utf-8") as f:
                cfg = json.load(f)
        except Exception as e:
            raise RuntimeError(f"读取七牛配置失败: {e}") from e

    access_key = os.environ.get("QINIU_ACCESS_KEY") or cfg.get("accessKey")
    secret_key = os.environ.get("QINIU_SECRET_KEY") or cfg.get("secretKey")
    if not access_key or not secret_key:
        raise RuntimeError(
            "未配置七牛凭证。请复制 qiniu_config.example.json 为 qiniu_config.json 并填写 accessKey/secretKey，"
            "或设置环境变量 QINIU_ACCESS_KEY、QINIU_SECRET_KEY。"
        )

    return {
        "accessKey": access_key,
        "secretKey": secret_key,
        "bucket": cfg.get("bucket") or os.environ.get("QINIU_BUCKET") or "jm-blindbox",
        "cdnDomain": cfg.get("cdnDomain")
        or os.environ.get("QINIU_CDN_DOMAIN")
        or "https://jms.85gui7.com",
        "folder": cfg.get("folder") or os.environ.get("QINIU_FOLDER") or "kahe-mp",
        # bucket 91tcg 在华南区，需使用 z2（up-z2.qiniup.com）
        "zone": cfg.get("zone") or os.environ.get("QINIU_ZONE") or "z2",
    }


def run_node_ci_script(script_name: str, extra_env: dict) -> bool:
    """在 uni-kahe 目录执行 CI 脚本"""
    script_path = os.path.join(PROJECT_ROOT, "scripts", "ci", script_name)
    if not os.path.isfile(script_path):
        print(f"脚本不存在: {script_path}")
        return False

    env = os.environ.copy()
    env.update(extra_env)

    try:
        run_logged(
            ["node", script_path],
            cwd=PROJECT_ROOT,
            env=env,
            check=True,
        )
        return True
    except subprocess.CalledProcessError as e:
        print(f"执行 {script_name} 失败: {e}")
        return False


def process_mp_static_cdn(
    build_mode: str,
    compress_png_strict: bool = True,
    upload_cdn: bool = True,
) -> bool:
    """
    编译后处理 static：
    1. upload_cdn=True：仅上传有变更的图片到七牛
       upload_cdn=False：跳过七牛上传，按 manifest/CDN 路径生成引用
    2. 始终将构建产物中的 /static/ 替换为 CDN 地址
    3. 始终删除本地 static 目录以减小上传包体积
    """
    if upload_cdn:
        print("=" * 60)
        print("CDN：增量上传 → 替换 CDN 引用 → 删除本地 static")
        print("=" * 60)
    else:
        print("=" * 60)
        print("CDN：跳过上传 → 替换 CDN 引用 → 删除本地 static")
        print("=" * 60)

    mp_dist = MP_WEIXIN_DIST
    static_dir = MP_WEIXIN_STATIC

    if not os.path.isdir(mp_dist):
        print(f"构建目录不存在: {mp_dist}")
        return False

    try:
        qiniu_cfg = load_qiniu_config()
    except RuntimeError as e:
        print(str(e))
        return False

    # 七牛上传目录以 qiniu_config.json 为准，不用 .env 的 VITE_APP_CDN_FOLDER 覆盖
    # （.env 里可能是旧前缀如 kahe-mp，与实际上传路径 jikaquan 不一致）

    ci_env = build_mode_to_environment(build_mode)
    node_env = {
        "ENVIRONMENT": ci_env,
        "PLATFORM": "mp-weixin",
        "QINIU_ACCESS_KEY": qiniu_cfg["accessKey"],
        "QINIU_SECRET_KEY": qiniu_cfg["secretKey"],
        "QINIU_BUCKET": qiniu_cfg["bucket"],
        "QINIU_CDN_DOMAIN": qiniu_cfg["cdnDomain"],
        "QINIU_FOLDER": qiniu_cfg["folder"],
        "QINIU_ZONE": qiniu_cfg["zone"],
        "UPLOAD_SOURCE_DIR": static_dir,
        "COMPRESS_PNG_STRICT": "true" if compress_png_strict else "false",
        "SKIP_QINIU_UPLOAD": "false" if upload_cdn else "true",
    }

    print(
        f"上传 CDN:      {'是（增量，未变更不重复上传）' if upload_cdn else '否（仅替换引用）'}"
    )
    print(
        f"PNG 严格模式:  {'开启（缺 pngquant 将失败）' if compress_png_strict and upload_cdn else '关闭/跳过'}"
    )
    print(f"七牛 Bucket:   {qiniu_cfg['bucket']}")
    print(f"七牛区域:      {qiniu_cfg['zone']} (z2=华南)")
    print(f"CDN 域名:      {qiniu_cfg['cdnDomain']}")
    print(f"CDN 目录:      {qiniu_cfg['folder']}")
    print(f"static 源目录: {static_dir}")

    # manifest（可选上传）→ 始终替换 CDN → 始终删除 static
    if not run_node_ci_script("upload-mp-build-static.js", node_env):
        return False

    if not run_node_ci_script("replace-cdn-urls.js", node_env):
        return False

    if os.path.isdir(static_dir):
        # 删除 static 前，先备份 app.json 中必须以本地文件存在的资源（tabBar 图标），
        # 删除后再还原到包内，否则远程 miniprogram-ci 校验 app.json 会报
        # "tabBar iconPath ... not found" (code 10009)。
        app_json_path = os.path.join(mp_dist, "app.json")
        delete_static_preserving_local(static_dir, app_json_path)
    else:
        print("static 目录不存在，跳过删除")

    print("=" * 60)
    print("CDN 处理完成")
    print("=" * 60)
    return True


def upload_code_to_server(remote_host: str, remote_path: str) -> bool:
    """
    打包并上传编译后的代码到服务器，然后在远程内联解压
    （不依赖服务器上预置的 run-mp.sh 脚本）
    返回: True 表示成功，False 表示失败
    """
    print("=" * 60)
    print("上传代码到服务器")
    print("-" * 60)
    print(f"远程主机: {remote_host}")
    print(f"远程路径: {remote_path}")
    print("=" * 60)

    try:
        # 打包 dist/build/mp-weixin/ 为 mp-weixin.tar.gz
        print("正在打包编译后的代码...")
        tar_cmd = (
            "tar --disable-copyfile -czvf ./mp-weixin.tar.gz dist/build/mp-weixin/"
        )
        run_logged(["/bin/bash", "-c", tar_cmd], cwd=PROJECT_ROOT, check=True)

        # 确保远程目录存在（服务器迁移后目录可能不存在）
        quoted_remote_path = shlex.quote(remote_path)
        print(f"确保远程目录存在: {remote_path}")
        run_logged(
            ["ssh", remote_host, f"mkdir -p {quoted_remote_path}"], check=True
        )

        # 上传到服务器
        print(f"正在上传到 {remote_host}:{remote_path}/...")
        tar_file = os.path.join(PROJECT_ROOT, "mp-weixin.tar.gz")
        scp_cmd = ["scp", tar_file, f"{remote_host}:{remote_path}/"]
        run_logged(scp_cmd, check=True)

        # 在远程解压代码（内联执行，不再依赖服务器上的 run-mp.sh 脚本）
        # 先清掉旧的 dist，再解压，最后删除压缩包
        print(f"正在远程解压到 {remote_path}/dist/build/mp-weixin ...")
        remote_unpack = (
            f"set -e; cd {quoted_remote_path} && "
            "rm -rf dist && "
            "tar --warning=no-unknown-keyword -xzf mp-weixin.tar.gz && "
            "rm -f mp-weixin.tar.gz"
        )
        ssh_cmd = ["ssh", remote_host, remote_unpack]
        run_logged(ssh_cmd, check=True)

        # 删除本地临时文件
        if os.path.exists(tar_file):
            os.remove(tar_file)
            print("已删除本地临时文件 mp-weixin.tar.gz")

        print("=" * 60)
        print("代码上传完成！")
        print("=" * 60)
        return True
    except subprocess.CalledProcessError as e:
        print(f"上传代码失败: {e}")
        return False
    except Exception as e:
        print(f"上传代码失败: {e}")
        return False


def upload_key_and_publish(key_path: str, remote_host: str, remote_path: str) -> bool:
    """
    上传 key 文件并执行微信小程序上传
    流程：清空远程发版目录 -> 上传 key + upload js -> 远程执行 node 上传 -> 清空发版目录
    返回: True 表示成功，False 表示失败
    """
    appid = None
    remote_app_dir = None

    print("=" * 60)
    print("上传 key 文件并发布到微信")
    print("-" * 60)
    print("AppID:       解析中...")
    print("远程目录:    解析中...")
    print("=" * 60)

    try:
        appid = parse_appid_from_key(key_path)
        remote_app_dir = f"{remote_path}/{appid}"
        upload_js_name = f"upload_{appid}.js"
        quoted_remote_app_dir = shlex.quote(remote_app_dir)

        # 更新打印信息
        print(f"解析到 AppID: {appid}")
        print(f"远程目录:    {remote_app_dir}")
        # 上传前先清空远程发版目录，避免残留旧 key/脚本
        print(f"清空远程发版目录: {remote_app_dir}")
        run_logged(
            ["ssh", remote_host, f"rm -rf {quoted_remote_app_dir}"], check=True
        )

        # 使用 auto_wx_upload.sh 上传 key 文件和 upload js 脚本
        cmd = ["/bin/bash", AUTO_SCRIPT, key_path, remote_path]
        env = os.environ.copy()
        env["REMOTE_HOST"] = remote_host
        run_logged(cmd, check=True, env=env)

        # 执行 node upload_appid.js 上传到微信
        # Node.js 已安装到 /usr/local/bin/node（全局可用，无需 nvm）
        # 设置 NODE_PATH 使其能找到全局安装的 miniprogram-ci
        print(f"正在执行 node {upload_js_name}...")
        ssh_cmd = [
            "ssh",
            remote_host,
            "cd {} && NODE_PATH=/usr/local/lib/nodejs/node-v16.20.2-linux-x64/lib/node_modules node {}".format(
                quoted_remote_app_dir,
                shlex.quote(upload_js_name),
            ),
        ]
        run_logged(ssh_cmd, check=True)

        print("=" * 60)
        print("微信小程序上传完成！")
        print("=" * 60)
        return True
    except subprocess.CalledProcessError as e:
        print(f"上传失败: {e}")
        return False
    except Exception as e:
        print(f"上传失败: {e}")
        return False
    finally:
        # 无论发布是否成功，都尝试清空远程发版目录，避免 private key 残留
        if remote_app_dir:
            try:
                print(f"清理远程发版目录: {remote_app_dir}")
                run_logged(
                    ["ssh", remote_host, f"rm -rf {shlex.quote(remote_app_dir)}"],
                    check=False,
                )
            except Exception as e:
                print(f"清理远程发版目录失败（非致命）: {e}")


class PlatConfigDialog:
    """Plat 配置管理对话框"""

    def __init__(self, parent, config, on_save_callback):
        self.config = config
        self.on_save_callback = on_save_callback

        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Plat 配置管理")
        self.dialog.geometry("600x400")
        self.dialog.transient(parent)
        self.dialog.grab_set()

        # 主框架
        main_frame = tk.Frame(self.dialog)
        main_frame.pack(fill="both", expand=True, padx=10, pady=10)

        # 列表框架
        list_frame = tk.Frame(main_frame)
        list_frame.pack(fill="both", expand=True)

        # 创建 Treeview
        columns = ("name", "label", "remote_path", "is_default")
        self.tree = ttk.Treeview(
            list_frame, columns=columns, show="headings", height=10
        )

        self.tree.heading("name", text="名称")
        self.tree.heading("label", text="显示标签")
        self.tree.heading("remote_path", text="远程路径")
        self.tree.heading("is_default", text="默认")

        self.tree.column("name", width=80)
        self.tree.column("label", width=120)
        self.tree.column("remote_path", width=280)
        self.tree.column("is_default", width=60)

        scrollbar = ttk.Scrollbar(
            list_frame, orient="vertical", command=self.tree.yview
        )
        self.tree.configure(yscrollcommand=scrollbar.set)

        self.tree.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # 按钮框架
        btn_frame = tk.Frame(main_frame)
        btn_frame.pack(fill="x", pady=10)

        tk.Button(btn_frame, text="添加", width=10, command=self.add_plat).pack(
            side="left", padx=5
        )
        tk.Button(btn_frame, text="编辑", width=10, command=self.edit_plat).pack(
            side="left", padx=5
        )
        tk.Button(btn_frame, text="删除", width=10, command=self.delete_plat).pack(
            side="left", padx=5
        )
        tk.Button(btn_frame, text="设为默认", width=10, command=self.set_default).pack(
            side="left", padx=5
        )
        tk.Button(
            btn_frame, text="保存并关闭", width=12, command=self.save_and_close
        ).pack(side="right", padx=5)

        # 加载数据
        self.refresh_list()

    def refresh_list(self):
        """刷新列表"""
        for item in self.tree.get_children():
            self.tree.delete(item)

        for plat in self.config.get("plats", []):
            self.tree.insert(
                "",
                "end",
                values=(
                    plat.get("name", ""),
                    plat.get("label", ""),
                    plat.get("remote_path", ""),
                    "是" if plat.get("is_default", False) else "否",
                ),
            )

    def add_plat(self):
        """添加新的 plat"""
        dialog = PlatEditDialog(self.dialog, None)
        self.dialog.wait_window(dialog.dialog)

        if dialog.result:
            self.config["plats"].append(dialog.result)
            self.refresh_list()

    def edit_plat(self):
        """编辑选中的 plat"""
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("警告", "请先选择要编辑的 plat")
            return

        index = self.tree.index(selected[0])
        plat = self.config["plats"][index]

        dialog = PlatEditDialog(self.dialog, plat)
        self.dialog.wait_window(dialog.dialog)

        if dialog.result:
            self.config["plats"][index] = dialog.result
            self.refresh_list()

    def delete_plat(self):
        """删除选中的 plat"""
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("警告", "请先选择要删除的 plat")
            return

        if len(self.config["plats"]) <= 1:
            messagebox.showwarning("警告", "至少需要保留一个 plat 配置")
            return

        if messagebox.askyesno("确认", "确定要删除选中的 plat 吗？"):
            index = self.tree.index(selected[0])
            del self.config["plats"][index]
            self.refresh_list()

    def set_default(self):
        """设置默认 plat"""
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("警告", "请先选择要设为默认的 plat")
            return

        index = self.tree.index(selected[0])

        # 清除所有默认标记
        for plat in self.config["plats"]:
            plat["is_default"] = False

        # 设置新的默认
        self.config["plats"][index]["is_default"] = True
        self.refresh_list()

    def save_and_close(self):
        """保存并关闭"""
        save_config(self.config)
        self.on_save_callback(self.config)
        self.dialog.destroy()


class PlatEditDialog:
    """Plat 编辑对话框"""

    def __init__(self, parent, plat_data):
        self.result = None

        self.dialog = tk.Toplevel(parent)
        self.dialog.title("编辑 Plat" if plat_data else "添加 Plat")
        self.dialog.geometry("450x200")
        self.dialog.transient(parent)
        self.dialog.grab_set()

        # 表单
        frame = tk.Frame(self.dialog)
        frame.pack(fill="both", expand=True, padx=20, pady=20)

        # 名称
        tk.Label(frame, text="名称 (如 wx_ma):").grid(
            row=0, column=0, sticky="e", pady=5
        )
        self.name_var = tk.StringVar(
            value=plat_data.get("name", "") if plat_data else ""
        )
        tk.Entry(frame, textvariable=self.name_var, width=35).grid(
            row=0, column=1, sticky="w", pady=5
        )

        # 显示标签
        tk.Label(frame, text="显示标签:").grid(row=1, column=0, sticky="e", pady=5)
        self.label_var = tk.StringVar(
            value=plat_data.get("label", "") if plat_data else ""
        )
        tk.Entry(frame, textvariable=self.label_var, width=35).grid(
            row=1, column=1, sticky="w", pady=5
        )

        # 远程路径
        tk.Label(frame, text="远程路径:").grid(row=2, column=0, sticky="e", pady=5)
        self.path_var = tk.StringVar(
            value=plat_data.get("remote_path", "") if plat_data else ""
        )
        tk.Entry(frame, textvariable=self.path_var, width=35).grid(
            row=2, column=1, sticky="w", pady=5
        )

        # 按钮
        btn_frame = tk.Frame(self.dialog)
        btn_frame.pack(fill="x", pady=10)

        tk.Button(btn_frame, text="确定", width=10, command=self.on_ok).pack(
            side="right", padx=20
        )
        tk.Button(btn_frame, text="取消", width=10, command=self.dialog.destroy).pack(
            side="right", padx=5
        )

        self.is_default = plat_data.get("is_default", False) if plat_data else False

    def on_ok(self):
        name = self.name_var.get().strip()
        label = self.label_var.get().strip()
        path = self.path_var.get().strip()

        if not name:
            messagebox.showwarning("警告", "请输入名称")
            return
        if not path:
            messagebox.showwarning("警告", "请输入远程路径")
            return

        if not label:
            label = name

        self.result = {
            "name": name,
            "label": label,
            "remote_path": path,
            "is_default": self.is_default,
        }
        self.dialog.destroy()


class FlatButton(tk.Frame):
    """
    自绘按钮。macOS 原生 tk.Button 会忽略 bg/fg（Aqua 渲染），导致彩色按钮白字看不清；
    用 Frame+Label 自绘并绑定四态（正常/悬停/按下/禁用），保证 macOS 上颜色一定生效。
    对外暴露 configure(state=...) 与 invoke()，便于禁用与触发。
    """

    _PALETTES = {
        "primary": (COLORS["primary"], COLORS["primary_hover"], COLORS["primary_press"], "#FFFFFF"),
        "secondary": (COLORS["secondary"], COLORS["secondary_hover"], COLORS["secondary_press"], "#FFFFFF"),
        "ghost": (COLORS["ghost"], COLORS["ghost_hover"], COLORS["ghost_press"], COLORS["text"]),
    }

    def __init__(
        self,
        parent,
        text: str,
        command: Optional[Callable] = None,
        kind: str = "primary",
        height: int = 46,
        font=None,
    ):
        super().__init__(parent, bg=COLORS["bg"])
        self.command = command
        self._enabled = True
        self._normal, self._hover, self._press, self._fg = self._PALETTES[kind]

        font = font or (FONTS["base"][0], 13, "bold")
        self._label = tk.Label(
            self,
            text=text,
            bg=self._normal,
            fg=self._fg,
            font=font,
            cursor="hand2",
            padx=18,
        )
        self._label.pack(fill="both", expand=True)
        # 用 pack_propagate(False) 固定尺寸；宽度按文字实测，避免侧向 pack 时被压成 1px。
        # 对 fill="x" 的主按钮，pack 会按容器拉伸覆盖此宽度，高度保持不变。
        self.update_idletasks()
        text_w = self._label.winfo_reqwidth()
        self.configure(width=max(text_w + 24, 72), height=height, bg=self._normal)
        self.pack_propagate(False)

        for w in (self, self._label):
            w.bind("<Enter>", self._on_enter)
            w.bind("<Leave>", self._on_leave)
            w.bind("<Button-1>", self._on_press)
            w.bind("<ButtonRelease-1>", self._on_release)

    def _set_bg(self, color: str) -> None:
        self.configure(bg=color)
        self._label.configure(bg=color)

    def _on_enter(self, _event=None) -> None:
        if self._enabled:
            self._set_bg(self._hover)

    def _on_leave(self, _event=None) -> None:
        if self._enabled:
            self._set_bg(self._normal)

    def _on_press(self, _event=None) -> None:
        if self._enabled:
            self._set_bg(self._press)

    def _on_release(self, _event=None) -> None:
        if not self._enabled:
            return
        self._set_bg(self._hover)
        if callable(self.command):
            self.command()

    def configure(self, **kw):
        if "state" in kw:
            state = kw.pop("state")
            self._enabled = state != "disabled"
            if self._enabled:
                self._set_bg(self._normal)
                self._label.configure(fg=self._fg, cursor="hand2")
            else:
                self._set_bg("#D1D5DB")
                self._label.configure(fg="#FFFFFF", cursor="arrow")
        if kw:
            super().configure(**kw)
        return None

    def invoke(self) -> None:
        self._on_release()


class WxUploaderGUI:
    def __init__(self, root):
        self.root = root
        root.title("微信小程序上传工具")
        root.geometry("760x700")
        root.minsize(680, 620)
        root.configure(bg=COLORS["bg"])

        self._setup_theme()

        # 加载配置
        self.config = load_config()

        # 状态变量
        self.key_path_var = tk.StringVar()
        self.plat_var = tk.StringVar()
        self.build_mode_var = tk.StringVar(value="production")
        self.audit_var = tk.BooleanVar(value=False)
        self.use_env_plat_var = tk.BooleanVar(value=True)
        self.compress_png_strict_var = tk.BooleanVar(
            value=self.config.get("compress_png_strict", True)
        )
        self.compress_png_strict_var.trace_add(
            "write", self._on_compress_png_strict_changed
        )
        self.use_qiniu_var = tk.BooleanVar(value=self.config.get("use_qiniu", True))
        self.use_qiniu_var.trace_add("write", self._on_use_qiniu_changed)
        self.status_var = tk.StringVar(value="就绪")
        self.appid_var = tk.StringVar(value="")
        self._running = False
        self._open_dist_btn = None

        # 设置默认 plat
        self._set_default_plat()

        # ===== 菜单栏 =====
        menubar = tk.Menu(root)
        root.config(menu=menubar)
        config_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="配置", menu=config_menu)
        config_menu.add_command(label="管理 Plat 配置…", command=self.open_plat_config)

        # ===== 滚动容器 =====
        container = tk.Frame(root, bg=COLORS["bg"])
        container.pack(fill="both", expand=True)

        # 标题区
        header = tk.Frame(container, bg=COLORS["bg"])
        header.pack(fill="x", padx=18, pady=(16, 6))
        tk.Label(
            header,
            text="微信小程序上传工具",
            bg=COLORS["bg"],
            fg=COLORS["text"],
            font=(FONTS["base"][0], FONT_TITLE, "bold"),
        ).pack(anchor="w")
        tk.Label(
            header,
            text="构建并发布到微信公众平台",
            bg=COLORS["bg"],
            fg=COLORS["muted"],
            font=(FONTS["base"][0], FONT_SMALL),
        ).pack(anchor="w", pady=(2, 0))

        # 卡片：密钥文件
        key_body = self._card(container, "密钥文件")
        key_row = tk.Frame(key_body, bg=COLORS["card"])
        key_row.pack(fill="x")
        # 先 pack 按钮到右侧，保证它一定可见；Entry 再 fill 占满剩余宽度
        FlatButton(
            key_row, "选择文件…", command=self.choose_key_file, kind="ghost", height=34
        ).pack(side="right", padx=(10, 0))
        self.key_entry = ttk.Entry(key_row, textvariable=self.key_path_var)
        self.key_entry.pack(side="left", fill="x", expand=True, ipady=4)
        self.appid_badge = tk.Label(
            key_body,
            textvariable=self.appid_var,
            bg=COLORS["card"],
            fg=COLORS["muted"],
            font=(FONTS["base"][0], FONT_SMALL),
            anchor="w",
        )
        self.appid_badge.pack(fill="x", pady=(8, 0))
        self.key_path_var.trace_add("write", self._on_key_path_changed)

        # 卡片：上传目标
        self.plat_body = self._card(container, "上传目标")
        self._build_plat_options()

        # 卡片：选项
        opt_body = self._card(container, "选项")
        opt_row1 = tk.Frame(opt_body, bg=COLORS["card"])
        opt_row1.pack(fill="x")
        tk.Label(
            opt_row1,
            text="编译模式",
            bg=COLORS["card"],
            fg=COLORS["text"],
            font=(FONTS["base"][0], FONT_SIZE),
        ).pack(side="left")
        ttk.Radiobutton(
            opt_row1, text="生产环境", value="production", variable=self.build_mode_var
        ).pack(side="left", padx=(12, 4))
        ttk.Radiobutton(
            opt_row1, text="测试环境", value="development", variable=self.build_mode_var
        ).pack(side="left", padx=4)
        self.audit_check = ttk.Checkbutton(
            opt_row1,
            text="审核版本",
            variable=self.audit_var,
        )
        self.audit_check.pack(side="left", padx=(12, 0))
        tk.Label(
            opt_row1,
            text="隐藏部分功能/精简tabBar",
            bg=COLORS["card"],
            fg=COLORS["muted"],
            font=(FONTS["base"][0], FONT_SMALL),
        ).pack(side="left", padx=(4, 0))
        self.qiniu_check = ttk.Checkbutton(
            opt_row1,
            text="上传 CDN",
            variable=self.use_qiniu_var,
            command=self._sync_png_strict_state,
        )
        self.qiniu_check.pack(side="right")

        opt_row2 = tk.Frame(opt_body, bg=COLORS["card"])
        opt_row2.pack(fill="x", pady=(8, 0))
        self.png_strict_check = ttk.Checkbutton(
            opt_row2,
            text="PNG 严格模式",
            variable=self.compress_png_strict_var,
        )
        self.png_strict_check.pack(side="left")
        tk.Label(
            opt_row2,
            text="未安装 pngquant 时中断上传（brew install pngquant）",
            bg=COLORS["card"],
            fg=COLORS["muted"],
            font=(FONTS["base"][0], FONT_SMALL),
        ).pack(side="left", padx=(8, 0))
        self._sync_png_strict_state()

        # 操作区
        actions = tk.Frame(container, bg=COLORS["bg"])
        actions.pack(fill="x", padx=16, pady=(14, 0))
        self.btn_publish = FlatButton(
            actions,
            "一键编译并发布微信小程序",
            command=self._on_publish,
            kind="primary",
            height=48,
        )
        self.btn_publish.pack(fill="x", pady=(0, 8))
        self.btn_local = FlatButton(
            actions,
            "只打本地包（替换 CDN，不上传）",
            command=self._on_local,
            kind="secondary",
            height=44,
        )
        self.btn_local.pack(fill="x")

        # 进度条 + 状态
        prog = tk.Frame(container, bg=COLORS["bg"])
        prog.pack(fill="x", padx=16, pady=(12, 0))
        self.progress = ttk.Progressbar(prog, mode="indeterminate")
        self.progress.pack(fill="x")
        tk.Label(
            prog,
            textvariable=self.status_var,
            bg=COLORS["bg"],
            fg=COLORS["muted"],
            font=(FONTS["base"][0], FONT_SMALL),
            anchor="w",
        ).pack(fill="x", pady=(6, 0))

        # 卡片：日志
        log_body = self._card(container, "日志")
        log_head = tk.Frame(log_body, bg=COLORS["card"])
        # 标题已在 _card 内，这里只放右侧按钮行（与标题同行的实现较复杂，简化为独占一行右对齐）
        log_tools = tk.Frame(log_body, bg=COLORS["card"])
        log_tools.pack(fill="x", pady=(0, 8))
        FlatButton(
            log_tools, "清空日志", command=self.clear_log, kind="ghost", height=30
        ).pack(side="right")
        log_text_frame = tk.Frame(log_body, bg=COLORS["card"])
        log_text_frame.pack(fill="both", expand=True)
        self.log_text = tk.Text(
            log_text_frame,
            height=10,
            bg=COLORS["log_bg"],
            fg=COLORS["log_fg"],
            insertbackground=COLORS["log_fg"],
            font=(FONTS["mono"][0], 11),
            wrap="none",
            state="disabled",
            relief="flat",
            padx=10,
            pady=8,
        )
        yscroll = ttk.Scrollbar(
            log_text_frame, orient="vertical", command=self.log_text.yview
        )
        xscroll = ttk.Scrollbar(
            log_text_frame, orient="horizontal", command=self.log_text.xview
        )
        self.log_text.configure(yscrollcommand=yscroll.set, xscrollcommand=xscroll.set)
        self.log_text.grid(row=0, column=0, sticky="nsew")
        yscroll.grid(row=0, column=1, sticky="ns")
        xscroll.grid(row=1, column=0, sticky="ew")
        log_text_frame.rowconfigure(0, weight=1)
        log_text_frame.columnconfigure(0, weight=1)
        self._open_dist_btn = FlatButton(
            log_body,
            "打开产物目录",
            command=self._open_dist_dir,
            kind="ghost",
            height=30,
        )
        # 默认隐藏，本地打包成功后再显示
        self._open_dist_btn.pack_forget()

        # 接管 print → 界面日志
        self._init_log_sink()

        # 绑定 Esc 关闭
        root.bind("<Escape>", lambda _e: root.destroy())

        # 回填上次 key 路径（触发徽章解析）
        last_key = self.config.get("last_key_path", "")
        if last_key and os.path.isfile(last_key):
            self.key_path_var.set(last_key)

    # ---------- UI 构建辅助 ----------

    def _setup_theme(self):
        style = ttk.Style(self.root)
        try:
            style.theme_use("clam")
        except tk.TclError:
            pass
        base = FONTS["base"][0]
        style.configure("TFrame", background=COLORS["bg"])
        style.configure(
            "TLabel",
            background=COLORS["bg"],
            foreground=COLORS["text"],
            font=(base, FONT_SIZE),
        )
        style.configure(
            "TRadiobutton",
            background=COLORS["card"],
            foreground=COLORS["text"],
            font=(base, FONT_SIZE),
        )
        style.map("TRadiobutton", background=[("active", COLORS["card"])])
        style.configure(
            "TCheckbutton",
            background=COLORS["card"],
            foreground=COLORS["text"],
            font=(base, FONT_SIZE),
        )
        style.map("TCheckbutton", background=[("active", COLORS["card"])])
        style.configure(
            "TEntry",
            fieldbackground="#FFFFFF",
            foreground=COLORS["text"],
            bordercolor=COLORS["border"],
            lightcolor=COLORS["border"],
            darkcolor=COLORS["border"],
            padding=6,
        )
        style.configure(
            "Horizontal.TProgressbar",
            troughcolor=COLORS["border"],
            background=COLORS["primary"],
            bordercolor=COLORS["bg"],
            lightcolor=COLORS["primary"],
            darkcolor=COLORS["primary"],
        )
        style.configure("TScrollbar", background=COLORS["border"])

    def _card(self, parent, title: str):
        """带 1px 边框的卡片，返回内部 body frame（白色底）。"""
        outer = tk.Frame(parent, bg=COLORS["border"])
        outer.pack(fill="x", padx=16, pady=(10, 0))
        inner = tk.Frame(outer, bg=COLORS["card"])
        inner.pack(fill="x", padx=1, pady=1)
        if title:
            tk.Label(
                inner,
                text=title,
                bg=COLORS["card"],
                fg=COLORS["text"],
                font=(FONTS["base"][0], 12, "bold"),
            ).pack(anchor="w", padx=14, pady=(12, 8))
        body = tk.Frame(inner, bg=COLORS["card"])
        body.pack(fill="x", padx=14, pady=(0, 14))
        return body

    # ---------- 日志 / 状态 ----------

    def _init_log_sink(self):
        """把模块级 LOG_SINK 替换为线程安全的界面写入函数。"""
        global LOG_SINK

        def sink(text: str) -> None:
            # 始终回显真实终端
            try:
                sys.__stdout__.write(str(text) + "\n")
                sys.__stdout__.flush()
            except Exception:
                pass
            # 界面更新回到主线程
            try:
                self.root.after(0, lambda t=text: self.append_log(t))
            except Exception:
                pass

        LOG_SINK = sink

    def append_log(self, text: str) -> None:
        self.log_text.configure(state="normal")
        self.log_text.insert("end", str(text) + "\n")
        # 限制行数，避免长时间运行内存膨胀
        max_lines = 5000
        total = int(self.log_text.index("end-1c").split(".")[0])
        if total > max_lines:
            self.log_text.delete("1.0", f"{total - max_lines}.0")
        self.log_text.see("end")
        self.log_text.configure(state="disabled")

    def clear_log(self) -> None:
        self.log_text.configure(state="normal")
        self.log_text.delete("1.0", "end")
        self.log_text.configure(state="disabled")

    def _set_status(self, text: str) -> None:
        self.root.after(0, lambda: self.status_var.set(text))

    def _set_running(self, running: bool) -> None:
        self._running = running
        state = "disabled" if running else "normal"
        self.btn_publish.configure(state=state)
        self.btn_local.configure(state=state)
        if running:
            self.progress.start(12)
        else:
            self.progress.stop()

    def _open_dist_dir(self) -> None:
        try:
            subprocess.run(["open", MP_WEIXIN_DIST], check=False)
        except Exception as e:
            messagebox.showerror("错误", f"无法打开目录：\n{e}")

    def _show_open_dist_button(self) -> None:
        if self._open_dist_btn is not None:
            self._open_dist_btn.pack(fill="x", pady=(10, 0))

    def _on_key_path_changed(self, *_args) -> None:
        path = self.key_path_var.get().strip()
        if not path:
            self.appid_var.set("")
            self.appid_badge.configure(fg=COLORS["muted"])
            return
        if not os.path.isfile(path):
            self.appid_var.set("文件不存在")
            self.appid_badge.configure(fg=COLORS["danger"])
            return
        try:
            appid = parse_appid_from_key(path)
            self.appid_var.set(f"AppID: {appid}")
            self.appid_badge.configure(fg=COLORS["badge_fg"])
            # 持久化最近使用的 key
            self.config["last_key_path"] = path
            save_config(self.config)
        except ValueError as e:
            self.appid_var.set(str(e))
            self.appid_badge.configure(fg=COLORS["danger"])

    def _set_default_plat(self):
        """设置默认选中的 plat"""
        # 默认使用环境变量
        self.plat_var.set("__env__")

        # 检查环境变量是否有效
        plat_from_env = self.get_plat_from_env(self.build_mode_var.get())
        if plat_from_env:
            return

        # 如果环境变量无效，使用配置中的默认
        for plat in self.config.get("plats", []):
            if plat.get("is_default", False):
                self.plat_var.set(plat["name"])
                return
        # 如果没有默认，选第一个
        plats = self.config.get("plats", [])
        if plats:
            self.plat_var.set(plats[0]["name"])

    def _build_plat_options(self):
        """构建 plat 选项（横排 ttk.Radiobutton）"""
        for widget in self.plat_body.winfo_children():
            widget.destroy()

        row = tk.Frame(self.plat_body, bg=COLORS["card"])
        row.pack(fill="x")

        ttk.Radiobutton(
            row,
            text="环境变量 (VITE_APP_PLATFORM)",
            value="__env__",
            variable=self.plat_var,
        ).pack(side="left", padx=(0, 12))

        for plat in self.config.get("plats", []):
            ttk.Radiobutton(
                row,
                text=plat.get("label", plat["name"]),
                value=plat["name"],
                variable=self.plat_var,
            ).pack(side="left", padx=(0, 12))

    def open_plat_config(self):
        """打开 plat 配置管理对话框"""
        PlatConfigDialog(self.root, self.config.copy(), self._on_config_saved)

    def _on_config_saved(self, new_config):
        """配置保存后的回调"""
        self.config = new_config
        self._set_default_plat()
        self._build_plat_options()

    def _on_compress_png_strict_changed(self, *_args):
        """勾选变化时写入 plat_config.json"""
        self.config["compress_png_strict"] = bool(self.compress_png_strict_var.get())
        save_config(self.config)

    def _on_use_qiniu_changed(self, *_args):
        """七牛开关变化时写入 plat_config.json"""
        self.config["use_qiniu"] = bool(self.use_qiniu_var.get())
        save_config(self.config)

    def _sync_png_strict_state(self):
        """未启用七牛时，PNG 严格模式无意义"""
        use_qiniu = bool(self.use_qiniu_var.get())
        state = "normal" if use_qiniu else "disabled"
        self.png_strict_check.configure(state=state)

    def choose_key_file(self):
        path = filedialog.askopenfilename(
            title="选择 private.wx*.key 文件",
            initialdir=CURRENT_DIR,
            filetypes=[("Key files", "*.key"), ("All files", "*.*")],
        )
        if path:
            self.key_path_var.set(path)

    def get_remote_dir(self, plat_name: str) -> str:
        """根据 plat 名称返回远程目录"""
        for plat in self.config.get("plats", []):
            if plat["name"] == plat_name:
                return plat["remote_path"]
        # 默认返回第一个
        plats = self.config.get("plats", [])
        if plats:
            return plats[0]["remote_path"]
        return "/root/jmcw/wx_ma"

    def get_plat_from_env(self, build_mode: str = "production") -> Optional[dict]:
        """
        从环境变量 VITE_APP_PLATFORM 获取 plat 配置
        返回匹配的 plat 配置，如果没有匹配则返回 None
        """
        env_vars = read_env_file(build_mode)
        platform = env_vars.get("VITE_APP_PLATFORM", "").strip()

        if not platform:
            return None

        # 在配置中查找匹配的 plat
        for plat in self.config.get("plats", []):
            if plat["name"] == platform:
                return plat

        return None

    def _resolve_build_platform(self, build_mode: str) -> str:
        """
        返回本次编译应使用的 VITE_APP_PLATFORM：
        始终以上传目标选择为准；选择「环境变量」时取 env 文件中的值。
        """
        plat_name = self.plat_var.get()
        if plat_name and plat_name != "__env__":
            return plat_name
        env_vars = read_env_file(build_mode)
        return env_vars.get("VITE_APP_PLATFORM", "").strip()

    def ensure_key_and_plat(self):
        key_path = self.key_path_var.get().strip()
        if not key_path:
            messagebox.showerror("错误", "请先选择 private.wx*.key 文件")
            return None, None, None, None
        if not os.path.isfile(key_path):
            messagebox.showerror("错误", f"key 文件不存在：\n{key_path}")
            return None, None, None, None

        # 验证 key 文件名格式并解析 appid
        try:
            appid = parse_appid_from_key(key_path)
        except ValueError as e:
            messagebox.showerror("错误", str(e))
            return None, None, None, None

        plat_name = self.plat_var.get()
        if not plat_name:
            messagebox.showerror("错误", "请选择上传目标 plat")
            return None, None, None, None

        # 处理使用环境变量的情况
        actual_plat_name = plat_name
        plat_from_env = None
        if plat_name == "__env__":
            build_mode = self.build_mode_var.get()
            plat_from_env = self.get_plat_from_env(build_mode)
            if plat_from_env:
                actual_plat_name = plat_from_env["name"]
            else:
                env_vars = read_env_file(build_mode)
                platform = env_vars.get("VITE_APP_PLATFORM", "未设置")
                messagebox.showerror(
                    "错误",
                    f"环境变量 VITE_APP_PLATFORM='{platform}' 没有匹配的配置\n"
                    "请在 plat_config.json 中添加对应配置，或手动选择目标平台",
                )
                return None, None, None, None

        return key_path, plat_name, actual_plat_name, appid

    # ---------- 任务编排（后台线程，避免卡死界面） ----------

    def _static_step_text(self, use_qiniu: bool, png_strict: bool) -> str:
        png_strict_text = (
            "开启（未安装 pngquant 将失败）"
            if png_strict
            else "关闭（未安装 pngquant 仅警告并继续）"
        )
        if use_qiniu:
            return (
                "2. CDN 处理\n"
                "   · 上传有变更的图片到 CDN（未变更不重复上传）\n"
                "   · 将 /static/ 替换为 CDN 地址并删除本地 static（保留 tabBar 图标）\n"
                f"   PNG 严格模式: {png_strict_text}\n\n"
            )
        return (
            "2. CDN 处理\n"
            "   · 不上传 CDN（复用已有 CDN 资源）\n"
            "   · 仍将 /static/ 替换为 CDN 地址并删除本地 static（保留 tabBar 图标）\n\n"
        )

    def _on_publish(self):
        """点击「一键编译并发布」：主线程校验 + 确认，然后后台执行。"""
        if self._running:
            return
        key_path, plat_selection, actual_plat_name, appid = self.ensure_key_and_plat()
        if not key_path:
            return

        build_mode = self.build_mode_var.get()
        audit = bool(self.audit_var.get())
        mode_text = "生产环境" if build_mode == "production" else "测试环境"
        if audit:
            mode_text += "·审核版"
        remote_path = self.get_remote_dir(actual_plat_name)
        remote_host = self.config.get("remote_host", "jermy")

        env_vars = read_env_file(build_mode)
        base_url = env_vars.get("VITE_APP_BASEURL", "未配置")
        # 编译平台始终以上传目标选择为准（actual_plat_name 已按 __env__ 解析），
        # 编译时会显式注入 VITE_APP_PLATFORM 覆盖 env 文件中的值
        platform_env = actual_plat_name
        plat_info = (
            f"按环境变量解析: VITE_APP_PLATFORM={actual_plat_name}"
            if plat_selection == "__env__"
            else f"手动选择: {actual_plat_name}"
        )
        use_qiniu = bool(self.use_qiniu_var.get())
        png_strict = bool(self.compress_png_strict_var.get()) if use_qiniu else False

        if not messagebox.askyesno(
            "确认",
            "即将执行以下操作：\n\n"
            f"1. 编译微信小程序（{mode_text}）\n"
            f"   API地址: {base_url}\n"
            f"   平台标识: {actual_plat_name}（按上传目标选择编译）\n\n"
            f"{self._static_step_text(use_qiniu, png_strict)}"
            "3. 上传代码到服务器并远程解压\n"
            f"   主机: {remote_host}\n"
            f"   路径: {remote_path}\n"
            f"   ({plat_info})\n\n"
            "4. 上传 key 文件并发布到微信\n"
            f"   AppID: {appid}\n"
            f"   路径: {remote_path}/{appid}\n\n"
            "是否继续？",
        ):
            return

        ctx = {
            "key_path": key_path,
            "plat_selection": plat_selection,
            "actual_plat_name": actual_plat_name,
            "appid": appid,
            "build_mode": build_mode,
            "audit": audit,
            "mode_text": mode_text,
            "remote_path": remote_path,
            "remote_host": remote_host,
            "base_url": base_url,
            "platform_env": platform_env,
            "use_qiniu": use_qiniu,
            "png_strict": png_strict,
        }
        self._run_task(lambda: self._publish_work(ctx))

    def _publish_work(self, ctx):
        self._set_status("正在编译…")
        if not build_mp_weixin(
            ctx["build_mode"], audit=ctx["audit"], platform=ctx["actual_plat_name"]
        ):
            raise RuntimeError("编译失败，请检查上方日志")

        self._set_status("正在处理 CDN…")
        if not process_mp_static_cdn(
            ctx["build_mode"],
            compress_png_strict=ctx["png_strict"],
            upload_cdn=ctx["use_qiniu"],
        ):
            raise RuntimeError("CDN 处理失败，请检查 qiniu_config.json 与上方日志")

        self._set_status("正在上传代码到服务器…")
        if not upload_code_to_server(ctx["remote_host"], ctx["remote_path"]):
            raise RuntimeError("上传代码失败，请检查上方日志")

        self._set_status("正在发布到微信…")
        if not upload_key_and_publish(
            ctx["key_path"], ctx["remote_host"], ctx["remote_path"]
        ):
            raise RuntimeError("发布到微信失败，请检查上方日志")

        clean_wx_upload_dir()

        plat_display = (
            f"{ctx['actual_plat_name']} (来自环境变量)"
            if ctx["plat_selection"] == "__env__"
            else ctx["actual_plat_name"]
        )
        qiniu_result = (
            "已上传 CDN（增量）+ 替换引用 + 删除 static（保留 tabBar）"
            if ctx["use_qiniu"]
            else "未上传 CDN + 替换引用 + 删除 static（保留 tabBar）"
        )
        msg = (
            "一键发布完成！\n\n"
            f"编译模式: {ctx['mode_text']}\n"
            f"API地址:  {ctx['base_url']}\n"
            f"平台标识: {ctx['platform_env']}\n"
            f"静态资源: {qiniu_result}\n"
            f"目标平台: {plat_display}\n"
            f"远程路径: {ctx['remote_path']}\n"
            f"AppID:    {ctx['appid']}"
        )
        return ("完成", msg)

    def _on_local(self):
        """点击「只打本地包」：主线程确认，后台执行。"""
        if self._running:
            return
        build_mode = self.build_mode_var.get()
        audit = bool(self.audit_var.get())
        mode_text = "生产环境" if build_mode == "production" else "测试环境"
        if audit:
            mode_text += "·审核版"
        env_vars = read_env_file(build_mode)
        base_url = env_vars.get("VITE_APP_BASEURL", "未配置")
        # 编译平台始终以上传目标选择为准
        build_platform = self._resolve_build_platform(build_mode)
        platform_env = build_platform or "未配置"
        use_qiniu = bool(self.use_qiniu_var.get())
        png_strict = bool(self.compress_png_strict_var.get()) if use_qiniu else False

        if not messagebox.askyesno(
            "确认",
            "即将【只打本地包】（不上传服务器、不发布微信）：\n\n"
            f"1. 编译微信小程序（{mode_text}）\n"
            f"   API地址: {base_url}\n"
            f"   平台标识: {platform_env}（按上传目标选择编译）\n\n"
            f"{self._static_step_text(use_qiniu, png_strict)}"
            f"产物目录: {MP_WEIXIN_DIST}\n\n"
            "是否继续？",
        ):
            return

        ctx = {
            "build_mode": build_mode,
            "audit": audit,
            "mode_text": mode_text,
            "base_url": base_url,
            "platform_env": platform_env,
            "build_platform": build_platform,
            "use_qiniu": use_qiniu,
            "png_strict": png_strict,
        }
        self._run_task(lambda: self._local_work(ctx))

    def _local_work(self, ctx):
        self._set_status("正在编译…")
        if not build_mp_weixin(
            ctx["build_mode"], audit=ctx["audit"], platform=ctx["build_platform"]
        ):
            raise RuntimeError("编译失败，请检查上方日志")

        self._set_status("正在处理 CDN…")
        if not process_mp_static_cdn(
            ctx["build_mode"],
            compress_png_strict=ctx["png_strict"],
            upload_cdn=ctx["use_qiniu"],
        ):
            raise RuntimeError("CDN 处理失败，请检查 qiniu_config.json 与上方日志")

        qiniu_result = (
            "已上传 CDN（增量）+ 替换引用 + 删除 static（保留 tabBar）"
            if ctx["use_qiniu"]
            else "未上传 CDN + 替换引用 + 删除 static（保留 tabBar）"
        )
        # 本地打包成功，显示「打开产物目录」
        self.root.after(0, self._show_open_dist_button)
        msg = (
            "本地打包完成！（未上传服务器、未发布微信）\n\n"
            f"编译模式: {ctx['mode_text']}\n"
            f"API地址:  {ctx['base_url']}\n"
            f"平台标识: {ctx['platform_env']}\n"
            f"静态资源: {qiniu_result}\n"
            f"产物目录: {MP_WEIXIN_DIST}"
        )
        return ("完成", msg)

    def _run_task(self, worker):
        """在后台线程运行 worker，期间把 print 输出接入界面日志。"""
        if self._running:
            return
        self.clear_log()
        if self._open_dist_btn is not None:
            self._open_dist_btn.pack_forget()
        self._set_running(True)
        self.status_var.set("准备中…")

        def run():
            old_stdout = sys.stdout
            sys.stdout = _StdoutToLog()
            try:
                title, msg = worker()
                # 用默认参数按值捕获，避免闭包延迟绑定到已释放的局部变量
                self.root.after(0, lambda t=title, m=msg: self._on_task_done(t, m))
            except Exception as e:
                self.root.after(0, lambda err=e: self._on_task_fail(err))
            finally:
                sys.stdout = old_stdout

        threading.Thread(target=run, daemon=True).start()

    def _on_task_done(self, title, msg):
        self._set_running(False)
        self.status_var.set("完成")
        messagebox.showinfo(title, msg)

    def _on_task_fail(self, err):
        self._set_running(False)
        self.status_var.set("失败")
        messagebox.showerror("错误", f"操作失败：\n{err}")


if __name__ == "__main__":
    root = tk.Tk()
    app = WxUploaderGUI(root)
    root.mainloop()
