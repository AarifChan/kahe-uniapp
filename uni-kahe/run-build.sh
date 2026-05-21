#!/bin/bash


yarn build:mp-weixin

if [ $? -eq 0 ]; then
    echo "build:mp-weixin 完成，执行后续操作"
    # 需配置 QINIU_ACCESS_KEY / QINIU_SECRET_KEY（或使用 mp_upload GUI 发布）
    ENVIRONMENT=prod PLATFORM=mp-weixin node scripts/ci/upload-mp-build-static.js
    echo "上传至 CDN（含 gif/字体）"
    ENVIRONMENT=prod PLATFORM=mp-weixin node scripts/ci/replace-cdn-urls.js
    echo "替换完成"
    node upload_mp.js
    echo "上传体验版成功"
else
    echo "build:mp-weixin 失败，未执行后续操作"
fi