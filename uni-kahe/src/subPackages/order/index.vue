<template>
  <view class="relative w-full h-screen">
    <image class="relative w-full aspect-ratio-[750/217]" src="/static/kahe-202510/order/top.png" />

    <scroll-view
      class="absolute top-165 left-0 w-full box-border pt-32 px-32 pb-[env(safe-area-inset-bottom)] bg-[#fefdf8] shadow-[0rpx_2rpx_0rpx_0rpx_#000000] border-t border-[#000000] rounded-t-20"
      style="height: calc(100vh - env(safe-area-inset-bottom) - 104rpx)"
      :scroll-y="true"
      @scrolltolower="handleScrollToLower"
    >
      <Item
        v-for="(item, index) in dataList"
        :key="'orderItem' + index"
        :item="item"
        @tap.stop="didClickItem(item)"
      />
      <Empty :show="dataList.length === 0" />
    </scroll-view>
    <view class="absolute top-114 left-37 w-213 h-74">
      <image class="w-full h-full" src="/static/kahe-202510/order/tag-bg.png" />
      <view class="absolute top-9 left-0 w-full text-center font-normal text-36 text-black theme-font">全 部</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Item from "./components/item.vue";
import Empty from "@/components/empty/index.vue";
import { usePayedOrder } from "./index";
const { getPayedOrderList, dataList, didClickItem, handleScrollToLower } =
  usePayedOrder();
onMounted(() => {
  getPayedOrderList();
});
</script>

<style lang="scss" scoped></style>
