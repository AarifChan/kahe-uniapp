<template>
  <view class="order">
    <image class="order-top" src="https://jms.85gui7.com/kahe-202510/order/top.png" />

    <scroll-view
      class="order-content"
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
    <view class="order-tag">
      <image class="order-tag-bg" src="https://jms.85gui7.com/kahe-202510/order/tag-bg.png" />
      <view class="order-tag-title theme-font">全 部</view>
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

<style lang="scss" scoped>
.order {
  position: relative;
  width: 100%;
  height: 100vh;
  &-top {
    position: relative;
    width: 100%;
    aspect-ratio: 750 /217;
  }
  &-tag {
    position: absolute;
    top: 114rpx;
    left: 37rpx;
    width: 213rpx;
    height: 74rpx;
    &-bg {
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      top: 9rpx;
      left: 0;
      width: 100%;
      text-align: center;
      font-weight: 400;
      font-size: 36rpx;
      color: #000000;
    }
  }
  &-content {
    position: absolute;
    top: 165rpx;
    left: 0;
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom) - 104rpx);
    background: #fefdf8;
    box-shadow: 0 2rpx 0 0 #000000;
    border-top: 1rpx solid #000000;
    border-radius: 20rpx 20rpx 0 0;
    padding: 32rpx;
    box-sizing: border-box;
  }
}
</style>
