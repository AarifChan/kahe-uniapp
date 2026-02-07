<template>
  <view class="actions">
    <view
      class="actions-item"
      v-for="(item, index) in actionList"
      :key="index + 'itemId'"
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
  </view>
</template>

<script lang="ts" setup>
import { useFavorite } from "@/composables/favorite";
import type { UIProductDetailModel } from "@/model";
import { PropType, ref, watch } from "vue";
import { UserModule } from "@/store/modules/user";
import { ShowToast } from "@/utils";
import { showInGroupImage } from "@/utils/tools";
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
};

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
  bottom: calc(160rpx + env(safe-area-inset-bottom));
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
  }
}
</style>
