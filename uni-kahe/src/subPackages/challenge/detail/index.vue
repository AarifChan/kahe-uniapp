<template>
  <view class="min-h-screen bg-[#FEE9CD]">
    <!-- 顶部背景区域 -->
    <top :detail="detail" @did-click="tapShowModel" />
    <!-- 活动说明区域 -->
    <center :detail="detail" />
    <view class="mt-32rpx">
      <common-tab
        v-model:current-index="currentTabIndex"
        :detail="detail"
        @tab-did-change="onTabChange"
        @scroll-to-lower="handleScrollToLower"
      >
        <template #goods>
          <view class="grid grid-cols-3 gap-y-24rpx place-items-center">
            <goods
              v-for="(item, index) in rewardList"
              :key="item.goodsDto.id"
              :item="item"
              :price="detail?.box.price"
              :index="rewardList.length - index - 1"
              :id="item.goodsDto.id"
              @click="onGoodsClick(item)"
            />
          </view>
        </template>
        <template #record>
          <record
            :level="detail?.box?.gate"
            :record-list="logsList"
            @sort-tab-action="handleSortTabAction"
          />
        </template>
      </common-tab>
    </view>

    <bottom :detail="detail" @didTap="handleSubmitChallenge" />
    <handle :product="detail" @didTapReload="loadPageData" />
    <pay
      v-model:show="showPay"
      :goods="payItem"
      @did-tap-pay="handlePayChallenge"
      :merchant="detail?.box?.merchant"
    />
    <settle
      v-model:show="showSettle"
      :detail="detail"
      :isOver="isOver"
      @did-tap-item="handlePlayItem"
      @did-tap-finish="handleSettleChallenge"
      :current-sign="currentSign"
      @tapItemDetail="onGoodsClick"
    />
    <result
      v-model:show="showResult"
      :current-sign="currentSign"
      @again="handleAgain"
      @shipment="openSmash"
    />
    <smash
      v-model:show="showSmash"
      :recycle-goods="recycleGoods"
      @did-tap-smash="handleSmashConfirm"
    />
    <goods-detail
      v-model:show="showGoodsDetail"
      :goods="selectedGoods"
      :level="selectedGoodsLevel"
      :price="detail?.box.price"
    />

    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import CommonTab from "./components/tab/index.vue";
import Bottom from "./components/bottom/index.vue";
import Center from "./components/center/index.vue";
import Top from "./components/top/index.vue";
import Result from "./components/result/index.vue";
import Goods from "./components/goods/index.vue";
import Pay from "../components/pay/index.vue";
import Handle from "./components/handles/index.vue";
import Settle from "./components/settle/index.vue";
import Record from "./components/record/index.vue";
import { useChallenge } from "../index";
import { onShow } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
import { eventBus } from "@/utils/event";
import Smash from "../components/smash/index.vue";
import GoodsDetail from "../components/detail/index.vue";
import type { SubmitGoodsModel } from "@/model";
import { ChallengeGoodsItem, getDetail } from "@/subPackages/challenge/api";
import {
  userGoodsDeleteRequest,
  userGoodsRecycleConfirmRequest,
} from "@/api/box";
import { ShowToast, showLoading, hideLoading } from "@/utils";
import type { BoxGoodsSubmitParams, GoodsBrief } from "@/model/box";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();

// Smash 弹窗状态
const showSmash = ref(false);
const recycleGoods = ref<SubmitGoodsModel[]>([]);
const smashOrderId = ref<string>("");

// 商品详情弹窗状态
const showGoodsDetail = ref(false);
const selectedGoods = ref<ChallengeGoodsItem | null>(null);
const selectedGoodsLevel = ref(0);

// 点击商品显示详情
const onGoodsClick = (item: ChallengeGoodsItem) => {
  selectedGoods.value = item;
  // selectedGoodsLevel.value = rewardList.value.length - index - 1;
  showGoodsDetail.value = true;
};

// 打开 Smash 弹窗
const openSmash = async () => {
  showResult.value = false;

  const boxId = 0;
  const goods = currentSign.value?.goods;
  if (!goods) {
    ShowToast("商品信息异常");
    return;
  }

  const briefs: GoodsBrief[] = [
    {
      boxId,
      gid: goods.goodsDto.id,
      num: goods.num,
    },
  ];
  const params: BoxGoodsSubmitParams = {
    briefs,
    type: 3,
  };

  showLoading();
  const res = await userGoodsRecycleConfirmRequest(params);
  hideLoading();

  if (res.code !== 200) {
    ShowToast(res.msg);
    return;
  }

  // 解析回收详情
  const list: SubmitGoodsModel[] = JSON.parse(res.data.detail);
  recycleGoods.value = list;
  smashOrderId.value = res.data.orderId;

  showSmash.value = true;
};

// 确认砸/回收
const handleSmashConfirm = async () => {
  if (!smashOrderId.value) {
    ShowToast("订单信息异常");
    return;
  }
  const resp = await userGoodsDeleteRequest({
    orderId: smashOrderId.value,
  });
  if (resp.code === 200) {
    await ShowToast("操作成功", 1500);
    showSmash.value = false;
    // 刷新页面数据
    await loadPageData();
  } else {
    await ShowToast(resp.msg, 1500);
  }
};

import { getPageOptions } from "@/utils/tools";
import CommonModal from "@/components/modal/index.vue";
import { useModal } from "@/composables/modal";
const {
  showPay,
  isOver,
  detail,
  payItem,
  showResult,
  showSettle,
  resultSign,
  currentSign,
  rewardList,
  logsList,
  logParams,
  hasMore,
  handlePayChallenge,
  getChallengeDetail,
  handlePlayItem,
  handleSettleChallenge,
  handleSubmitChallenge,
  getLogRecord,
} = useChallenge();

const detailId = ref<string>("");

// 加载页面数据
const loadPageData = async () => {
  if (!detailId.value) return;
  await getChallengeDetail(detailId.value);
  uni.setNavigationBarTitle({
    title: detail.value?.box.name ?? "",
  });
};

const handleAgain = async () => {
  showResult.value = false;
  await getChallengeDetail(detailId.value);
  await handleSubmitChallenge();
};

// 检查登录状态
const checkLoginStatus = () => {
  if (!UserModule.loginStatus) {
    // 保存当前页面路径，登录成功后可以返回
    const currentPages = getCurrentPages();
    const currentRoute = currentPages[currentPages.length - 1];
    const url = `/${currentRoute.route}?id=${detailId.value}`;
    uni.setStorageSync("loginRedirectUrl", url);

    uni.navigateTo({
      url: "/pages/login/index",
    });
    return false;
  }
  return true;
};

// 登录成功后刷新数据
const handleLoginSuccess = () => {
  loadPageData();
};

onMounted(async () => {
  const id = getPageOptions().id;
  console.log("detailId:", id);
  if (id) {
    detailId.value = id;
    // 检查登录状态，未登录则跳转到登录页
    if (!checkLoginStatus()) {
      return;
    }
    await loadPageData();
  }

  // 监听登录成功事件
  eventBus.on("didLogin", handleLoginSuccess);
});

onShow(() => {
  // 页面显示时检查是否需要刷新（从登录页返回时）
  const needRefresh = uni.getStorageSync("loginSuccessRefresh");
  if (needRefresh && UserModule.loginStatus) {
    uni.removeStorageSync("loginSuccessRefresh");
    loadPageData();
  }
});

onUnmounted(() => {
  // 移除事件监听
  eventBus.off("didLogin", handleLoginSuccess);
});
const onTabChange = async (index: number) => {
  if (index === 1) {
    await getLogRecord();
  }
};

const currentTabIndex = ref(0);

const handleScrollToLower = async () => {
  if (currentTabIndex.value !== 1 || !hasMore.value) return;
  await getLogRecord(true);
};

const handleSortTabAction = async (gate: number) => {
  logParams.value.gate = gate;
  await getLogRecord(false);
};

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

// 小程序分享
// #ifdef MP-WEIXIN
onShareAppMessage(() => {
  const id = detailId.value;
  const boxName = detail.value?.box?.name || "闯关挑战";
  const logo =
    detail.value?.box?.logo ||
    "https://jms.85gui7.com/kahe-202510/jikaquan/jikaquan-share.jpg";
  return {
    title: `【${boxName}】这个箱子快出货了，速来！`,
    path: `/subPackages/challenge/detail/index?id=${id}`,
    imageUrl: logo,
  };
});

onShareTimeline(() => {
  const id = detailId.value;
  const boxName = detail.value?.box?.name || "闯关挑战";
  const logo =
    detail.value?.box?.logo ||
    "https://jms.85gui7.com/kahe-202510/jikaquan/jikaquan-share.jpg";
  return {
    title: `【${boxName}】这个箱子快出货了，速来！`,
    path: `/subPackages/challenge/detail/index?id=${id}`,
    imageUrl: logo,
  };
});
// #endif
</script>

<style scoped lang="scss">
// 页面特定样式
</style>
