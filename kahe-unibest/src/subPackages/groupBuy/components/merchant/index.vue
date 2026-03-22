<template>
  <view class="merchantCard">
    <view class="left">
      <view class="avatar">
        <image class="avatar-img" :src="merchant?.icon" />
      </view>
      <view class="info">
        <view class="info-name text-flow-ellipsis-single">{{
          merchant?.name
        }}</view>
        <view
          class="info-bar"
          :style="{
            backgroundColor: getTagBgColor(merchant?.tag),
          }"
        >
          <image class="info-bar-tag" :src="getTagIcon(merchant.tag)" />
          <text class="info-bar-title">{{ getLevelName(merchant.tag) }}</text>
        </view>
      </view>
    </view>
    <view class="right-btn theme-font" @tap.stop="didClickMerchant(merchant)"
      >进店看看</view
    >
  </view>
</template>

<script setup lang="ts">
import { UIMerchant } from "@/model";
import { PropType } from "vue";
import {
  getLevelName,
  getTagBgColor,
  getTagIcon,
  useMerchant,
} from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
defineProps({
  merchant: {
    default: {} as UIMerchant,
    type: Object as PropType<UIMerchant>,
  },
});
</script>

<style scoped lang="scss">
.merchantCard {
  margin: 32rpx auto;
  position: relative;
  width: 730rpx;
  height: 201rpx;
  box-sizing: border-box;
  padding: 32rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-image: url("https://jms.85gui7.com/kahe-202510/groupBuy/merchat-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.left {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar {
  width: 131rpx;
  height: 131rpx;
  background: #ffffff;
  box-shadow: 0rpx 3rpx 7rpx 0rpx #d4d4d4;
  border-radius: 50%;
  padding: 8rpx;
  &-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.info {
  position: relative;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
  width: calc(100% - 160rpx);
  &-name {
    font-weight: 400;
    font-size: 30rpx;
    color: #ffffff;
  }
  &-tips {
    margin-top: 24rpx;
    font-weight: 400;
    font-size: 18rpx;
    color: #4e4e4e;
  }
  &-bar {
    margin-top: 32rpx;
    margin-left: 12rpx;
    position: relative;
    width: 115rpx;
    height: 27rpx;
    background: #ff7276;
    border-radius: 14rpx;
    &-tag {
      position: absolute;
      left: -22rpx;
      top: calc((27rpx - 35rpx) / 2);
      width: 44rpx;
      height: 35rpx;
    }
    &-title {
      position: absolute;
      left: 26rpx;
      top: 0;
      font-weight: normal;
      font-size: 20rpx;
      color: #ffffff;
      line-height: 27rpx;
    }
  }
}
.right-btn {
  position: absolute;
  right: 32rpx;
  top: 90rpx;
  width: 142rpx;
  height: 56rpx;
  border-radius: 28rpx;
  background: linear-gradient(90deg, #ffd3a2 0%, #fdf2d8 100%);

  text-align: center;
  line-height: 56rpx;
  font-weight: 400;
  font-size: 30rpx;
  color: #794627;
}
</style>
