<template>
  <scroll-view
    class="mall"
    :scroll-y="true"
    @scrolltolower="handleMallScrollToLower"
  >
    <image class="mall-bg" src="https://jms.85gui7.com/kahe-202510/box/box-bg.png" />
    <search @did-tap-search="didTapSearch" />
    <category />
    <tab @did-change="sortDidChange" />
    <scroll-view :scroll-y="true" class="mall-list">
      <view class="mall-list-padding">
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

<style lang="scss" scoped>
.mall {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-top: 16px;
  &-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  &-logo {
    margin-left: 46rpx;
    margin-top: 24rpx;
    position: relative;
    width: 150rpx;
    height: 150rpx;
  }
  &-list {
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom) - 365rpx);
    &-padding {
      box-sizing: border-box;
      width: 100%;
      padding: 0 30rpx 30rpx 30rpx;
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc((100% - 10px) / 2), 1fr)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 10px; // 这是网格间的间隙，根据需要调整
    }
  }
}
</style>
