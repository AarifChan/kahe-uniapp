<template>
  <view class="min-h-screen bg-[#FEE9CD]">
    <!-- 顶部背景区域 -->
    <top />
    <!-- 活动说明区域 -->
    <center />
    <view class="mt-32rpx">
      <common-tab
        v-model:current-index="currentTabIndex"
        :product="mockProduct"
        @tab-did-change="onTabChange"
      >
        <template #goods> 赏池内容 </template>
        <template #record> 记录内容 </template>
      </common-tab>
    </view>

    <bottom />
    <result v-model:show="showResult" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CommonTab from "./components/tab/index.vue";
import Bottom from "./components/bottom/index.vue";
import Center from "./components/center/index.vue";
import Top from "./components/top/index.vue";
import Result from "./components/result/index.vue";
const currentTabIndex = ref(0);
const showResult = ref(true);
const mockProduct = {
  merchant: {
    icon: "https://jms.85gui7.com/upload/1816501028695048192.jpg",
    name: "商家名称商家名称商家名称",
  },
};
</script>

<style scoped lang="scss">
// 页面特定样式
</style>
