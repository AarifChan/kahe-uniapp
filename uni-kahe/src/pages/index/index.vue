<template>
  <view class="relative w-full h-screen bg-main-bg">
    <!--    <NavBar />-->
    <view
      class="relative w-full"
      style="height: calc(100vh - (env(safe-area-inset-bottom) + 100rpx))"
    >
      <Home Merchant v-if="current === 0" />
      <Merchant v-else-if="current === 1" />
      <Machine v-else-if="current === 2" />
      <box v-else-if="current === 3" />
      <mine v-else />
    </view>
    <!--    <tab-bar v-model:current="current" />-->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import Home from "@/pages/home/index.vue";
import Merchant from "@/pages/merchant/index.vue";
import Machine from "@/pages/machine/index.vue";
import Box from "@/pages/box/index.vue";
import Mine from "@/pages/mine/index.vue";
import TabBar from "@/components/tabBar/index.vue";
import { computed, ref, watch } from "vue";
import { AppModule } from "@/store/modules/app";
import { UserModule } from "@/store/modules/user";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
const current = ref(AppModule.currentTabIndex);
watch(
  () => AppModule.currentTabIndex,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      current.value = newVal;
    }
  }
);
const userInfo = computed(() => {
  return UserModule.userInfo;
});

onShareAppMessage(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.richcw.cn/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.richcw.cn/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});

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
