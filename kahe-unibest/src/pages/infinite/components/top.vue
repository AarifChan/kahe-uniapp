<template>
  <view class="top">
    <image class="top-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/machine/top-bg.png" />
    <image
      v-if="types"
      class="top-center"
      src="https://jms.85gui7.com/kahe-202510/images/infinite-girl.gif"
    />
    <image v-else class="top-center" src="https://jms.85gui7.com/kahe-202510/images/card-girl.gif" />
    <view class="top-left">
      <image class="top-left-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/machine/card-item-bg.png" />
      <view class="top-left-tips">vip客服-可可</view>
      <view v-if="types" class="top-left-title">
        主人，请选择心仪的抽卡机，海量卡牌任您挑选。
      </view>
      <view v-else class="top-left-title">
        主人，请选择心仪的抽卡机，海量卡牌任您挑选。
      </view>
    </view>
    <view class="top-right">
      <Barrage :list="goods" />
    </view>
  </view>
</template>
<script setup lang="ts">
import Barrage from "@/components/barrage/index.vue";
import type { UIBarrageModel } from "@/model";
import type { PropType } from "vue";
defineProps({
  goods: {
    type: Array as PropType<UIBarrageModel[]>,
    default: () => [],
  },
  types: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" scoped>
.top {
  position: relative;
  width: 100%;
  aspect-ratio: 788 / 379;
  &-center {
    position: absolute;
    left: 50%;
    top: -20rpx;
    transform: translateX(-50%);
    height: 360rpx;
    width: 340rpx;
  }
  &-bg {
    width: 100%;
    aspect-ratio: 788 / 379;
  }
  &-left {
    position: absolute;
    top: 181rpx;
    left: 40rpx;
    width: 436rpx;
    height: 104rpx;
    &-tips {
      position: absolute;
      left: 6rpx;
      top: 0;
      font-weight: normal;
      font-size: 18rpx;
      color: #000000;
    }
    &-bg {
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      left: 32rpx;
      top: 36rpx;
      margin-right: 8rpx;
      font-size: 20rpx;
      color: #ffffff;
    }
  }
  &-right {
    top: 142rpx;
    right: 48rpx;
    position: absolute;
    width: 242rpx;
    height: 154rpx;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
}
</style>
