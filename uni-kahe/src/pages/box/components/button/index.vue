<template>
  <view class="relative w-160 h-67">
    <image
      class="w-full h-full"
      src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
    />
    <view class="absolute top-4 left-0 w-full h-full flex text-center flex-row items-center justify-center"
    >
      <slot />
      <text class="text-[#511818] font-normal text-34 theme-font">{{ title }}</text>
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

<style lang="scss" scoped></style>
