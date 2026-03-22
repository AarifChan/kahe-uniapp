<template>
  <view class="coupon-list-item">
    <image
      class="coupon-list-item-bg"
      :src="item.status === 0 ? 'https://jms.85gui7.com/kahe-202510/coupon/coupon1.png' : 'https://jms.85gui7.com/kahe-202510/coupon/coupon2.png'"
    />
    <view class="coupon-list-item-left">
      <view class="coupon-list-item-left-title">{{ item.title }}</view>

      <view class="coupon-list-item-left-title"
        >单次购买满{{ item.useMinPrice }}减{{ item.price }}元</view
      >
      <view class="coupon-list-item-left-title">{{ item.time }}</view>
    </view>
    <view class="coupon-list-item-right">
      <view class="coupon-list-item-right-price theme-font"
        >￥<text :style="{ fontSize: '60rpx' }">{{ item.price }}</text>
      </view>
      <view class="coupon-list-item-right-title">优惠券</view>
      <view class="coupon-list-item-right-btn">
        <image
          class="coupon-list-item-right-btn-img"
          :src="item.status === 0 ? 'https://jms.85gui7.com/kahe-202510/coupon/btn1.png' : 'https://jms.85gui7.com/kahe-202510/coupon/btn2.png'"
        />
        <view class="coupon-list-item-right-btn-title theme-font">{{
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
  .coupon-list-item {
    position: relative;
    width: 100%;
    aspect-ratio: 697 / 239;

    margin-bottom: 16rpx;
    &-bg {
      position: relative;
      width: 100%;
      height: 100%;
    }
    &-left {
      position: absolute;
      left: 56rpx;
      top: 0;
      width: 390rpx;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 24rpx;
      &-title {
        font-size: 26rpx;
        color: #000000;
      }

      &-title:nth-child(2) {
        font-size: 20rpx;
        color: #010101;
      }

      &-title:nth-child(3) {
        font-size: 20rpx;
        color: #848484;
      }
    }

    &-right {
      position: absolute;
      top: 0;
      right: 0;
      width: 250rpx;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 18rpx;
      &-price {
        color: #ffffff;
        font-size: 36rpx;
      }

      &-title {
        font-weight: normal;
        font-size: 20rpx;
        color: #ffffff;
      }

      &-btn {
        position: relative;
        width: 152rpx;
        height: 48rpx;

        &-img {
          width: 100%;
          height: 100%;
        }
        &-title {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          color: #ffffff;
          font-size: 36rpx;
          line-height: 48rpx;
          text-align: center;
        }
      }

      .disable {
        color: #7b7b7b;
      }
    }
  }
</style>
