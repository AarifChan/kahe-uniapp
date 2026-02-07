<template>
  <!--  <NavBar position="sticky" title="我的" :opacity="1" :top-safe="false" />-->
  <scroll-view class="mine" :scroll-y="true">
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
    <view class="inGroup">
      <image
        class="inGroupImg"
        src="https://jms.85gui7.com/kahe-202510/ka-he/mine/in-group3.png"
        @tap.stop="showInGroupImage"
      />
    </view>
    <favorite
      @did-click-favorite="handleClickFavorite"
      @did-click-coupon="handleClickCoupon"
      @did-click-contact="showInGroupImage"
      :un-read-num="unreadNum"
    />
    <orders @click-orders-tap="clickOrdersTap" />
    <view style="padding-bottom: 32rpx">
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
  <TabBar />
  <InfoModal v-model:show="infoShow" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, nextTick } from "vue";
import Item from "./components/item.vue";
import Coin from "./components/coin.vue";
import TabBar from "@/components/tabBar/index.vue";
import NavBar from "@/components/navBar/index.vue";
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
  // AppModule.showUserModal();
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
      // eventBus.emit('reloadProductTab', 2)
      break;
    case "integral":
      uni.navigateTo({
        url: "/subPackages/infinite/index",
      });
      // eventBus.emit('reloadProductTab', 3)
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
  getUnReadCount();
});
</script>

<style lang="scss" scoped>
.mine {
  padding: 32rpx 0 0;
  position: relative;
  width: 100%;
  height: calc(100vh - env(safe-area-inset-bottom) - 132rpx);
  overflow: hidden;
  background-image: url("https://jms.85gui7.com/kahe-202510/ka-he/mine/mine-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &-bg {
    width: 100%;
    aspect-ratio: 750 / 1444;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }

  &-top {
    margin-top: 60rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    box-sizing: border-box;
  }

  &-center {
    margin-top: 16rpx;
    margin-left: 30rpx;
    position: relative;
    width: 695rpx;
    height: 126rpx;
    margin-bottom: 40rpx;

    &-img {
      width: 100%;
      height: 100%;
    }

    &-icon {
      position: absolute;
      left: 5rpx;
      top: 5rpx;
      width: 94rpx;
      height: 92rpx;
    }

    &-tag {
      position: absolute;
      bottom: 16rpx;
      left: 40rpx;
      font-weight: 400;
      font-size: 23rpx;
      color: #000000;
    }

    &-title {
      position: absolute;
      left: 136rpx;
      top: 0;

      line-height: 126rpx;
      font-weight: 400;
      font-size: 40rpx;
      color: #000000;
    }
  }
}

.inGroup {
  margin: 0 24rpx;
  position: relative;
  width: calc(100% - 48rpx);

  &Img {
    width: 100%;
    aspect-ratio: 699 / 167;
  }
}
</style>
