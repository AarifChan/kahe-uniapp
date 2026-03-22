<template>
  <view class="boxDetail">
    <view class="boxDetail-top">
      <view>
        <view class="boxDetail-top-title theme-font">{{ title }}</view>
        <view class="boxDetail-top-subTitle theme-font">{{
          selectNum ? `已选${selectNum}个` : `共${total}个`
        }}</view>
      </view>
      <view class="boxDetail-top-btn">
        <view
          class="boxDetail-top-btn-item style1 theme-font"
          @tap.stop="tapShowModel(0)"
          >发货须知</view
        >
        <view
          class="boxDetail-top-btn-item style3 theme-font"
          @tap.stop="tapShowModel(2)"
          >品相定义</view
        >
      </view>
    </view>

    <scroll-view
      class="boxDetail-content"
      :scroll-y="true"
      :scroll-x="false"
      :enable-flex="true"
      @scrolltolower="handleScrollToLower"
    >
      <view class="boxDetail-content-list">
        <view
          class="boxDetail-content-list-item"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <item
            :item="item"
            @did-tap-lock="handleLockItem"
            @did-tap-detail="clickItem"
            @did-tap-select="handleSelectItem"
          />
        </view>
      </view>
    </scroll-view>
    <Handle @did-click-item="handle" />
    <select-modal v-model:show="numSelectModal" v-model:item="currentBox" />
    <detail-modal v-model:show="detailShow" :item="currentBox" />
    <smash
      v-model:show="smashShow"
      :recycleGoods="smashList"
      @did-tap-smash="didTapPay"
    />
    <shipment
      v-model:show="shipmentShow"
      :address="address"
      :list="smashList"
      @did-tap-address="chooseAddress"
      @did-tap-protocol="showModalType(ModalType.UserProtocol)"
      @did-click-confirm="didTapPay"
    />
    <Common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { getPageOptions } from "@/utils/tools";
import Handle from "./components/handle.vue";
import Item from "./components/item.vue";
import CommonModal from "@/components/modal/index.vue";
import DetailModal from "@/components/modal/detail/index.vue";
import SelectModal from "./components/select.vue";
import Shipment from "@/components/modal/shipment/index.vue";
import { useBox } from "@/composables/box";
import Smash from "@/components/modal/smash/index.vue";
import { ModalType, useModal } from "@/composables/modal";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const {
  address,
  chooseAddress,
  smashShow,
  smashList,
  didTapPay,
  shipmentShow,
  payType,
  getBoxGoodsList,
  goodsList,
  params,
  currentBox,
  detailShow,
  clickItem,
  handleLockItem,
  handle,
  numSelectModal,
  handleSelectItem,
  selectNum,
  payShow,
  handleScrollToLower,
} = useBox();

const title = ref("");
const total = computed(() => {
  let total = 0;
  goodsList.value.forEach((item) => {
    total += item.num;
  });
  return total;
});
onMounted(() => {
  const boxId = getPageOptions().boxId;
  title.value = getPageOptions().title ?? 0;
  getBoxGoodsList(Number(boxId));
  uni.setNavigationBarTitle({
    title: title.value,
  });
});
const tapShowModel = (val: number) => {
  if (val === 2) {
    uni.navigateTo({
      url: "/subPackages/product/state/index",
    });
  } else if (val === 0) {
    showModalType(4);
  }
};
</script>

<style lang="scss" scoped>
.boxDetail {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #f7daa1, #fff3dc);

  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &-top {
    position: absolute;
    left: 15px;
    top: 0;
    width: calc(100% - 30px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-left {
      display: flex;
      flex-direction: row;
      &-title {
        font-size: 40rpx;
        font-weight: 400;
        color: #ffffff;
        @include text-stroke(3rpx, #775435);
      }
      &-subTitle {
        font-size: 40rpx;
        font-weight: 400;
        color: #000000;
      }
    }

    &-btn {
      //position: absolute;
      //right: 40rpx;
      //top: 18rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8rpx;
      //z-index: 99;

      &-item {
        font-size: 28rpx;
        text-align: center;
        padding: 4rpx 6rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
        color: #ffffff;
      }
      .style1 {
        background: #7fff85;
        //border-radius: 4rpx;
        border: 2rpx solid #29984b;
        color: #237927;
      }
      .style2 {
        background: #fffa70;
        //border-radius: 4rpx;
        border: 2rpx solid #785e30;
        color: #85733a;
      }
      .style3 {
        background: #7cd2f0;
        //border-radius: 4rpx;
        border: 2rpx solid #785e30;
        color: #237927;
      }
    }
  }

  &-content {
    position: absolute;
    top: 80rpx;
    left: 0;
    width: 100%;
    height: calc(100% - env(safe-area-inset-bottom) - 260rpx);
    &-list {
      padding: 0 15px;
      width: 100%;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc((100% - 30px) / 3), 1fr)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 15px; // 这是网格间的间隙，根据需要调整
      &-item {
        display: inline-block;
      }
    }
  }
}
</style>
