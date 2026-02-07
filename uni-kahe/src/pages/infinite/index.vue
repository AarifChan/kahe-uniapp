<template>
  <view class="infinite">
    <image class="infinite-bg" src="https://jms.85gui7.com/kahe-202510/images/rank-bg.png" />
    <scroll-view
      class="infinite-container"
      :scroll-y="true"
      @scrolltolower="infiniteScrollToLower"
    >
      <Top :goods="barrageList" />
      <view class="infinite-padding">
        <view
          class="infinite-padding-item"
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
<style lang="scss" scoped>
.infinite {
  position: relative;
  height: 100%;
  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom));
  }
  &-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 88rpx - env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
  }
  &-padding {
    margin-top: 30rpx;
    width: calc(100% - 60rpx);
    padding: 0 30rpx;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(40%, 1fr)
    ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
    grid-gap: 10px; // 这是网格间的间隙，根据需要调整
  }
}
</style>
