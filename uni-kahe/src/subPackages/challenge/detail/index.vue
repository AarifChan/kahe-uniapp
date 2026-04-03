<template>
  <view class="min-h-screen bg-[#FEE9CD]">
    <!-- 顶部背景区域 -->
    <top :detail="detail" @did-click="tapShowModel" />
    <!-- 活动说明区域 -->
    <center :detail="detail" />
    <view class="mt-32rpx">
      <common-tab
        v-model:current-index="currentTabIndex"
        :detail="detail"
        @tab-did-change="onTabChange"
      >
        <template #goods>
          <view class="grid grid-cols-3 gap-y-24rpx place-items-center">
            <goods
              v-for="(item, index) in rewardList"
              :key="item.goodsDto.id"
              :item="item"
              :index="rewardList.length - index - 1"
              :id="item.goodsDto.id"
            />
          </view>
        </template>
        <template #record> 记录内容 </template>
      </common-tab>
    </view>

    <bottom :detail="detail" @didTap="handleSubmitChallenge" />
    <result v-model:show="showResult" />
    <pay
      v-model:show="showPay"
      :goods="payItem"
      @did-tap-pay="handlePayChallenge"
      :merchant="detail?.box.merchant"
    />
    <settle v-model:show="showSettle" :detail="detail" />
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CommonTab from "./components/tab/index.vue";
import Bottom from "./components/bottom/index.vue";
import Center from "./components/center/index.vue";
import Top from "./components/top/index.vue";
import Result from "./components/result/index.vue";
import Goods from "./components/goods/index.vue";
import Pay from "../components/pay/index.vue";
import Settle from "./components/settle/index.vue";
import { useChallenge } from "../index";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();

import { getPageOptions } from "@/utils/tools";
import CommonModal from "@/components/modal/index.vue";
import { useModal } from "@/composables/modal";
const {
  showPay,
  detail,
  payItem,
  showSettle,
  rewardList,
  handlePayChallenge,
  getChallengeDetail,
  handleSubmitChallenge,
  getLogRecord,
} = useChallenge();
onMounted(async () => {
  const detailId = getPageOptions().id;
  console.log("detailId:", detailId);
  if (detailId) {
    await getChallengeDetail(detailId);
    uni.setNavigationBarTitle({
      title: detail.value?.box.name ?? "",
    });
    await getLogRecord();
  }
});

const currentTabIndex = ref(0);
const showResult = ref(false);

const tapShowModel = (value: number) => {
  if (value === 0) {
    showModalType(4);
  } else if (value === 1) {
    showModalType(2);
  } else if (value === 2) {
    uni.navigateTo({
      url: "/subPackages/product/state/index",
    });
  }
};
</script>

<style scoped lang="scss">
// 页面特定样式
</style>
