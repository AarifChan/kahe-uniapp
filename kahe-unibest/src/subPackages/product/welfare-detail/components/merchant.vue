<template>
  <view class="merchant">
    <view class="merchant-left">
      <image class="merchant-avatar" :src="merchant.icon" />
      <view class="merchant-info">
        <view
          class="merchant-info-title theme-font text-flow-ellipsis-single"
          >{{ merchant?.name }}</view
        >
        <view
          class="merchant-info-bar"
          :style="{
            backgroundColor: getTagBgColor(merchant?.tag),
          }"
        >
          <image
            class="merchant-info-bar-tag"
            :src="getTagIcon(merchant.tag)"
          />
          <text class="merchant-info-bar-title">{{
            getLevelName(merchant.tag)
          }}</text>
        </view>
      </view>
    </view>
    <view class="merchant-btn theme-font" @tap.stop="didClickMerchant(merchant)"
      >进店看看</view
    >
  </view>
</template>

<script lang="ts" setup>
import {
  getLevelName,
  getTagBgColor,
  getTagIcon,
} from "@/pages/merchant/index";
import { MerchantModel } from "@/model";
import { PropType } from "vue";
import { useMerchant } from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
defineProps({
  merchant: {
    default: {} as MerchantModel,
    type: Object as PropType<MerchantModel>,
  },
});
</script>

<style lang="scss" scoped>
.merchant {
  background: #fffbef;
  box-shadow: 4rpx 4rpx 5rpx 0rpx rgba(0, 0, 0, 0.13);
  border-radius: 20rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx;
  margin-top: 32rpx;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-btn {
    width: 146rpx;
    height: 56rpx;
    background: #53d6ac;
    box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
    border-radius: 8rpx;
    text-align: center;
    line-height: 56rpx;
    font-weight: 400;
    font-size: 30rpx;
    color: #ffffff;
  }
  &-avatar {
    position: relative;
    width: 109rpx;
    height: 109rpx;
    background: #ffffff;
    box-shadow: 0rpx 3rpx 7rpx 0rpx #ddc79c;
    border-radius: 50%;
  }
  &-info {
    position: relative;
    margin-left: 28rpx;
    display: flex;
    flex-direction: column;
    &-title {
      font-weight: 400;
      font-size: 36rpx;
      color: #000000;
    }
    &-desc {
      width: 460rpx;
      font-size: 20rpx;
      color: #636363;
      line-height: 36rpx;
    }

    &-bar {
      margin-top: 24rpx;
      margin-left: 12rpx;
      margin-bottom: 12rpx;
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
  &-inGroup {
    position: absolute;
    top: 60rpx;
    right: 20rpx;
    width: 116rpx;
    height: 44rpx;
    background: #ffffff;
    box-shadow: 0rpx 2rpx 5rpx 0rpx rgba(132, 77, 23, 0.54);
    border-radius: 10rpx;
    text-align: center;
    line-height: 44rpx;
    color: #000000;
    font-size: 26rpx;
  }
}
</style>
