<template>
  <view class="box-container relative w-full h-screen">
    <scroll-view
      class="selectNum w-full flex flex-col box-border"
      :style="{
        padding: '16px 0',
        height: 'calc(100vh - env(safe-area-inset-bottom) - 100rpx)',
      }"
      :scroll-y="true"
      @scrolltolower="emits('scrollToLower')"
    >
      <top
        :product="product"
        :choose="isSelectNum"
        @tap-show-model="tapShowModel"
        @did-tap-reload="
          emits('didClickButton', ProductDetailButtonType.Reload)
        "
      />
      <merchant :product="product" />
      <InGroup @tap.stop="emits('didClickRemark')" :content="product.remark" />
      <view
        class="selectNum-content-goods box-border relative grid gap-30 mx-20 my-16 p-32 bg-[#fffbef] overflow-hidden shadow-[0rpx_3rpx_7rpx_0rpx_#d9be86] rounded-10"
        :style="{
          width: 'calc(100% - 40rpx)',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(calc((100% - 60rpx) / 3), 1fr))',
        }"
      >
        <goods-item
          class="selectNum-content-goods-item inline-block w-full"
          :is-select="true"
          v-for="(item, index) in goodsList"
          :key="index"
          :item="item"
          :goods-price="product.payType === 8 ? item.price : product.price"
          @tap.stop="clickItem(item)"
        />
      </view>

      <view
        class="selectNum-tab w-full box-border flex flex-row items-center justify-evenly gap-40 py-8 px-20"
      >
        <view
          class="selectNum-tab-item relative w-309 aspect-ratio-[309/106]"
          @tap.stop="didClickTabItem(0)"
        >
          <image
            class="selectNum-tab-item-bg relative w-full h-full"
            :src="
              currentTab === 0
                ? '/static/kahe-202510/ka-he/product/tab-normal.png'
                : '/static/kahe-202510/ka-he/product/tab-disable.png'
            "
          />
          <view
            class="selectNum-tab-item-content absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center"
          >
            <text
              class="theme-font selectNum-tab-item-title text-40 font-normal"
              :style="{
                color: currentTab === 0 ? '#fb7f3c' : '#969696',
                textShadow:
                  '-3rpx -3rpx 0 #ffffff, 3rpx -3rpx 0 #ffffff, -3rpx 3rpx 0 #ffffff, 3rpx 3rpx 0 #ffffff',
              }"
              >{{ product.type === 4 ? "赏品" : "赏品一览" }}</text
            >
          </view>
        </view>
        <view
          class="selectNum-tab-item relative w-309 aspect-ratio-[309/106]"
          @tap.stop="didClickTabItem(product.type === 4 ? 2 : 1)"
        >
          <image
            class="selectNum-tab-item-bg relative w-full h-full"
            :src="
              currentTab === (product.type === 4 ? 2 : 1)
                ? '/static/kahe-202510/ka-he/product/tab-normal.png'
                : '/static/kahe-202510/ka-he/product/tab-disable.png'
            "
          />
          <view
            class="selectNum-tab-item-content absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center"
          >
            <text
              class="theme-font selectNum-tab-item-title text-40 font-normal"
              :style="{
                color:
                  currentTab === (product.type === 4 ? 2 : 1)
                    ? '#fb7f3c'
                    : '#969696',
                textShadow:
                  '-3rpx -3rpx 0 #ffffff, 3rpx -3rpx 0 #ffffff, -3rpx 3rpx 0 #ffffff, 3rpx 3rpx 0 #ffffff',
              }"
              >{{ product.type === 4 ? "购买记录" : "抽赏记录" }}</text
            >
          </view>
        </view>
        <view
          class="selectNum-tab-item relative w-309 aspect-ratio-[309/106]"
          @tap.stop="didClickTabItem(1)"
          v-if="product.type === 4"
        >
          <image
            class="selectNum-tab-item-bg relative w-full h-full"
            :src="
              currentTab === 1
                ? '/static/kahe-202510/ka-he/product/tab-normal.png'
                : '/static/kahe-202510/ka-he/product/tab-disable.png'
            "
          />
          <view
            class="selectNum-tab-item-content absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center"
          >
            <text
              class="theme-font selectNum-tab-item-title text-40 font-normal"
              :style="{
                color: currentTab === 1 ? '#fb7f3c' : '#969696',
                textShadow:
                  '-3rpx -3rpx 0 #ffffff, 3rpx -3rpx 0 #ffffff, -3rpx 3rpx 0 #ffffff, 3rpx 3rpx 0 #ffffff',
              }"
              >结果</text
            >
          </view>
        </view>
      </view>
      <view
        class="selectNum-content box-border mx-20 my-8 p-21 bg-[#fffbef] overflow-hidden shadow-[0rpx_3rpx_7rpx_0rpx_#d9be86] rounded-10"
        :style="{ width: 'calc(100% - 40rpx)' }"
        v-if="currentTab === 0"
      >
        <view class="selectNum-content-top relative w-full">
          <view
            class="selectNum-content-top-info w-full flex flex-row justify-between items-center"
          >
            <view
              class="selectNum-content-top-info-left flex flex-row items-center"
            >
              <text
                class="selectNum-content-top-info-left-title theme-font mx-20 text-24 font-normal text-black"
                >指定福袋</text
              >
              <image
                class="selectNum-content-top-info-left-box w-36 h-36"
                src="/static/kahe-202510/jikaquan/normal-box.png"
              />
              <text
                class="selectNum-content-top-info-left-tips ml-5 mr-28 text-16 text-black"
                >可选</text
              >
              <image
                class="selectNum-content-top-info-left-box w-36 h-36"
                src="/static/kahe-202510/ka-he/product/box-sell.png"
              />
              <text
                class="selectNum-content-top-info-left-tips ml-5 mr-28 text-16 text-black"
                >已售</text
              >
              <image
                class="selectNum-content-top-info-left-box w-36 h-36"
                src="/static/kahe-202510/ka-he/product/box-lock.png"
              />
              <text
                class="selectNum-content-top-info-left-tips ml-5 mr-28 text-16 text-black"
                >上锁</text
              >
            </view>
          </view>
        </view>
        <view
          class="selectNum-content-box box-border w-full grid gap-20 mt-21"
          :style="{
            gridTemplateColumns:
              'repeat(auto-fill, minmax(calc((100% - 7 * 20rpx) / 8), 1fr))',
          }"
        >
          <view
            class="selectNum-content-box-item relative aspect-ratio-[1/1] text-white"
            v-for="(item, index) in boxList"
            :key="index"
            @tap.stop="handleSelectBox(item)"
          >
            <image
              class="selectNum-content-box-item-img w-full h-full"
              :src="`/static/kahe-202510/ka-he/product/box-${item.state === 1 ? 'kaju' : item.state === 0 ? 'sell' : 'lock'}.png`"
            />
            <view
              class="selectNum-content-box-item-title absolute left-10 top-5 font-normal text-24 text-white"
            >
              {{ item.title }}</view
            >
          </view>
        </view>
      </view>
      <view
        class="selectNum-content box-border mx-20 my-8 p-21 bg-[#fffbef] overflow-hidden shadow-[0rpx_3rpx_7rpx_0rpx_#d9be86] rounded-10"
        :style="{ width: 'calc(100% - 40rpx)' }"
        v-if="currentTab === 1"
      >
        <view class="selectNum-content-records box-border w-full">
          <record
            :record-list="recordList"
            :is-select="true"
            :types="true"
            :border-height="201"
            :border-width="701"
          />
        </view>
      </view>
      <view
        class="selectNum-content box-border mx-20 my-8 p-21 bg-[#fffbef] overflow-hidden shadow-[0rpx_3rpx_7rpx_0rpx_#d9be86] rounded-10"
        :style="{ width: 'calc(100% - 40rpx)' }"
        v-if="currentTab === 2"
      >
        <view class="selectNum-content-records box-border w-full">
          <record
            :record-list="orderList"
            :is-select="true"
            :types="true"
            :is-open="true"
            :border-height="201"
            :border-width="701"
          />
        </view>
      </view>
    </scroll-view>
    <view
      class="box-container-bottom fixed bottom-0 left-0 w-750 flex flex-col"
    >
      <image
        class="box-container-bottom-bg w-750 h-164"
        src="/static/kahe-202510/ka-he/welfare/bottom-bg.png"
      />
      <view
        class="box-container-bottom-content absolute left-0 bottom-32 w-full px-32 box-border flex flex-row items-center justify-between"
        :style="{ padding: '0 32rpx' }"
      >
        <view
          class="box-container-bottom-left flex flex-row items-center justify-start font-normal text-28 text-black"
        >
          已选<text style="color: red">{{ boxSelect.length }}</text
          >个 共<text style="color: red">{{
            (boxSelect.length * product.price).toFixed(1)
          }}</text
          >元
        </view>
        <view class="box-container-bottom-right flex flex-row items-center">
          <view
            class="box-container-bottom-right-item relative ml-16 w-181 h-76"
            @tap.stop="didClickExchange"
          >
            <image
              class="box-container-bottom-right-item-bg w-full h-full"
              src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
            />
            <text
              class="box-container-bottom-right-item-text theme-font absolute left-0 top-16 w-full text-center text-40 font-normal text-white leading-36"
              :style="{
                textShadow:
                  '-1px -1px 0 #0F2268, 1px -1px 0 #0F2268, -1px 1px 0 #0F2268, 1px 1px 0 #0F2268',
              }"
              >换 箱</text
            >
          </view>
          <view
            class="box-container-bottom-right-item relative ml-16 w-181 h-76"
            @tap.stop="didClickPurchase"
          >
            <image
              class="box-container-bottom-right-item-bg w-full h-full"
              src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
            />
            <text
              class="box-container-bottom-right-item-text theme-font absolute left-0 top-16 w-full text-center text-40 font-normal text-white leading-36"
              :style="{
                textShadow:
                  '-1px -1px 0 #0F2268, 1px -1px 0 #0F2268, -1px 1px 0 #0F2268, 1px 1px 0 #0F2268',
              }"
              >购 买</text
            >

            <view
              v-if="product.queueLockTime"
              class="box-container-bottom-right-item-queue absolute -top-60 left-40 w-155 h-60 z-90"
            >
              <image
                class="box-container-bottom-right-item-queue-bg w-full h-full"
                src="/static/kahe-202510/product/lock-queue.png"
              />
              <text
                class="box-container-bottom-right-item-queue-title absolute top-8 left-16 text-20 font-normal text-black"
                :style="{ width: 'calc(100% - 10rpx)' }"
                >每发锁{{ product.queueLockTime }}秒</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed, type PropType, ref } from "vue";

import {
  ProductDetailButtonType,
  UIProductBoxModel,
  UIProductDetailModel,
  UIProductPriceCard,
  UIProductRecordModel,
} from "@/model";
import InGroup from "./InGroup/index.vue";
import Top from "@/subPackages/product/detail/components/generalTop/index.vue";
import { ShowToast } from "@/utils";
import Record from "@/subPackages/product/card/components/record.vue";
import Merchant from "../components/merchant/index.vue";
import GoodsItem from "@/subPackages/product/detail/components/generalGoods/index.vue";
const props = defineProps({
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
  orderList: {
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
  progress: {
    default: "",
    type: String,
  },
});

interface UISelectBoxItem {
  value: number;
  state: number; // 0 不可选 1 可选 2 选择
  title: number;
}

const boxList = computed(() => {
  const arr: UISelectBoxItem[] = [];
  const winNum = props.product.winNum;
  for (let i = 0; i < props.product.total; i++) {
    let state = 1;
    const index = i + 1;
    if (boxSelect.value.filter((n) => n === index).length > 0) {
      state = 2;
    }
    if (winNum.filter((n) => n === index).length > 0) {
      state = 0;
    }
    arr.push({
      value: index,
      state,
      title: index,
    });
  }
  return arr;
});

const boxSelect = ref([] as number[]);

const handleSelectBox = (item: UISelectBoxItem) => {
  if (!item.state) {
    return;
  }
  if (boxSelect.value.filter((n) => n === item.value).length > 0) {
    boxSelect.value = boxSelect.value.filter((n) => n !== item.value);
  } else {
    boxSelect.value.push(item.value);
  }
};

const clickItem = (item: UIProductBoxModel) => {
  emits("clickItem", item);
};

const tapShowModel = (value: number) => {
  emits("tapShowModel", value);
};

const didClickPurchase = () => {
  if (boxSelect.value.length === 0) {
    ShowToast("请选择");
    return;
  }
  emits("didClickPurchase", {
    selNum: boxSelect.value,
    num: boxSelect.value.length,
  });
  boxSelect.value = [];
};
const didClickExchange = () => {
  emits("clickSwap");
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
  "clickSwap",
  "didClickRemark",
]);

const currentTab = ref(0);

const didClickTabItem = (index: number) => {
  currentTab.value = index;
  emits("tabDidChange", index);
};
</script>
<style lang="scss" scoped></style>
