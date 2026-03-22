# uni-kahe → kahe-unibest 迁移实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 uni-kahe（Vuex + TuNiao UI）的全部业务页面与组件迁移到 kahe-unibest（Pinia + uv-ui + UnoCSS）框架。

**Architecture:** kahe-unibest 保持其现有框架结构（pages.config.ts / Pinia / UnoCSS / alova http）；迁移内容通过以下方式融入：TuNiao UI 以 easycom 方式共存，Vuex 单例调用替换为 Pinia store 调用，页面逻辑原样搬运（最小改动原则）。

**Tech Stack:** Vue 3, UniApp, Pinia, pinia-plugin-persistedstate, TuNiao UI (tn-*), uv-ui, UnoCSS, alova http, TypeScript, pnpm

**源项目路径:** `/Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/`
**目标项目路径:** `/Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/`

---

## 关键映射规则（每个 Task 都适用）

### Vuex → Pinia 替换速查

| uni-kahe 原写法 | kahe-unibest 新写法 |
|----------------|-------------------|
| `import { UserModule } from '@/store/modules/user'` | `import { useUserStore } from '@/store/user'`<br>`const userStore = useUserStore()` |
| `import { AppModule } from '@/store/modules/app'` | `import { useAppStore } from '@/store/app'`<br>`const appStore = useAppStore()` |
| `import { PetModule } from '@/store/modules/pet'` | `import { usePetStore } from '@/store/pet'`<br>`const petStore = usePetStore()` |
| `import { AddressModule } from '@/store/modules/address'` | `import { useAddressStore } from '@/store/address'`<br>`const addressStore = useAddressStore()` |
| `UserModule.token` | `useTokenStore().validToken` |
| `UserModule.loginStatus` | `userStore.loginStatus` |
| `UserModule.userInfo` | `userStore.userInfo` |
| `UserModule.vipDayList` | `userStore.vipDayList` |
| `UserModule.couponList` | `userStore.couponList` |
| `UserModule.favoriteList` | `userStore.favoriteList` |
| `UserModule.rechargeList` | `userStore.rechargeList` |
| `UserModule.vipLevelsModel` | `userStore.vipLevelsModel` |
| `UserModule.receivedVipShow` | `userStore.receivedVipShow` |
| `await UserModule.preLogin()` | `await userStore.preLogin()` |
| `await UserModule.getUserInfo()` | `await userStore.fetchUserInfo()` |
| `await UserModule.logout()` | `await tokenStore.logout()` |
| `await UserModule.handleWxPay(orderId)` | `await userStore.handleWxPay(orderId)` |
| `await UserModule.rechargePlanAction(id)` | `await userStore.rechargePlanAction(id)` |
| `AppModule.statusBarHeight` | `appStore.statusBarHeight` |
| `AppModule.navBarHeight` | `appStore.navBarHeight` |
| `AppModule.currentTabIndex` | `appStore.currentTabIndex` |
| `AppModule.loginModalStatus` | `appStore.loginModalStatus` |
| `AppModule.payType` | `appStore.payType` |
| `AppModule.getSystemInfo()` | `appStore.getSystemInfo()` |
| `AppModule.showLoginModal()` | `appStore.showLoginModal()` |
| `AppModule.changeCurrentTabIndex(i)` | `appStore.changeCurrentTabIndex(i)` |

---

## Task 0: 创建 feature 分支

**Files:**
- 无代码改动

- [ ] **Step 1: 创建迁移分支**

```bash
cd /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest
git checkout -b feat/migrate-from-uni-kahe
```

- [ ] **Step 2: 确认分支创建成功**

```bash
git branch
```
Expected: `* feat/migrate-from-uni-kahe`

---

## Task 1: 安装 TuNiao UI 依赖

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`（自动）

- [ ] **Step 1: 安装 TuNiao UI 相关包（锁定与 uni-kahe 相同版本）**

```bash
cd /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest
pnpm add @tuniao/tnui-vue3-uniapp@1.0.22 @tuniao/tn-icon @tuniao/tn-style
```

- [ ] **Step 2: 确认安装成功**

```bash
ls node_modules/@tuniao/
```
Expected: 看到 `tnui-vue3-uniapp`、`tn-icon`、`tn-style` 三个目录

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: install TuNiao UI dependencies for migration"
```

---

## Task 2: 配置 TuNiao UI easycom + UnoCSS blocklist

**Files:**
- Modify: `pages.config.ts`
- Modify: `src/App.vue`
- Modify: `uno.config.ts`

- [ ] **Step 1: 在 pages.config.ts 的 easycom.custom 中追加 TuNiao 规则**

在 `pages.config.ts` 的 `easycom.custom` 对象中，在现有规则后面追加：
```ts
"^tn-(.*)-?(item|group)$": "@tuniao/tnui-vue3-uniapp/components/tn-$1-$2/index.vue",
"^tn-(.*)": "@tuniao/tnui-vue3-uniapp/components/tn-$1/index.vue"
```

最终 easycom.custom 应如下所示：
```ts
easycom: {
  autoscan: true,
  custom: {
    '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
    '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
      'z-paging/components/z-paging$1/z-paging$1.vue',
    '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
    "^tn-(.*)-?(item|group)$": "@tuniao/tnui-vue3-uniapp/components/tn-$1-$2/index.vue",
    "^tn-(.*)": "@tuniao/tnui-vue3-uniapp/components/tn-$1/index.vue"
  },
},
```

- [ ] **Step 2: 在 App.vue 的 `<style>` 块末尾追加 TuNiao 全局样式**

打开 `src/App.vue`，在 `<style lang="scss">` 块内追加：
```scss
@import '@tuniao/tn-style/dist/uniapp/index.css';
```

- [ ] **Step 3: 在 uno.config.ts 添加 blocklist 防止 UnoCSS 污染 tn-* 类名**

在 `uno.config.ts` 的 `defineConfig({})` 顶层添加：
```ts
blocklist: [/^tn-/],
```

- [ ] **Step 4: 验证 TuNiao UI 配置正确**

```bash
pnpm dev:mp-weixin
```
Expected: 编译无报错，无 `tn-` 相关 module not found 错误。
可在任一测试页面临时加 `<tn-button>测试</tn-button>`，在微信开发者工具中确认能渲染出按钮后删除。

- [ ] **Step 5: Commit**

```bash
git add pages.config.ts src/App.vue uno.config.ts
git commit -m "feat: configure TuNiao UI easycom and UnoCSS blocklist"
```

---

## Task 3: 扩展 Pinia user store（补全 uni-kahe 所需字段与方法）

**Files:**
- Modify: `src/store/user.ts`（kahe-unibest 目标）
- Reference: `uni-kahe/src/store/modules/user.ts`（只读参考）
- Reference: `uni-kahe/src/model/`（类型参考）

> **注意：** kahe-unibest 现有 user.ts 非常简单（只有 userInfo + fetchUserInfo），需大量补充。

- [ ] **Step 1: 在 `src/store/user.ts` 中扩展类型定义**

在文件顶部追加（若 `@/api/types/` 已有则复用，否则临时在此定义后续再迁移）：
```ts
export interface UIDayVIPItem {
  type: number
  name: string
  num: number
  id: number
  image: string
}
export interface UICouponModel {
  title: string
  id: number
  type: number
  useMinPrice: string
  price: string
  time: string
  status: number
}
export interface FavoriteModel {
  id: number
  [key: string]: any
}
export interface RechargeModel {
  [key: string]: any
}
export interface VipsLevelModel {
  [key: string]: any
}
```

- [ ] **Step 2: 在 useUserStore 的 return 中补全 uni-kahe 所需的 state**

在 `useUserStore` Composition 函数体内添加缺失的 ref：
```ts
const loginStatus = ref(false)
const vipDayList = ref<UIDayVIPItem[]>([])
const couponList = ref<UICouponModel[]>([])
const favoriteList = ref<FavoriteModel[]>([])
const rechargeList = ref<RechargeModel[]>([])
const vipLevelsModel = ref<VipsLevelModel[]>([])
const receivedVipShow = ref(false)
const code = ref('')
```

- [ ] **Step 3: 补全 preLogin action（微信自动登录核心逻辑）**

参考 `uni-kahe/src/store/modules/user.ts` 的 `preLogin` 方法，在 user.ts 中实现：

```ts
const preLogin = async () => {
  const tokenStore = useTokenStore()
  if (tokenStore.hasLogin) {
    await fetchUserInfo()
    return
  }
  // #ifdef MP-WEIXIN
  uni.login({
    provider: 'weixin',
    success: async (result) => {
      await tokenStore.wxLogin(result.code)
      loginStatus.value = true
    },
    fail: () => {
      loginStatus.value = false
    },
  })
  // #endif
}
```

> 注意：kahe-unibest 的 `tokenStore.wxLogin()` 已经处理了 code 换 token + getUserInfo，因此 preLogin 复用它。

- [ ] **Step 4: 补全其他 actions（handleWxPay、rechargePlanAction、getFavorite 等）**

从 `uni-kahe/src/store/modules/user.ts` 搬运以下方法，将内部 `this.context.commit()` 改为直接赋值 `xxx.value = yyy`：

- `handleWxPay(orderId, pid?)` → 支付相关（搬运整体逻辑，`AppModule.payType` 改为 `useAppStore().payType`）
- `rechargePlanAction(rechargeId)` → 调用 handleWxPay
- `getRechargeList()` → 更新 `rechargeList.value`
- `getCouponList(params)` → 更新 `couponList.value`
- `getVipLevelList(params?)` → 更新 `vipLevelsModel.value`
- `getVipReceived()` → 更新 `vipDayList.value`、`receivedVipShow.value`
- `getFavorite()` → 从 localStorage 读取 favoriteList
- `addFavorite(item)` → 切换收藏状态
- `checkLogin()` → 未登录则跳转登录页

- [ ] **Step 5: 将新字段加入 return 导出**

```ts
return {
  userInfo,
  setUserInfo,
  setUserAvatar,
  clearUserInfo,
  fetchUserInfo,
  // 新增导出
  loginStatus,
  vipDayList,
  couponList,
  favoriteList,
  rechargeList,
  vipLevelsModel,
  receivedVipShow,
  preLogin,
  handleWxPay,
  rechargePlanAction,
  getRechargeList,
  getCouponList,
  getVipLevelList,
  getVipReceived,
  getFavorite,
  addFavorite,
  checkLogin,
}
```

- [ ] **Step 6: 确认 TypeScript 无报错**

```bash
pnpm type-check
```
Expected: 无 error 输出（warning 可忽略）

- [ ] **Step 7: Commit**

```bash
git add src/store/user.ts
git commit -m "feat: expand Pinia user store with uni-kahe required state and actions"
```

---

## Task 4: 新建 Pinia app store

**Files:**
- Create: `src/store/app.ts`
- Modify: `src/store/index.ts`（添加 export）
- Reference: `uni-kahe/src/store/modules/app.ts`

kahe-unibest 完全没有 app store，需从零创建。

- [ ] **Step 1: 创建 `src/store/app.ts`**

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const currentTabIndex = ref(0)
  const scrollToBottom = ref(false)
  const productTabIndex = ref(0)
  const boxTabIndex = ref(0)
  const loginModalStatus = ref(false)
  const userModalShow = ref(false)
  const statusBarHeight = ref(44)
  const navBarHeight = ref(44)
  const payType = ref<number>(Number(uni.getStorageSync('payType') || 0))
  const featureSmashRefundEnabled = ref<boolean>(
    uni.getStorageSync('featureSmashRefundEnabled') ?? true,
  )

  const getSystemInfo = () => {
    // #ifdef MP-WEIXIN
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const systemInfo = uni.getSystemInfoSync()
    const statusBar = systemInfo.statusBarHeight ?? 44
    const navH = (menuButtonInfo.top - statusBar) * 2 + menuButtonInfo.height
    statusBarHeight.value = statusBar
    navBarHeight.value = navH
    // #endif
  }

  const showLoginModal = () => { loginModalStatus.value = true }
  const closeLoginModal = () => { loginModalStatus.value = false }
  const showUserModal = () => {
    userModalShow.value = false
    setTimeout(() => { userModalShow.value = true }, 100)
  }
  const setPayType = (type: number) => {
    payType.value = type
    uni.setStorageSync('payType', type)
  }
  const changeCurrentTabIndex = (index: number) => { currentTabIndex.value = index }
  const changeProductTabIndex = (index: number) => { productTabIndex.value = index }
  const changeBoxTabIndex = (index: number) => { boxTabIndex.value = index }
  const setFeatureSmashRefundEnabled = (enabled: boolean) => {
    featureSmashRefundEnabled.value = enabled
    uni.setStorageSync('featureSmashRefundEnabled', enabled)
  }

  return {
    currentTabIndex,
    scrollToBottom,
    productTabIndex,
    boxTabIndex,
    loginModalStatus,
    userModalShow,
    statusBarHeight,
    navBarHeight,
    payType,
    featureSmashRefundEnabled,
    getSystemInfo,
    showLoginModal,
    closeLoginModal,
    showUserModal,
    setPayType,
    changeCurrentTabIndex,
    changeProductTabIndex,
    changeBoxTabIndex,
    setFeatureSmashRefundEnabled,
  }
}, { persist: true })
```

- [ ] **Step 2: 在 `src/store/index.ts` 中追加 export**

在文件末尾追加：
```ts
export * from './app'
```

- [ ] **Step 3: TypeScript 校验**

```bash
pnpm type-check
```
Expected: 无 error

- [ ] **Step 4: Commit**

```bash
git add src/store/app.ts src/store/index.ts
git commit -m "feat: add Pinia app store (migrated from Vuex AppModule)"
```

---

## Task 5: 新建 Pinia pet store 和 address store

**Files:**
- Create: `src/store/pet.ts`
- Create: `src/store/address.ts`
- Modify: `src/store/index.ts`
- Reference: `uni-kahe/src/store/modules/pet.ts`
- Reference: `uni-kahe/src/store/modules/address.ts`

- [ ] **Step 1: 读取 uni-kahe 的 pet.ts 和 address.ts**

```
读取 /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/store/modules/pet.ts
读取 /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/store/modules/address.ts
```

- [ ] **Step 2: 将 pet.ts 从 Vuex 模块改写为 Pinia Composition store**

创建 `src/store/pet.ts`，参照 uni-kahe pet store 的 state/action，将 `this.context.commit('XXX', val)` 改为 `xxx.value = val`，`@Action` 改为普通 `async function`，将所有字段加入 return。

- [ ] **Step 3: 将 address.ts 从 Vuex 模块改写为 Pinia Composition store**

创建 `src/store/address.ts`，同上方式改写。

- [ ] **Step 4: 在 store/index.ts 追加 export**

```ts
export * from './pet'
export * from './address'
```

- [ ] **Step 5: TypeScript 校验**

```bash
pnpm type-check
```

- [ ] **Step 6: Commit**

```bash
git add src/store/pet.ts src/store/address.ts src/store/index.ts
git commit -m "feat: add Pinia pet and address stores (migrated from Vuex)"
```

---

## Task 6: 迁移工具函数和类型定义

**Files:**
- Create: `src/utils/storage.ts`（复制自 uni-kahe）
- Create: `src/utils/Toast.ts`（复制自 uni-kahe）
- Create: `src/utils/tools/`（复制自 uni-kahe）
- Create: `src/utils/pay.ts`（复制自 uni-kahe）
- Create: `src/utils/event.ts`（复制自 uni-kahe）
- Create: `src/model/`（复制自 uni-kahe）
- Reference: `uni-kahe/src/utils/`
- Reference: `uni-kahe/src/model/`

- [ ] **Step 1: 列出 uni-kahe/src/utils 和 uni-kahe/src/model 的文件**

```bash
find /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/utils -type f | sort
find /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/model -type f | sort
```

- [ ] **Step 2: 将以下工具文件复制到 kahe-unibest**

```bash
# utils 工具
cp -r /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/utils/storage.ts \
      /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/utils/storage.ts

cp -r /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/utils/Toast.ts \
      /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/utils/Toast.ts

cp -r /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/utils/event.ts \
      /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/utils/event.ts

cp -r /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/utils/pay.ts \
      /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/utils/pay.ts

# tools 子目录
cp -r /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/utils/tools \
      /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/utils/tools

# model 类型定义
cp -r /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/model \
      /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/model
```

- [ ] **Step 3: 检查复制后的文件是否有依赖 Vuex 的 import，若有则删除**

```bash
grep -r "vuex" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/utils/ 2>/dev/null
grep -r "vuex" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/model/ 2>/dev/null
```
Expected: 无输出（model 和 utils 不应依赖 vuex）

- [ ] **Step 4: TypeScript 校验**

```bash
pnpm type-check
```

- [ ] **Step 5: Commit**

```bash
git add src/utils/ src/model/
git commit -m "feat: migrate utility functions and model types from uni-kahe"
```

---

## Task 7: 迁移 API 模块

**Files:**
- Modify/Create: `src/api/` 下各模块文件
- Reference: `uni-kahe/src/api/`

- [ ] **Step 1: 列出两个项目的 api 目录**

```bash
find /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/api -type f | sort
find /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/api -type f | sort
```

- [ ] **Step 2: 将 uni-kahe 的 api 文件复制到 kahe-unibest（不覆盖已有文件）**

```bash
# 仅复制 uni-kahe 中存在但 kahe-unibest 中不存在的文件
rsync -av --ignore-existing \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/api/ \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/api/
```

- [ ] **Step 3: 将 api 文件中的 http 请求替换为 kahe-unibest 的 http 模块**

uni-kahe 使用 `request()` from `@/utils/request/index.ts`，kahe-unibest 使用 `http()` from `@/http/http.ts`。

检查需修改的文件：
```bash
grep -rl "utils/request" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/api/
```

对每个匹配文件，将：
```ts
import { request } from '@/utils/request'
```
改为：
```ts
import { http } from '@/http/http'
```
并将 `request({...})` 改为 `http({...})`（参数结构一致时直接替换）。

- [ ] **Step 4: TypeScript 校验**

```bash
pnpm type-check
```

- [ ] **Step 5: Commit**

```bash
git add src/api/
git commit -m "feat: migrate API modules from uni-kahe, adapt to kahe-unibest http layer"
```

---

## Task 8: 迁移公共组件

**Files:**
- Create: `src/components/customNavBar/`（从 uni-kahe 复制）
- Create/Modify: `src/components/` 下各组件目录
- Reference: `uni-kahe/src/components/`

- [ ] **Step 1: 列出 uni-kahe 的公共组件**

```bash
find /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/components -type f | sort
```

- [ ] **Step 2: 整体复制 uni-kahe 的组件目录到 kahe-unibest（不覆盖已有）**

```bash
rsync -av --ignore-existing \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/components/ \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/components/
```

- [ ] **Step 3: 批量替换组件中的 Vuex → Pinia 引用**

```bash
# 找出所有还在 import vuex store 的组件文件
grep -rl "store/modules" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/components/
```

对每个匹配文件，按 Task 0 的映射表逐一替换：
- `import { UserModule } from '@/store/modules/user'` → `import { useUserStore } from '@/store/user'` + `const userStore = useUserStore()`
- `import { AppModule } from '@/store/modules/app'` → `import { useAppStore } from '@/store/app'` + `const appStore = useAppStore()`
- 所有 `XxxModule.field` → `xxxStore.field`
- 所有 `XxxModule.method()` → `xxxStore.method()`

- [ ] **Step 4: 删除组件中的 vuex/vuex-module-decorators 引用（如有）**

```bash
grep -rl "vuex-module-decorators" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/components/
```
Expected: 无输出（组件不应直接引用装饰器）

- [ ] **Step 5: TypeScript 校验**

```bash
pnpm type-check
```

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: migrate shared components from uni-kahe, replace Vuex with Pinia"
```

---

## Task 9: 补全 pages.config.ts 路由

**Files:**
- Modify: `pages.config.ts`
- Reference: `uni-kahe/src/pages.json`（路由源）

- [ ] **Step 1: 读取 uni-kahe 完整路由配置**

```bash
cat /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/pages.json
```

- [ ] **Step 2: 对比 kahe-unibest 现有路由**

当前 kahe-unibest `pages.config.ts` 只有模板路由（index、me、auth）。需要添加全部业务路由。

将 uni-kahe pages.json 中的路由结构完整迁移到 `pages.config.ts`：

**主包 pages（示例）：**
```ts
pages: [
  { path: 'pages/index/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/home/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/mine/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/box/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/machine/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/merchant/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/login/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/pet/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/mall/index', style: { navigationStyle: 'custom' } },
  { path: 'pages/infinite/index', style: { navigationStyle: 'custom' } },
  // ... 其他主包页面
]
```

**分包 subPackages（按 uni-kahe pages.json 完整添加）：**
```ts
subPackages: [
  { root: 'subPackages/order', pages: [...] },
  { root: 'subPackages/collect', pages: [...] },
  { root: 'subPackages/groupBuy', pages: [...] },
  { root: 'subPackages/mine', pages: [...] },
  // ... 全部 16 个分包
]
```

- [ ] **Step 3: 验证路由配置无语法错误**

```bash
pnpm dev:mp-weixin
```
Expected: 编译通过，无 `pages not found` 类错误

- [ ] **Step 4: Commit**

```bash
git add pages.config.ts
git commit -m "feat: add all business routes to pages.config.ts"
```

---

## Task 10: 迁移主包页面（10 个主页）

**Files:**
- Create/Modify: `src/pages/index/index.vue`
- Create/Modify: `src/pages/home/index.vue` + 子组件
- Create/Modify: `src/pages/mine/index.vue` + 子组件
- Create/Modify: `src/pages/box/index.vue` + 子组件
- Create/Modify: `src/pages/machine/index.vue` + 子组件
- Create/Modify: `src/pages/merchant/index.vue` + 子组件
- Create/Modify: `src/pages/login/index.vue`
- Create/Modify: `src/pages/pet/index.vue` + 子组件
- Create/Modify: `src/pages/mall/index.vue` + 子组件
- Create/Modify: `src/pages/infinite/index.vue` + 子组件

**每个页面的迁移步骤如下：**

- [ ] **Step 1: 复制主包页面目录**

```bash
# 复制全部主包页面（不覆盖已有文件）
for dir in index home mine box machine merchant login pet mall infinite welfare special welcome; do
  if [ -d "/Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/pages/$dir" ]; then
    rsync -av \
      "/Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/pages/$dir/" \
      "/Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/pages/$dir/"
  fi
done
```

- [ ] **Step 2: 批量替换主包页面中的 Vuex → Pinia**

```bash
# 找出主包中还有 Vuex store 引用的文件
grep -rl "store/modules" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/pages/
```

对每个文件，按 Task 0 头部的映射表替换。

**替换规则示例（pages/home/index.vue）：**
```
// 删除
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'

// 改为
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
const appStore = useAppStore()
const userStore = useUserStore()

// 字段替换
AppModule.statusBarHeight → appStore.statusBarHeight
AppModule.changeCurrentTabIndex(n) → appStore.changeCurrentTabIndex(n)
UserModule.userInfo → userStore.userInfo
```

- [ ] **Step 3: TypeScript 校验**

```bash
pnpm type-check
```

- [ ] **Step 4: 运行开发服务器验证主包页面**

```bash
pnpm dev:mp-weixin
```
在微信开发者工具确认：
- 5 个 TabBar 页面（home/mine/box/machine 等）均能打开渲染
- 登录流程正常（进入 pages/login/index 不报错）
- 首页数据加载正常

- [ ] **Step 5: Commit**

```bash
git add src/pages/
git commit -m "feat: migrate main package pages from uni-kahe (Phase 1)"
```

---

## Task 11: 迁移分包页面（16 个分包）

**Files:**
- Create: `src/subPackages/` 下全部分包目录
- Reference: `uni-kahe/src/subPackages/`

- [ ] **Step 1: 复制全部分包目录**

```bash
rsync -av \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/subPackages/ \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/subPackages/
```

- [ ] **Step 2: 批量替换分包中的 Vuex → Pinia**

```bash
grep -rl "store/modules" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/subPackages/
```

对每个匹配文件，执行同 Task 10 Step 2 的替换。

重点分包（逐一确认）：
- `subPackages/order/` — 订单相关，含 UserModule 调用
- `subPackages/groupBuy/` — 拼团，含支付流程
- `subPackages/mine/` — 地址、VIP、优惠券（AddressModule + UserModule）
- `subPackages/pet/` — PetModule 相关
- `subPackages/product/` — 商品详情，含支付

- [ ] **Step 3: 检查 subPackages/discount 是否需要重命名**

```bash
ls /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/subPackages/discount/
ls /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/subPackages/gift/ 2>/dev/null || echo "gift不存在"
```

若 uni-kahe 有 discount 而无 gift，则 pages.config.ts 中路由保持 `subPackages/discount`，无需重命名。

- [ ] **Step 4: TypeScript 校验**

```bash
pnpm type-check
```

- [ ] **Step 5: 运行开发服务器验证分包页面**

```bash
pnpm dev:mp-weixin
```
在微信开发者工具重点测试：
- 订单列表/详情页可打开
- 商品详情页可打开
- 拼团页面可打开
- 宠物分包页面可打开

- [ ] **Step 6: Commit**

```bash
git add src/subPackages/
git commit -m "feat: migrate all sub-package pages from uni-kahe (Phase 2)"
```

---

## Task 12: 配置 tabBar（对齐 uni-kahe）

**Files:**
- Modify: `src/tabbar/config.ts`
- Reference: `uni-kahe/src/pages.json` 中的 tabBar 配置

- [ ] **Step 1: 读取 uni-kahe 的 tabBar 配置**

```bash
cat /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/pages.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(json.dumps(d.get('tabBar', {}), indent=2, ensure_ascii=False))"
```

- [ ] **Step 2: 将 tabBar items 同步到 kahe-unibest 的 `src/tabbar/config.ts`**

参照 uni-kahe 的 tabBar list（pagePath、iconPath、selectedIconPath、text），更新 config.ts 中的 tabbar items 配置。

- [ ] **Step 3: 将 tabBar 图标资源复制到 kahe-unibest**

```bash
rsync -av --ignore-existing \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/static/tabbar/ \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/static/tabbar/
```

- [ ] **Step 4: Commit**

```bash
git add src/tabbar/ src/static/tabbar/
git commit -m "feat: sync tabBar config and icons from uni-kahe"
```

---

## Task 13: 同步静态资源

**Files:**
- Modify: `src/static/`

- [ ] **Step 1: 同步 static 目录（不覆盖已有文件）**

```bash
rsync -av --ignore-existing \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/static/ \
  /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/static/
```

- [ ] **Step 2: 验证关键图片资源存在**

```bash
ls /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/static/ | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/static/
git commit -m "feat: sync static assets from uni-kahe (ignore-existing)"
```

---

## Task 14: 配置环境变量对齐

**Files:**
- Modify: `env/.env`（或 `.env.development`/`.env.production`）
- Reference: `uni-kahe/.env*`

- [ ] **Step 1: 对比两个项目的 env 配置**

```bash
cat /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/.env* 2>/dev/null || ls /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/
cat /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/env/
```

- [ ] **Step 2: 核查 API 域名配置**

uni-kahe 使用 `VITE_BASE_URL`，kahe-unibest 使用 `VITE_APP_BASE_URL`。

检查 kahe-unibest 的 `http/http.ts` 或 `interceptor.ts` 中读取哪个环境变量：
```bash
grep -r "VITE_" /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/src/http/
```

确认 kahe-unibest env 文件中的 API 域名与 uni-kahe 一致。

- [ ] **Step 3: 检查 manifest.config.ts 中的 AppID**

```bash
cat /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/manifest.config.ts | grep -i appid
cat /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/uni-kahe/src/manifest.json | grep -i appid 2>/dev/null
```

确认微信小程序 appid 一致。

- [ ] **Step 4: Commit**

```bash
git add env/ manifest.config.ts
git commit -m "feat: align env config and appid with uni-kahe"
```

---

## Task 15: 全量构建验证与 TypeScript 清理

**Files:**
- 可能修改多处 ts/vue 文件（fix type errors）

- [ ] **Step 1: 全量 TypeScript 检查**

```bash
pnpm type-check 2>&1 | head -100
```

记录所有 error，逐一修复（重点：store 方法签名、api 返回类型）。

- [ ] **Step 2: 构建微信小程序**

```bash
pnpm build:mp-weixin
```
Expected: 构建成功，`dist/build/mp-weixin` 目录生成，无 Error 级别输出。

- [ ] **Step 3: 检查包体积**

```bash
du -sh /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp/kahe-unibest/dist/build/mp-weixin/
```
Expected: 主包 < 2MB（微信小程序限制），总体在合理范围。

- [ ] **Step 4: 修复所有 TypeScript error 后 Commit**

```bash
git add -A
git commit -m "fix: resolve TypeScript errors after full migration"
```

---

## Task 16: 冒烟测试与分支合并准备

- [ ] **Step 1: 在微信开发者工具中执行冒烟测试**

测试矩阵：
- [ ] 首次进入 → 微信自动登录流程（preLogin）
- [ ] 首页数据加载（banner、商品列表）
- [ ] 5 个 TabBar 切换正常
- [ ] 进入我的页面 → 用户信息显示
- [ ] 进入商品详情页
- [ ] 进入订单列表页
- [ ] 拼团页面打开

- [ ] **Step 2: 查看当前分支 commit 历史**

```bash
git log --oneline
```

- [ ] **Step 3: 最终 Commit（如有遗留改动）**

```bash
git add -A
git commit -m "feat: complete uni-kahe → kahe-unibest migration"
```

---

## 风险速查

| 风险 | 症状 | 解决方式 |
|------|------|---------|
| TuNiao 样式与 UnoCSS 冲突 | tn-* 组件样式异常 | 确认 uno.config.ts 有 `blocklist: [/^tn-/]` |
| Pinia store 字段缺失 | 页面报 `xxx is not a function` | 检查 store 的 return 是否漏掉某字段 |
| API 请求失败 | 网络请求 404/500 | 检查 env 文件中 VITE_APP_BASE_URL 是否与 uni-kahe 一致 |
| 分包路由 not found | 页面跳转白屏 | 检查 pages.config.ts 中分包路径是否与目录结构一致 |
| 微信登录失败 | preLogin 报错 | 检查 manifest.config.ts 中微信小程序 appid 是否正确 |
