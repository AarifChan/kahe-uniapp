<template>
  <view class="relative h-full">
    <image class="absolute left-0 top-0 w-full" style="height: calc(100vh - env(safe-area-inset-bottom));" src="/static/kahe-202510/images/rank-bg.png" />
    <scroll-view
      class="relative w-full flex flex-col"
      style="height: calc(100vh - 88rpx - env(safe-area-inset-bottom));"
      :scroll-y="true"
      @scrolltolower="infiniteScrollToLower"
    >
      <Top :goods="barrageList" />
      <view class="mt-30 px-30" style="width: calc(100% - 60rpx); display: grid; grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)); grid-gap: 10px;"
      >
        <view
          v-for="(item, index) in goodsList"
          :key="index"
          @tap.stop="goodsTapClick(item)"
        >
          <Item :item="item" />
        </view>
        <empty :show="goodsList.length === 0" />
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import Top from "./components/top.vue";
import Item from "@/components/goods/index.vue";
import Empty from "@/components/empty/index.vue";

import { useGoods } from "@/composables/goods";
import { onMounted } from "vue";

const {
  infiniteScrollToLower,
  getGoodsList,
  goodsList,
  goodsTapClick,
  getBarrageList,
  barrageList,
} = useGoods();

onMounted(() => {
  getBarrageList();
  getGoodsList(1);
});
</script>
<style lang="scss" scoped></style>
