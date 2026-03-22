<template>
  <view class="groupBuy">
    <!--    <image class="groupBuy-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/home/good-tiem.png" />-->
    <view class="groupBuy-content">
      <image class="groupBuy-content-icon" :src="item.logo" />
      <view class="groupBuy-content-info">
        <view class="groupBuy-content-info-title SimHei-font">{{
          item.title
        }}</view>
        <view class="groupBuy-content-info-row" style="margin-top: 37rpx">
          <view class="groupBuy-content-info-row-price SimHei-font"
            >¥{{ item.price }}</view
          >
          <view class="groupBuy-content-info-row-num SimHei-font"
            >余{{ item.num }}/共{{ item.total }}</view
          >
        </view>
        <view class="groupBuy-content-info-progress" style="margin-top: 5rpx">
          <view
            v-if="item.total > 0"
            class="groupBuy-content-info-progress-value"
            :style="progressStyles"
          >
          </view>
        </view>
        <view
          class="groupBuy-content-info-subTitle SimHei-font"
          style="margin-top: 15rpx"
          >{{ isOver ? "已结束" : "剩余时间" }}</view
        >
        <view class="groupBuy-content-info-row" style="margin-top: 5rpx">
          <view
            class="groupBuy-content-info-row-last SimHei-font"
            v-show="!isOver"
          >
            <view class="groupBuy-content-info-row-last-value">{{ day }}</view>
            <view class="groupBuy-content-info-row-last-title">天</view>
            <view class="groupBuy-content-info-row-last-value">{{ hour }}</view>
            <view class="groupBuy-content-info-row-last-title">时</view>
            <view class="groupBuy-content-info-row-last-value">{{
              minute
            }}</view>
            <view class="groupBuy-content-info-row-last-title">分</view>
            <view class="groupBuy-content-info-row-last-value">{{
              second
            }}</view>
            <view class="groupBuy-content-info-row-last-title">秒</view>
          </view>
          <view class="groupBuy-content-info-row-merchant">
            <image
              class="groupBuy-content-info-row-merchant-logo"
              :src="item.merchant?.icon"
            />
            <view
              class="groupBuy-content-info-row-merchant-name text-flow-ellipsis-single"
              >{{ item.merchant?.name ?? "" }}</view
            >
          </view>
        </view>
      </view>
      <image
        class="groupBuy-content-tag"
        src="https://jms.85gui7.com/kahe-202510/ka-he/home/kami-tag.png"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType } from "vue";
import { type GroupBuyItem } from "@/model";

import { divideAndTruncate } from "@/utils/tools";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, hour, day, second, minute, isTimeout } =
  useTimeCount();

const props = defineProps({
  item: {
    type: Object as PropType<GroupBuyItem>,
    default: {} as GroupBuyItem,
  },
});

const progressStyles = computed(() => {
  const a = props.item.num;
  const b = props.item.total;
  const progress = divideAndTruncate(a, b);
  return {
    width: `${progress * 100.0}%`,
  };
});

const isOver = computed(() => {
  const num = props.item.num;
  return num === 0 || isTimeout.value;
});

onMounted(() => {
  startTimeRemain(props.item.openTime);
});
</script>

<style lang="scss" scoped>
.groupBuy {
  display: inline-block;
  position: relative;
  width: 559rpx;
  height: 202rpx;
  margin-right: 12rpx;
  background-image: url("https://jms.85gui7.com/kahe-202510/ka-he/home/good-tiem.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &-content {
    //position: absolute;
    //left: 0;
    width: 559rpx;
    height: 202rpx;
    //top: 0;
    padding: 16rpx;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;

    &-icon {
      height: 170rpx;
      width: 170rpx;
      border-radius: 20rpx;
    }

    &-info {
      width: calc(100% - 170rpx - 12rpx);
      margin-left: 12rpx;
      display: flex;
      flex-direction: column;

      &-title {
        font-weight: 500;
        font-size: 24rpx;
        color: #000000;
      }

      &-progress {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 12rpx;
        background: #e0e0e0;
        border-radius: 6rpx;
        overflow: hidden;

        &-value {
          height: 100%;
          background: #ffac5b;
        }
      }

      &-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &-price {
          font-weight: 400;
          font-size: 24rpx;
          color: #000000;
        }

        &-num {
          font-weight: 400;
          font-size: 20rpx;
          color: #000000;
        }

        &-last {
          display: flex;
          flex-direction: row;
          align-items: center;

          &-title {
            font-weight: 400;
            font-size: 22rpx;
            color: #000000;
          }

          &-value {
            text-align: center;
            line-height: 30rpx;
            font-weight: 400;
            font-size: 22rpx;
            color: #845334;
            width: 30rpx;
            height: 30rpx;
            background: #ffd3a2;
            border-radius: 6rpx;
          }
        }

        &-merchant {
          display: flex;
          flex-direction: row;
          align-items: center;

          &-name {
            max-width: 120rpx;
            margin-left: 5rpx;
            font-weight: normal;
            font-size: 18rpx;
            color: #000000;
          }

          &-logo {
            width: 36rpx;
            height: 36rpx;
            border-radius: 50%;
          }
        }
      }

      &-subTitle {
        font-weight: 400;
        font-size: 16rpx;
        color: #6e6e6e;
      }
    }

    &-tag {
      position: absolute;
      left: 26rpx;
      top: -4rpx;
      width: 59rpx;
      height: 34rpx;
    }
  }
}
</style>
