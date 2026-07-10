<template>
  <view class="coupon-list-item relative w-full aspect-ratio-[697/239] mb-16">
    <image
      class="coupon-list-item-bg relative w-full h-full"
      :src="item.status === 0 ? '/static/kahe-202510/coupon/coupon1.png' : '/static/kahe-202510/coupon/coupon2.png'"
    />
    <view class="coupon-list-item-left absolute left-56 top-0 w-390 h-full flex flex-col items-start justify-center gap-24">
      <view class="coupon-list-item-left-title text-26 text-black">{{ item.title }}</view>

      <view class="coupon-list-item-left-title text-20 text-[#010101]"
        >单次购买满{{ item.useMinPrice }}减{{ item.price }}元</view
      >
      <view class="coupon-list-item-left-title text-20 text-[#848484]">{{ item.time }}</view>
    </view>
    <view class="coupon-list-item-right absolute top-0 right-0 w-250 h-full flex flex-col justify-center items-center gap-18">
      <view class="coupon-list-item-right-price theme-font text-36 text-white"
        >￥<text :style="{ fontSize: '60rpx' }">{{ item.price }}</text>
      </view>
      <view class="coupon-list-item-right-title font-normal text-20 text-white">优惠券</view>
      <view class="coupon-list-item-right-btn relative w-152 h-48">
        <image
          class="coupon-list-item-right-btn-img w-full h-full"
          :src="item.status === 0 ? '/static/kahe-202510/coupon/btn1.png' : '/static/kahe-202510/coupon/btn2.png'"
        />
        <view class="coupon-list-item-right-btn-title absolute left-0 top-0 w-full text-white text-36 leading-48 text-center theme-font">{{
          item.status === 0 ? '去使用' : '已失效'
        }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { type UICouponModel } from '@/model'
  import type { PropType } from 'vue'

  defineProps({
    item: {
      default: {} as UICouponModel,
      type: Object as PropType<UICouponModel>
    }
  })
</script>

<style lang="scss" scoped>
</style>
