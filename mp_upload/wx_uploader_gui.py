import os
import json
import subprocess
import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog, ttk

# ================= 配置区 =================

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
# 当 mp_upload 目录被移动到 uni-kahe 的上一级目录时，
# 项目根目录为 mp_upload 的同级目录下的 uni-kahe
PROJECT_ROOT = os.path.join(os.path.dirname(CURRENT_DIR), "uni-kahe")
AUTO_SCRIPT = os.path.join(CURRENT_DIR, "auto_wx_upload.sh")
CONFIG_FILE = os.path.join(CURRENT_DIR, "plat_config.json")
WX_UPLOAD_DIR = os.path.join(CURRENT_DIR, "wx_upload")

# 默认配置（如果配置文件不存在时使用）
DEFAULT_CONFIG = {
    "remote_host": "jmcw",
    "plats": [
        {
            "name": "wx_ma",
            "label": "wx_ma (默认)",
            "remote_path": "/home/aarif/jmcw/wx_ma",
            "is_default": True
        },
        {
            "name": "wx_ma_2",
            "label": "wx_ma_2",
            "remote_path": "/home/aarif/jmcw/wx_ma_2",
            "is_default": False
        },
        {
            "name": "wx_ma_3",
            "label": "wx_ma_3",
            "remote_path": "/home/aarif/jmcw/wx_ma_3",
            "is_default": False
        }
    ]
}

# =========================================================


def load_config():
    """加载配置文件"""
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
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
        with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
            json.dump(config, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"保存配置文件失败: {e}")


def parse_appid_from_key(key_path: str) -> str:
    """从 private.wx******.key 文件名里解析出 appid"""
    base = os.path.basename(key_path)
    if not (base.startswith("private.wx") and base.endswith(".key")):
        raise ValueError(f"key 文件名不符合格式：{base}，应为 private.wx******.key")
    return base[len("private."): -len(".key")]


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
            with open(env_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    # 跳过空行和注释
                    if not line or line.startswith('#'):
                        continue
                    # 解析 KEY=VALUE 格式
                    if '=' in line:
                        key, value = line.split('=', 1)
                        # 去除引号
                        value = value.strip().strip("'\"")
                        env_vars[key.strip()] = value
        except Exception as e:
            print(f"读取环境文件失败: {e}")
    
    return env_vars


def build_mp_weixin(mode: str = "production") -> bool:
    """
    编译微信小程序
    mode: "production" 或 "development"
    返回: True 表示成功，False 表示失败
    """
    env_file = ".env.production" if mode == "production" else ".env.development"
    mode_text = "生产环境" if mode == "production" else "测试环境"
    
    # 读取环境配置
    env_vars = read_env_file(mode)
    base_url = env_vars.get('VITE_APP_BASEURL', '未配置')
    app_env = env_vars.get('VITE_APP_ENV', '未配置')
    cdn_folder = env_vars.get('VITE_APP_CDN_FOLDER', '未配置')
    
    print("=" * 60)
    print(f"开始编译微信小程序")
    print("-" * 60)
    print(f"编译模式:            {mode_text}")
    print(f"环境文件:            {env_file}")
    print(f"VITE_APP_ENV:        {app_env}")
    print(f"VITE_APP_BASEURL:    {base_url}")
    print(f"VITE_APP_CDN_FOLDER: {cdn_folder}")
    print("=" * 60)
    print("正在切换到 Node 18...")
    
    try:
        if mode == "development":
            build_cmd = "yarn build:mp-weixin-test"
        else:
            build_cmd = "yarn build:mp-weixin"

        # 使用 bash 加载 nvm 并切换到 node 18，然后执行 yarn 编译命令
        # nvm 是 shell 函数，需要先 source nvm.sh
        shell_cmd = f'''
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
            nvm use 18
            {build_cmd}
        '''
        
        result = subprocess.run(
            ["/bin/bash", "-c", shell_cmd],
            cwd=PROJECT_ROOT,
            check=True,
            capture_output=False  # 让输出显示在终端
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


def upload_code_to_server(remote_host: str, remote_path: str) -> bool:
    """
    打包并上传编译后的代码到服务器，然后执行 run-mp.sh
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
        tar_cmd = "tar --disable-copyfile -czvf ./mp-weixin.tar.gz dist/build/mp-weixin/"
        subprocess.run(
            ["/bin/bash", "-c", tar_cmd],
            cwd=PROJECT_ROOT,
            check=True
        )
        
        # 上传到服务器
        print(f"正在上传到 {remote_host}:{remote_path}/...")
        tar_file = os.path.join(PROJECT_ROOT, "mp-weixin.tar.gz")
        scp_cmd = ["scp", tar_file, f"{remote_host}:{remote_path}/"]
        subprocess.run(scp_cmd, check=True)
        
        # 执行 run-mp.sh 解压代码
        print(f"正在执行 {remote_path}/run-mp.sh...")
        run_mp_script = f"{remote_path}/run-mp.sh"
        ssh_cmd = ["ssh", remote_host, run_mp_script]
        subprocess.run(ssh_cmd, check=True)
        
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
    返回: True 表示成功，False 表示失败
    """
    try:
        appid = parse_appid_from_key(key_path)
        remote_app_dir = f"{remote_path}/{appid}"
        upload_js_name = f"upload_{appid}.js"
        
        print("=" * 60)
        print("上传 key 文件并发布到微信")
        print("-" * 60)
        print(f"AppID:       {appid}")
        print(f"远程目录:    {remote_app_dir}")
        print("=" * 60)
        
        # 使用 auto_wx_upload.sh 上传 key 文件
        cmd = ["/bin/bash", AUTO_SCRIPT, key_path, remote_path]
        subprocess.run(cmd, check=True)
        
        # 执行 node upload_appid.js 上传到微信
        print(f"正在执行 node {upload_js_name}...")
        ssh_cmd = [
            "ssh",
            remote_host,
            f"cd '{remote_app_dir}' && node '{upload_js_name}'"
        ]
        subprocess.run(ssh_cmd, check=True)
        
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
        self.tree = ttk.Treeview(list_frame, columns=columns, show="headings", height=10)
        
        self.tree.heading("name", text="名称")
        self.tree.heading("label", text="显示标签")
        self.tree.heading("remote_path", text="远程路径")
        self.tree.heading("is_default", text="默认")
        
        self.tree.column("name", width=80)
        self.tree.column("label", width=120)
        self.tree.column("remote_path", width=280)
        self.tree.column("is_default", width=60)
        
        scrollbar = ttk.Scrollbar(list_frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        self.tree.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # 按钮框架
        btn_frame = tk.Frame(main_frame)
        btn_frame.pack(fill="x", pady=10)
        
        tk.Button(btn_frame, text="添加", width=10, command=self.add_plat).pack(side="left", padx=5)
        tk.Button(btn_frame, text="编辑", width=10, command=self.edit_plat).pack(side="left", padx=5)
        tk.Button(btn_frame, text="删除", width=10, command=self.delete_plat).pack(side="left", padx=5)
        tk.Button(btn_frame, text="设为默认", width=10, command=self.set_default).pack(side="left", padx=5)
        tk.Button(btn_frame, text="保存并关闭", width=12, command=self.save_and_close).pack(side="right", padx=5)
        
        # 加载数据
        self.refresh_list()
    
    def refresh_list(self):
        """刷新列表"""
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        for plat in self.config.get("plats", []):
            self.tree.insert("", "end", values=(
                plat.get("name", ""),
                plat.get("label", ""),
                plat.get("remote_path", ""),
                "是" if plat.get("is_default", False) else "否"
            ))
    
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
        tk.Label(frame, text="名称 (如 wx_ma):").grid(row=0, column=0, sticky="e", pady=5)
        self.name_var = tk.StringVar(value=plat_data.get("name", "") if plat_data else "")
        tk.Entry(frame, textvariable=self.name_var, width=35).grid(row=0, column=1, sticky="w", pady=5)
        
        # 显示标签
        tk.Label(frame, text="显示标签:").grid(row=1, column=0, sticky="e", pady=5)
        self.label_var = tk.StringVar(value=plat_data.get("label", "") if plat_data else "")
        tk.Entry(frame, textvariable=self.label_var, width=35).grid(row=1, column=1, sticky="w", pady=5)
        
        # 远程路径
        tk.Label(frame, text="远程路径:").grid(row=2, column=0, sticky="e", pady=5)
        self.path_var = tk.StringVar(value=plat_data.get("remote_path", "") if plat_data else "")
        tk.Entry(frame, textvariable=self.path_var, width=35).grid(row=2, column=1, sticky="w", pady=5)
        
        # 按钮
        btn_frame = tk.Frame(self.dialog)
        btn_frame.pack(fill="x", pady=10)
        
        tk.Button(btn_frame, text="确定", width=10, command=self.on_ok).pack(side="right", padx=20)
        tk.Button(btn_frame, text="取消", width=10, command=self.dialog.destroy).pack(side="right", padx=5)
        
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
            "is_default": self.is_default
        }
        self.dialog.destroy()


class WxUploaderGUI:
    def __init__(self, root):
        self.root = root
        root.title("微信小程序上传工具")
        root.geometry("650x220")
        
        # 加载配置
        self.config = load_config()
        
        # 选中的 key 文件路径
        self.key_path_var = tk.StringVar()
        # 选中的 plat
        self.plat_var = tk.StringVar()
        # 编译模式
        self.build_mode_var = tk.StringVar(value="production")
        
        # 设置默认 plat
        self._set_default_plat()
        
        # ===== 菜单栏 =====
        menubar = tk.Menu(root)
        root.config(menu=menubar)
        
        config_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="配置", menu=config_menu)
        config_menu.add_command(label="管理 Plat 配置...", command=self.open_plat_config)
        
        # ===== 行 1：选择 key 文件 =====
        frame_key = tk.Frame(root)
        frame_key.pack(fill="x", padx=10, pady=10)
        
        tk.Label(frame_key, text="private.wx*.key 文件：").pack(side="left")
        tk.Entry(frame_key, textvariable=self.key_path_var, width=50).pack(side="left", padx=5)
        tk.Button(frame_key, text="选择文件", command=self.choose_key_file).pack(side="left")
        
        # ===== 行 2：选择 plat =====
        self.frame_plat = tk.Frame(root)
        self.frame_plat.pack(fill="x", padx=10, pady=5)
        
        self._build_plat_options()
        
        # ===== 行 3：选择编译模式 =====
        frame_build_mode = tk.Frame(root)
        frame_build_mode.pack(fill="x", padx=10, pady=5)
        
        tk.Label(frame_build_mode, text="编译模式：").pack(side="left")
        tk.Radiobutton(frame_build_mode, text="生产环境", value="production", 
                       variable=self.build_mode_var).pack(side="left", padx=5)
        tk.Radiobutton(frame_build_mode, text="测试环境", value="development", 
                       variable=self.build_mode_var).pack(side="left", padx=5)
        
        # ===== 行 4：一键编译发布按钮 =====
        frame_one_click = tk.Frame(root)
        frame_one_click.pack(fill="x", padx=10, pady=15)
        
        tk.Button(frame_one_click, text="一键编译并发布微信小程序", width=30, height=2,
                  bg="#4CAF50", fg="white", font=("Arial", 12, "bold"),
                  command=self.build_and_publish).pack(pady=5)
    
    def _set_default_plat(self):
        """设置默认选中的 plat"""
        for plat in self.config.get("plats", []):
            if plat.get("is_default", False):
                self.plat_var.set(plat["name"])
                return
        # 如果没有默认，选第一个
        plats = self.config.get("plats", [])
        if plats:
            self.plat_var.set(plats[0]["name"])
    
    def _build_plat_options(self):
        """构建 plat 选项"""
        # 清空现有的组件
        for widget in self.frame_plat.winfo_children():
            widget.destroy()
        
        tk.Label(self.frame_plat, text="上传目标：").pack(side="left")
        
        for plat in self.config.get("plats", []):
            tk.Radiobutton(
                self.frame_plat, 
                text=plat.get("label", plat["name"]), 
                value=plat["name"], 
                variable=self.plat_var
            ).pack(side="left", padx=5)
    
    def open_plat_config(self):
        """打开 plat 配置管理对话框"""
        PlatConfigDialog(self.root, self.config.copy(), self._on_config_saved)
    
    def _on_config_saved(self, new_config):
        """配置保存后的回调"""
        self.config = new_config
        self._set_default_plat()
        self._build_plat_options()
    
    def choose_key_file(self):
        path = filedialog.askopenfilename(
            title="选择 private.wx*.key 文件",
            initialdir=CURRENT_DIR,
            filetypes=[("Key files", "*.key"), ("All files", "*.*")]
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
        return "/home/aarif/jmcw/wx_ma"
    
    def ensure_key_and_plat(self):
        key_path = self.key_path_var.get().strip()
        if not key_path:
            messagebox.showerror("错误", "请先选择 private.wx*.key 文件")
            return None, None
        if not os.path.isfile(key_path):
            messagebox.showerror("错误", f"key 文件不存在：\n{key_path}")
            return None, None
        
        plat_name = self.plat_var.get()
        if not plat_name:
            messagebox.showerror("错误", "请选择上传目标 plat")
            return None, None
        
        return key_path, plat_name
    
    def build_and_publish(self):
        """一键编译并发布：编译代码 -> 上传代码到服务器 -> 上传key并发布到微信"""
        key_path, plat_name = self.ensure_key_and_plat()
        if not key_path:
            return
        
        build_mode = self.build_mode_var.get()
        mode_text = "生产环境" if build_mode == "production" else "测试环境"
        remote_path = self.get_remote_dir(plat_name)
        remote_host = self.config.get("remote_host", "jmcw")
        appid = parse_appid_from_key(key_path)
        
        # 读取环境配置
        env_vars = read_env_file(build_mode)
        base_url = env_vars.get('VITE_APP_BASEURL', '未配置')
        
        # 确认操作
        if not messagebox.askyesno("确认", 
            f"即将执行以下操作：\n\n"
            f"1. 编译微信小程序（{mode_text}）\n"
            f"   API地址: {base_url}\n\n"
            f"2. 上传代码到服务器并执行 run-mp.sh\n"
            f"   主机: {remote_host}\n"
            f"   路径: {remote_path}\n\n"
            f"3. 上传 key 文件并发布到微信\n"
            f"   AppID: {appid}\n"
            f"   路径: {remote_path}/{appid}\n\n"
            f"是否继续？"):
            return
        
        try:
            # 步骤 1：编译
            self.root.title("微信小程序上传工具 - 正在编译...")
            self.root.update()
            
            if not build_mp_weixin(build_mode):
                messagebox.showerror("错误", "编译失败，请检查终端输出")
                self.root.title("微信小程序上传工具")
                return
            
            # 步骤 2：上传代码到服务器并执行 run-mp.sh
            self.root.title("微信小程序上传工具 - 正在上传代码...")
            self.root.update()
            
            if not upload_code_to_server(remote_host, remote_path):
                messagebox.showerror("错误", "上传代码失败，请检查终端输出")
                self.root.title("微信小程序上传工具")
                return
            
            # 步骤 3：上传 key 文件并发布到微信
            self.root.title("微信小程序上传工具 - 正在发布到微信...")
            self.root.update()
            
            if not upload_key_and_publish(key_path, remote_host, remote_path):
                messagebox.showerror("错误", "发布到微信失败，请检查终端输出")
                self.root.title("微信小程序上传工具")
                return
            
            # 清空本地 wx_upload 目录
            clean_wx_upload_dir()
            
            self.root.title("微信小程序上传工具")
            messagebox.showinfo("完成", 
                f"一键发布完成！\n\n"
                f"编译模式: {mode_text}\n"
                f"API地址:  {base_url}\n"
                f"目标平台: {plat_name}\n"
                f"远程路径: {remote_path}\n"
                f"AppID:    {appid}")
            
        except Exception as e:
            self.root.title("微信小程序上传工具")
            messagebox.showerror("错误", f"发布失败：\n{e}")


if __name__ == "__main__":
    root = tk.Tk()
    app = WxUploaderGUI(root)
    root.mainloop()
