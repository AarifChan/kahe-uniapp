<template>
  <view class="topInfo">
    <image class="topInfo-bg" src="https://jms.85gui7.com/kahe-202510/groupBuy/top-card.png" />
    <view class="topInfo-content">
      <view class="topInfo-content-head">
        <view class="left">{{ detail.price }}</view>
        <view class="right">
          <view class="row">
            <view class="title">距离结束还剩</view>
            <view class="time">
              <view class="timeItem">
                <image
                  class="timeItem-img"
                  src="https://jms.85gui7.com/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day">{{ day }}</view>
                <view class="timeItem-unit">天</view>
              </view>
              <view class="timeItem">
                <image
                  class="timeItem-img"
                  src="https://jms.85gui7.com/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day">{{ hour }}</view>
                <view class="timeItem-unit">时</view>
              </view>
              <view class="timeItem">
                <image
                  class="timeItem-img"
                  src="https://jms.85gui7.com/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day">{{ minute }}</view>
                <view class="timeItem-unit">分</view>
              </view>
              <view class="timeItem">
                <image
                  class="timeItem-img"
                  src="https://jms.85gui7.com/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day">{{ second }}</view>
                <view class="timeItem-unit">秒</view>
              </view>
            </view>
          </view>
          <view class="row" style="font-size: 20rpx">
            编号：{{ detail?.sid }}
          </view>
        </view>
      </view>
      <view>
        <view class="topInfo-content-progress">
          <view
            v-if="detail.total > 0"
            class="topInfo-content-progress-value"
            :style="{
              width: `${((detail.total - detail.sales) / detail.total) * 100.0}%`,
            }"
          ></view>
        </view>
        <view class="topInfo-content-row1">
          <view class="topInfo-content-row1-subTitle"
            >开售 {{ detail.openTime }}</view
          >
          <view class="topInfo-content-row1-subTitle"
            >余{{ detail.total - detail.sales }}/共{{ detail.total }}</view
          >
        </view>
      </view>
      <view
        class="topInfo-content-title theme-font text-flow-ellipsis-single"
        >{{ detail.title }}</view
      >
      <scroll-view class="topInfo-content-row2" scroll-x>
        <view
          v-for="(item, index) in detail.prices"
          :key="'price' + index"
          class="topInfo-content-row2-price"
          >单笔满{{ item.num }}份｜{{ item.price }}/份</view
        >
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { GroupBuyDetail } from "@/model";
import { onMounted, PropType, watch } from "vue";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, remainingTime, isTimeout, day, hour, second, minute } =
  useTimeCount();
const props = defineProps({
  detail: {
    default: {} as GroupBuyDetail,
    type: Object as PropType<GroupBuyDetail>,
  },
});
watch(
  () => props.detail,
  (value) => {
    if (value && value.id) {
      startTimeRemain(value.openTime);
    }
  }
);
onMounted(() => {});
</script>

<style scoped lang="scss">
.topInfo {
  margin: 16rpx auto;
  position: relative;
  width: 730rpx;
  height: 341rpx;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    padding: 16rpx;
    &-head {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      .left {
        font-size: 50rpx;
        line-height: normal;
        color: #ffffff;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 20rpx;
        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          gap: 20rpx;
          color: white;
          .title {
            font-size: 24rpx;
            color: #ffffff;
          }
          .time {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10rpx;
            .timeItem {
              position: relative;
              width: 50rpx;
              height: 54rpx;
              &-img {
                width: 100%;
                height: 100%;
              }
              &-day {
                position: absolute;
                left: 0;
                top: 6rpx;
                width: 100%;
                text-align: center;
                font-size: 20rpx;
                color: #000000;
              }
              &-unit {
                position: absolute;
                left: 0;
                bottom: 0rpx;
                width: 100%;
                text-align: center;
                font-size: 18rpx;
                color: white;
              }
            }
          }
        }
      }
    }
    &-progress {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 14rpx;
      background: #000000;
      border-radius: 6rpx;
      overflow: hidden;
      &-value {
        height: 100%;
        background: #ffffff;
      }
    }
    &-row1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &-title {
        font-weight: normal;
        font-size: 20rpx;
        color: #ffffff;
      }
      &-price {
        font-weight: normal;
        font-size: 20rpx;
        color: #ffffff;
      }
      &-subTitle {
        font-weight: normal;
        font-size: 20rpx;
        color: #ffffff;
      }
    }
    &-row2 {
      position: relative;
      white-space: nowrap;

      &-price {
        width: 202rpx;
        height: 41rpx;
        line-height: 41rpx;
        display: inline-block;
        margin-right: 12rpx;
        font-weight: normal;
        font-size: 20rpx;
        color: #794627;
        text-align: center;
        background-image: url("https://jms.85gui7.com/kahe-202510/groupBuy/discount-item.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 4rpx;
      }
    }
    &-title {
      font-size: 42rpx;
      color: #fcd09d;
      width: 100%;
      text-align: left;
    }
  }
}
</style>
