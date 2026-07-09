<template>
  <view class="relative w-full h-screen bg-main-bg">
    <image
      class="absolute w-240"
      style="
        height: calc(240rpx / 132 * 72);
        left: calc((100% - 240rpx) / 2);
        top: calc(env(safe-area-inset-top) + 340rpx);
      "
      src="/static/kaju/common/logo.png"
    />
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
  }, 1000);
});
</script>

<style lang="scss" scoped></style>
