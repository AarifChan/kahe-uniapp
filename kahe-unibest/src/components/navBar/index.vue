<template>
  <view
    class="customNav"
    :style="{
      height: `${totalNavHeight}PX`,
      opacity,
      position: `${position}`,
      paddingTop: `${statusBarHeight}PX`,
      backgroundColor: `rgba(253, 239, 204, ${opacity})`,
    }"
  >
    <view class="customNav-bar" :style="{ lineHeight: `${navBarHeight}PX` }">
      <view class="customNav-bar-title">
        {{ title }}
      </view>
    </view>
  </view>
  <view
    v-if="topSafe"
    :style="{ height: `${statusBarHeight}px`, width: `100%` }"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

defineProps({
  topSafe: {
    default: false,
    type: Boolean,
  },
  title: {
    default: '',
    type: String,
  },
  custom: {
    default: false,
    type: Boolean,
  },
  opacity: {
    default: 0,
    type: Number,
  },
  position: {
    default: 'fixed',
    type: String,
  },
})

const appStore = useAppStore()

const totalNavHeight = computed(() => {
  return appStore.statusBarHeight + appStore.navBarHeight
})
const statusBarHeight = computed(() => {
  return appStore.statusBarHeight
})
const navBarHeight = computed(() => {
  return appStore.navBarHeight
})
</script>

<style lang="scss" scoped>
.customNav {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 99;
  &-bar {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-title {
      font-size: 30rpx;
      color: #000000;
    }
  }
}
</style>
