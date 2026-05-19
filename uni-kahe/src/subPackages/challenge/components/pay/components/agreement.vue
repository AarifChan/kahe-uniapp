<template>
  <view class="relative w-full flex justify-center items-center">
    <image
      class="w-35rpx h-30rpx"
      :src="checked ? '/static/kahe/common/checked.png' : '/static/kahe/common/unchecked.png'"
    />
    <text class="ml-10rpx text-24rpx font-400 text-black">已阅读并同意</text>
    <text class="ml-10rpx text-24rpx font-400 text-#4B71FF">《心跳潮玩服务协议》</text>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  checked: {
    default: true,
    type: Boolean,
  },
});
</script>
