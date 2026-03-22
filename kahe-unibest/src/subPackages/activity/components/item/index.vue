<template>
  <view class="activityItem">
    <image class="activityItem-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/item-bg.png" />

    <view class="activityItem-top">
      <image
        class="activityItem-top-bg"
        src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/title-bg.png"
      />
      <view class="activityItem-top-title">{{ item.title }}</view>
    </view>
    <view class="activityItem-info">
      <image class="activityItem-info-img" :src="item.merchant?.icon" />
      <view class="activityItem-info-title text-flow-ellipsis-single">{{
        item.merchant?.name
      }}</view>
    </view>
    <scroll-view
      class="activityItem-list"
      :enable-flex="true"
      :scroll-x="true"
      scroll-with-animation
    >
      <image
        class="activityItem-list-item"
        v-for="(zItem, index) in item.goods"
        :key="zItem.goodsDto.id"
        :src="zItem.goodsDto.image"
        mode="heightFix"
      />
    </scroll-view>

    <view class="activityItem-btn" @tap.stop="emits('didClickItem', item)">
      <image
        class="activityItem-btn-img"
        src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/btn-bg.png"
      />
      <view class="activityItem-btn-title theme-font">立即进入</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { UIWelfareList } from "@/model";

defineProps({
  item: {
    default: {},
    type: Object as PropType<UIWelfareList>,
  },
});
const emits = defineEmits(["didClickItem"]);
</script>

<style lang="scss" scoped>
.activityItem {
  position: relative;
  width: 100%;
  aspect-ratio: 224 / 333;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-title {
    position: absolute;
    left: 20rpx;
    top: 0;
    width: calc(100% - 40rpx);
    font-weight: normal;
    text-align: center;
    font-size: 18rpx;
    color: #ffffff;
  }
  &-list {
    position: absolute;
    bottom: 86rpx;
    left: 8rpx;
    width: calc(100% - 16rpx);
    height: 80rpx;
    white-space: nowrap;
    &-item {
      display: inline-block;
      width: 60rpx;
      height: 60rpx;
      background-color: white;
      border-radius: 8rpx;
      margin-right: 16rpx;
    }
  }
  &-top {
    position: absolute;
    top: 0;
    left: 16rpx;
    width: 186rpx;
    height: 34rpx;
    &-bg {
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      left: 0;
      top: 8rpx;
      width: 100%;
      text-align: center;
      color: #501111;
      font-size: 18rpx;
    }
  }
  &-btn {
    position: absolute;
    width: 124rpx;
    height: 42rpx;
    bottom: 32rpx;
    left: calc(50% - 65rpx);
    &-img {
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 38rpx;
      width: 100%;
      text-align: center;
      font-weight: 400;
      font-size: 22rpx;
      color: #fefefe;
      @include text-stroke-color(#428d28);
    }
  }
  &-info {
    position: absolute;
    left: 0;
    top: 40rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 8rpx;
      border: 1rpx solid white;
    }

    &-title {
      margin-top: 12rpx;
      text-align: center;
      font-weight: normal;
      font-size: 20rpx;
      width: 80%;
      color: #454545;
    }
  }
}
</style>
