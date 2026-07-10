<template>
  <view class="custom-btn relative w-160 h-67">
    <image
      class="custom-btn-img w-full h-full"
      src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
    />
    <view class="custom-btn-content absolute top-4rpx left-0 w-full h-full flex text-center flex-row items-center justify-center">
      <slot />
      <text class="custom-btn-title font-normal text-34 text-[#511818] theme-font">{{ title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    default: "big",
    type: String,
  },
  title: {
    default: "",
    type: String,
  },
});
</script>

<style lang="scss" scoped>
</style>
