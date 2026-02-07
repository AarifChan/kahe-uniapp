<template>
  <view class="integral">
    <view class="integral-top">
      <image class="integral-top-img" src="https://jms.85gui7.com/kahe-202510/ka-he/integral/top-bg.png" />
      <view class="integral-top-tips">
        <view>线上or到店消费</view>
        <view
          >均可获赠<text style="color: #ff3b1b">积分</text>兑海量<text
            style="color: #ff3b1b"
            >好礼</text
          ></view
        >
      </view>
    </view>

    <view class="integral-container">
      <Tab :lamp-list="barrageList" @did-change="handleTabDidChange" />
      <scroll-view class="integral-content" :scroll-y="true">
        <view class="integral-padding">
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
<style lang="scss" scoped>
.integral {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #f7daa1, #fff3dc);
  &-top {
    position: relative;
    width: 100%;
    height: 334rpx;
    &-img {
      width: 100%;
      height: 100%;
    }
    &-tips {
      position: absolute;
      right: 92rpx;
      bottom: 85rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #000000;
    }
  }
  &-container {
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom) - 334rpx);
    display: flex;
    flex-direction: column;
  }
  &-content {
    padding-top: 16rpx;
    position: relative;
    width: 100%;
    height: calc(100vh - 44rpx - env(safe-area-inset-bottom) - 334rpx);
  }
  &-padding {
    margin-top: 16rpx;
    box-sizing: border-box;
    width: 100%;
    padding: 0 30rpx;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(calc((100% - 10px) / 2), 1fr)
    ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
    grid-gap: 10px; // 这是网格间的间隙，根据需要调整
  }
}
</style>
