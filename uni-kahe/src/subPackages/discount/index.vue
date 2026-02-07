<template>
  <scroll-view class="discount" :scroll-y="true">
    <image class="discount-bg" src="https://jms.85gui7.com/kahe-202510/common/bg.png"></image>
    <view class="discount-content">
      <view class="discount-content-top">
        <image
          class="discount-content-top-logo"
          src="https://jms.85gui7.com/kahe-202510/discount/discount-logo.png"
        />
        <image
          class="discount-content-top-title"
          src="https://jms.85gui7.com/kahe-202510/discount/discount-title.png"
        />
      </view>
      <view class="discount-content-list">
        <Card />
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import Card from "./components/card/index.vue";
</script>

<style lang="scss" scoped>
.discount {
  position: relative;
  width: 100%;
  height: 100vh;
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
    display: flex;
    flex-direction: column;
    &-top {
      position: relative;
      width: 100%;
      height: 328rpx;
      &-logo {
        position: absolute;
        bottom: 0;
        right: 30rpx;
        width: 409rpx;
        height: 322rpx;
      }
      &-title {
        position: absolute;
        top: 82rpx;
        left: 68rpx;
        width: 295rpx;
        height: 150rpx;
      }
    }

    &-list {
      position: relative;
      padding: 0 18rpx;
      box-sizing: border-box;
      width: 100%;
    }
  }
}
</style>
