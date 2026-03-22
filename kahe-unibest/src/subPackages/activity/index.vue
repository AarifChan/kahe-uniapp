<template>
  <view class="activity">
    <image
      class="activity-bg"
      mode="widthFix"
      src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/bg.png"
    />

    <view class="activity-content">
      <view class="activity-topBg" />
      <view class="activity-content-tab">
        <tab
          v-model:current="current"
          :tab-list="tabList"
          @did-click="handleClick"
        />
      </view>
      <scroll-view
        class="activity-content-list"
        :scroll-y="true"
        @scrolltolower="handleScrollToLower"
      >
        <view class="activity-content-list-grid">
          <item
            v-for="(item, index) in dataList"
            :key="'key' + index"
            :id="'id' + index"
            :item="item"
            @did-click-item="tapWelfareAction"
          />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Tab from "./components/tab/index.vue";
import Item from "./components/item/index.vue";
import { useWelfare } from "@/composables/welfare";
import { onMounted } from "vue";
import { getPageOptions } from "@/utils/tools";

const {
  current,
  dataList,
  tabList,
  reloadData,
  tapWelfareAction,
  handleScrollToLower,
  getWelfareList,
  merchantId,
} = useWelfare();

onMounted(() => {
  const ops = getPageOptions();
  merchantId.value = ops.merchantId;
  if (!merchantId.value) {
    tabList.value = tabList.value.filter((n) => n.value !== 1);
  }
  console.log("isMerchant:", merchantId.value);
  getWelfareList();
});
const handleClick = (index: number) => {
  reloadData(index);
};
</script>

<style lang="scss" scoped>
.activity {
  position: relative;
  width: 100%;
  height: 100vh;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-topBg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 446rpx;
    background: rgba(255, 255, 255, 0.24);
    box-shadow: 0rpx 10rpx 24rpx 0rpx #ffffff;
    border-radius: 30rpx;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &-tab {
      margin-top: 350rpx;
    }
    &-list {
      margin-top: 32rpx;
      position: relative;
      width: 100%;
      height: calc(100% - 350rpx - 92rpx);
      padding: 30rpx 0 env(safe-area-inset-bottom);
      box-sizing: border-box;

      &-grid {
        box-sizing: border-box;
        width: 100%;
        padding: 0 30rpx;
        display: grid;
        grid-template-columns: repeat(
          auto-fill,
          minmax(calc((100% - 20px - 60rpx) / 3), 1fr)
        ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
        grid-gap: 10px; // 这是网格间的间隙，根据需要调整
      }
    }
  }
}
</style>
