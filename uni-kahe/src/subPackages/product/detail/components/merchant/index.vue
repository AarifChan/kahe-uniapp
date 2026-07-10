<template>
  <view class="merchantCard relative m-32 w-[calc(100%-64rpx)] p-16 box-border flex flex-row items-center justify-between bg-[#fffbef] shadow-[0rpx_3rpx_7rpx_0rpx_#d9be86] rounded-10">
    <view class="left flex flex-row items-center">
      <view class="avatar w-131 h-131 bg-white shadow-[0rpx_3rpx_7rpx_0rpx_#d4d4d4] rounded-full p-8">
        <image class="avatar-img w-full h-full rounded-full" :src="product.merchant?.icon" />
      </view>
      <view class="info ml-12 flex flex-col">
        <view class="info-name font-normal text-30 text-black">{{ product.merchant?.name }}</view>
        <view class="info-tips mt-24 font-normal text-24 text-[#4e4e4e]" v-if="product.type === 4"
          >【满开福袋，售罄后揭晓结果】</view
        ><view v-else>本次福袋支付后立即显示结果</view>
      </view>
    </view>
    <view
      class="right-btn theme-font w-146 h-56 bg-[#53d6ac] shadow-[0rpx_4rpx_0rpx_0rpx_#43a17f] rounded-8 text-center leading-56 font-normal text-30 text-white"
      @tap.stop="didClickMerchant(product.merchant)"
      >进店看看</view
    >
  </view>
</template>

<script setup lang="ts">
import type { UIProductDetailModel } from "@/model";
import { PropType } from "vue";
import { useMerchant } from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
});
</script>

<style lang="scss" scoped>
</style>
