<template>
  <view class="item" :style="itemBgStyle">
    <view class="item-pic">
      <image
        class="item-pic-tag"
        src="/static/kahe-202510/challenge/pingtuan-tag.png"
        mode="aspectFit"
      />
      <image
        class="item-pic-logo"
        :src="item.logo"
        mode="aspectFill"
      />
    </view>

    <view class="item-info">
      <view class="item-row">
        <view class="item-title">{{ item.title }}</view>
        <view class="item-price">¥{{ item.price }}</view>
      </view>

      <view class="item-countdown">
        <text class="item-countdown-text">{{ isOver ? "已结束" : remainingTime }}</text>
      </view>

      <view class="item-row">
        <view class="item-progress">
          <view
            v-if="item.total > 0"
            class="item-progress-value"
            :style="progressStyles"
          ></view>
        </view>
        <text class="item-remain">余{{ item.num }}/共{{ item.total }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType } from "vue";
import { type GroupBuyItem } from "@/model";

import { divideAndTruncate } from "@/utils/tools";
import { useTimeCount } from "@/composables/countTime";

const { startTimeRemain, remainingTime, isTimeout } = useTimeCount();

const props = defineProps({
  item: {
    type: Object as PropType<GroupBuyItem>,
    default: () => ({} as GroupBuyItem),
  },
});

/** 用对象样式避免内联 url(&quot;...) 编译到 WXML 时引号/斜杠被误解析（miniprogram-ci 报 unexpected `/`） */
const itemBgStyle = {
  backgroundImage: "url(/static/kaju/home/good-bg.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

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
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 8rpx 12rpx;
  gap: 12rpx;

  &-pic {
    position: relative;
    flex-shrink: 0;
    width: 88rpx;
    height: 88rpx;

    &-tag {
      position: absolute;
      top: -4rpx;
      left: -4rpx;
      width: 50rpx;
      height: 28rpx;
      z-index: 10;
    }

    &-logo {
      width: 100%;
      height: 100%;
      border-radius: 12rpx;
    }
  }

  &-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    height: 88rpx;
  }

  &-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 0;
  }

  &-title {
    flex: 1;
    font-size: 22rpx;
    font-weight: bold;
    color: #333333;
    line-height: 30rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8rpx;
  }

  &-price {
    flex-shrink: 0;
    font-size: 26rpx;
    font-weight: bold;
    color: #ff4d4f;
    line-height: 30rpx;
  }

  &-countdown {
    display: flex;
    align-items: center;

    &-text {
      font-size: 20rpx;
      color: #666666;
      line-height: 28rpx;
      font-family: monospace;
    }
  }

  &-progress {
    flex: 1;
    height: 8rpx;
    background: #e5e5e5;
    border-radius: 4rpx;
    overflow: hidden;
    margin-right: 8rpx;

    &-value {
      height: 100%;
      background: #ffac5b;
      border-radius: 4rpx;
    }
  }

  &-remain {
    flex-shrink: 0;
    font-size: 18rpx;
    color: #999999;
    line-height: 24rpx;
  }
}
</style>
