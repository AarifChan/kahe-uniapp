<template>
  <view class="relative w-screen h-screen flex flex-col">
    <image
      class="fixed left-0 top-0 w-full h-full"
      src="/static/kaju/machine/machine-bg.png"
    />
    <NavBar :opacity="0" position="sticky" @search="handleSearch" />
    <image class="w-750 h-374" src="/static/kaju/machine/machine-banner.png" />

    <scroll-view
      class="relative w-full flex flex-col overflow-hidden items-center"
      :scroll-y="true"
      @scrolltolower="machineScroll"
    >
      <view class="w-full flex flex-col">
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
  </view>

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
  goodsParams,
  current,
  machineTabList,
  didClickMachineTab,
} = useGoods();

onMounted(() => {
  getBarrageList();
  getMachineList();
});
const handleSearch = (value: string) => {
  goodsParams.value.key = value;
  goodsParams.value.page = 1;
  getMachineList();
};
onShareAppMessage(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.kjkapai.com/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.kjkapai.com/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});
</script>
<style lang="scss" scoped></style>
