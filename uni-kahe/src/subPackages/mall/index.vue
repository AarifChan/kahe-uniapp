<template>
  <scroll-view
    class="mall relative w-full h-screen overflow-hidden pt-16"
    :scroll-y="true"
    @scrolltolower="handleMallScrollToLower"
  >
    <image class="mall-bg fixed w-full h-full left-0 top-0" src="/static/kahe-202510/box/box-bg.png" />
    <search @did-tap-search="didTapSearch" />
    <category />
    <tab @did-change="sortDidChange" />
    <scroll-view :scroll-y="true" class="w-full" style="height: calc(100vh - env(safe-area-inset-bottom) - 365rpx)">
      <view class="box-border w-full px-30 pb-30 grid gap-10" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 10px) / 2), 1fr))">
        <view
          class="mall-list-padding-item"
          v-for="(item, index) in mallList"
          :key="index"
          @tap.stop="handleClickItem(item)"
        >
          <goods :item="item" :is-from-mall="true" />
        </view>
        <empty :show="mallList.length === 0" />
      </view>
    </scroll-view>
    <Exchange
      v-model:show="mallShow"
      :goods="payItem"
      @did-tap-smash="didPurchaseMallItem"
    />
  </scroll-view>
</template>

<script lang="ts" setup>
import Search from "@/components/search/index.vue";
import { onMounted } from "vue";
import Tab from "@/pages/mall/components/tab/index.vue";

import Goods from "@/components/goods/index.vue";
import category from "./components/category.vue";
import Exchange from "@/components/modal/exchange/index.vue";
import Empty from "@/components/empty/index.vue";
import { useMall } from "@/composables/mall";
const {
  mallList,
  getMallList,
  handleClickItem,
  listParams,
  didPurchaseMallItem,
  payItem,
  mallShow,
  handleMallScrollToLower,
} = useMall();
onMounted(() => {
  getMallList();
});
const didTapSearch = (value: string) => {
  listParams.value.key = value;
  getMallList();
};
const sortDidChange = (val: { sort: number; sType: string }) => {
  listParams.value.sort = val.sort;
  listParams.value.stype = val.sType;
  getMallList();
};
</script>

<style lang="scss" scoped></style>
