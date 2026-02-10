<template>
  <view class="index">
    <!--    <NavBar />-->
    <view class="index-scroll">
      <Home Merchant v-if="current === 0" />
      <Merchant v-else-if="current === 1" />
      <Machine v-else-if="current === 2" />
      <box v-else-if="current === 3" />
      <mine v-else />
    </view>
    <tab-bar v-model:current="current" />
    <info v-model:show="infoShow" />
    <vip v-model:show="showVip" :vip="userInfo.vip" :list="vipList" />
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
import Info from "@/components/modal/info/index.vue";
import Vip from "@/components/modal/vip/index.vue";
import { UserModule } from "@/store/modules/user";
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
onLoad(() => {
  console.log("currentTabIndex:", AppModule.currentTabIndex);
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
