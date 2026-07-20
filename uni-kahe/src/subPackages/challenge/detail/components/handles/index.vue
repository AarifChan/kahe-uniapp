<template>
  <view
    class="fixed right-[8rpx] bottom-[calc(200rpx+32rpx)] flex flex-col items-center z-99"
  >
    <template v-for="(item, index) in actionList" :key="index + 'itemId'">
      <!-- #ifdef MP-WEIXIN -->
      <button
        v-if="item.action === 5"
        class="relative mb-[32rpx] w-[66rpx] h-[66rpx] flex items-center justify-center"
        :id="index + 'itemId'"
        open-type="share"
        style="
          padding: 0;
          margin: 0;
          border: none;
          background: transparent;
          line-height: normal;
        "
      >
        <image
          class="w-[66rpx] h-[66rpx]"
          src="/static/kahe-202510/ka-he/product/item-bg.png"
          mode="aspectFill"
        />
        <image
          class="absolute left-[8rpx] top-[8rpx] w-[50rpx] h-[50rpx]"
          :src="item.icon"
          mode="aspectFit"
        />
        <text
          class="absolute left-0 w-full text-center bottom-[-14rpx] text-[20rpx] text-white text-outline-1 text-outline-[#703b16]"
          >{{ item.title }}</text
        >
      </button>
      <!-- #endif -->

      <view
        v-if="item.action !== 5"
        class="relative mb-[32rpx] w-[66rpx] h-[66rpx] flex items-center justify-center"
        :id="index + 'itemId'"
        @tap.stop="handleAction(item)"
      >
        <image
          class="w-[66rpx] h-[66rpx]"
          src="/static/kahe-202510/ka-he/product/item-bg.png"
          mode="aspectFill"
        />
        <image
          class="absolute left-[8rpx] top-[8rpx] w-[50rpx] h-[50rpx]"
          :src="item.icon"
          mode="aspectFit"
        />
        <text
          class="absolute left-0 w-full text-center bottom-[-14rpx] text-[20rpx] text-white text-outline-2 text-outline-[#703b16] font-theme"
          >{{ item.title }}</text
        >
        <view
          v-if="item.action === 4 && unReadCount > 0"
          class="absolute right-[-4rpx] top-[-4rpx] w-[32rpx] h-[32rpx] text-center text-[20rpx] bg-red text-white rounded-[16rpx] font-theme"
          style="line-height: 32rpx"
          >{{ unReadCount }}</view
        >
      </view>

      <!-- #ifndef MP-WEIXIN -->
      <view
        v-if="item.action === 5"
        class="relative mb-[32rpx] w-[66rpx] h-[66rpx] flex items-center justify-center"
        :id="index + 'itemId'"
        @tap.stop="handleAction(item)"
      >
        <image
          class="w-[66rpx] h-[66rpx]"
          src="/static/kahe-202510/ka-he/product/item-bg.png"
          mode="aspectFill"
        />
        <image
          class="absolute left-[8rpx] top-[8rpx] w-[50rpx] h-[50rpx]"
          :src="item.icon"
          mode="aspectFit"
        />
        <text
          class="absolute left-0 w-full text-center bottom-[-14rpx] text-[20rpx] text-white text-outline-2 text-outline-[#703b16] font-theme"
          >{{ item.title }}</text
        >
      </view>
      <!-- #endif -->
    </template>
  </view>
</template>

<script lang="ts" setup>
import { useFavorite } from "@/composables/favorite";
import type { UIProductDetailModel } from "@/model";
import { PropType, ref, watch } from "vue";
import { UserModule } from "@/store/modules/user";
import { ShowToast } from "@/utils";
import { showInGroupImage } from "@/utils/tools";
import { shareWeixinMiniProgramCard } from "@/composables/share";
import { ChallengeDetail } from "@/subPackages/challenge/api";

const { checkIsFavorite, handleFavoriteAction } = useFavorite();

const actionList = ref([
  {
    icon: "/static/kahe-202510/ka-he/product/kefu.png",
    title: "客服",
    action: 4,
  },
  {
    icon: "/static/kahe-202510/ka-he/product/save.png",
    title: "寄存",
    action: 1,
  },
  // {
  //   icon: "/static/kahe-202510/ka-he/product/favorite.png",
  //   title: "收藏",
  //   action: 2,
  // },
  {
    icon: "/static/kahe-202510/ka-he/product/reload.png",
    title: "刷新",
    action: 3,
  },
  {
    icon: "/static/share.png",
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
    default: null,
    type: Object as PropType<ChallengeDetail | null>,
  },
  unReadCount: {
    default: 0,
    type: Number,
  },
});

const handleAction = async (item: ActionItem) => {
  if (item.action === 2) {
    let pid = props.product?.box?.id;
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

const handleShare = () => {
  const id = props.product?.box?.id;
  if (!id) {
    ShowToast("商品信息异常，暂无法分享");
    return;
  }
  const sharePath = `/subPackages/challenge/detail/index?id=${id}`;
  shareWeixinMiniProgramCard({
    title: `【${props.product?.box.name}】这个箱子快出货了，速来！`,
    imageUrl:
      props.product?.box?.logo ||
      "https://cdn.kjkapai.com/tycw-mp/kaju/share.png",
    path: sharePath,
  });
};

const emits = defineEmits(["didTapReload"]);

watch(
  () => props.product,
  (newVal) => {
    let pId = newVal?.box?.id;
    if (pId) {
      checkIsFavorite(pId);
    }
  }
);
</script>

<style scoped></style>
