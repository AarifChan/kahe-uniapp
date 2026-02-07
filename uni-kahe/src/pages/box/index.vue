<template>
  <view class="box">
    <image
      class="box-bg"
      src="https://jms.85gui7.com/kahe-202510/ka-he/mine/mine-bg.png"
    />
    <!-- logo -->
    <view class="box-logo">
      <image
        class="box_img"
        src="https://jms.85gui7.com/kahe-202510/ka-he/common/logo.png"
      />
    </view>
    <!-- 公告 -->
    <bulletinar />
    <view class="box-top">
      <view class="line"></view>
      <common-tab :list="tabList" v-model:current="currentIndex" />
      <view class="box-top-question" @tap.stop="showModalType(4)">
        <image
          class="box-top-question-img"
          src="https://jms.85gui7.com/kahe-202510/ka-he/common/question.png"
        />
        <text class="box-top-question-title theme-font">规则</text>
      </view>
    </view>
    <!-- :style="{
            height:
                currentIndex === 0
                    ? 'calc(100vh - 142rpx - env(safe-area-inset-bottom))'
                    : 'calc(100vh - env(safe-area-inset-bottom))',
        }"  -->
    <scroll-view
      class="box-scroll"
      :scroll-y="true"
      @scrolltolower="handleScrollToLower"
    >
      <view class="box-scroll-content" v-if="currentTabValue === 0">
        <Merchant
          v-for="(item, index) in mineMerchantList"
          :key="'merchant-' + index"
          :id="'merchant:id' + index"
          :item="item"
          :is-expand="index === currentExpand"
          @did-expand-merchant="handleExpandMerchant(index)"
          @did-click-box-item="clickBoxItem"
          @did-select-box="didSelectBox"
        />
      </view>
      <view
        class="box-scroll-content"
        v-if="currentTabValue === 1 || currentTabValue === 2"
      >
        <record
          v-for="(item, index) in recordList"
          :key="'record' + index"
          :item="item"
        />
        <empty :show="recordList.length === 0" />
      </view>
      <view v-if="currentTabValue === 3">
        <Chest @select-item="selectItem" :list="chestsList" />
        <empty :show="chestsList.length === 0" />
      </view>
      <view class="box-scroll-content" v-if="currentTabValue === 4">
        <red-bag-item
          v-for="(item, index) in redBagList"
          :key="'redBag' + index"
          :item="item"
          @did-click="didClickRedBagItem(item)"
        />
      </view>
    </scroll-view>

    <handle
      v-if="currentIndex === 0"
      @did-tap-item="handleTapItem"
      :isSelectAll="isSelectAll"
    />
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
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
  </view>
  <TabBar />
</template>

<script lang="ts" setup>
import NavBar from "@/components/navBar/index.vue";
import bulletinar from "@/components/bulletinar/index.vue";
import TabBar from "@/components/tabBar/index.vue";
// import BoxTab from './components/tab.vue'
import { onMounted, ref, watch } from "vue";
import CommonTab from "./components/tab/index.vue";
import CommonModal from "@/components/modal/index.vue";
import Record from "./components/record.vue";
import Merchant from "./components/merchant/index.vue";
import Smash from "@/components/modal/smash/index.vue";
import Shipment from "@/components/modal/shipment/index.vue";
import Handle from "./components/handle/index.vue";
import Chest from "./components/openChests.vue";
import Empty from "@/components/empty/index.vue";
import RedBagItem from "./components/redBag/index.vue";
import { useBox } from "@/composables/box";
import { useRedBag } from "@/composables/redBag";
import { ModalType, useModal } from "@/composables/modal";
import { eventBus } from "@/utils/event";
import { AppModule } from "@/store/modules/app";
import { getPageOptions } from "@/utils/tools";
import { onShow } from "@dcloudio/uni-app";

const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const {
  currentTabValue,
  currentIndex,
  chestsList,
  selectItem,
  shipmentShow,
  chooseAddress,
  address,
  smashShow,
  didTapPay,
  boxList,
  loadData,
  mineMerchantList,
  handleScrollToLower,
  params,
  smashList,
  recordList,
  clickBoxItem,
  didSelectBox,
  isSelectAll,
  handleTapItem,
  loadChestDate,
  currentExpand,
  handleExpandMerchant,
} = useBox();

const { getMineRedBag, redBagList, didClickRedBagItem } = useRedBag();

const tabList = ref([
  {
    title: "待处理",
    value: 0,
  },
  {
    title: "已发货",
    value: 1,
  },
  // {
  //   title: "已处理",
  //   value: 2,
  // },
  {
    title: "宝箱",
    value: 3,
  },
  // {
  //   title: "红包",
  //   value: 4,
  // },
]);
watch(
  () => currentIndex.value,
  async (value) => {
    params.value.page = 1;
    currentTabValue.value = tabList.value[value].value;
    if (currentTabValue.value === 4) {
      getMineRedBag();
    } else {
      await loadData(currentTabValue.value);
    }
  }
);

onMounted(() => {
  loadData();
});
onShow(() => {
  if (AppModule.boxTabIndex) {
    currentIndex.value = AppModule.boxTabIndex;

    loadData();
  }
});

eventBus.on("didLogin", async (_: any) => {
  await loadData();
});
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: 100%;
  height: calc(100vh - env(safe-area-inset-bottom) - 132rpx);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: $main-bg;
  &-logo {
    margin: 16rpx 0 16rpx 28rpx;
    width: 149rpx;
    height: 65rpx;

    .box_img {
      width: 100%;
      height: 100%;
    }
  }

  // background: linear-gradient(180deg, #f7daa1, #fff3dc);
  &-bg {
    width: 100%;
    height: 100%;
    inset: 0;
    position: absolute;
    z-index: -1;
  }

  &-top {
    position: relative;
    padding: 16rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .line {
      position: absolute;
      left: 0;
      bottom: 26rpx;
      width: 100%;
      height: 2rpx;
      background: #e8cda7;
    }

    &-question {
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100rpx;
      margin-bottom: 8rpx;

      &-img {
        margin-right: 4rpx;
        width: 30rpx;
        height: 30rpx;
      }

      &-title {
        font-weight: 400;
        font-size: 24rpx;
        color: #775435;
      }
    }
  }

  &-scroll {
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom) - 132rpx - 332rpx);
    padding-bottom: calc(128rpx + env(safe-area-inset-bottom));

    &-content {
      padding: 0 30rpx;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
