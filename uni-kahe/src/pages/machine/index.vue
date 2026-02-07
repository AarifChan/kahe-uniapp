<template>
  <scroll-view
    :scroll-y="true"
    class="machine-container"
    @scrolltolower="machineScroll"
  >
    <image class="machine-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/bg-top.png" />
    <view class="machine-content">
      <image class="machine-logo" src="https://jms.85gui7.com/kahe-202510/ka-he/common/logo.png" />
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
  <TabBar />
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
    title: `${
      UserModule.userInfo?.nickname ?? ""
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: "https://jms.85gui7.com/kahe-202510/common/share.jpg",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${
      UserModule.userInfo?.nickname ?? ""
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: "https://jms.85gui7.com/kahe-202510/common/share.jpg",
    path: "/pages/welcome/index",
  };
});
</script>
<style lang="scss" scoped>
.machine {
  position: relative;
  width: 100%;
  height: 100vh;

  overflow: hidden;
  &-bg {
    width: 100%;
    aspect-ratio: 721 / 362;
  }
  &-logo {
    margin-left: 32rpx;
    width: 180rpx;
    height: 71rpx;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  &-container {
    position: relative;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom) - 132rpx);
    display: flex;
    background-color: $main-bg;
    flex-direction: column;
  }
}
</style>
