<template>
  <view class="collect">
    <image class="collect-bg" src="https://jms.85gui7.com/kahe-202510/collect/item-bg.png" />
    <view class="collect-item">
      <view class="collect-item-top">
        <view class="collect-item-top-line" />
        <view class="collect-item-top-label">{{
          isTimeout ? "已结束" : "进行中"
        }}</view>
        <view v-if="!isTimeout" class="collect-item-top-time"
          >结束时间：{{ item.expireTime }}</view
        >
      </view>
      <view class="collect-item-content">
        <image class="collect-item-content-logo" :src="item.logo" />
        <view class="collect-item-content-info">
          <view
            class="collect-item-content-info-title text-flow-ellipsis-multiple"
            >{{ item.name }}</view
          >
          <view class="collect-item-content-info-price"
            >￥{{ item.price.toFixed(2) }}</view
          >
          <view class="collect-item-content-info-subTitle">
            <view style="color: #0070bf">{{ item.sales }}</view>
            <view style="color: #000000">人已集成/余</view>
            <view style="color: #0070bf">{{ item.total - item.sales }}</view>
          </view>
          <view class="collect-item-content-info-progress">
            <view class="collect-item-content-info-progress-title">进度：</view>
            <view class="collect-item-content-info-progress-bar">
              <view
                class="collect-item-content-info-progress-bar-value"
                :style="progressStyle"
              />
            </view>
          </view>
          <view
            v-if="!isTimeout"
            class="collect-item-content-info-btn"
            style="bottom: 48rpx"
            @tap.stop="emits('didExchangeItem', item)"
          >
            <image
              class="collect-item-content-info-btn-bg"
              src="https://jms.85gui7.com/kahe-202510/collect/btn1.png"
            />
            <view class="collect-item-content-info-btn-title theme-font"
              >去兑换</view
            >
          </view>
          <view
            v-if="!isTimeout"
            class="collect-item-content-info-btn"
            @tap.stop="emits('didClickItem', item)"
          >
            <image
              class="collect-item-content-info-btn-bg"
              src="https://jms.85gui7.com/kahe-202510/collect/btn4.png"
            />
            <view class="collect-item-content-info-btn-title theme-font"
              >去集赏</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import { CollectListObject } from "@/api/collect";
import dayjs from "dayjs";

const props = defineProps({
  item: {
    default: {} as CollectListObject,
    type: Object as PropType<CollectListObject>,
  },
});

const isTimeout = computed(() => {
  const now: Date = new Date();
  const timeDifference =
    dayjs(props.item.expireTime).valueOf() - Number(now.getTime());
  return timeDifference <= 0;
});

function divideAndTruncate(a: number, b: number): number {
  const result = a / b;
  const factor = Math.pow(10, 4); // 10^4 = 10000
  return Math.floor(result * factor) / factor; // 截断小数部分
}
const progressStyle = computed(() => {
  if (!props.item || !props.item.total) {
    return {
      width: 0,
    };
  }
  const a = props.item.total - props.item.sales;
  const b = props.item.total;
  const progress = divideAndTruncate(a, b) * 100;
  return {
    width: `${Number(progress)}%`,
  };
});
const emits = defineEmits(["didClickItem", "didExchangeItem"]);
</script>

<style lang="scss" scoped>
.collect {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  height: 236rpx;
  border-radius: 10rpx;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-item {
    position: absolute;
    left: 0;
    top: 0;
    padding: 16rpx;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-top {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-line {
        width: 2rpx;
        height: 19rpx;
        background: #0070bf;
      }
      &-label {
        margin-left: 2rpx;
        font-weight: normal;
        font-size: 20rpx;
        color: #0070bf;
        line-height: 30rpx;
      }
      &-time {
        margin-left: 8rpx;
        font-weight: normal;
        font-size: 16rpx;
        color: #0070bf;
        line-height: 30rpx;
      }
    }
    &-content {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-logo {
        width: 164rpx;
        height: 164rpx;
        background: rgba(210, 220, 245, 0.8);
        border-radius: 10rpx;
        border: 3rpx solid #8bb8ea;
      }
      &-info {
        position: relative;
        width: calc(100% - 32rpx - 164rpx);
        margin-left: 18rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &-title {
          font-weight: normal;
          font-size: 26rpx;
          color: #000000;
          line-height: 30rpx;
        }
        &-price {
          margin: 4rpx 0;
          font-weight: normal;
          font-size: 20rpx;
          color: #0070bf;
          line-height: 30rpx;
        }
        &-subTitle {
          background: rgba($color: #ffffff, $alpha: 0.48);
          border-radius: 4rpx;
          padding: 2rpx 8rpx;
          font-weight: normal;
          font-size: 20rpx;
          color: #000000;
          display: flex;
          flex-direction: row;
          width: max-content;
        }
        &-progress {
          margin-top: 4rpx;
          display: flex;
          flex-direction: row;
          align-items: center;
          &-title {
            font-weight: normal;
            font-size: 20rpx;
            color: #0070bf;
            line-height: 30rpx;
          }
          &-bar {
            position: relative;
            width: 282rpx;
            height: 17rpx;
            background: rgba($color: #070707, $alpha: 0.19);
            border-radius: 9rpx;
            overflow: hidden;
            &-value {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, #ffd8a8, #fea34f);
            }
          }
        }
        &-btn {
          position: absolute;
          bottom: -8rpx;
          right: 0;
          width: 111rpx;
          height: 41rpx;
          &-bg {
            width: 100%;
            height: 100%;
          }
          &-title {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            line-height: 41rpx;
            text-align: center;
            font-weight: 400;
            font-size: 22rpx;
            color: #ffffff;
            text-shadow:
              -1px -1px 0 #b94905,
              1px -1px 0 #b94905,
              -1px 1px 0 #b94905,
              1px 1px 0 #b94905;
          }
        }
      }
    }
  }
}
</style>
