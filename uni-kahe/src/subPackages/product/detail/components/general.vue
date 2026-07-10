<template>
  <view class="general w-full py-32 flex flex-col" :style="{ height: 'calc(100vh - env(safe-area-inset-bottom))' }">
    <top
      :product="product"
      @tap-show-model="tapShowModel"
      :choose="isSelectNum"
      @did-tap-change="
        emits('didClickButton', ProductDetailButtonType.ChangeBox)
      "
      @did-tap-reload="emits('didClickButton', ProductDetailButtonType.Reload)"
    />
    <InGroup @tap.stop="emits('didClickRemark')" :content="product.remark" />
    <page-control
      :product="product"
      @did-click-change-box="didClickChangeBox"
    />
    <CommonTab
      v-model:current-index="currentIndex"
      @tab-did-change="tabDidChange"
      @scroll-to-lower="scrollToLower"
      :product="product"
      @did-click-button="handleClickAction"
      class="general-common flex-1"
    >
      <template #goods>
        <view class="general-content-list box-border relative grid gap-30" :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 60rpx) / 3), 1fr))' }">
          <goods-item
            class="general-content-list-item inline-block w-full"
            v-for="(item, index) in goodsList"
            :key="index"
            :item="item"
            :goods-price="product.payType === 8 ? item.price : product.price"
            @tap.stop="clickItem(item)"
          />
        </view>
      </template>
      <template #record>
        <all-tab
          v-if="currentIndex === 1"
          :sort-list="sortList"
          @sort-tab-action="sortTabAction"
        />
        <record
          :record-list="recordList"
          :types="true"
          :border-height="201"
          :border-width="701"
        />
      </template>
    </CommonTab>
    <cards
      :cards-array="cardsArray"
      :queue-lock-time="product.queueLockTime"
      @did-tap-choose="didClickPurchase"
      @did-tap-change-box="
        emits('didClickButton', ProductDetailButtonType.ChangeBox)
      "
    />
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import PageControl from "./pageControl/index.vue";
import Top from "./generalTop/index.vue";
import Record from "@/subPackages/product/card/components/record.vue";
import CommonTab from "./CommonTab/index.vue";

import InGroup from "./InGroup/index.vue";
import Cards from "./bottomCards/index.vue";
import AllTab from "./all/index.vue";
import GoodsItem from "./generalGoods/index.vue";
import { useMerchant } from "@/pages/merchant/index";

import type {
  UIProductBoxModel,
  UIProductDetailModel,
  UIProductPriceCard,
  UIProductRecordModel,
} from "@/model";
import { ProductDetailButtonType } from "@/model";
defineProps({
  goodsList: {
    default: () => [],
    type: Array as PropType<UIProductBoxModel[]>,
  },
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  recordList: {
    type: Array as () => UIProductRecordModel[],
    default: [] as UIProductRecordModel[],
  },
  cardsArray: {
    default: () => [],
    type: Array as PropType<UIProductPriceCard[]>,
  },
  isSelectNum: {
    default: false,
    type: Boolean,
  },
  sortList: {
    default: () => [],
    type: Array,
  },
});
const tapShowModel = (value: number) => {
  emits("tapShowModel", value);
};
const currentIndex = ref(0);

const handleClickAction = (action: number) => {
  switch (action) {
    case 0:
      emits("didClickButton", ProductDetailButtonType.Save);
      break;
    case 1:
      emits("didClickButton", ProductDetailButtonType.Favorite);
      break;
    case 2:
      emits("didClickButton", ProductDetailButtonType.Reload);
      break;
  }
};

const scrollToLower = () => {
  if (currentIndex.value === 0) {
    return;
  }
  emits("scrollToLower");
};
const emits = defineEmits([
  "tabDidChange",
  "didClickChangeBox",
  "didClickPurchase",
  "didClickButton",
  "scrollToLower",
  "sortTabAction",
  "clickItem",
  "tapShowModel",
  "didClickRemark",
]);
const clickItem = (item: any) => {
  emits("clickItem", item);
};
const sortTabAction = (i: any) => {
  emits("sortTabAction", i);
};
const tabDidChange = (index: number) => {
  // currentIndex.value = index;
  emits("tabDidChange", index);
};

const didClickChangeBox = (isLeft: boolean) => {
  emits("didClickChangeBox", isLeft);
};

const didClickPurchase = (num: number) => {
  emits("didClickPurchase", {
    num,
  });
};
</script>
<style lang="scss" scoped>
</style>
