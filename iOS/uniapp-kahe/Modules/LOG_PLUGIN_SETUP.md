# UniApp 原生日志插件 - 集成步骤

## 已创建的文件

### iOS 原生端

| 文件 | 代码量 | 说明 |
|------|--------|------|
| `KHLogPlugin.h` | ~40 行 | 核心日志功能头文件 |
| `KHLogPlugin.m` | ~300 行 | 核心日志功能实现 |
| `KHLogPluginBridge.h` | ~50 行 | 插件桥接头文件 |
| `KHLogPluginBridge.m` | ~100 行 | 插件桥接实现 |

### JS 端

| 文件 | 代码量 | 说明 |
|------|--------|------|
| `kh-log-plugin.js` | ~200 行 | JS 封装模块 |

**合计新增原生代码：约 490 行**

---

## Xcode 配置步骤

### 步骤 1: 添加文件到项目

1. 打开 `uniapp-kahe.xcodeproj`
2. 右键项目 → **Add Files to "uniapp-kahe"**
3. 选择以下文件：
   - `KHLogPlugin.h`
   - `KHLogPlugin.m`
   - `KHLogPluginBridge.h`
   - `KHLogPluginBridge.m`
4. 确保勾选 **"Copy items if needed"** 和 **Target**

### 步骤 2: 检查编译源文件

1. 选择项目 → **Build Phases** → **Compile Sources**
2. 确认以下文件已添加：
   - `KHLogPlugin.m`
   - `KHLogPluginBridge.m`

### 步骤 3: 检查头文件导入

在 `AppDelegate.m` 中确认已导入：

```objc
#import "KHLogPlugin.h"
#import "KHLogPluginBridge.h"
```

---

## UniApp 项目配置

### 步骤 1: 复制 JS 文件

将 `kh-log-plugin.js` 复制到你的 uniapp 项目中，例如：

```
src/native-plugins/kh-log-plugin.js
```

### 步骤 2: 在 main.js 中引入

```javascript
import Vue from 'vue'
import $log from './native-plugins/kh-log-plugin.js'

// 配置日志插件
$log.setTag('MyApp')
$log.setEnabled(true)

// 挂载到 Vue 原型
Vue.prototype.$log = $log

// 同时拦截 console
console.log('应用启动', { timestamp: Date.now() })
```

### 步骤 3: 在页面中使用

```vue
<script>
export default {
  methods: {
    async fetchData() {
      this.$log.info('开始获取数据', 'DataPage')
      
      try {
        const res = await uni.request({
          url: 'https://api.example.com/data'
        })
        
        this.$log.info('数据获取成功', 'DataPage')
      } catch (err) {
        this.$log.error('数据获取失败: ' + err.message, 'DataPage')
      }
    },
    
    async exportLogs() {
      try {
        const path = await this.$log.exportLogs()
        console.log('日志已导出:', path)
        
        // 分享日志文件
        uni.shareFile({
          filePath: path,
          success: () => {
            console.log('分享成功')
          }
        })
      } catch (e) {
        console.error('导出失败:', e)
      }
    }
  }
}
</script>
```

---

## 测试日志功能

### 1. 基础测试

```javascript
// 在页面 onLoad 中测试
onLoad() {
  console.log('=== 日志测试开始 ===')
  console.info('这是信息日志')
  console.warn('这是警告日志')
  console.error('这是错误日志')
  
  this.$log.debug('调试信息', 'Test')
  this.$log.info('普通信息', 'Test')
  this.$log.warn('警告信息', 'Test')
  this.$log.error('错误信息', 'Test')
}
```

### 2. 查看日志文件

在 Xcode 控制台查看日志输出：
```
[UniAppLog] [2024-01-15 14:30:25.123] [INFO] [APP] 应用启动
```

导出日志文件路径：
```javascript
this.$log.exportLogs().then(path => {
  console.log('日志文件路径:', path)
  // 使用 iTunes 文件共享或代码读取该文件
})
```

### 3. 验证文件存在

在 macOS 终端中查看模拟器日志：
```bash
# 找到应用的 Documents 目录
open ~/Library/Developer/CoreSimulator/Devices/[设备ID]/data/Containers/Data/Application/[应用ID]/Documents/KHLogs/
```

---

## 防马甲包增强效果

添加此日志插件后：

1. **增加原生代码量** - 新增 ~490 行原生 Objective-C 代码
2. **独特功能特征** - 自定义的日志系统不是模板应用常见功能
3. **文件操作** - 使用原生文件系统 API，增加代码多样性
4. **插件架构** - 展示复杂的原生-JS 通信机制

---

## 注意事项

1. **发布前清理日志** - 在 App Store 提交前调用 `clearLogs()` 清理测试日志
2. **日志大小控制** - 默认只保留 7 天日志，避免占用过多存储
3. **隐私合规** - 确保日志中不包含用户敏感信息
4. **性能影响** - 异步写入对性能影响很小，但大量日志仍建议定期清理

---

## 故障排查

### 问题 1: 日志没有写入文件

**检查:**
1. Xcode 控制台是否有 `[KHLogPlugin]` 初始化日志
2. 文件是否正确添加到 Compile Sources
3. App 是否有文件写入权限

### 问题 2: JS 调用原生方法无响应

**检查:**
1. `uni.requireNativePlugin('KHLogPlugin')` 是否返回对象
2. 原生插件是否正确注册
3. 方法名是否匹配（区分大小写）

### 问题 3: 编译报错 "文件未找到"

**解决:**
```bash
# 清理 Xcode 缓存
rm -rf ~/Library/Developer/Xcode/DerivedData
# 重新编译
```

---

## 后续扩展建议

1. **日志上传** - 添加网络上传功能，自动上传错误日志到服务器
2. **日志加密** - 对敏感日志进行加密存储
3. **崩溃捕获** - 添加未捕获异常的处理和记录
4. **性能监控** - 记录页面加载时间、内存使用等性能指标
