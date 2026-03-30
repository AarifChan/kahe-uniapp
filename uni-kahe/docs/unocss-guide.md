# UnoCSS 使用指南

## 简介

项目已集成 [UnoCSS](https://unocss.dev/)，一个即时原子 CSS 引擎。UnoCSS 与 Tailwind CSS 类似，但更加轻量、灵活，且没有全局样式重置（preflight），与 TuNiao UI 完全兼容。

## 快速开始

### 1. 基础使用

直接在模板中使用工具类：

```vue
<template>
  <!-- 布局 -->
  <view class="flex items-center justify-between">
    <text class="text-primary text-32">标题</text>
    <view class="w-120 h-48 bg-primary rounded-24 flex-center">
      <text class="text-white">按钮</text>
    </view>
  </view>

  <!-- 间距 -->
  <view class="p-24 mt-16 bg-white rounded-16">
    <text class="text-text-primary">内容区域</text>
  </view>

  <!-- 网格 -->
  <view class="grid grid-cols-2 gap-16">
    <view class="h-160 bg-page-bg rounded-16"></view>
    <view class="h-160 bg-page-bg rounded-16"></view>
  </view>
</template>
```

### 2. 与传统 SCSS 混用

UnoCSS 和传统 SCSS 可以共存：

```vue
<template>
  <view class="custom-box flex-center">
    <text class="text-white">混用示例</text>
  </view>
</template>

<style scoped lang="scss">
// 传统 SCSS 样式
.custom-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  padding: 32rpx;
}
</style>
```

## 配置说明

### 单位转换

本项目所有数值自动转换为 `rpx`：

| 类名 | 输出 |
|------|------|
| `w-750` | `width: 750rpx` |
| `p-24` | `padding: 24rpx` |
| `text-32` | `font-size: 32rpx` |
| `rounded-16` | `border-radius: 16rpx` |

### 颜色系统

```vue
<!-- 主色调 -->
<view class="bg-primary"></view>      <!-- #0F2268 -->
<view class="bg-primary-light"></view> <!-- #1a3a8a -->

<!-- 背景色 -->
<view class="bg-main-bg"></view>       <!-- #FDEFCC -->
<view class="bg-page-bg"></view>       <!-- #f5f5f5 -->

<!-- 文字色 -->
<text class="text-text-primary"></text>    <!-- #333 -->
<text class="text-text-secondary"></text>  <!-- #666 -->
<text class="text-text-tertiary"></text>   <!-- #999 -->

<!-- 功能色 -->
<view class="bg-success"></view>       <!-- 成功 -->
<view class="bg-warning"></view>       <!-- 警告 -->
<view class="bg-error"></view>         <!-- 错误 -->
```

### 快捷方式

预设的常用组合：

```vue
<!-- flex-center = flex items-center justify-center -->
<view class="flex-center"></view>

<!-- flex-between = flex items-center justify-between -->
<view class="flex-between"></view>

<!-- card = p-24 rounded-16 bg-white -->
<view class="card"></view>

<!-- btn-primary = flex-center h-88 rounded-44 bg-primary text-white -->
<view class="btn-primary"></view>

<!-- text-ellipsis = 单行省略 -->
<text class="text-ellipsis">长文字...</text>

<!-- text-ellipsis-2 = 两行省略 -->
<text class="text-ellipsis-2">长文字...</text>
```

## 常用类名参考

### 布局

```
flex              display: flex
flex-col          flex-direction: column
items-center      align-items: center
items-start       align-items: flex-start
items-end         align-items: flex-end
justify-center    justify-content: center
justify-between   justify-content: space-between
justify-around    justify-content: space-around
justify-end       justify-content: flex-end
```

### 尺寸

```
w-{n}             width: {n}rpx
h-{n}             height: {n}rpx
min-w-{n}         min-width: {n}rpx
min-h-{n}         min-height: {n}rpx
max-w-{n}         max-width: {n}rpx
max-h-{n}         max-height: {n}rpx
```

### 间距

```
p-{n}             padding: {n}rpx
px-{n}            padding-left/right: {n}rpx
py-{n}            padding-top/bottom: {n}rpx
pt-{n}            padding-top: {n}rpx
pb-{n}            padding-bottom: {n}rpx
pl-{n}            padding-left: {n}rpx
pr-{n}            padding-right: {n}rpx

m-{n}             margin: {n}rpx
mx-{n}            margin-left/right: {n}rpx
my-{n}            margin-top/bottom: {n}rpx
mt-{n}            margin-top: {n}rpx
mb-{n}            margin-bottom: {n}rpx
ml-{n}            margin-left: {n}rpx
mr-{n}            margin-right: {n}rpx
```

### 文字

```
text-{n}          font-size: {n}rpx
text-primary      color: #0F2268
text-white        color: #fff
text-black        color: #000
font-bold         font-weight: bold
leading-{n}       line-height: {n}rpx
text-center       text-align: center
text-left         text-align: left
text-right        text-align: right
```

### 边框

```
rounded-{n}       border-radius: {n}rpx
rounded-full      border-radius: 50%
border            border: 1rpx solid #e5e5e5
border-primary    border-color: #0F2268
```

### 背景

```
bg-primary        background-color: #0F2268
bg-white          background-color: #fff
bg-transparent    background-color: transparent
bg-cover          background-size: cover
bg-center         background-position: center
```

### 定位

```
relative          position: relative
absolute          position: absolute
fixed             position: fixed
sticky            position: sticky
top-{n}           top: {n}rpx
bottom-{n}        bottom: {n}rpx
left-{n}          left: {n}rpx
right-{n}         right: {n}rpx
z-{n}             z-index: {n}
```

### Grid 布局

```
grid              display: grid
grid-cols-{n}     grid-template-columns: repeat({n}, minmax(0, 1fr))
grid-cols-2       grid-template-columns: repeat(2, minmax(0, 1fr))
grid-cols-3       grid-template-columns: repeat(3, minmax(0, 1fr))
grid-cols-4       grid-template-columns: repeat(4, minmax(0, 1fr))
gap-{n}           gap: {n}rpx
gap-x-{n}         column-gap: {n}rpx
gap-y-{n}         row-gap: {n}rpx
```

## 与 TuNiao UI 混用

```vue
<template>
  <!-- TuNiao 组件 + UnoCSS 样式 -->
  <tn-popup v-model="show" open-direction="bottom">
    <view class="p-24 bg-white">
      <text class="text-32 font-bold text-primary">标题</text>
      <view class="mt-16 flex gap-16">
        <tn-button class="flex-1" shape="round">取消</tn-button>
        <tn-button class="flex-1" type="primary" shape="round">确定</tn-button>
      </view>
    </view>
  </tn-popup>
</template>
```

## 注意事项

1. **单位自动转换**：所有数值类名（如 `w-750`、`p-24`）自动转换为 `rpx`，无需手动添加单位

2. **无全局重置**：UnoCSS 默认没有 preflight，不会覆盖 TuNiao UI 的样式

3. **类名冲突**：项目配置已排除 `tn-*` 类名，避免与 TuNiao UI 冲突

4. **热更新**：修改 `uno.config.ts` 后需要重启开发服务器

5. **IDE 支持**：建议安装 UnoCSS VS Code 插件获得自动补全支持

## 配置文件

配置文件位于项目根目录 `uno.config.ts`，可根据需要扩展：

```typescript
// 添加自定义规则
rules: [
  [/^custom-(\d+)$/, ([_, num]) => ({ 'custom-property': `${num}rpx` })],
],

// 添加快捷方式
shortcuts: {
  'my-style': 'p-24 bg-primary text-white rounded-16',
},

// 扩展主题
theme: {
  colors: {
    'my-color': '#ff0000',
  },
},
```

## 示例页面

参考 `/src/pages/demo/unocss/index.vue` 了解完整用法。

## 相关链接

- [UnoCSS 官方文档](https://unocss.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)（类名参考）
