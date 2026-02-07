<template>
  <view class="box-container">
    <scroll-view
      class="selectNum"
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
      <view class="selectNum-content-goods">
        <goods-item
          class="selectNum-content-goods-item"
          :is-select="true"
          v-for="(item, index) in goodsList"
          :key="index"
          :item="item"
          :goods-price="product.price"
          @tap.stop="clickItem(item)"
        />
      </view>

      <view class="selectNum-tab">
        <view class="selectNum-tab-item" @tap.stop="didClickTabItem(0)">
          <image
            class="selectNum-tab-item-bg"
            :src="
              currentTab === 0
                ? 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab-normal.png'
                : 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab-disable.png'
            "
          />
          <view class="selectNum-tab-item-content">
            <text
              class="theme-font selectNum-tab-item-title"
              :style="{ color: currentTab === 0 ? '#fb7f3c' : '#969696' }"
              >{{ product.type === 4 ? "赏品" : "赏品一览" }}</text
            >
          </view>
        </view>
        <view
          class="selectNum-tab-item"
          @tap.stop="didClickTabItem(product.type === 4 ? 2 : 1)"
        >
          <image
            class="selectNum-tab-item-bg"
            :src="
              currentTab === (product.type === 4 ? 2 : 1)
                ? 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab-normal.png'
                : 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab-disable.png'
            "
          />
          <view class="selectNum-tab-item-content">
            <text
              class="theme-font selectNum-tab-item-title"
              :style="{
                color:
                  currentTab === (product.type === 4 ? 2 : 1)
                    ? '#fb7f3c'
                    : '#969696',
              }"
              >{{ product.type === 4 ? "购买记录" : "抽赏记录" }}</text
            >
          </view>
        </view>
        <view
          class="selectNum-tab-item"
          @tap.stop="didClickTabItem(1)"
          v-if="product.type === 4"
        >
          <image
            class="selectNum-tab-item-bg"
            :src="
              currentTab === 1
                ? 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab-normal.png'
                : 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab-disable.png'
            "
          />
          <view class="selectNum-tab-item-content">
            <text
              class="theme-font selectNum-tab-item-title"
              :style="{ color: currentTab === 1 ? '#fb7f3c' : '#969696' }"
              >结果</text
            >
          </view>
        </view>
      </view>
      <view class="selectNum-content" v-if="currentTab === 0">
        <view class="selectNum-content-top">
          <view class="selectNum-content-top-info">
            <view class="selectNum-content-top-info-left">
              <text class="selectNum-content-top-info-left-title theme-font"
                >指定福袋</text
              >
              <image
                class="selectNum-content-top-info-left-box"
                src="https://jms.85gui7.com/kahe-202510/ka-he/product/box-normal.png"
              />
              <text class="selectNum-content-top-info-left-tips">可选</text>
              <image
                class="selectNum-content-top-info-left-box"
                src="https://jms.85gui7.com/kahe-202510/ka-he/product/box-sell.png"
              />
              <text class="selectNum-content-top-info-left-tips">已售</text>
              <image
                class="selectNum-content-top-info-left-box"
                src="https://jms.85gui7.com/kahe-202510/ka-he/product/box-lock.png"
              />
              <text class="selectNum-content-top-info-left-tips">上锁</text>
            </view>
          </view>
        </view>
        <view class="selectNum-content-box">
          <view
            class="selectNum-content-box-item"
            v-for="(item, index) in boxList"
            :key="index"
            @tap.stop="handleSelectBox(item)"
          >
            <image
              class="selectNum-content-box-item-img"
              :src="`https://jms.85gui7.com/kahe-202510/ka-he/product/box-${item.state === 1 ? 'normal' : item.state === 0 ? 'sell' : 'lock'}.png`"
            />
            <view class="selectNum-content-box-item-title">
              {{ item.title }}</view
            >
          </view>
        </view>
      </view>
      <view class="selectNum-content" v-if="currentTab === 1">
        <view class="selectNum-content-records">
          <record
            :record-list="recordList"
            :is-select="true"
            :types="true"
            :border-height="201"
            :border-width="701"
          />
        </view>
      </view>
      <view class="selectNum-content" v-if="currentTab === 2">
        <view class="selectNum-content-records">
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
    <view class="box-container-bottom">
      <image
        class="box-container-bottom-bg"
        src="https://jms.85gui7.com/kahe-202510/ka-he/welfare/bottom-bg.png"
      />
      <view class="box-container-bottom-content">
        <view class="box-container-bottom-left">
          已选<text style="color: red">{{ boxSelect.length }}</text
          >个 共<text style="color: red">{{
            (boxSelect.length * product.price).toFixed(1)
          }}</text
          >元
        </view>
        <view class="box-container-bottom-right">
          <view
            class="box-container-bottom-right-item"
            @tap.stop="didClickExchange"
          >
            <image
              class="box-container-bottom-right-item-bg"
              src="https://jms.85gui7.com/kahe-202510/ka-he/common/common-btn-bg.png"
            />
            <text
              class="box-container-bottom-right-item-text theme-font text-stroke-main"
              >换 箱</text
            >
          </view>
          <view
            class="box-container-bottom-right-item"
            @tap.stop="didClickPurchase"
          >
            <image
              class="box-container-bottom-right-item-bg"
              src="https://jms.85gui7.com/kahe-202510/ka-he/common/common-btn-bg.png"
            />
            <text
              class="box-container-bottom-right-item-text theme-font text-stroke-main"
              >购 买</text
            >

            <view
              v-if="product.queueLockTime"
              class="box-container-bottom-right-item-queue"
            >
              <image
                class="box-container-bottom-right-item-queue-bg"
                src="https://jms.85gui7.com/kahe-202510/product/lock-queue.png"
              />
              <text class="box-container-bottom-right-item-queue-title"
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
<style lang="scss" scoped>
.box-container {
  position: relative;
  width: 100%;
  height: 100vh;

  &-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    display: flex;
    flex-direction: column;
    gap: 0;
    &-bg {
      width: 750rpx;
      height: 164rpx;
    }

    &-content {
      position: absolute;
      left: 0;
      bottom: calc(32rpx);
      width: 100%;
      padding: 0 32rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    &-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-weight: normal;
      font-size: 28rpx;
      color: #000000;
    }
    &-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-item {
        margin-left: 16rpx;
        position: relative;
        width: 181rpx;
        height: 76rpx;
        &-bg {
          width: 100%;
          height: 100%;
        }
        &-text {
          position: absolute;
          left: 0;
          top: 16rpx;
          width: 100%;
          text-align: center;
          font-weight: 400;
          font-size: 40rpx;
          color: #ffffff;
          line-height: 36rpx;
        }

        &-queue {
          position: absolute;
          top: -60rpx;
          left: 40rpx;
          width: calc(155rpx * 1);
          height: calc(60rpx * 1);
          z-index: 90;
          &-bg {
            width: 100%;
            height: 100%;
          }
          &-title {
            position: absolute;
            top: 8rpx;
            left: 16rpx;
            width: calc(100% - 10rpx);
            font-weight: normal;
            font-size: 20rpx;
            color: #000000;
          }
        }
      }
    }
  }
}

.selectNum {
  padding: 16px 0;
  width: 100%;
  height: calc(100vh - env(safe-area-inset-bottom) - 100rpx);
  display: flex;
  flex-direction: column;

  &-content {
    margin: 8rpx 20rpx;
    width: calc(100% - 40rpx);
    background: #fffbef;
    box-shadow: 0rpx 3rpx 7rpx 0rpx #d9be86;
    border-radius: 10rpx;
    overflow: hidden;
    padding: 21rpx;
    &-top {
      position: relative;
      width: 100%;
      &-info {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &-left {
          display: flex;
          flex-direction: row;
          align-items: center;
          &-title {
            margin: 0 20rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #000000;
          }
          &-tips {
            margin-left: 5rpx;
            margin-right: 28rpx;
            font-size: 16rpx;
            color: #000000;
          }
          &-box {
            width: 36rpx;
            height: 36rpx;
          }
        }

        &-right {
          margin-right: 28rpx;
          width: 71rpx;
          height: 30rpx;
          line-height: 30rpx;
          text-align: center;
          background: #4c82c1;
          border-radius: 4rpx;
          border: 2px solid #1e2d5e;
          font-weight: 400;
          font-size: 20rpx;
          color: #ffffff;
        }
      }

      &-tips {
        position: absolute;
        left: 20rpx;
        top: 20rpx;
        font-weight: normal;
        font-size: 24rpx;
        color: #000000;
      }
    }

    &-records {
      box-sizing: border-box;
      width: 100%;
    }
    &-goods {
      margin: 16rpx 20rpx;
      padding: 32rpx;
      width: calc(100% - 40rpx);
      box-sizing: border-box;
      position: relative;
      background: #fffbef;
      box-shadow: 0rpx 3rpx 7rpx 0rpx #d9be86;
      border-radius: 10rpx;
      display: grid;

      grid-template-columns: repeat(
        auto-fill,
        minmax(calc((100% - 60rpx) / 3), 1fr)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 30rpx; // 这是网格间的间隙，根据需要调整
      &-item {
        display: inline-block;
        width: 100%;
      }
    }

    &-box {
      margin-top: 21rpx;
      box-sizing: border-box;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc((100% - 7 * 20rpx) / 8), 1fr)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 20rpx; // 这是网格间的间隙，根据需要调整
      &-item {
        position: relative;
        aspect-ratio: 1;
        color: #ffffff;
        &-img {
          width: 100%;
          height: 100%;
        }
        &-title {
          position: absolute;
          left: 10rpx;
          top: 5rpx;
          font-weight: normal;
          font-size: 24rpx;
          color: #ffffff;
        }
      }
    }
  }
  &-tab {
    padding: 8rpx 20rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 40rpx;
    &-item {
      position: relative;
      width: 309rpx;
      aspect-ratio: 309 / 106;

      &-bg {
        position: relative;
        width: 100%;
        height: 100%;
      }
      &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      &-title {
        font-weight: 400;
        font-size: 40rpx;
        color: #fb7f3c;
        @include text-stroke(3rpx, #ffffff);
      }
    }
    &-item:last-child {
      margin-right: 0;
    }
  }
}
</style>
