<template>
  <view class="payItem">
    <view class="payItem-top">
      <image class="payItem-top-icon" src="https://jms.85gui7.com/kahe-202510/order/item.png" />
      <view class="payItem-top-title">{{ item.title }}</view>
    </view>
    <view
      class="payItem-content"
      v-for="(goods, zIndex) in goodsList"
      :key="item.id + ':' + zIndex"
    >
      <image class="payItem-content-logo" :src="goods.goodsDto?.image" />
      <view class="payItem-content-info">
        <view class="payItem-content-info-title">{{ goods.goodsDto?.name }}</view>
        <view class="payItem-content-info-bottom">
          <view class="payItem-content-info-bottom-price"></view>
          <view class="payItem-content-info-bottom-num">X{{ goods.num }}</view>
        </view>
      </view>
    </view>
    <view class="payItem-bottom theme-font">
      <view class="payItem-bottom-title">共</view>
      <view class="payItem-bottom-value">{{ item.num }}</view>
      <view class="payItem-bottom-title">件</view>
      <view class="payItem-bottom-title">合计</view>
      <view class="payItem-bottom-value">¥{{ item.price + item.ticket + item.coin }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue'
  import { ProductGoodsModel, ProductOrderModel } from '@/model'

  const props = defineProps({
    item: {
      default: {},
      type: Object as PropType<ProductOrderModel>
    }
  })

  const goodsList = computed(() => {
    let tmpList = props.item?.goods ?? []
    const mergedMap = tmpList.reduce((acc, current) => {
      if (acc.has(current.id)) {
        const existingItem = acc.get(current.id)!
        existingItem.num += 1
      } else {
        current.num = 1
        acc.set(current.id, {
          ...current
        })
      }
      return acc
    }, new Map<number, ProductGoodsModel>())

    return Array.from(mergedMap.values())
  })
</script>

<style lang="scss" scoped>
  .payItem {
    width: 100%;
    padding: 22rpx;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 20rpx;
    border: 3rpx solid #000000;
    margin-bottom: 24rpx;

    &-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 0 12rpx 13rpx;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.05);
      &-icon {
        width: 26rpx;
        height: 26rpx;
      }
      &-title {
        margin-left: 8rpx;
        font-size: 24rpx;
        color: #010101;
      }
    }
    &-content {
      position: relative;
      box-sizing: border-box;
      padding: 20rpx 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-logo {
        width: 162rpx;
        height: 162rpx;
        border-radius: 10rpx;
      }
      &-info {
        position: relative;
        width: 100%;
        margin-left: 14rpx;
        height: 140rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &-title {
          font-weight: normal;
          font-size: 28rpx;
          color: #010101;
        }
        &-bottom {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &-price {
            font-weight: normal;
            font-size: 30rpx;
            color: #010101;
          }
          &-num {
            font-weight: normal;
            font-size: 30rpx;
            color: #010101;
          }
        }
      }
    }
    &-bottom {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 12rpx 0 0;
      border-top: 1px solid rgba($color: #000000, $alpha: 0.05);
      &-value {
        font-weight: 400;
        font-size: 28rpx;
        color: #ff610f;
      }
      &-title {
        font-weight: 400;
        font-size: 28rpx;
        color: #010101;
      }
    }
  }
</style>
