<template>
  <view class="actions">
    <template v-for="(item, index) in actionList" :key="index + 'itemId'">
      <!-- #ifdef MP-WEIXIN -->
      <button
        v-if="item.action === 5"
        class="actions-item actions-item-btn"
        :id="index + 'itemId'"
        open-type="share"
      >
        <image
          class="actions-item-bg"
          src="https://jms.85gui7.com/kahe-202510/ka-he/product/item-bg.png"
        />
        <image class="actions-item-icon" :src="item.icon" />
        <text class="actions-item-title theme-font">{{ item.title }}</text>
      </button>
      <!-- #endif -->

      <view
        v-if="item.action !== 5"
        class="actions-item"
        :id="index + 'itemId'"
        @tap.stop="handleAction(item)"
      >
        <image
          class="actions-item-bg"
          src="https://jms.85gui7.com/kahe-202510/ka-he/product/item-bg.png"
        />
        <image class="actions-item-icon" :src="item.icon" />
        <text class="actions-item-title theme-font">{{ item.title }}</text>
        <view
          v-if="item.action === 4 && unReadCount > 0"
          class="actions-item-num"
          >{{ unReadCount }}</view
        >
      </view>

      <!-- #ifndef MP-WEIXIN -->
      <view
        v-if="item.action === 5"
        class="actions-item"
        :id="index + 'itemId'"
        @tap.stop="handleAction(item)"
      >
        <image
          class="actions-item-bg"
          src="https://jms.85gui7.com/kahe-202510/ka-he/product/item-bg.png"
        />
        <image class="actions-item-icon" :src="item.icon" />
        <text class="actions-item-title theme-font">{{ item.title }}</text>
      </view>
      <!-- #endif -->
    </template>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { useFavorite } from "@/composables/favorite";
import type { UIProductDetailModel } from "@/model";
import { PropType, ref, watch } from "vue";

import { ShowToast } from "@/utils";
import { showInGroupImage } from "@/utils/tools";
import { shareWeixinMiniProgramCard } from "@/composables/share";
const { checkIsFavorite, handleFavoriteAction } = useFavorite();
const actionList = ref([
  {
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/product/kefu.png",
    title: "客服",
    action: 4,
  },
  {
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/product/save.png",
    title: "寄存",
    action: 1,
  },
  {
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/product/favorite.png",
    title: "收藏",
    action: 2,
  },
  {
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/product/reload.png",
    title: "刷新",
    action: 3,
  },
  {
    icon: "https://jms.85gui7.com/share.png",
    title: "分享",
    action: 5,
  },
]);
export interface ActionItem {
  icon: string;
  title: string;
  action: number; // 1: 寄存, 2: 收藏, 3: 刷新
}

const props = defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  unReadCount: {
    default: 0,
    type: Number,
  },
});

const handleAction = async (item: ActionItem) => {
  if (item.action === 2) {
    let pid = props.product.pid;
    if (pid) {
      await handleFavoriteAction(pid);
    }
  }
  if (item.action === 1) {
    uni.navigateTo({
      url: "/subPackages/box/box/index",
    });
  }
  if (item.action === 3) {
    emits("didTapReload");
  }
  if (item.action === 4) {
    console.log("点击客服");
    showInGroupImage();
  }
  if (item.action === 5) {
    console.log("点击分享");
    handleShare();
  }
};

const handleClickContact = () => {
  if (!userStore.loginStatus) {
    ShowToast("请先登陆");
    return;
  }

  const url = `https://kf.91tcg.com//index/index/kefu?u=68dbcee0f13ee&uid=${userStore.userInfo.uid}&name=${userStore.userInfo.nickname}&avatar=${userStore.userInfo.avatar}`;
  console.log("handleClickContact:", url);
  uni.navigateTo({
    url: `/subPackages/webview/index?url=${encodeURIComponent(url)}`,
  });
};
const handleShare = () => {
  const pid = props.product?.pid;
  if (!pid) {
    ShowToast("商品信息异常，暂无法分享");
    return;
  }
  const sharePath = `/subPackages/product/detail/index?pid=${pid}`;
  shareWeixinMiniProgramCard({
    title: `【${props.product?.title}】这个箱子快出货了，速来！`,
    imageUrl:
      props.product?.image ||
      "https://jms.85gui7.com/kahe-202510/common/share.jpg",
    path: sharePath,
  });
};
const emits = defineEmits(["didTapReload"]);
watch(
  () => props.product,
  (newVal) => {
    let pId = newVal.pid;
    if (pId) {
      checkIsFavorite(pId);
    }
  }
);
</script>

<style lang="scss" scoped>
.actions {
  position: fixed;
  right: 8rpx;
  bottom: calc(200rpx + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
  &-item {
    position: relative;
    margin-bottom: 32rpx;
    width: 66rpx;
    height: 66rpx;

    &-bg {
      width: 100%;
      height: 100%;
    }

    &-icon {
      position: absolute;
      left: 8rpx;
      top: 8rpx;
      width: 50rpx;
      height: 50rpx;
    }

    &-title {
      position: absolute;
      left: 0;
      width: 100%;
      text-align: center;
      bottom: -14rpx;
      font-weight: 400;
      font-size: 20rpx;
      color: #ffffff;
      @include text-stroke-color(#703b16);
    }
    &-num {
      position: absolute;
      right: -4rpx;
      top: -4rpx;
      width: 32rpx;
      height: 32rpx;
      text-align: center;
      line-height: 32rpx;
      font-size: 20rpx;
      background-color: red;
      color: #fff;
      border-radius: 16rpx;
    }

    &-btn {
      padding: 0;
      border: 0;
      background: transparent;
      line-height: normal;
    }

    &-btn::after {
      border: 0;
    }
  }
}
</style>
