<template>
  <view
    class="goods"
    v-for="(item, index) in list"
    :key="index"
    @tap.stop="emits('tapCardListItem', item)"
  >
    <image class="goods-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/machine/item-bg.png" />
    <view class="goods-left">
      <image class="goods-left-img" :src="item.logo" mode="widthFix" />
    </view>
    <view class="goods-right">
      <view class="goods-right-title theme-font">{{ item.title }}</view>
      <view style="display: flex; align-items: center">
        <view class="goods-right-price price-font">￥{{ item.price }}</view>
        <view class="goods-right-num"
          >含<text>{{ item.goods?.length ?? 0 }}</text
          >种卡牌</view
        >
      </view>
      <view class="goods-right-bottom">
        <scroll-view
          :scroll-x="true"
          :enable-flex="true"
          scroll-with-animation
          class="goods-right-bottom-scroll"
        >
          <view
            class="goods-right-bottom-scroll-item"
            v-for="(goods, index) in item.goods"
            :key="index"
          >
            <image
              class="goods-right-bottom-scroll-item-img"
              :src="goods.image"
            />
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { type ProductBoxModel } from "@/model";
defineProps({
  list: {
    type: Array as () => ProductBoxModel[],
    default: () => [],
  },
});
const emits = defineEmits(["tapCardListItem"]);
</script>
<style lang="scss" scoped>
.goods {
  position: relative;
  width: 710rpx;
  height: 258rpx;
  margin: 30rpx auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  &-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }
  &-left {
    position: relative;
    width: 92rpx;
    margin-left: 50rpx;
    &-img {
      width: 100%;
      height: 100%;
    }
  }
  &-right {
    position: relative;
    width: 518rpx;
    margin-left: 28rpx;
    &-num {
      text-align: center;
      width: 143rpx;
      line-height: 30rpx;
      height: 30rpx;
      background: #f1855f;
      border-radius: 6rpx;
      font-size: 16rpx;
      color: #ffffff;
    }
    &-title {
      position: relative;
      font-size: 30rpx;
      color: #000000;
    }
    &-price {
      margin-right: 20rpx;
      position: relative;
      font-size: 28rpx;
      color: #000000;
    }
    &-text {
      position: relative;
      font-size: 20rpx;
      color: #505050;
      margin-bottom: 5rpx;
    }
    &-bottom {
      display: flex;
      &-scroll {
        white-space: nowrap;
        width: 100%;
        margin-top: 10rpx;
        &-item {
          display: inline-block;
          position: relative;
          width: 60rpx;
          height: calc(60rpx / 300 * 420);
          margin-right: 12rpx;
          &-img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
