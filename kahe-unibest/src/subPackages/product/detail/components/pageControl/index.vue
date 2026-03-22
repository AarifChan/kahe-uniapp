<template>
  <view class="pageControl">
    <view class="pageControl-side" @tap.stop="emits('didClickChangeBox', true)">
      <image class="pageControl-side-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/product/left.png" />
    </view>
    <view class="pageControl-center">
      <text class="pageControl-center-title">第</text>
      <text class="pageControl-center-value">{{ product.current }}</text>
      <text class="pageControl-center-title"
        >/{{ product.lastSeq }}箱 商品剩余</text
      >
      <text class="pageControl-center-value">{{ product.num }}</text>
      <text class="pageControl-center-title">/{{ product.total }}</text>
    </view>
    <view
      class="pageControl-side"
      @tap.stop="emits('didClickChangeBox', false)"
    >
      <image
        class="pageControl-side-bg"
        src="https://jms.85gui7.com/kahe-202510/ka-he/product/right.png"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UIProductDetailModel } from "@/model";
import type { PropType } from "vue";

defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  currentBox: {
    default: 1,
    type: Number,
  },
  totalBox: {
    default: 10,
    type: Number,
  },
  leaveNum: {
    default: 1,
    type: Number,
  },
  totalNum: {
    default: 80,
    type: Number,
  },
});

const emits = defineEmits(["didClickChangeBox"]);
</script>

<style lang="scss" scoped>
.pageControl {
  position: relative;
  margin-top: 10rpx;
  width: calc(100% - 20rpx);
  height: 63rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &-side {
    position: relative;
    width: 123rpx;
    height: 60rpx;
    &-bg {
      width: 100%;
      height: 100%;
    }
    &-title1 {
      position: absolute;
      right: 18rpx;
      top: 0;
      line-height: 48rpx;
      width: calc(100% - 18rpx);
      text-align: right;
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
    }
    &-title2 {
      position: absolute;
      left: 18rpx;
      top: 0;
      line-height: 48rpx;
      width: calc(100% - 18rpx);
      text-align: left;
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
    }
  }
  &-center {
    position: relative;
    width: 403rpx;
    height: 56rpx;
    background: #5ad7af;
    box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
    border-radius: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 20rpx;
    text-shadow:
      -1px -1px 0 #378d6e,
      1px -1px 0 #378d6e,
      -1px 1px 0 #378d6e,
      1px 1px 0 #378d6e;
    &-title {
      font-size: 22rpx;
      font-weight: 400;
      color: #ffffff;
    }
    &-value {
      font-size: 22rpx;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
