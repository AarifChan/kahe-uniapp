<template>
  <view class="remark">
    <image class="remark-bg" src="https://jms.85gui7.com/kahe-202510/groupBuy/remark-bg.png" />
    <view class="remark-content">
      <view class="remark-content-info">
        <view class="title">随机卡密</view>
        <image class="icon" src="https://jms.85gui7.com/kahe-202510/groupBuy/info.png" />
      </view>
      <image class="remark-content-gift" src="https://jms.85gui7.com/kahe-202510/groupBuy/gift.png" />
      <view class="remark-content-title">{{ detail.title }}卡密一张</view>
      <view class="remark-content-content" @tap.stop="emits('didClick')">
        <view class="remark-content-content-title theme-font">备注</view>
        <view class="remark-content-content-detail">{{
          stripHTMLTags(detail.remark)
        }}</view>
        <image
          class="remark-content-content-right"
          src="https://jms.85gui7.com/kahe-202510/groupBuy/right-arrow.png"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { GroupBuyDetail } from "@/model";
import { PropType } from "vue";

defineProps({
  detail: {
    default: {} as GroupBuyDetail,
    type: Object as PropType<GroupBuyDetail>,
  },
});

const emits = defineEmits(["didClick"]);

const stripHTMLTags = (html: string) => {
  return html?.replace(/<[^>]*>/g, "") ?? "";
};
</script>

<style scoped lang="scss">
.remark {
  position: relative;
  width: 730rpx;
  height: 341rpx;
  margin: 0 auto 16rpx;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &-info {
      position: absolute;
      top: 4rpx;
      right: 10rpx;

      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4rpx;
      .title {
        font-weight: 400;
        font-size: 24rpx;
        color: #794627;
        line-height: 30rpx;
      }
      .icon {
        width: 30rpx;
        height: 30rpx;
      }
    }
    &-gift {
      position: absolute;
      top: 44rpx;
      left: 35rpx;
      width: 70rpx;
      height: 50rpx;
    }
    &-title {
      position: absolute;
      top: 52rpx;
      left: 130rpx;
      color: white;
      font-size: 30rpx;
    }
    &-content {
      position: absolute;
      left: 16rpx;
      top: 108rpx;
      width: calc(100% - 32rpx);
      height: calc(100% - 108rpx - 18rpx);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20rpx;
      &-title {
        font-size: 30rpx;
        color: #ffffff;
      }
      &-detail {
        width: 560rpx;
        color: white;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      &-right {
        width: 14rpx;
        height: 25rpx;
      }
    }
  }
}
</style>
