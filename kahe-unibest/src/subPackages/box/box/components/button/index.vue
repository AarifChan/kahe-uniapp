<template>
  <view class="custom-btn">
    <image
      class="custom-btn-img"
      src="https://jms.85gui7.com/kahe-202510/ka-he/common/common-btn-bg.png"
    />
    <view class="custom-btn-content">
      <slot />
      <text class="custom-btn-title theme-font">{{ title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    default: "big",
    type: String,
  },
  title: {
    default: "",
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.custom-btn {
  position: relative;
  width: 160rpx;
  height: 67rpx;
  &-img {
    width: 100%;
    height: 100%;
  }

  &-content {
    position: absolute;
    top: 4rpx;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &-title {
    color: #511818;
    font-weight: 400;
    font-size: 34rpx;
  }
}
</style>
