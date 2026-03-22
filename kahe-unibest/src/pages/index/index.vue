<template>
  <view class="index">
    <!--    <NavBar />-->
    <view class="index-scroll">
      <Home Merchant v-if="current === 0" />
      <Merchant v-else-if="current === 1" />
      <Machine v-else-if="current === 2" />
      <box v-else-if="current === 3" />
      <mine v-else />
    </view>
    <tab-bar v-model:current="current" />
    <info v-model:show="infoShow" />
    <vip v-model:show="showVip" :vip="userInfo.vip" :list="vipList" />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { onLoad } from "@dcloudio/uni-app";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { computed, ref, watch } from "vue";
import Info from '@/components/modal/info/index.vue';
import Vip from '@/components/modal/vip/index.vue'
import TabBar from '@/components/tabBar/index.vue'
import Box from '@/pages/box/index.vue'
import Home from '@/pages/home/index.vue'

import Machine from '@/pages/machine/index.vue'
import Merchant from '@/pages/merchant/index.vue'

import Mine from '@/pages/mine/index.vue'
const userStore = useUserStore()
const appStore = useAppStore()

const current = ref(appStore.currentTabIndex)
watch(
  () => appStore.currentTabIndex,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      current.value = newVal
    }
  },
)
const userInfo = computed(() => {
  return userStore.userInfo
})
onLoad(() => {
  console.log('currentTabIndex:', appStore.currentTabIndex)
})
onShareAppMessage(() => {
  return {
    title: `${
      userStore.userInfo?.nickname ?? ''
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: 'https://jms.85gui7.com/kahe-202510/common/share.jpg',
    path: '/pages/welcome/index',
  }
})
onShareTimeline(() => {
  return {
    title: `${
      userStore.userInfo?.nickname ?? ''
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: 'https://jms.85gui7.com/kahe-202510/common/share.jpg',
    path: '/pages/welcome/index',
  }
})
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: $main-bg;
  &-scroll {
    position: relative;
    width: 100%;
    height: calc(100vh - (env(safe-area-inset-bottom) + 100rpx));
  }
}
</style>
