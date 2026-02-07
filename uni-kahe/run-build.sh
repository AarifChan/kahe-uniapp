#!/bin/bash


yarn build:mp-weixin

if [ $? -eq 0 ]; then
    echo "build:mp-weixin 完成，执行后续操作"
    # 在这里执行你的后续操作
    node upload_to_qiniu.js
    echo "上传至CDN"
    node replace_static_to_cdn.js
    echo "替换完成"
    node upload_mp.js
    echo "上传体验版成功"
else
    echo "build:mp-weixin 失败，未执行后续操作"
fi