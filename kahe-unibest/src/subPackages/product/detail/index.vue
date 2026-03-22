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
      :luck-progress="luckProgress"
      :product="productDetail"
      :cards-array="cardsList"
      :record-list="recordList"
      :level-group-list="levelGroupList"
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
      :product="productDetail"
      :un-read-count="unreadNum"
      @did-tap-reload="reloadCurrentPage"
    />
    <detail-modal v-model:show="detailShow" :item="currentBox" />
    <!--    <login v-model:show="loginShow" @did-tap-login="handleLogin" /> -->
    <pay
      v-model:show="payShow"
      v-model:skip-checked="skipLottery"
      :goods="payItem"
      :show-skip="isInfinite"
      :merchant="productDetail.merchant"
      @did-tap-pay="didTapPay"
      @did-tap-coupon="didTapCoupon"
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
      :recycle-goods="recycleGoods"
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
      :skip-gif="skipLottery"
      :list="lotteryList"
      :is-skip="false"
      @did-tap-continue="didTapContinue"
    />
  </view>
</template>

<script lang="ts" setup>
import { onShareAppMessage, onShareTimeline, onShow } from '@dcloudio/uni-app'
import { nextTick, onMounted, ref } from 'vue'
import { getUnreadNum } from '@/api'
import Lottery from '@/components/lottery/index.vue'
import DetailModal from '@/components/modal/detail/index.vue'
import CommonModal from '@/components/modal/index.vue'
// import Login from "@/components/login/index.vue";
import Pay from '@/components/modal/pay/index.vue'
import Reward from '@/components/modal/reward/index.vue'
import Smash from '@/components/modal/smash/index.vue'
import Swap from '@/components/modal/swap/index.vue'
import { useLogin } from '@/composables/login'
import { ModalType, useModal } from '@/composables/modal'
import { useProductDetail } from '@/composables/product/detail'
import { ProductDetailButtonType } from '@/model'
import { useAppStore } from '@/store/app'
import { eventBus } from '@/utils/event'
import General from './components/general.vue'
import Handles from './components/handles/index.vue'

import Infinite from './components/Infinite.vue'
import Open from './components/open/index.vue'
import SelectNum from './components/selectNum.vue'

const appStore = useAppStore()
const { modalShow, modalTitle, modalContent, showModalType } = useModal()
const { loginShow, handleLogin } = useLogin()

eventBus.on('didLogin', (_) => {
  loadData()
})
function tapShowModel(value: number) {
  if (value === 0) {
    showModalType(4)
  }
  else if (value === 1) {
    showModalType(2)
  }
  else if (value === 2) {
    uni.navigateTo({
      url: '/subPackages/product/state/index',
    })
  }
}
const unreadNum = ref(0)
onShow(() => {
  getUnReadCount()
})
async function getUnReadCount() {
  const res = await getUnreadNum()
  console.log('res:', res)
  if (res.code === 200) {
    unreadNum.value = res.data.data ?? 0
  }
}
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
} = useProductDetail()

function didTapContinue() {
  loginShow.value = false
  rewardShow.value = true
}

onMounted(() => {
  loadData()
})

function didTapRedBag() {
  uni.navigateBack()
  nextTick(() => {
    appStore.changeCurrentTabIndex(3)
    nextTick(() => {
      appStore.changeBoxTabIndex(4)
    })
  })
}

function handleClickRemark() {
  modalContent.value = productDetail.value.remark ?? ''
  modalTitle.value = '商品说明'
  modalShow.value = true
}

function handleDidClickButton(bType: ProductDetailButtonType) {
  switch (bType) {
    case ProductDetailButtonType.Reload:
      reloadCurrentPage()
      break
    case ProductDetailButtonType.HowToPlay:
      showModalType(ModalType.HowToPlay)
      break
    case ProductDetailButtonType.Introduction:
      showModalType(ModalType.PurchaseNotification)
      break
    case ProductDetailButtonType.ChangeBox:
      swapModalShow.value = true
      break
    default:
      break
  }
}

onShareAppMessage(() => {
  return {
    title: `【${productDetail.value.title}】这个箱子快出货了，速来！`,
    imageUrl: productDetail.value.image,
    path: `/subPackages/product/detail/index?pid=${productDetail.value.id}`,
  }
})
onShareTimeline(() => {
  return {
    title: `【${productDetail.value.title}】这个箱子快出货了，速来！`,
    imageUrl: productDetail.value.image,
    path: `/subPackages/product/detail/index?pid=${productDetail.value.id}`,
  }
})
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
