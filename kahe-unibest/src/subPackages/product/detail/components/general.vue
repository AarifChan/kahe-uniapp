<template>
  <view class="general">
    <top
      :product="product"
      :choose="isSelectNum"
      @tap-show-model="tapShowModel"
      @did-tap-change="
        emits('didClickButton', ProductDetailButtonType.ChangeBox)
      "
      @did-tap-reload="emits('didClickButton', ProductDetailButtonType.Reload)"
    />
    <InGroup :content="product.remark" @tap.stop="emits('didClickRemark')" />
    <page-control
      :product="product"
      @did-click-change-box="didClickChangeBox"
    />
    <CommonTab
      v-model:current-index="currentIndex"
      :product="product"
      class="general-common"
      @tab-did-change="tabDidChange"
      @scroll-to-lower="scrollToLower"
      @did-click-button="handleClickAction"
    >
      <template #goods>
        <view class="general-content-list">
          <goods-item
            v-for="(item, index) in goodsList"
            :key="index"
            class="general-content-list-item"
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
import type { PropType } from 'vue'
import type {
  UIProductBoxModel,
  UIProductDetailModel,
  UIProductPriceCard,
  UIProductRecordModel,
} from '@/model'
import { ref } from 'vue'
import { ProductDetailButtonType } from '@/model'
import Record from '@/subPackages/product/card/components/record.vue'

import AllTab from './all/index.vue'
import Cards from './bottomCards/index.vue'
import CommonTab from './CommonTab/index.vue'
import GoodsItem from './generalGoods/index.vue'
import Top from './generalTop/index.vue'

import InGroup from './InGroup/index.vue'
import PageControl from './pageControl/index.vue'

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
})
const emits = defineEmits([
  'tabDidChange',
  'didClickChangeBox',
  'didClickPurchase',
  'didClickButton',
  'scrollToLower',
  'sortTabAction',
  'clickItem',
  'tapShowModel',
  'didClickRemark',
])
function tapShowModel(value: number) {
  emits('tapShowModel', value)
}
const currentIndex = ref(0)

function handleClickAction(action: number) {
  switch (action) {
    case 0:
      emits('didClickButton', ProductDetailButtonType.Save)
      break
    case 1:
      emits('didClickButton', ProductDetailButtonType.Favorite)
      break
    case 2:
      emits('didClickButton', ProductDetailButtonType.Reload)
      break
  }
}

function scrollToLower() {
  if (currentIndex.value === 0) {
    return
  }
  emits('scrollToLower')
}
function clickItem(item: any) {
  emits('clickItem', item)
}
function sortTabAction(i: any) {
  emits('sortTabAction', i)
}
function tabDidChange(index: number) {
  // currentIndex.value = index;
  emits('tabDidChange', index)
}

function didClickChangeBox(isLeft: boolean) {
  emits('didClickChangeBox', isLeft)
}

function didClickPurchase(num: number) {
  emits('didClickPurchase', {
    num,
  })
}
</script>

<style lang="scss" scoped>
.general {
  width: 100%;
  padding: 32rpx 0;
  height: calc(100vh - env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;

  &-common {
    flex: 1;
  }

  &-tab {
    width: 100%;
    margin-top: 24rpx;
    position: relative;
    @include flex-y-center();
    justify-content: center;

    &-tabList {
      position: relative;
      width: 309rpx;
      height: 46rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 23rpx;

      &-tabListBg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
    }
  }

  &-content {
    position: relative;
    margin: 16rpx 20rpx;
    box-sizing: border-box;
    width: calc(100% - 40rpx);
    overflow: hidden;

    &-bg {
      position: relative;
      width: 100%;
      aspect-ratio: 723 / 707;
    }

    &-tab2 {
      position: absolute;
      left: 192rpx;
      top: 20rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5rpx;
    }

    &-tab {
      position: absolute;
      left: 34rpx;
      top: 20rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5rpx;

      &-active {
        width: 7rpx;
        height: 30rpx;
        background: #fe7a4e;
        border-radius: 4rpx;
      }

      &-title {
        font-weight: 400;
        font-size: 36rpx;
        color: #000000;
      }
    }

    &-style {
      position: absolute;
      top: 16rpx;
      right: 40rpx;
      display: flex;
      flex-direction: row;
      align-items: center;

      &-avatar {
        width: 52rpx;
        height: 52rpx;
        border-radius: 50%;
        border: 2rpx solid white;
        z-index: 1;
      }

      &-bar {
        margin-left: -26rpx;
        height: 36rpx;
        background: rgba(255, 255, 255, 0.56);
        border-radius: 18rpx;

        &-title {
          margin-left: 32rpx;
          font-weight: 400;
          font-size: 22rpx;
          color: #000000;
          line-height: 36rpx;
        }
      }
    }

    &-actions {
      position: absolute;
      right: 0;
      top: 100rpx;
      display: flex;
      flex-direction: column;
      gap: 20rpx;

      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &-img {
          width: 56rpx;
          height: 56rpx;
        }

        &-title {
          z-index: 2;
          margin-top: -14rpx;
          font-weight: 400;
          font-size: 20rpx;
          color: #ffffff;
          @include text-stroke-color(#703b16);
        }
      }
    }

    &-record {
      position: absolute;
      //width: 100%;
      box-sizing: border-box;
      left: 20rpx;
      top: 96rpx;
      height: calc(100vh - 678rpx - env(safe-area-inset-bottom) - 122rpx);
      width: calc(100% - 40rpx);
      display: flex;
      flex-direction: column;
    }

    &-goods {
      position: absolute;
      left: 20rpx;
      top: 96rpx;
      height: calc(100vh - 678rpx - env(safe-area-inset-bottom) - 122rpx);
      width: calc(100% - 40rpx);
    }

    &-list {
      position: relative;
      box-sizing: border-box;
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
  }
}
</style>
