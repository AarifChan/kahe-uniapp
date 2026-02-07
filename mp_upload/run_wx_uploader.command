#!/bin/bash

# 让脚本在出错时直接退出
set -e

# 切到当前脚本所在目录（也就是项目目录）
cd "$(cd "$(dirname "$0")" && pwd)"

# 如果你有使用 pipenv，可以优先用 pipenv 运行
if command -v pipenv >/dev/null 2>&1; then
  echo "使用 pipenv 运行 wx_uploader_gui.py ..."
  pipenv run python wx_uploader_gui.py
else
  echo "未检测到 pipenv，直接用系统 python 运行 wx_uploader_gui.py ..."
  python3 wx_uploader_gui.py
fi

