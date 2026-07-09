<template>
  <scroll-view
    class="relative w-full flex flex-col bg-main-bg"
    style="height: calc(100vh - env(safe-area-inset-bottom) - 132rpx);"
    :scroll-y="true"
    @scrolltolower="machineScroll"
  >
    <image
      class="w-full aspect-ratio-[721/362]"
      src="/static/kahe-202510/ka-he/merchant/bg-top.png"
    />
    <view class="absolute left-0 top-0 w-full">
      <image
        class="ml-32"
        style="width: calc(149rpx * 1.3); height: calc(53rpx * 1.3);"
        src="/static/kahe-202510/jikaquan/jikaquan-logo.png"
      />
      <Top :types="false" :goods="barrageList" />
      <tab
        v-model:current="current"
        :list="machineTabList"
        :search="true"
        @did-click="didClickMachineTab"
      />
      <goods @tapCardListItem="tapCardListItem" :list="machineList" />
      <empty :show="machineList.length === 0" />
    </view>
  </scroll-view>
  <!--  <TabBar />-->
</template>
<script setup lang="ts">
import Top from "../infinite/components/top.vue";
import Goods from "./components/goods.vue";
import Empty from "@/components/empty/index.vue";
import NavBar from "@/components/navBar/index.vue";
import Tab from "./components/tab.vue";
import { useGoods } from "@/composables/goods";
import TabBar from "@/components/tabBar/index.vue";
import { onMounted } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
const {
  machineScroll,
  getBarrageList,
  barrageList,
  tapCardListItem,
  getMachineList,
  machineList,
  current,
  machineTabList,
  didClickMachineTab,
} = useGoods();

onMounted(() => {
  getBarrageList();
  getMachineList();
});
onShareAppMessage(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "/static/kahe-202510/jikaquan/jikaquan-share.jpg",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "/static/kahe-202510/jikaquan/jikaquan-share.jpg",
    path: "/pages/welcome/index",
  };
});
</script>
<style lang="scss" scoped></style>
