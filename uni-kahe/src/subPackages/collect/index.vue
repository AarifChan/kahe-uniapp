<template>
  <view class="relative w-750 h-screen" style="background-image: url('https://jms.85gui7.com/kahe-202510/collect/bg.png'); background-size: 100% 100%; background-repeat: no-repeat;">
    <view class="relative w-750 h-screen flex flex-col">
      <view class="relative w-750">
        <view class="w-750 h-379 bg-no-repeat" style="background-image: url('https://jms.85gui7.com/kahe-202510/jikaquan/collect-top-bg.png'); background-size: 100% 100%;"></view>
        <view class="absolute top-16 left-16 flex flex-row">
          <view class="flex flex-row items-center mr-28" @tap.stop="navToHome">
            <image class="w-32 h-30" src="https://jms.85gui7.com/kahe-202510/collect/item1.png" mode="aspectFit" />
            <view class="ml-4 font-normal text-20 text-white leading-16">首页</view>
          </view>
          <view class="flex flex-row items-center mr-28" @tap.stop="clickRule">
            <image class="w-32 h-30" src="https://jms.85gui7.com/kahe-202510/collect/item2.png" mode="aspectFit" />
            <view class="ml-4 font-normal text-20 text-white leading-16">规则</view>
          </view>
          <view class="font-normal text-20 text-white py-6" style="border-bottom: 1rpx solid rgba(34, 55, 133, 0.88);" @tap.stop="navToRecordPage">集成记录</view>
        </view>
      </view>
      <category @did-change="handleCategoryChange" />
      <scroll-view class="w-full px-32 py-24 flex flex-col" style="height: calc(100vh - 379rpx - 140rpx - env(safe-area-inset-bottom));" scroll-y @scrolltolower="handleScrollToLower">
        <view v-for="(item, index) in collectionList" :key="'it' + index" class="w-full mb-22">
          <item :item="item" @did-click-item="handleClickCollectItem" @did-exchange-item="handleClickItem" />
        </view>
        <empty :show="collectionList.length === 0" />
      </scroll-view>
    </view>
    <Exchange v-model:show="mallShow" :goods="payItem" :is-collect="true" @did-tap-smash="handleCollectionExchange" />
    <common-modal v-model:show="modalShow" :title="modalTitle" :content="modalContent" />
  </view>
</template>

<script lang="ts" setup>
import Category from "./components/category.vue";
import Item from "./components/item.vue";
import { onMounted } from "vue";
import { useCollect } from "./index";
import { useModal, ModalType } from "@/composables/modal";
import CommonModal from "@/components/modal/index.vue";
import Empty from "@/components/empty/index.vue";
import Exchange from "@/components/modal/exchange/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useMall } from "@/composables/mall";
const { handleClickItem, payItem, mallShow } = useMall();

const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const {
  collectionList,
  getCollectionList,
  collectionParams,
  handleClickCollectItem,
  didTapPurchaseCollectItem,
  navToRecordPage,
  handleScrollToLower,
} = useCollect();

const handleCollectionExchange = async (id: number) => {
  const succeed = await didTapPurchaseCollectItem(id);
  if (succeed) {
    mallShow.value = false;
  }
};

onMounted(() => {
  collectionParams.value.page = 1;
  getCollectionList();
});
onShow(() => {
  collectionParams.value.page = 1;
  getCollectionList();
});
const clickRule = () => {
  showModalType(ModalType.CollectionRule);
};
const handleExchangeItem = () => {};
const handleCategoryChange = (params: {
  title: string;
  value: number | null;
}) => {
  collectionParams.value.cate = params.value;
  collectionParams.value.page = 1;
  getCollectionList();
};

const navToHome = () => {
  uni.redirectTo({
    url: "/pages/welcome/index",
  });
};
</script>
