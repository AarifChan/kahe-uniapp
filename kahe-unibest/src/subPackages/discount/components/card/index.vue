<template>
  <view class="discountCard">
    <view class="discountCard-top">
      <image class="discountCard-top-item" src="https://jms.85gui7.com/kahe-202510/discount/icon1.png" />
      <view class="discountCard-top-info">
        <text class="discountCard-top-info-title theme-font">首充礼包</text>
      </view>
      <view class="discountCard-top-btn" @tap.stop="emits('didClickItem')">
        <image class="discountCard-top-btn-bg" src="https://jms.85gui7.com/kahe-202510/merchant/btn.png" />
        <text class="discountCard-top-btn-text text-stroke theme-font"
          >领 取</text
        >
      </view>
    </view>
    <view class="discountCard-bottom">
      <view class="discountCard-bottom-item">
        <image
          class="discountCard-bottom-item-img"
          src="https://jms.85gui7.com/kahe-202510/discount/item1.png"
        />
        <view class="discountCard-bottom-item-info">
          <view class="discountCard-bottom-item-info-title">购买必得</view>
          <view class="discountCard-bottom-item-info-subTitle">1288XX点券</view>
        </view>
      </view>
      <view class="discountCard-bottom-item">
        <image
          class="discountCard-bottom-item-img"
          src="https://jms.85gui7.com/kahe-202510/discount/item2.png"
        />
        <view class="discountCard-bottom-item-info">
          <view class="discountCard-bottom-item-info-title">购买必得</view>
          <view class="discountCard-bottom-item-info-subTitle">1288XX点券</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const emits = defineEmits(["didClickItem"]);
</script>

<style lang="scss" scoped>
.discountCard {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30rpx;
  background: #ffffff;
  box-shadow: 0rpx 2rpx 2rpx 0rpx #7198df;
  border-radius: 30rpx;
  display: flex;
  flex-direction: column;
  &-top {
    border-bottom: 1rpx solid #bfbfbf;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    &-item {
      width: 134rpx;
      height: 134rpx;
    }

    &-info {
      display: flex;
      flex-direction: column;
      &-title {
        font-weight: 400;
        font-size: 34rpx;
        color: #000000;
      }
    }
    &-btn {
      position: absolute;
      top: 20rpx;
      right: 0;
      width: 169rpx;
      height: 70rpx;
      &-bg {
        width: 100%;
        height: 100%;
      }
      &-text {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 70rpx;
        text-align: center;
        width: 100%;
        font-weight: 400;
        font-size: 30rpx;
        color: #ffffff;
        text-shadow:
          -1px -1px 0 #0f2268,
          1px -1px 0 #0f2268,
          -1px 1px 0 #0f2268,
          1px 1px 0 #0f2268;
      }
    }
  }
  &-bottom {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 24rpx 16rpx;
    width: calc(100% - 32rpx);
    &-item {
      display: flex;
      flex-direction: row;
      &-img {
        width: 64rpx;
        height: 64rpx;
      }
      &-info {
        margin-left: 12rpx;
        display: flex;
        flex-direction: column;
        &-title {
          font-weight: normal;
          font-size: 24rpx;
          color: #000000;
        }
        &-subTitle {
          font-weight: normal;
          font-size: 18rpx;
          color: #6e6e6e;
        }
      }
    }
  }
}
</style>
