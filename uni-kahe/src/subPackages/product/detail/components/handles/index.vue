<template>
  <view
    class="actions fixed right-8 flex flex-col items-center z-99"
    :style="{ bottom: 'calc(200rpx + env(safe-area-inset-bottom))' }"
  >
    <template v-for="(item, index) in actionList" :key="index + 'itemId'">
      <!-- #ifdef MP-WEIXIN -->
      <button
        v-if="item.action === 5"
        class="actions-item actions-item-btn relative mb-32 w-66 h-66 border-none bg-transparent p-0 m-0"
        :id="index + 'itemId'"
        open-type="share"
        plain
        style="border: none; background: transparent; line-height: normal"
      >
        <image
          class="actions-item-bg w-full h-full"
          src="/static/kahe-202510/ka-he/product/item-bg.png"
        />
        <image
          class="actions-item-icon absolute left-8 top-8 w-50 h-50"
          :src="item.icon"
        />
        <text
          class="actions-item-title theme-font absolute left-0 w-full text-center -bottom-14 text-20 text-white"
          :style="{
            textShadow:
              '-1px -1px 0 #703b16, 1px -1px 0 #703b16, -1px 1px 0 #703b16, 1px 1px 0 #703b16',
          }"
          >{{ item.title }}</text
        >
      </button>
      <!-- #endif -->

      <view
        v-if="item.action !== 5"
        class="actions-item relative mb-32 w-66 h-66"
        :id="index + 'itemId'"
        @tap.stop="handleAction(item)"
      >
        <image
          class="actions-item-bg w-full h-full"
          src="/static/kahe-202510/ka-he/product/item-bg.png"
        />
        <image
          class="actions-item-icon absolute left-8 top-8 w-50 h-50"
          :src="item.icon"
        />
        <text
          class="actions-item-title theme-font absolute left-0 w-full text-center -bottom-14 text-20 text-white"
          :style="{
            textShadow:
              '-1px -1px 0 #703b16, 1px -1px 0 #703b16, -1px 1px 0 #703b16, 1px 1px 0 #703b16',
          }"
          >{{ item.title }}</text
        >
      </view>

      <!-- #ifndef MP-WEIXIN -->
      <view
        v-if="item.action === 5"
        class="actions-item relative mb-32 w-66 h-66"
        :id="index + 'itemId'"
        @tap.stop="handleAction(item)"
      >
        <image
          class="actions-item-bg w-full h-full"
          src="/static/kahe-202510/ka-he/product/item-bg.png"
        />
        <image
          class="actions-item-icon absolute left-8 top-8 w-50 h-50"
          :src="item.icon"
        />
        <text
          class="actions-item-title theme-font absolute left-0 w-full text-center -bottom-14 text-20 text-white"
          :style="{
            textShadow:
              '-1px -1px 0 #703b16, 1px -1px 0 #703b16, -1px 1px 0 #703b16, 1px 1px 0 #703b16',
          }"
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
  {
    icon: "/static/kahe-202510/ka-he/product/favorite.png",
    title: "收藏",
    action: 2,
  },
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
  const pid = props.product?.pid;
  if (!pid) {
    ShowToast("商品信息异常，暂无法分享");
    return;
  }
  const sharePath = `/subPackages/product/detail/index?pid=${pid}`;
  shareWeixinMiniProgramCard({
    title: `【${props.product?.title}】这个箱子快出货了，速来！`,
    imageUrl:
      props.product?.image || "https://cdn.richcw.cn/tycw-mp/kaju/share.png",
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
button::after {
  border: none;
}
</style>
