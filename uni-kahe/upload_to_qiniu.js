const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')

// 七牛云配置
const accessKey = '5UjmGRCWvjvVLFwrjXOA35GJ2CnqXv-HJHPGxzHL'
const secretKey = '_Fr6qdmLWIn9tknGE_DQoep9h_oECiXaKaH-E50X'
const bucket = 'jm-blindbox'
const cdnDomain = 'https://jms.85gui7.com'

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const config = new qiniu.conf.Config()
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()
const folderName = 'tycw-mp'

// 刷新 CDN 缓存

// 上传文件到七牛云
function uploadFile(localFile, key) {
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (
            respErr,
            respBody,
            respInfo
        ) {
            if (respErr) {
                reject(respErr)
            }
            if (respInfo.statusCode === 200) {
                resolve(respBody)
            } else {
                reject(respBody)
            }
        })
    })
}

// 获取七牛云上传凭证
const options = {
    scope: bucket
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

// 遍历 static 文件夹下的所有图片文件
function traverseDirectory(dir, prefix = '') {
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.error('Error reading directory:', err)
            return
        }

        files.forEach(function (file) {
            const filePath = path.join(dir, file)
            fs.stat(filePath, function (err, stats) {
                if (err) {
                    console.error('Error stating file:', err)
                    return
                }

                if (stats.isFile()) {
                    // 如果是文件，则上传到七牛云指定目录
                    const extname = path.extname(file).toLowerCase()

                    if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.gif') {
                        const key = prefix ? `${prefix}/${file}` : file
                        uploadFile(filePath, key)
                            .then((respBody) => {
                                console.log('Upload successful:', respBody.key)
                            })
                            .catch((error) => {
                                console.error('Upload failed:', error)
                            })
                    }
                } else if (stats.isDirectory()) {
                    // 如果是目录，则递归遍历
                    const subPrefix = prefix ? `${prefix}/${file}` : file
                    traverseDirectory(filePath, subPrefix)
                }
            })
        })
    })
}

// 开始遍历 static 文件夹下的所有图片文件
traverseDirectory('./src/static', folderName)
