<template>
  <view class="product">
    <!-- 选号模式 -->
    <SelectNum
      v-if="isSelectNum"
      :is-select-num="isSelectNum"
      :product="productDetail"
      :progress="normalProgress"
      :record-list="recordList"
      :order-list="orderList"
      :goods-list="goodsList"
      @scroll-to-lower="scrollToLower"
      @tab-did-change="currentTabDidChange"
      @did-click-button="handleDidClickButton"
      @did-click-purchase="didTapPurchaseNum"
      @click-swap="swapModalShow = true"
      @click-item="clickItem"
      @tap-show-model="tapShowModel"
      @did-click-remark="handleClickRemark"
    />
    <Infinite
      v-else-if="isInfinite"
      :sort-list="sortList"
      :luckProgress="luckProgress"
      :product="productDetail"
      :cards-array="cardsList"
      :record-list="recordList"
      :levelGroupList="levelGroupList"
      :goods-list="goodsList"
      :level-list="levelList"
      @click-item="clickItem"
      @tab-did-change="currentTabDidChange"
      @did-click-purchase="didTapPurchaseNum"
      @scroll-to-lower="scrollToLower"
      @sort-tab-action="sortTabAction"
      @tap-show-model="tapShowModel"
      @did-click-remark="handleClickRemark"
    />
    <General
      v-else
      :sort-list="sortList"
      :product="productDetail"
      :is-select-num="isSelectNum"
      :goods-list="goodsList"
      :cards-array="cardsList"
      :record-list="recordList"
      @click-item="clickItem"
      @sort-tab-action="sortTabAction"
      @tab-did-change="currentTabDidChange"
      @did-click-change-box="didClickChangeBox"
      @did-click-purchase="didTapPurchaseNum"
      @did-click-button="handleDidClickButton"
      @scroll-to-lower="scrollToLower"
      @tap-show-model="tapShowModel"
      @did-click-remark="handleClickRemark"
    />
    <Handles
      @did-tap-reload="reloadCurrentPage"
      :product="productDetail"
      :un-read-count="unreadNum"
    />
    <detail-modal v-model:show="detailShow" :item="currentBox" />
    <!--    <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
    <pay
      v-model:show="payShow"
      :goods="payItem"
      @did-tap-pay="didTapPay"
      @did-tap-coupon="didTapCoupon"
      :show-skip="isInfinite"
      :merchant="productDetail.merchant"
      v-model:skip-checked="skipLottery"
    />
    <swap
      v-model:show="swapModalShow"
      :box-list="boxList"
      :level-list="levelList"
      :box-range-list="boxRangeList"
      @did-select-box="didSelectBox"
      @did-tab-change-box-range="didTapChangeBoxRange"
    />
    <reward
      v-model:show="rewardShow"
      :reward-list="rewardList"
      :types="false"
      :nums="true"
      :has-red-bag="rewardRedBag.length > 0"
      @did-click-red-bag="didTapRedBag"
      @did-click-smash="didTapSmashRightNow"
    />
    <smash
      v-model:show="smashShow"
      :recycleGoods="recycleGoods"
      @did-tap-smash="handleSmashGoods"
    />
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
    <Open v-model:show="openShow" :product="productDetail" />
    <lottery
      v-model:show="lotteryShow"
      :skipGif="skipLottery"
      :list="lotteryList"
      :is-skip="false"
      @did-tap-continue="didTapContinue"
    />
  </view>
</template>

<script lang="ts" setup>
import { useProductDetail } from "@/composables/product/detail";
import { nextTick, onMounted, ref } from "vue";
import SelectNum from "./components/selectNum.vue";
// import Login from "@/components/login/index.vue";
import Pay from "@/components/modal/pay/index.vue";
import Open from "./components/open/index.vue";
import Handles from "./components/handles/index.vue";
import Swap from "@/components/modal/swap/index.vue";
import Reward from "@/components/modal/reward/index.vue";
import Smash from "@/components/modal/smash/index.vue";
import Lottery from "@/components/lottery/index.vue";
import General from "./components/general.vue";
import Infinite from "./components/Infinite.vue";
import { ModalType, useModal } from "@/composables/modal";
import CommonModal from "@/components/modal/index.vue";
import { ProductDetailButtonType } from "@/model";
import { useLogin } from "@/composables/login";
import { onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import DetailModal from "@/components/modal/detail/index.vue";
import { AppModule } from "@/store/modules/app";
import { eventBus } from "@/utils/event";
import { ShowToast } from "@/utils";
import { getUnreadNum } from "@/api";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const { loginShow, handleLogin } = useLogin();

eventBus.on("didLogin", (_) => {
  loadData();
});
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
const unreadNum = ref(0);
onShow(() => {
  getUnReadCount();
});
const getUnReadCount = async () => {
  const res = await getUnreadNum();
  console.log("res:", res);
  if (res.code === 200) {
    unreadNum.value = res.data.data ?? 0;
  }
};
const {
  openShow,
  skipLottery,
  clickItem,
  currentBox,
  detailShow,
  didTapCoupon,
  orderList,
  didTapChangeBoxRange,
  sortTabAction,
  sortList,
  isInfinite,
  goodsList,
  recordList,
  productDetail,
  lotteryShow,
  lotteryList,
  levelGroupList,
  currentTabDidChange,
  didTapPurchaseNum,
  reloadCurrentPage,
  didClickChangeBox,
  didTapSmashRightNow,
  didTapPay,
  isSelectNum,
  scrollToLower,
  smashShow,
  rewardList,
  payItem,
  loadData,
  didSelectBox,
  recycleGoods,
  rewardShow,
  handleSmashGoods,
  cardsList,
  boxList,
  levelList,
  boxRangeList,
  swapModalShow,
  payShow,
  luckProgress,
  normalProgress,
  rewardRedBag,
} = useProductDetail();

const didTapContinue = () => {
  loginShow.value = false;
  rewardShow.value = true;
};

onMounted(() => {
  loadData();
});

const didTapRedBag = () => {
  uni.navigateBack();
  nextTick(() => {
    AppModule.changeCurrentTabIndex(3);
    nextTick(() => {
      AppModule.changeBoxTabIndex(4);
    });
  });
};

const handleClickRemark = () => {
  modalContent.value = productDetail.value.remark ?? "";
  modalTitle.value = "商品说明";
  modalShow.value = true;
};

const handleDidClickButton = (bType: ProductDetailButtonType) => {
  switch (bType) {
    case ProductDetailButtonType.Reload:
      reloadCurrentPage();
      break;
    case ProductDetailButtonType.HowToPlay:
      showModalType(ModalType.HowToPlay);
      break;
    case ProductDetailButtonType.Introduction:
      showModalType(ModalType.PurchaseNotification);
      break;
    case ProductDetailButtonType.ChangeBox:
      swapModalShow.value = true;
      break;
    default:
      break;
  }
};

onShareAppMessage(() => {
  return {
    title: "这个箱子快出货了，速来！",
    imageUrl: productDetail.value.image,
    path: `/subPackages/product/detail/index?pid=${productDetail.value.id}`,
  };
});
onShareTimeline(() => {
  return {
    title: "这个箱子快出货了，速来！",
    imageUrl: productDetail.value.image,
    path: `/subPackages/product/detail/index?pid=${productDetail.value.id}`,
  };
});
</script>

<style lang="scss" scoped>
.product {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fbe8bd;
  overflow: hidden;
  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
