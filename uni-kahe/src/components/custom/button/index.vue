<template>
  <view
    class="customButton relative flex flex-row items-center justify-center bg-[#53d6ac] shadow-[0_4rpx_4rpx_rgba(0,0,0,0.1)]"
    :style="{ width: width, height: height, borderRadius }"
    v-if="size === 'small'"
  >

    <view class="absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center">
      <image
        v-if="icon === 'wechat'"
        style="width: 25px; height: 25px"
        src="/static/kahe-202510/images/weixin.png"
      />
      <text
        class="text-center font-normal text-40 text-white"
        :class="[
          themeFont ? 'theme-font' : '',
          textStroke ? 'text-stroke-main' : '',
        ]"
        :style="{
          lineHeight: height,
          fontSize: themeFont ? '40rpx' : fontSize,
          color: textColor,
        }"
        >{{ title }}</text
      >
    </view>
  </view>
  <view class="bottom-Button fixed left-60 flex flex-row items-center justify-center rounded-10" style="bottom: calc(env(safe-area-inset-bottom) + 48rpx); width: calc(100% - 120rpx); height: 67rpx;" v-else :style="{ position: position }">
    <image
      class="w-full h-full"
      src="/static/kahe-202510/ka-he/common/long-btn-bg.png"
    />
    <text class="absolute left-0 top-0 w-full h-full leading-67 text-center font-normal text-40 text-white theme-font">{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    default: "",
    type: String,
  },
  width: {
    default: "230rpx",
    type: String,
  },
  height: {
    default: "67rpx",
    type: String,
  },
  textColor: {
    default: "white",
    type: String,
  },
  fontSize: {
    default: "24rpx",
    type: String,
  },
  themeFont: {
    default: true,
    type: Boolean,
  },
  textStroke: {
    default: true,
    type: Boolean,
  },
  size: {
    default: "small",
    type: String,
  },
  borderRadius: {
    default: "4rpx",
    type: String,
  },
  position: {
    default: "relative",
    type: String,
  },
  icon: {
    default: "none",
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
