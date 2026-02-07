
const ci = require('miniprogram-ci');
(async () => {
    const project = new ci.Project({
        appid: 'wx4241eb1f97c076f7',
        type: 'miniProgram',
        projectPath: './dist/build/mp-weixin',
        privateKeyPath: './private.wx4241eb1f97c076f7.key',
        ignores: ['node_modules/**/*']
    })

    const uploadResult = await ci.upload({
        project,
        version: '1.0.0',
        desc: '修复已知问题',
        setting: {
            es6: true,
            es7: true,
            disableUseStrict: true,
            autoPrefixWXSS: true,
            minifyJS: true,
            minifyWXSS: true,
            minifyWXML: true
        }
    })
    console.log(uploadResult)
})()
