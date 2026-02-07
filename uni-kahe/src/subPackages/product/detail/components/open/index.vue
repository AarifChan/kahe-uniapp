<template>
  <tn-popup
    v-model="vShow"
    :overlay-opacity="0.88"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="open">
      <view class="open-content">
        <view class="open-content-title theme-font"
          >购买成功，等待公布结果</view
        >
        <!--        <view class="open-content-subTitle">已成功购买{{ num }}张商品卡</view>-->
        <image
          class="open-content-img"
          src="https://jms.85gui7.com/kahe-202510/ka-he/product/all-open.png"
        />
        <view class="open-content-title1 theme-font">距最晚公布结果</view>
        <view class="open-content-time">
          <view class="open-content-time-value">{{ day }}</view>
          <view class="open-content-time-title">天</view>
          <view class="open-content-time-value">{{ hour }}</view>
          <view class="open-content-time-title">时</view>
          <view class="open-content-time-value">{{ minute }}</view>
          <view class="open-content-time-title">分</view>
          <view class="open-content-time-value">{{ second }}</view>
          <view class="open-content-time-title">秒</view>
        </view>
        <view class="open-content-row1">
          <image class="icon" src="https://jms.85gui7.com/kahe-202510/ka-he/product/open-info.png" />
          <view class="open-content-row1-title"
            >若提前售完，将立即公布结果；若未能售完，将对所有订单退款</view
          >
        </view>
        <view class="open-content-title2 theme-font"
          >积分将在揭晓结果后获得，可在积分专区兑好礼！</view
        >
        <button class="btn" open-type="share">
          <image class="btn-img" src="https://jms.85gui7.com/kahe-202510/ka-he/product/open-btn.png" />
          <view class="btn-title theme-font">分享并加速开奖</view>
        </button>
        <view
          class="open-content-title3"
          @tap.stop="emits('update:show', false)"
          >继续购买</view
        >
      </view>
      <image class="open-decorate1" src="https://jms.85gui7.com/kahe-202510/ka-he/product/open2.png" />
      <image class="open-decorate2" src="https://jms.85gui7.com/kahe-202510/ka-he/product/open1.png" />
      <image
        class="open-close"
        src="https://jms.85gui7.com/kahe-202510/ka-he/product/open-close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import { type PropType, ref, watch } from "vue";
import type { UIProductDetailModel } from "@/model";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, hour, day, second, minute, isTimeout } =
  useTimeCount();
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  num: {
    default: 1,
    type: Number,
  },
});

const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
    startTimeRemain(props.product.settleTime);
  }
);

const emits = defineEmits(["update:show"]);
</script>

<style lang="scss" scoped>
.open {
  position: relative;
  width: calc(750rpx - 140rpx);
  //height: 800rpx;
  &-content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-title {
      margin-top: 120rpx;
      width: 100%;
      text-align: center;
      font-weight: 400;
      font-size: 50rpx;
      line-height: 36rpx;
      background: linear-gradient(180deg, #ffa56a, #f46a64);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
    &-subTitle {
      margin-top: 44rpx;
      font-weight: normal;
      font-size: 26rpx;
      color: #ffffff;
      line-height: 36rpx;
    }
    &-img {
      margin-top: 60rpx;
      width: 249rpx;
      height: 224rpx;
    }
    &-title1 {
      margin-top: 43rpx;
      font-weight: 400;
      font-size: 34rpx;
      color: #ffffff;
      line-height: 36rpx;
    }
    &-title2 {
      margin-top: 23rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #ffcd55;
      line-height: 36rpx;
    }
    &-title3 {
      margin-top: 34rpx;
      font-weight: normal;
      font-size: 26rpx;
      color: #ffffff;
      line-height: 36rpx;
    }
    &-time {
      margin-top: 25rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-value {
        padding: 0 4rpx;
        height: 47rpx;
        background: rgba($color: #ffffff, $alpha: 0.5);
        border-radius: 4rpx;
        text-align: center;
        line-height: 47rpx;
        font-weight: normal;
        font-size: 34rpx;
        color: #ffffff;
      }
      &-title {
        font-weight: normal;
        font-size: 26rpx;
        color: #ffffff;
        line-height: 36rpx;
      }
    }
    &-row1 {
      margin-top: 16rpx;
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        width: 23rpx;
        height: 23rpx;
      }
      &-title {
        font-weight: normal;
        font-size: 20rpx;
        color: #ffffff;
        line-height: 36rpx;
      }
    }
  }
  &-decorate1 {
    position: absolute;
    left: 16rpx;
    top: 32rpx;
    width: 80rpx;
    height: 133rpx;
  }
  &-decorate2 {
    position: absolute;
    right: 16rpx;
    top: 140rpx;
    width: 45rpx;
    height: 65rpx;
  }
  &-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 54rpx;
    height: 54rpx;
  }
}

.btn {
  margin: 24rpx 0 0;
  position: relative;
  width: 603rpx;
  height: 87rpx;
  padding: 0;
  border: 0;
  background-color: transparent;
  &-img {
    width: 100%;
    height: 100%;
  }
  &-title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    text-align: center;
    font-weight: 400;
    line-height: 87rpx;
    font-size: 40rpx;
    color: #ffffff;
  }
}
.btn {
  padding: 0;
  margin: 24rpx 0 0;
  border: none;
  background-color: transparent;
}
</style>
