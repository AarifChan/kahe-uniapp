<template>
  <view class="relative w-199 h-86">
    <image class="w-full h-full" src="/static/kaju/common/btn-bg.png" />
    <view
      class="absolute top-4 left-0 w-full h-full flex text-center flex-row items-center justify-center"
    >
      <slot />
      <text class="text-[#151714] font-normal text-38 theme-font">{{
        title
      }}</text>
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
