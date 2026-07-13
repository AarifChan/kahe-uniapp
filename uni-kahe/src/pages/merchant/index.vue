<template>
  <view class="relative w-screen h-screen bg-[#FFF8E9] flex flex-col">
    <image
      class="fixed left-0 top-0 w-750 h-528"
      src="/static/kaju/merchant/top-bg.png"
    />
    <NavBar :opacity="0" position="sticky" @search="handleSearch" />
    <view class="flex flex-col relative h-460">
      <image class="w-750 h-350" src="/static/kaju/merchant/banner.png" />
      <view class="absolute bottom-24 left-0 w-full">
        <Tab
          :list="merchantCateList"
          v-model:current="currentTab"
          @did-click="didClickTab"
        />
      </view>
    </view>
    <scroll-view
      class="relative w-full flex flex-col overflow-hidden items-center"
      :scroll-y="true"
      @scroll="handleScroll"
      @scrolltolower="handleMallScrollToLower"
    >
      <view class="flex flex-col items-center">
        <Card
          v-for="(item, index) in merchantList"
          :key="'merchant-item' + index"
          :level="item.tag"
          :item="item"
          @did-click-info="didClickMerchant"
          @did-click-item="goodsTapClick"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import Search from "@/components/search/index.vue";
import Tab from "./components/tab/index.vue";
import Card from "./components/card/index.vue";
import NavBar from "@/components/navBar/index.vue";

import { useMerchant } from "@/pages/merchant/index";
import { useGoods } from "@/composables/goods";
import { onMounted, computed, ref } from "vue";
import { AppModule } from "@/store/modules/app";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
const { goodsTapClick } = useGoods();
const {
  getMerchantList,
  merchantList,
  didClickMerchant,
  merchantCateList,
  currentTab,
  didClickTab,
  didTapSearch,
  handleMallScrollToLower,
} = useMerchant();

onMounted(() => {
  getMerchantList();
});

const scrollThreshold = computed(() => {
  return AppModule.statusBarHeight + AppModule.navBarHeight;
});
const navOpacity = ref(0);
const handleScroll = (e) => {
  const scrollTop = e.detail.scrollTop;
  navOpacity.value = Math.min(scrollTop / scrollThreshold.value, 1);
};
const handleSearch = (value: string) => {
  didTapSearch(value);
};
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
</script>

<style lang="scss" scoped></style>
