<template>
  <view class="relative w-screen h-screen bg-[#FFF8E9] flex flex-col">
    <image
      class="fixed left-0 top-0 w-750 h-860"
      src="/static/kaju/mine/mine-bg.png"
    />
    <NavBar position="absolute" :opacity="1" />
    <scroll-view
      class="relative w-full h-full flex flex-col overflow-hidden"
      :scroll-y="true"
    >
      <info
        :user-info="userInfo"
        @did-click-edit="handleClickEdit"
        @didClickVip="handleClickVip"
        @did-click-avatar="handleClickAvatar"
      />
      <coin
        :momey="userInfo.money"
        :coin="userInfo.coin"
        :integral="userInfo.integral"
        @didClickItem="handleClickOther"
      />

      <favorite
        @did-click-favorite="handleClickFavorite"
        @did-click-coupon="handleClickCoupon"
        @did-click-contact="showInGroupImage"
      />
      <orders @click-orders-tap="clickOrdersTap" />
      <view class="pb-32">
        <options
          @did-tap-action="showModalType"
          @did-tap-contact="showInGroupImage"
        />
      </view>
    </scroll-view>
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />

    <recharge v-model:show="rechargeShow" :list="rechargeList" />
    <InfoModal v-model:show="infoShow" />
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, nextTick } from "vue";
import Coin from "./components/coin.vue";
import NavBar from "./components/navBar/index.vue";
import Info from "./components/info.vue";
import { UserModule } from "@/store/modules/user";
import CommonModal from "@/components/modal/index.vue";

import Recharge from "./components/recharge.vue";
import { AppModule } from "@/store/modules/app";
import Orders from "./components/orders.vue";
import Favorite from "./components/favorite.vue";
import Options from "./components/options.vue";
import { eventBus } from "@/utils/event";
import { getRechargePlanRequest, getUnreadNum } from "@/api";
import type { RechargeModel } from "@/model";
import { showInGroupImage } from "@/utils/tools";
import { useModal } from "@/composables/modal";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();
import InfoModal from "@/components/modal/info/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { ShowToast } from "@/utils";

const userInfo = computed(() => UserModule.userInfo);
const infoShow = ref(false);

const rechargeShow = ref(false);
const unreadNum = ref(0);
const handleClickContact = () => {
  if (!UserModule.loginStatus) {
    ShowToast("请先登陆");
    return;
  }

  const url = `https://kf.91tcg.com//index/index/kefu?u=68dbcee0f13ee&uid=${UserModule.userInfo.uid}&name=${UserModule.userInfo.nickname}&avatar=${UserModule.userInfo.avatar}`;
  console.log("handleClickContact:", url);
  uni.navigateTo({
    url: `/subPackages/webview/index?url=${encodeURIComponent(url)}`,
  });
};

const clickOrdersTap = (index: number) => {
  if (!UserModule.loginStatus) {
    ShowToast("请先登录");
    return;
  }
  switch (index) {
    case 0:
      uni.navigateTo({ url: "/subPackages/box/box/index" });
      break;
    case 1:
      uni.navigateTo({ url: "/subPackages/box/box/index?tab=1" });
      break;
    case 2:
      uni.navigateTo({ url: "/subPackages/order/index" });
      break;
    case 3:
      uni.navigateTo({ url: "/subPackages/order/index" });
      break;
    default:
      break;
  }
};

const handleClickFavorite = () => {
  uni.navigateTo({
    url: "/subPackages/mine/favorite/index",
  });
};

const handleClickEdit = () => {
  if (!UserModule.loginStatus) {
    ShowToast("请先登录");
    return;
  }
  infoShow.value = true;
};

const totalNavHeight = computed(() => {
  return AppModule.statusBarHeight + AppModule.navBarHeight;
});
const handleClickVip = () => {
  if (!UserModule.loginStatus) {
    ShowToast("请先登录");
    return;
  }
  uni.navigateTo({
    url: "/subPackages/mine/vip/index",
  });
};
const handleClickCoupon = () => {
  if (!UserModule.loginStatus) {
    ShowToast("请先登录");
    return;
  }
  uni.navigateTo({
    url: "/subPackages/mine/coupon/index",
  });
};

const rechargeList = ref([] as RechargeModel[]);

const handleClickDetail = (sType: string) => {
  uni.navigateTo({
    url: `/subPackages/mine/detail/index?type=${sType}`,
  });
};
const handleClickAvatar = () => {
  if (!UserModule.loginStatus) {
    ShowToast("请先登录");
    return;
  }
  // #ifndef MP-WEIXIN
  uni.navigateTo({
    url: "/subPackages/setting/index",
  });
  // #endif
};

const handleClickOther = async (sType: string) => {
  if (!UserModule.loginStatus) {
    ShowToast("请先登录");
    return;
  }
  switch (sType) {
    case "money": {
      const resp = await getRechargePlanRequest();
      if (resp.code === 200 && resp.data.length > 0) {
        rechargeList.value = resp.data;
        rechargeShow.value = true;
      }
      break;
    }

    case "coin":
      AppModule.changeProductTabIndex(2);
      AppModule.changeCurrentTabIndex(0);
      break;
    case "integral":
      uni.navigateTo({
        url: "/subPackages/infinite/index",
      });
      break;
    default:
      break;
  }
};
const getUnReadCount = async () => {
  const res = await getUnreadNum();
  console.log("res:", res);
  if (res.code === 200) {
    unreadNum.value = res.data.data ?? 0;
  }
};
onShow(() => {
  UserModule.getUserInfo();
});
</script>

<style lang="scss" scoped></style>
