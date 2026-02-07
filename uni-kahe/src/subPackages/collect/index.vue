<template>
  <view class="collect">
    <view class="collect-content">
      <view class="collect-content-top">
        <image
          class="collect-content-top-bg"
          src="https://jms.85gui7.com/kahe-202510/collect/bg-top.png"
        />
        <view class="collect-content-top-row">
          <view class="collect-content-top-row-item" @tap.stop="navToHome">
            <image
              class="collect-content-top-row-item-icon"
              src="https://jms.85gui7.com/kahe-202510/collect/item1.png"
            />
            <view class="collect-content-top-row-item-title text-stroke-main"
              >首页</view
            >
          </view>
          <view class="collect-content-top-row-item" @tap.stop="clickRule">
            <image
              class="collect-content-top-row-item-icon"
              src="https://jms.85gui7.com/kahe-202510/collect/item2.png"
            />
            <view class="collect-content-top-row-item-title text-stroke-main"
              >规则</view
            >
          </view>
          <view
            class="collect-content-top-row-title text-stroke-main"
            @tap.stop="navToRecordPage"
            >集成记录</view
          >
        </view>
      </view>
      <category @did-change="handleCategoryChange" />
      <scroll-view
        class="collect-content-list"
        scroll-y
        @scrolltolower="handleScrollToLower"
      >
        <view
          v-for="(item, index) in collectionList"
          :key="'it' + index"
          class="collect-content-list-item"
        >
          <item
            :item="item"
            @did-click-item="handleClickCollectItem"
            @did-exchange-item="handleClickItem"
          />
        </view>
        <empty v-show="collectionList.length === 0" />
      </scroll-view>
    </view>
    <Exchange
      v-model:show="mallShow"
      :goods="payItem"
      :is-collect="true"
      @did-tap-smash="handleCollectionExchange"
    />
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
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

// onMounted(() => {
//
// });
onShow(() => {
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

<style lang="scss" scoped>
.collect {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("https://jms.85gui7.com/kahe-202510/collect/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-top {
      position: relative;
      width: 100%;
      &-bg {
        width: 100%;
        aspect-ratio: 750 / 379;
      }
      &-row {
        position: absolute;
        top: 16rpx;
        left: 16rpx;
        display: flex;
        flex-direction: row;
        &-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 28rpx;
          &-icon {
            width: 32rpx;
            height: 30rpx;
          }
          &-title {
            margin-left: 4rpx;
            font-weight: 400;
            font-size: 20rpx;
            color: #ffffff;
            line-height: 16rpx;
          }
        }

        &-title {
          font-weight: 400;
          font-size: 20rpx;
          color: #ffffff;
          padding: 6rpx 0;
          border-bottom: 1px solid rgba(34, 55, 133, 0.88);
        }
      }
    }
    &-list {
      width: 100%;
      height: calc(
        100vh - 750rpx * 379 / 750 - 138rpx - env(safe-area-inset-bottom)
      );
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-item {
        margin-bottom: 22rpx;
      }
      &-item:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
