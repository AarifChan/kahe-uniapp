<template>
  <view
    class="customButton"
    :style="{ width: width, height: height, borderRadius }"
    v-if="size === 'small'"
  >
   
    <view class="customButton-content">
      <image
        v-if="icon === 'wechat'"
        style="width: 25px; height: 25px"
        src="https://jms.85gui7.com/kahe-202510/images/weixin.png"
      />
      <text
        class="customButton-content-title"
        :class="[
          themeFont ? 'theme-font' : '',
          textStroke ? 'text-stroke-main' : '',
        ]"
        :style="{
          lineHeight: height,
          fontSize: themeFont ? '40rpx' : fontSize,
          color: textColor,
        }"
        >{{ title }}</text
      >
    </view>
  </view>
  <view class="bottom-Button" v-else :style="{ position: position }">
    <image
      class="customButton-button"
      src="https://jms.85gui7.com/kahe-202510/ka-he/common/long-btn-bg.png"
    />
    <text class="big-title theme-font">{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    default: "",
    type: String,
  },
  width: {
    default: "230rpx",
    type: String,
  },
  height: {
    default: "67rpx",
    type: String,
  },
  textColor: {
    default: "white",
    type: String,
  },
  fontSize: {
    default: "24rpx",
    type: String,
  },
  themeFont: {
    default: true,
    type: Boolean,
  },
  textStroke: {
    default: true,
    type: Boolean,
  },
  size: {
    default: "small",
    type: String,
  },
  borderRadius: {
    default: "4rpx",
    type: String,
  },
  position: {
    default: "relative",
    type: String,
  },
  icon: {
    default: "none",
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.customButton {
  position: relative;
  height: 67rpx;
  width: 230rpx;
  background: #53d6ac;
  box-shadow: 0 4rpx 4rpx rgba(0, 0, 0, 0.1);
  &-button {
    width: 100%;
    height: 100%;
  }
  &-title {
    position: absolute;
    left: 0;
    top: 0;
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-title {
      font-size: 40rpx;
      text-align: center;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.bottom-Button {
  position: fixed;
  left: 60rpx;
  bottom: calc(env(safe-area-inset-bottom) + 48rpx);
  width: calc(100% - 120rpx);
  height: 67rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10rpx;
  
}
.big-title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 67rpx;
  font-weight: 400;
  font-size: 40rpx;
  color: #ffffff;
  text-align: center;
}
</style>
