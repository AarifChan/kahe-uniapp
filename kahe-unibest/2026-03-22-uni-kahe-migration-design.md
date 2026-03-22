# uni-kahe → kahe-unibest 全量迁移方案

**日期：** 2026-03-22
**状态：** Approved

---

## 1. 背景与目标

将 `uni-kahe`（卡萌潮玩）项目的所有页面业务逻辑迁移至 `kahe-unibest`（卡核潮玩）框架中，保证原有功能和页面逻辑不变。

### 两个项目核心差异

| 维度 | uni-kahe（源）| kahe-unibest（目标）|
|------|--------------|-------------------|
| 状态管理 | Vuex 4 + vuex-module-decorators | Pinia + pinia-plugin-persistedstate |
| Store 使用方式 | `import { UserModule } from '@/store/modules/user'` 直接用单例 | `const userStore = useUserStore()` |
| UI 组件库 | TuNiao UI (`tn-*`) | uv-ui (`uv-*`) |
| CSS 框架 | 纯 SCSS | UnoCSS + SCSS |
| 页面路由配置 | 静态 `pages.json` | 动态 `pages.config.ts` (TypeScript) |
| 导航栏组件 | `customNavBar` | `navBar` |
| HTTP 请求 | `utils/request/index.ts` (简单封装) | `http/http.ts` (双Token自动刷新) |
| 构建工具 | 标准 Vite | Vite + uni-helper 插件链 |
| 自动导入 | 无 | unplugin-auto-import + unplugin-vue-components |

---

## 2. 迁移策略

### 核心原则

1. **保持页面逻辑不变** — 页面 `.vue` 文件的模板和业务逻辑最小化改动
2. **TuNiao UI 与 uv-ui 共存** — 在 kahe-unibest 安装 TuNiao UI，不替换 `tn-*` 组件
3. **Vuex → Pinia 适配** — 这是页面代码中唯一必须修改的部分，将 `UserModule.xxx`/`AppModule.xxx` 改为 Pinia store 调用
4. **HTTP 请求兼容层** — 迁移页面通过复用 kahe-unibest 已有的 `api/` 模块，无需改变 API 调用方式

### 迁移范围评估

经过代码探查，两个项目结构高度相似，kahe-unibest 已有大量对应页面。迁移重点是：

- **补全 uni-kahe 中有但 kahe-unibest 中内容更新/不同的页面**
- **同步组件逻辑**（尤其是 `customNavBar` → `navBar` 适配）
- **完成框架适配**（TuNiao UI 安装、Vuex→Pinia 调用替换）

---

## 3. 技术方案详解

### 3.1 TuNiao UI 集成

**uni-kahe 的集成方式（纯 CSS，无需 Vue 插件注册）：**
```html
<!-- App.vue <style> 块 -->
<style>
  @import '@tuniao/tn-style/dist/uniapp/index.css';
</style>
```

**kahe-unibest 中需要做的：**

1. 安装依赖：
   ```bash
   pnpm add @tuniao/tnui-vue3-uniapp @tuniao/tn-icon @tuniao/tn-style
   ```

2. 在 `App.vue` 的 `<style>` 块追加 TuNiao 全局样式

3. 在 `pages.config.ts` 的 `easycom` 中追加 TuNiao 组件规则：
   ```ts
   "^tn-(.*)-?(item|group)$": "@tuniao/tnui-vue3-uniapp/components/tn-$1-$2/index.vue",
   "^tn-(.*)": "@tuniao/tnui-vue3-uniapp/components/tn-$1/index.vue"
   ```

4. `main.ts` **无需改动**（TuNiao UI 不需要 `app.use()`）

### 3.2 Vuex → Pinia 迁移映射

uni-kahe 使用 `vuex-module-decorators` 单例模式，页面直接 import 模块单例使用：

```ts
// uni-kahe 原写法
import { UserModule } from '@/store/modules/user'
import { AppModule } from '@/store/modules/app'

const vipList = computed(() => UserModule.vipDayList)
AppModule.changeCurrentTabIndex(value)
await UserModule.preLogin()
```

迁移后改为 kahe-unibest 的 Pinia store：

```ts
// 迁移后写法
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'

const userStore = useUserStore()
const appStore = useAppStore()

const vipList = computed(() => userStore.vipDayList)
appStore.changeCurrentTabIndex(value)
await userStore.preLogin()
```

**Pinia Store 接口对齐检查** — 需要逐模块对比，确认 kahe-unibest 的 Pinia store 包含 uni-kahe Vuex 模块中所有用到的 state、action、mutation，不足的需要补充。

### 3.3 导航栏组件适配

| uni-kahe | kahe-unibest | 处理方式 |
|----------|-------------|---------|
| `<customNavBar>` | `<navBar>` | 两者 Props 如果不同，需在 kahe-unibest 中保留 `customNavBar` 或对 Props 做兼容 |

建议：将 uni-kahe 的 `customNavBar` 组件源码复制到 kahe-unibest（若接口不一致）。

### 3.4 HTTP 请求层兼容

- uni-kahe 的 `api/` 模块与 kahe-unibest 的 `api/` 模块结构一致（都有 activity、address、box 等相同模块）
- kahe-unibest 的 `api/` 已经使用更高级的 `http.ts`（双 Token 刷新）
- **页面代码不需要改动** — 页面通过 `api/xxx` 调用，框架层自动处理请求

### 3.5 静态资源迁移

将 `uni-kahe/src/static/` 目录中的图片资源同步到 `kahe-unibest/src/static/`（不覆盖已有文件，仅补充缺失的）。

---

## 4. 迁移计划（分阶段）

### 分支策略

迁移工作应在独立 feature 分支上进行：
```bash
git checkout -b feat/migrate-from-uni-kahe
```
每个 Phase 完成后提交一个 commit，方便回滚到任意阶段。

---

### Phase 0：准备工作与 Store 对齐（1天）

#### 0.1 安装 TuNiao UI 依赖
```bash
pnpm add @tuniao/tnui-vue3-uniapp@1.0.22 @tuniao/tn-icon @tuniao/tn-style
```

#### 0.2 引入 TuNiao UI 全局样式
在 `src/App.vue` 的 `<style>` 块末尾追加：
```css
@import '@tuniao/tn-style/dist/uniapp/index.css';
```

#### 0.3 添加 easycom 规则
在 `pages.config.ts` 的 `easycom.custom` 中追加：
```ts
"^tn-(.*)-?(item|group)$": "@tuniao/tnui-vue3-uniapp/components/tn-$1-$2/index.vue",
"^tn-(.*)": "@tuniao/tnui-vue3-uniapp/components/tn-$1/index.vue"
```

#### 0.4 Store 接口对齐（必须在页面迁移前完成）

对比 uni-kahe Vuex 模块与 kahe-unibest Pinia store，逐一补全以下清单：

**UserModule → useUserStore**

| Vuex 字段/方法 | Pinia 是否存在 | 若无则补充 |
|---------------|--------------|-----------|
| `state.token` | 需确认（可能在 tokenStore） | — |
| `state.userInfo` | 需确认 | `ref<UserInfo>({})` |
| `state.loginStatus` | 需确认 | `ref(false)` |
| `state.vipDayList` | 需确认 | `ref([])` |
| `action: preLogin()` | 需确认 | 迁移微信登录流程 |
| `action: getUserInfo()` | 需确认 | — |
| `action: logout()` | 需确认 | — |
| `action: handleWxPay(orderId)` | 需确认 | — |
| `action: rechargePlanAction()` | 需确认 | — |
| `action: goToLoginPage()` | 需确认 | — |
| `action: getFavorite()` | 需确认 | — |
| `getter: isLogin` | 需确认 | `computed(() => !!token.value)` |

**AppModule → useAppStore**

| Vuex 字段/方法 | Pinia 是否存在 | 若无则补充 |
|---------------|--------------|-----------|
| `state.statusBarHeight` | 需确认 | `ref(0)` |
| `state.currentTabIndex` | 需确认 | `ref(0)` |
| `state.showLoginModal` | 需确认 | `ref(false)` |
| `action: changeCurrentTabIndex(i)` | 需确认 | — |
| `action: showLoginModal()` | 需确认 | — |

**PetModule → usePetStore**（`src/store/pet.ts` 已存在，需验证）

| Vuex 字段/方法 | Pinia 是否存在 | 若无则补充 |
|---------------|--------------|-----------|
| pet 状态字段 | 需通过读取文件确认 | — |

**AddressModule → useAddressStore**（`src/store/address.ts` 已存在，需验证）

> **注意 Vuex Getter 的处理：** uni-kahe 中的 Vuex Getter（跨 state 计算属性）在 Pinia 中用 `computed()` 实现（Composition API 写法），无需特殊处理，但需要确认 kahe-unibest 中已有对应的计算属性。

#### 0.5 补全路由配置

在 `pages.config.ts` 中检查并补充以下可能缺失的路由：
```
subPackages/collect/detail/index
subPackages/collect/record/index
subPackages/product/welfare-detail/index
```
确认 `subPackages/discount` 与 `subPackages/gift` 的对应关系。

#### Phase 0 验收检查点
```bash
pnpm dev:mp-weixin
# 确认：TuNiao UI tn-* 组件能正常渲染（可在任意页面临时加一个 tn-button 测试）
# 确认：无 Store 相关 TypeScript 报错
```

---

### Phase 1：主包页面迁移（2-3天）

对照 uni-kahe 的主包页面，将差异内容同步到 kahe-unibest：

| 页面 | uni-kahe 路径 | 注意事项 |
|------|-------------|---------|
| 首页入口 | `pages/index/index.vue` | 使用 UserModule + AppModule，需做 Pinia 适配 |
| 首页 | `pages/home/index.vue` | 复杂组件，AppModule 使用多处 |
| 我的 | `pages/mine/index.vue` | UserModule 使用多处 |
| 盒柜 | `pages/box/index.vue` | — |
| 抽卡机 | `pages/machine/index.vue` | — |
| 商家 | `pages/merchant/index.vue` | — |
| 登录 | `pages/login/index.vue` | UserModule.preLogin 等重要 Action |
| 宠物 | `pages/pet/index.vue` | PetModule 需特别处理 |
| 商城 | `pages/mall/index.vue` | — |
| 积分福利 | `pages/infinite/index.vue` | — |

**每页迁移步骤：**
1. 将 uni-kahe 对应页面内容复制到 kahe-unibest
2. 将所有 `import { XxxModule } from '@/store/modules/xxx'` 改为 `const xxxStore = useXxxStore()`
3. 将所有 `XxxModule.field` 改为 `xxxStore.field`
4. 将所有 `XxxModule.action()` 改为 `xxxStore.action()`
5. 确认页面中没有遗留的 Vuex 相关 import

#### Phase 1 验收检查点
```bash
pnpm dev:mp-weixin
# 确认 5 个 TabBar 页面均能正常打开并渲染
# 确认登录流程正常
# 确认首页数据加载正常
```

---

### Phase 2：分包页面迁移（3-4天）

| 分包 | 页面数 | 重点 |
|------|--------|------|
| `subPackages/order` | 2页 | 订单列表、订单详情 |
| `subPackages/collect` | 3页 | 含 detail、record 子页（kahe-unibest 可能缺少） |
| `subPackages/groupBuy` | 6页 | 拼团完整流程 |
| `subPackages/mine` | 6页 | 地址管理、VIP、优惠券、排行榜、邀请 |
| `subPackages/mall` | 1页 | — |
| `subPackages/infinite` | 1页 | — |
| `subPackages/welfare` | 1页 | — |
| `subPackages/merchant` | 1页 | — |
| `subPackages/discount` | 1页 | kahe-unibest 中对应为 `gift` |
| `subPackages/pet` | 4页 | 图鉴、孵化、探险、融合 |
| `subPackages/product` | 6页 | 含 welfare-detail（kahe-unibest 可能缺少） |
| `subPackages/setting` | 2页 | — |
| `subPackages/dailyWelfare` | 1页 | — |
| `subPackages/activity` | 1页 | — |
| `subPackages/box` | 3页 | 盲盒、宝箱、红包 |
| `subPackages/webview` | 1页 | — |

#### Phase 2 验收检查点
```bash
pnpm dev:mp-weixin
# 确认所有分包页面可以正常跳转和渲染
# 重点测试：订单、拼团、宠物、商品详情页
```

---

### Phase 3：组件同步（1-2天）

两个项目均有相同目录结构的组件，需要逐一对比差异：

| 组件目录 | 对比要点 |
|---------|---------|
| `customNavBar` vs `navBar` | Props、事件接口差异；若接口不同，保留 uni-kahe 的 `customNavBar`，复制到 kahe-unibest 的 `components/customNavBar/` |
| `banner/` | 是否使用 TuNiao 组件 vs uv-ui 组件 |
| `modal/` 各子组件 | 弹窗逻辑是否有更新 |
| `goods/` | 商品卡片样式/逻辑差异 |
| `login/` | 登录弹窗，含 UserModule 调用，需做 Pinia 适配 |
| `tabBar/` | 底部导航，含 AppModule 调用，需做 Pinia 适配 |

**组件迁移规则：** 对于同名组件，以 uni-kahe 版本为业务逻辑基准，修改其中的 Vuex 调用为 Pinia。

#### Phase 3 验收检查点
```bash
pnpm dev:mp-weixin
# 确认导航栏、底部 TabBar、弹窗等公共组件渲染正常
```

---

### Phase 4：静态资源与配置（0.5天）

- 同步 `static/` 目录中缺失的图片资源（`rsync -av --ignore-existing uni-kahe/src/static/ kahe-unibest/src/static/`）
- 检查 `manifest.config.ts` 中 AppID、微信小程序 AppID 是否需要更新
- 检查 `env/` 目录中环境变量：uni-kahe 使用 `VITE_BASE_URL`，kahe-unibest 使用 `VITE_APP_BASE_URL`，确认 API 域名一致

#### Phase 4 验收检查点
```bash
pnpm build:mp
# 确认完整构建无报错，包体积在合理范围内
```

### Phase 5：静态资源与配置（0.5天）

- 同步 `static/` 目录中缺失的图片资源
- 检查 `manifest.config.ts`（AppID、小程序 AppID 等配置）
- 检查 env 文件中的 API 域名配置

---

## 5. 关键风险与注意事项

### 风险一：Pinia Store 接口不完整
uni-kahe 的 Vuex 模块（特别是 `user.ts`）包含 20+ 个 Action（preLogin、getUserInfo、logout、handleWxPay、rechargePlanAction 等），kahe-unibest 的 Pinia user store 可能不完整。

**处理方式：** Phase 0 中逐一对比并补全，这是迁移成功的关键前提。

### 风险二：customNavBar 组件接口差异
两个项目都有自定义导航栏，但 Props 和事件可能不同。

**处理方式：** 优先保留两个组件，页面中使用哪个就保留哪个的引用。

### 风险三：TuNiao UI 版本兼容
uni-kahe 使用 `@tuniao/tnui-vue3-uniapp ^1.0.22`，kahe-unibest 需要安装相同版本。

**处理方式：** 安装时锁定与 uni-kahe 相同的版本号。

### 风险四：UnoCSS 原子类与 tn-* 组件样式冲突
kahe-unibest 使用 UnoCSS，TuNiao UI 内部使用类名可能与 UnoCSS 生成的原子类冲突。

**处理方式：**
1. 在 `uno.config.ts` 中添加 `blocklist`，排除 TuNiao 内部常用类名前缀（`tn-`）：
   ```ts
   blocklist: [/^tn-/]
   ```
2. 若页面中 TuNiao 组件的自定义类名需要 UnoCSS 样式，通过包裹 div + 原子类的方式隔离，不直接在 tn-* 组件上使用 UnoCSS 类名。
3. 如仍有冲突，在 `App.vue` 的 TuNiao CSS 引入后加 `/* UnoCSS layer */` 注释确保加载顺序。

### 风险五：自动导入与 TuNiao 组件注册
kahe-unibest 使用 `unplugin-vue-components` 自动注册组件，需确保 easycom 规则与自动导入不冲突。

**处理方式：** TuNiao UI 走 easycom，uv-ui 组件走 `unplugin-vue-components`，分开处理。

---

## 6. 工作量估计

| Phase | 工作内容 | 估计天数 |
|-------|---------|---------|
| Phase 0 | 依赖安装 + easycom + Store 完整对齐（必须先完成） | 1天 |
| Phase 1 | 主包页面迁移（10页，含 Vuex→Pinia 替换） | 2-3天 |
| Phase 2 | 分包页面迁移（40+页，含 Vuex→Pinia 替换） | 3-4天 |
| Phase 3 | 组件同步（customNavBar + 其他公共组件） | 1-2天 |
| Phase 4 | 静态资源同步 + 配置检查 + 完整构建验证 | 0.5天 |
| **合计** | | **~8-11天** |

---

## 7. 文件对照清单（详细）

### 需要在 kahe-unibest 补充/检查的路由

以下路由在 uni-kahe 中存在，需确认 kahe-unibest 的 `pages.config.ts` 中已包含：

```
subPackages/collect/detail/index
subPackages/collect/record/index
subPackages/product/welfare-detail/index  （uni-kahe 有，kahe-unibest 需确认）
subPackages/discount/index                （kahe-unibest 可能命名为 gift）
```

### Vuex → Pinia 调用替换速查表

| 源代码（uni-kahe）| 目标代码（kahe-unibest）|
|------------------|------------------------|
| `import { UserModule } from '@/store/modules/user'` | `import { useUserStore } from '@/store/user'`，`const userStore = useUserStore()` |
| `import { AppModule } from '@/store/modules/app'` | `import { useAppStore } from '@/store/app'`，`const appStore = useAppStore()` |
| `import { PetModule } from '@/store/modules/pet'` | `import { usePetStore } from '@/store/pet'`，`const petStore = usePetStore()` |
| `import { AddressModule } from '@/store/modules/address'` | `import { useAddressStore } from '@/store/address'`，`const addressStore = useAddressStore()` |
| `UserModule.token` | `userStore.token` 或 `useTokenStore().accessToken` |
| `UserModule.userInfo` | `userStore.userInfo` |
| `UserModule.loginStatus` | `userStore.loginStatus` |
| `await UserModule.preLogin()` | `await userStore.preLogin()` |
| `await UserModule.logout()` | `await userStore.logout()` |
| `AppModule.statusBarHeight` | `appStore.statusBarHeight` |
| `AppModule.changeCurrentTabIndex(i)` | `appStore.changeCurrentTabIndex(i)` |
| `AppModule.showLoginModal()` | `appStore.showLoginModal()` |
