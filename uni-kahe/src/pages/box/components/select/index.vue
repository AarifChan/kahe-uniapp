<template>
  <view class="relative w-32 h-32 rounded-full border-2 border-[#511818] flex flex-row items-center justify-center"
  >
    <view v-if="isSelect" class="m-auto w-22 h-22 bg-[#612821] rounded-full" />
  </view>
</template>

<script lang="ts" setup>
defineProps({
  isSelect: {
    default: false,
    type: Boolean,
  },
  color: {
    default: "white",
    type: String,
  },
  size: {
    default: "58rpx",
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
