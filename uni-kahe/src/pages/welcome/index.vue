<template>
  <view class="welcome">
    <image class="welcome-logo" src="/static/kaju/common/logo.png" />
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {
  setTimeout(() => {
    uni.reLaunch({
      url: "/pages/home/index",
      success: () => {
        // uni.hideTabBar({
        //   animation: false, // 离线打包建议先关闭动画尝试
        //   success: () => console.log("隐藏成功"),
        //   fail: (err) => console.log("隐藏失败", err),
        // });
      },
    });
  }, 2000);
});
</script>

<style lang="scss" scoped>
.welcome {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: $main-bg;
  &-logo {
    position: absolute;
    width: 240rpx;
    height: calc(240rpx / 132 * 72);
    left: calc((100% - 240rpx) / 2);
    top: calc(env(safe-area-inset-top) + 340rpx);
  }
}
</style>
