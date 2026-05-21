# Pipenv 环境设置说明

## 1. 安装 pipenv

如果你的系统还没有安装 pipenv，可以通过以下方式安装：

### 方式一：使用 pip 安装（推荐）
```bash
pip3 install --user pipenv
```

或者使用全局安装（需要管理员权限）：
```bash
sudo pip3 install pipenv
```

### 方式二：使用 Homebrew（macOS）
```bash
brew install pipenv
```

## 2. 创建虚拟环境并安装依赖

在项目根目录（`/Users/fuqiang/Desktop/home_upload`）执行：

```bash
pipenv install
```

这会：
- 创建 Python 3.12 虚拟环境
- 安装 Pipfile 中定义的依赖（当前项目使用标准库，无需额外依赖）

## 3. 激活虚拟环境

```bash
pipenv shell
```

激活后，你可以直接运行：
```bash
python wx_uploader_gui.py
```

## 4. 或者直接使用 pipenv 运行

不激活环境，直接运行：
```bash
pipenv run python wx_uploader_gui.py
```

## 七牛 CDN 配置（小程序 static 上传）

复制 `qiniu_config.example.json` 为 `qiniu_config.json` 并填写密钥。

| 控制台信息 | 配置项 |
|-----------|--------|
| 公开空间 | 无需额外字段，按 bucket 正常上传即可 |
| 华南 | `"zone": "z2"`（必填，勿用 z0 华东） |

当前 `91tcg` 空间在华南，必须与 `zone: z2` 对应，否则会报 `incorrect region, please use up-z2.qiniup.com`。

上传路径以 `qiniu_config.json` 的 `folder`（如 `jikaquan`）为准，**不会**被 `.env` 里的 `VITE_APP_CDN_FOLDER`（如 `kahe-mp`）覆盖。

上传范围：**构建产物** `dist/build/mp-weixin/static` 下的全部文件；若 gif/字体在构建产物中缺失，会从 `src/static` 自动补充后再上传。PNG 使用 **pngquant** 压缩，gif/ttf/woff 等原样上传。

上传前 PNG 压缩（需先安装）：

```bash
brew install pngquant
```

可选环境变量：`PNGQUANT_QUALITY=65-80`（默认）、`COMPRESS_PNG=false`（跳过压缩）、`COMPRESS_PNG_STRICT=false`（未安装 pngquant 时仅警告）。

GUI 主界面提供 **「PNG 严格模式」** 复选框，勾选状态会保存到 `plat_config.json` 的 `compress_png_strict` 字段（默认 `true`）。

小程序 static 上传会**保留原文件名**（便于动态路径拼接）；`replace-cdn-urls.js` 会处理：

- 固定路径：`"/static/kahe-202510/xxx.png"`
- 模板字符串：`` `/static/.../tag-level${tag}.png` ``
- 字符串拼接：`'/static/.../card' + index + '.png'`
- CSS：`url("/static/...")`、`background-image: url('...')`
- 字体：`url(static/font/xxx.ttf)`

发布前可自查：`node scripts/ci/audit-dynamic-static-paths.js`（扫描源码中所有动态 static 引用）。

## 注意事项

- `tkinter` 是 Python 标准库的一部分，通常不需要额外安装
- 如果遇到 `tkinter` 相关错误，在 macOS 上可能需要安装 Python 的 tkinter 支持（通常系统 Python 已包含）
- 确保 `auto_wx_upload.sh` 有执行权限：`chmod +x auto_wx_upload.sh`
