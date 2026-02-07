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

## 注意事项

- `tkinter` 是 Python 标准库的一部分，通常不需要额外安装
- 如果遇到 `tkinter` 相关错误，在 macOS 上可能需要安装 Python 的 tkinter 支持（通常系统 Python 已包含）
- 确保 `auto_wx_upload.sh` 有执行权限：`chmod +x auto_wx_upload.sh`
