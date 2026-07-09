<template>
  <view class="relative w-full h-screen">
    <image
      class="w-full h-full"
      mode="widthFix"
      src="/static/kahe-202510/ka-he/welfare/bg.png"
    />

    <view class="absolute left-0 top-0 w-full h-full flex flex-col">
      <view class="absolute left-0 top-0 w-full h-446 bg-[rgba(255,255,255,0.24)] shadow-[0rpx_10rpx_24rpx_0rpx_#ffffff] rounded-30" />
      <view class="mt-350">
        <tab
          v-model:current="current"
          :tab-list="tabList"
          @did-click="handleClick"
        />
      </view>
      <scroll-view
        class="relative w-full mt-32 box-border pt-30 px-0 pb-[env(safe-area-inset-bottom)]"
        style="height: calc(100% - 350rpx - 92rpx)"
        :scroll-y="true"
        @scrolltolower="handleScrollToLower"
      >
        <view class="box-border w-full px-30 grid gap-10" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 20px - 60rpx) / 3), 1fr))">
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

<style lang="scss" scoped></style>
