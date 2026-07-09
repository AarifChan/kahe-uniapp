<template>
  <view class="integral relative w-full h-screen bg-gradient-[linear-gradient(180deg,#f7daa1,#fff3dc)]">
    <view class="relative w-full h-334">
      <image class="w-full h-full" src="/static/kahe-202510/ka-he/integral/top-bg.png" />
      <view class="absolute right-92 bottom-85 flex flex-col items-center justify-center text-22 text-black">
        <view>线上or到店消费</view>
        <view
          >均可获赠<text style="color: #ff3b1b">积分</text>兑海量<text style="color: #ff3b1b">好礼</text></view
        >
      </view>
    </view>

    <view class="w-full flex flex-col" style="height: calc(100vh - env(safe-area-inset-bottom) - 334rpx)">
      <Tab :lamp-list="barrageList" @did-change="handleTabDidChange" />
      <scroll-view class="relative w-full pt-16" style="height: calc(100vh - 44rpx - env(safe-area-inset-bottom) - 334rpx)" :scroll-y="true">
        <view class="mt-16 box-border w-full px-30 grid gap-10" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 10px) / 2), 1fr))">
          <view
            class="integral-padding-item"
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
  </view>
</template>
<script setup lang="ts">
import Tab from "./components/tab/index.vue";
import Item from "./components/goods/index.vue";
import Empty from "@/components/empty/index.vue";

import { useGoods } from "@/composables/goods";
import { onMounted } from "vue";
import { getPageOptions } from "@/utils/tools";

const {
  goodsList,
  goodsTapClick,
  getBarrageList,
  getGoodsListByCid,
  barrageList,
} = useGoods();

const handleTabDidChange = (isLeft: boolean) => {
  const ops = getPageOptions();
  const merchantId = Number(ops.merchantId);
  const cid = 5;
  getGoodsListByCid(cid, merchantId);
};

onMounted(() => {
  getBarrageList(101);
  handleTabDidChange(true);
});
</script>
<style lang="scss" scoped></style>
