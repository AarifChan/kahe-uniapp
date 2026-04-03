<template>
  <view class="relative rounded-4rpx h-82rpx w-full flex flex-row items-center justify-center overflow-hidden">
    <image
      class="absolute w-full h-full left-0 top-0"
      src="https://jms.85gui7.com/kahe-202510/images/pay-button.png"
    />
    <text class="relative text-44rpx font-400 text-white theme-font text-stroke-main">去支付</text>
    <text class="relative text-44rpx font-400 text-white theme-font text-stroke-main">
      {{ isMall ? '¥' : '' }}{{ price }}
    </text>
    <view class="absolute top-0 right-0" v-if="discountPrice > 0">
      <view class="relative">
        <image
          class="absolute top-0 right-0 w-169rpx h-25rpx"
          src="https://jms.85gui7.com/kahe/common/pay-price-count.png"
        />
        <text class="absolute -top-2rpx right-6rpx w-150rpx text-right text-20rpx font-400 text-white">
          已抵扣¥{{ discountPrice }}
        </text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  isMall: {
    default: false,
    type: Boolean,
  },
  price: {
    default: '',
    type: String,
  },
  discountPrice: {
    default: 0,
    type: Number,
  },
});
</script>
