<template>
  <view class="orderDetail">
    <view class="orderDetail-top" />
    <view class="orderDetail-info">
      <Item v-if="orderDetail?.blindboxOrder" :item="orderDetail?.blindboxOrder" />
    </view>

    <view class="orderDetail-content">
      <view class="orderDetail-content-payInfo">
        <view class="orderDetail-content-payInfo-row">
          <view class="orderDetail-content-payInfo-row-title">订单信息</view>
        </view>
        <view class="orderDetail-content-payInfo-row">
          <view class="orderDetail-content-payInfo-row-name">订单编号</view>
          <view class="orderDetail-content-payInfo-row-value">{{
            orderDetail?.order.orderId ?? '--'
          }}</view>
        </view>
        <view class="orderDetail-content-payInfo-row">
          <view class="orderDetail-content-payInfo-row-name">订单总价</view>
          <view class="orderDetail-content-payInfo-row-value">{{
            orderDetail?.order.totalPrice
          }}</view>
        </view>
        <view class="orderDetail-content-payInfo-row">
          <view class="orderDetail-content-payInfo-row-name">支付金额</view>
          <view class="orderDetail-content-payInfo-row-value">{{
            orderDetail?.order.payPrice
          }}</view>
        </view>
        <view class="orderDetail-content-payInfo-row">
          <view class="orderDetail-content-payInfo-row-name">支付方式</view>
          <view class="orderDetail-content-payInfo-row-value">微信支付</view>
        </view>
        <view class="orderDetail-content-payInfo-row">
          <view class="orderDetail-content-payInfo-row-name">创建时间</view>
          <view class="orderDetail-content-payInfo-row-value">{{
            orderDetail?.order.createTime
          }}</view>
        </view>
        <view class="orderDetail-content-payInfo-row">
          <view class="orderDetail-content-payInfo-row-name">支付时间</view>
          <view class="orderDetail-content-payInfo-row-value">{{
            orderDetail?.order.payTime
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { usePayedOrder } from './index'
  import { onMounted } from 'vue'
  import Item from './components/item.vue'
  import { getPageOptions } from '@/utils/tools'
  const { getOrderDetail, orderDetail } = usePayedOrder()

  onMounted(() => {
    const orderId = getPageOptions().orderId
    if (orderId) {
      getOrderDetail(orderId)
    }
  })
</script>

<style lang="scss" scoped>
  .orderDetail {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    &-top {
      width: 100%;
      height: 174rpx;
      background: linear-gradient(90deg, #ffe3bb, #ffc4ca);
    }

    &-info {
      padding: 32rpx 32rpx 0;
      width: 100%;
      box-sizing: border-box;
    }
    &-content {
      padding: 32rpx;
      width: 100%;
      box-sizing: border-box;
      background-color: #f5f5f5;
      &-payInfo {
        padding: 0 22rpx;
        width: 100%;
        background: #ffffff;
        border-radius: 20rpx;
        &-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 60rpx;
          justify-content: flex-start;
          border-bottom: 1rpx solid rgba($color: #000000, $alpha: 0.05);
          &-title {
            font-weight: normal;
            font-size: 24rpx;
            color: #010101;
          }
          &-name {
            font-weight: normal;
            font-size: 24rpx;
            color: #6c6c6c;
            line-height: 60rpx;
          }
          &-value {
            margin-left: 120rpx;
            font-weight: normal;
            font-size: 24rpx;
            color: #6c6c6c;
            line-height: 60rpx;
          }
        }

        &-row {
          border-bottom: none;
        }
      }
    }
  }
</style>
