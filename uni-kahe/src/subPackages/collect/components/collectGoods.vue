<template>
  <view class="collect-goods" @tap.stop="emits('didSelect', item)">
    <view class="collect-goods-top">
      <image
        class="collect-goods-top-logo"
        :src="item.goods.image"
        mode="heightFix"
      />
      <view class="collect-goods-top-num">X{{ item.num }}</view>
    </view>
    <view class="collect-goods-bottom">
      <view class="collect-goods-bottom-title text-flow-ellipsis-multiple">{{
        item.goods.name
      }}</view>
      <view class="collect-goods-bottom-subTitle"
        >助力值:{{ Number(item.goods.price * item.num).toFixed(2) }}</view
      >
    </view>

    <image class="collect-goods-bg" src="https://jms.85gui7.com/kahe-202510/collect/card-bg.png" />
    <view class="collect-goods-select">
      <view v-if="item.selected" class="collect-goods-select-target" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { UserGoodsSelectModel } from "@/subPackages/collect/detail/index";

defineProps({
  item: {
    default: {} as UserGoodsSelectModel,
    type: Object as PropType<UserGoodsSelectModel>,
  },
});
const emits = defineEmits(["didSelect"]);
</script>

<style lang="scss" scoped>
.collect-goods {
  position: relative;
  width: 100%;
  aspect-ratio: 216 / 302;
  overflow: hidden;
  border-radius: 20rpx;
  box-shadow: 0rpx 3rpx 3rpx 0rpx #587a95;
  &-top {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-logo {
      width: 180rpx;
      height: 180rpx;
    }
    &-num {
      position: absolute;
      bottom: 20rpx;
      right: 16rpx;
      padding: 6rpx 12rpx;
      background: rgba($color: #28b1ff, $alpha: 0.7);
      border-radius: 4rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #ffffff;
      z-index: 3;
    }
  }
  &-bottom {
    position: absolute;
    bottom: 24rpx;
    left: 16rpx;
    width: calc(100% - 32rpx);
    display: flex;
    flex-direction: column;
    z-index: 3;
    &-title,
    &-subTitle {
      font-weight: 400;
      font-size: 20rpx;
      color: #ffffff;
      line-height: 20rpx;
      text-shadow:
        -1px -1px 0 #1aa1ff,
        1px -1px 0 #1aa1ff,
        -1px 1px 0 #1aa1ff,
        1px 1px 0 #1aa1ff;
    }
    &-title {
      height: 40rpx;
    }
    &-subTitle {
      margin-top: 8rpx;
    }
  }
  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  &-select {
    z-index: 3;
    position: absolute;
    right: 24rpx;
    top: 16rpx;
    width: 34rpx;
    height: 34rpx;
    border-radius: 16rpx;
    border: 2rpx solid #68d6ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-target {
      padding: 4rpx;
      width: 26rpx;
      height: 26rpx;
      border-radius: 13rpx;
      background-color: #68d6ff;
    }
  }
}
</style>
