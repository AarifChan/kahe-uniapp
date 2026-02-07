<script lang="ts" setup>
defineOptions({
  name: 'Home',
})
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '卡牌核心',
  },
})

// 支持的卡牌游戏列表（产品展示）
const cardGames = [
  {
    name: '游戏王',
    enName: 'Yu-Gi-Oh!',
    types: ['OCG', 'TCG'],
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    name: '宝可梦',
    enName: 'Pokémon',
    types: ['PTCG'],
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    name: '数码宝贝',
    enName: 'Digimon',
    types: ['DTCG'],
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    name: '航海王',
    enName: 'One Piece',
    types: ['OPCG'],
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
]

// 下载 APP（根据实际下载链接替换）
function downloadApp() {
  uni.showToast({
    title: '请前往应用商店搜索「卡牌核心」',
    icon: 'none',
  })
}

// 跳转到用户协议页面
function goUserAgreement() {
  uni.navigateTo({
    url: '/pages/agreement/index',
  })
}
</script>

<template>
  <view class="min-h-screen from-blue-50 to-purple-50 bg-gradient-to-b">
    <!-- 顶部站点导航 -->
    <view class="sticky top-0 z-20 flex items-center justify-between bg-white/90 px-4 py-3 text-xs text-gray-700 shadow-md">
      <view class="font-bold">
        卡牌核心 · 官方网站
      </view>
      <view class="flex items-center space-x-4">
        <text>首页</text>
        <text>产品展示</text>
        <text @tap="goUserAgreement">
          用户协议
        </text>
        <text>联系我们</text>
      </view>
    </view>

    <!-- Hero 区域 / 应用介绍 -->
    <view class="relative overflow-hidden pb-20 pt-safe">
      <!-- 背景装饰（简单渐变，兼容性更好） -->
      <view class="absolute inset-0 opacity-10">
        <view class="absolute left-10 top-20 h-40 w-40 rounded-full bg-blue-400" />
        <view class="absolute right-20 top-40 h-60 w-60 rounded-full bg-purple-400" />
      </view>

      <!-- Logo 和标题 -->
      <view class="relative z-10 px-6 pt-16 text-center">
        <view class="mb-6 flex justify-center">
          <image
            src="/static/logo.png"
            mode="aspectFit"
            class="h-32 w-32 rounded-3xl shadow-2xl"
          />
        </view>
        <view class="mb-2 text-4xl text-gray-800 font-bold">
          卡牌核心
        </view>
        <view class="mb-4 text-base text-gray-500">
          集换式卡牌交易市场
        </view>
        <view class="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
          「卡牌核心」是一款面向卡牌爱好者的集换式卡牌交易平台，涵盖游戏王(OCG、TCG)、宝可梦(PTCG)、数码宝贝(DTCG)、航海王(OPCG)
          等热门卡牌游戏及周边产品，提供安全、便捷的线上交易与交流体验。
        </view>
      </view>
    </view>

    <!-- 应用信息（满足微信开放平台 APP 官网上展示要求） -->
    <view class="px-6 pb-8">
      <view class="mb-4 rounded-2xl bg-white/80 p-5 shadow-md">
        <view class="mb-3 text-lg text-gray-800 font-bold">
          应用信息
        </view>
        <view class="text-sm text-gray-700 leading-relaxed space-y-2">
          <view>
            <text class="font-semibold">应用名称：</text>
            <text>卡牌核心</text>
          </view>
          <view>
            <text class="font-semibold">应用类型：</text>
            <text>集换式卡牌交易平台移动应用</text>
          </view>
          <view>
            <text class="font-semibold">应用简介：</text>
            <text>
              为玩家提供卡牌展示、交流及交易服务，支持游戏王、宝可梦、数码宝贝、航海王等多种热门卡牌游戏及相关周边产品。
            </text>
          </view>
          <view>
            <text class="font-semibold">主要功能：</text>
            <text>
              卡牌展示与搜索、价格参考、发布与管理出售信息、买卖双方即时沟通、交易记录与订单管理等。
            </text>
          </view>
          <view>
            <text class="font-semibold">运营主体：</text>
            <text>深圳市共凝万象科技有限公司</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 产品展示 / 支持的卡牌游戏 -->
    <view class="px-6 pb-8">
      <view class="mb-6 text-center">
        <view class="mb-2 text-3xl text-gray-800 font-bold">
          产品与支持的游戏
        </view>
        <view class="text-gray-500">
          涵盖主流集换式卡牌游戏
        </view>
      </view>

      <view class="w-full flex flex-wrap justify-between">
        <view
          v-for="(game, index) in cardGames"
          :key="index"
          class="relative mb-4 w-full overflow-hidden rounded-2xl p-5 shadow-lg transition-all active:scale-95"
          :style="{ background: game.color, width: '100%' }"
        >
          <view class="relative z-10 w-full">
            <view class="mb-2 text-2xl text-white font-bold">
              {{ game.name }}
            </view>
            <view class="mb-3 text-sm text-white/80">
              {{ game.enName }}
            </view>
            <view class="flex flex-wrap gap-2">
              <view
                v-for="(type, typeIndex) in game.types"
                :key="typeIndex"
                class="rounded-full bg-white/20 px-3 py-1 text-xs text-white font-medium"
              >
                {{ type }}
              </view>
            </view>
          </view>
          <!-- 装饰性圆圈 -->
          <view class="absolute h-24 w-24 rounded-full bg-white/10 -right-8 -top-8" />
          <view class="absolute h-20 w-20 rounded-full bg-white/10 -bottom-6 -left-6" />
        </view>
      </view>
    </view>

    <!-- 功能特色 -->
    <view class="px-6 pb-8">
      <view class="mb-6 text-center">
        <view class="mb-2 text-3xl text-gray-800 font-bold">
          平台特色
        </view>
      </view>

      <view class="space-y-4">
        <view class="flex items-start rounded-2xl bg-white p-5 shadow-md">
          <view class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <text class="text-2xl">🛒</text>
          </view>
          <view class="flex-1">
            <view class="mb-1 text-lg text-gray-800 font-semibold">
              安全交易
            </view>
            <view class="text-sm text-gray-600 leading-relaxed">
              完善的交易保障机制，确保每一笔交易安全可靠。
            </view>
          </view>
        </view>

        <view class="flex items-start rounded-2xl bg-white p-5 shadow-md">
          <view class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-xl bg-purple-100">
            <text class="text-2xl">📊</text>
          </view>
          <view class="flex-1">
            <view class="mb-1 text-lg text-gray-800 font-semibold">
              价格透明
            </view>
            <view class="text-sm text-gray-600 leading-relaxed">
              实时市场价格，帮助您做出更合理的交易决策。
            </view>
          </view>
        </view>

        <view class="flex items-start rounded-2xl bg-white p-5 shadow-md">
          <view class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-xl bg-pink-100">
            <text class="text-2xl">🎮</text>
          </view>
          <view class="flex-1">
            <view class="mb-1 text-lg text-gray-800 font-semibold">
              丰富品类
            </view>
            <view class="text-sm text-gray-600 leading-relaxed">
              涵盖各类卡牌游戏和周边产品，满足收藏、对战和投资等多样化需求。
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 简要用户协议说明 -->
    <view class="px-6 pb-8">
      <view class="mb-3 text-lg text-gray-800 font-bold">
        用户协议与隐私保护
      </view>
      <view class="rounded-2xl bg-white p-5 text-sm text-gray-600 leading-relaxed shadow-md">
        <view class="mb-2">
          用户在使用「卡牌核心」服务前，请仔细阅读完整的《用户协议》和《隐私政策》。我们会在符合法律法规的前提下，依据合法、正当、必要的原则收集和使用用户信息，用于账号注册登录、交易撮合、风险控制及客户服务等目的。
        </view>
        <view class="mb-2">
          我们不会出售或非法向第三方披露用户个人信息，仅在为实现核心功能、履行法律义务或取得用户授权的前提下，对必要信息进行共享或披露，并采取合理的技术措施保护用户信息安全。
        </view>
        <view>
          详细条款请点击下方链接查看：
        </view>
        <view class="mt-3 text-primary" @tap="goUserAgreement">
          《卡牌核心用户协议及隐私政策》
        </view>
      </view>
    </view>

    <!-- 下载按钮区域 & 联系方式 & 备案信息 -->
    <view class="px-6 pb-12 pb-safe">
      <view
        class="h-16 flex items-center justify-center rounded-2xl from-blue-500 to-purple-600 bg-gradient-to-r shadow-lg active:scale-95"
        @tap="downloadApp"
      >
        <text class="text-xl text-white font-bold">
          立即下载「卡牌核心」APP
        </text>
      </view>
      <view class="mt-4 text-center text-sm text-gray-500">
        支持 iOS 和 Android 平台
      </view>

      <!-- 联系方式 -->
      <view class="mt-6 rounded-2xl bg-white/80 p-4 text-xs text-gray-600 leading-relaxed shadow-md">
        <view class="mb-2 text-gray-800 font-semibold">
          联系方式
        </view>
        <view>
          客服邮箱：1@91tcg.com
        </view>
        <view>
          客服电话：+8613148893981
        </view>
        <view>
          服务时间：工作日 09:30-18:30（以实际业务为准）
        </view>
      </view>

      <!-- 底部版权信息 -->
      <view class="mt-4 text-center text-xs text-gray-500 leading-relaxed">
        <view>
          运营主体：深圳市共凝万象科技有限公司
        </view>
        <view>
          版权所有 © 深圳市共凝万象科技有限公司
        </view>
        <view>
          备案号：粤ICP备2024290409号-5
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.bg-gradient-to-b {
  background: linear-gradient(to bottom, #eff6ff 0%, #faf5ff 100%);
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #3b82f6 0%, #9333ea 100%);
}

.gap-2 {
  gap: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-lg {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.active\:scale-95:active {
  transform: scale(0.95);
}
</style>
