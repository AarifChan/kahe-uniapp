<template>
  <view class="boxDetail relative w-full h-screen overflow-hidden bg-gradient-[linear-gradient(180deg,#f7daa1,#fff3dc)]">
    <view class="absolute left-15 right-15 top-0 flex flex-row justify-between items-center z-10"
    >
      <view>
        <view class="boxDetail-top-title theme-font text-40 font-normal text-white text-stroke-3 text-stroke-[#775435]">{{ title }}</view>
        <view class="boxDetail-top-subTitle theme-font text-40 font-normal text-black">{{
          selectNum ? `已选${selectNum}个` : `共${total}个`
        }}</view>
      </view>
      <view class="boxDetail-top-btn flex flex-row items-center gap-8">
        <view
          class="boxDetail-top-btn-item text-28 text-center px-6 py-4 rounded-8 mr-16 text-white"
          :class="btnStyle(0)"
          @tap.stop="tapShowModel(0)"
          >发货须知</view
        >
        <view
          class="boxDetail-top-btn-item text-28 text-center px-6 py-4 rounded-8 mr-16 text-white"
          :class="btnStyle(2)"
          @tap.stop="tapShowModel(2)"
          >品相定义</view
        >
      </view>
    </view>

    <scroll-view
      class="absolute left-0 top-80 w-full box-border px-15"
      style="height: calc(100% - env(safe-area-inset-bottom) - 260rpx)"
      :scroll-y="true"
      :scroll-x="false"
      :enable-flex="true"
      @scrolltolower="handleScrollToLower"
    >
      <view class="w-full box-border grid gap-15" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 30px) / 3), 1fr))">
        <view
          class="inline-block"
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

const btnStyle = (type: number) => {
  if (type === 0) {
    return 'bg-[#7fff85] border-2 border-[#29984b] text-[#237927]';
  }
  if (type === 2) {
    return 'bg-[#7cd2f0] border-2 border-[#785e30] text-[#237927]';
  }
  return '';
};

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

<style lang="scss" scoped></style>
