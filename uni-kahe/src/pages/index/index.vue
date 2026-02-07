<template>
  <view class="index">
    <!--    <NavBar />-->
    <!--    <view class="index-scroll">-->
    <!--      <Home Merchant v-if="current === 0" />-->
    <!--      <Merchant v-else-if="current === 1" />-->
    <!--      <Machine v-else-if="current === 2" />-->
    <!--      <box v-else-if="current === 3" />-->
    <!--      <mine v-else />-->
    <!--    </view>-->
    <!--    <tab-bar v-model:current="current" :list="tabBarItems" />-->
    <!--    <info v-model:show="infoShow" />-->
    <!--    <vip-->
    <!--      v-model:show="showVip"-->
    <!--      :vip="UserModule.userInfo.vip"-->
    <!--      :list="vipList"-->
    <!--    />-->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {
  
  setTimeout(() => {
    uni.reLaunch({
      url: "/pages/home/index",
      success: () => {
        uni.hideTabBar({
            animation: false, // 离线打包建议先关闭动画尝试
            success: () => console.log('隐藏成功'),
            fail: (err) => console.log('隐藏失败', err)
        });
    }});
  }, 200);
});
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: $main-bg;
  &-scroll {
    position: relative;
    width: 100%;
    height: calc(100vh - (env(safe-area-inset-bottom) + 100rpx));
  }
}
</style>
