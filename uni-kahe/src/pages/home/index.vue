<template>
  <!-- :opacity="navOpacity" -->
  <NavBar :opacity="1" position="sticky" @search="handleSearch" />
  <scroll-view
    class="relative w-full flex flex-col overflow-hidden bg-main-bg"
    style="height: calc(100vh - (env(safe-area-inset-bottom) + 100rpx))"
    :scroll-y="true"
    :scroll-with-animation="true"
    :scroll-into-view="currentVew"
    @scrolltolower="handleScrollToLower"
    @scroll="handleScroll"
  >
    <view class="relative w-full">
      <banner
        :list="bannerList"
        @tap-lamp-action="tapLampAction"
        @tap-banner-action="tapBannerAction"
      />
      <!-- <image class="absolute left-32 w-179 h-71" style="top: calc(env(safe-area-inset-top) + 42rpx);" src="/static/kahe-202510/ka-he/common/logo.png" /> -->
    </view>
    <!-- 公告 -->
    <bulletinar />
    <view class="relative w-full -mt-80">
      <view class="absolute w-full top-100 left-0 flex flex-col">
        <items />
        <recommend :group-list="groupBuyList" />
        <tab
          id="currentTab"
          v-model:current="current"
          :list="goodsTabList"
          :search="true"
          @did-click="handleHomeTab"
        />
        <view
          class="box-border w-full px-30"
          style="
            display: grid;
            grid-template-columns: repeat(
              auto-fill,
              minmax(calc((100% - 10px) / 2), 1fr)
            );
            grid-gap: 10px;
          "
        >
          <view
            v-for="(item, index) in goodsList"
            :key="index"
            @tap.stop="goodsTapClick(item)"
          >
            <goods :item="item" />
          </view>
          <empty :show="goodsList.length === 0" />
        </view>
      </view>
    </view>
  </scroll-view>
  <!--  <TabBar />-->
  <info v-model:show="infoShow" />
  <vip v-model:show="showVip" :vip="userInfo.vip" :list="vipList" />
</template>

<script lang="ts" setup>
import bulletinar from "@/components/bulletinar/index.vue";
import Search from "@/components/search/index.vue";
import TabBar from "@/components/tabBar/index.vue";
import Tab from "./components/tab/index.vue";
import Info from "@/components/modal/info/index.vue";
import Vip from "@/components/modal/vip/index.vue";
import Items from "./components/module/index.vue";
import Goods from "./components/goods/index.vue";
import { useGoods } from "@/composables/goods";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import Banner from "./components/banner/index.vue";
import Recommend from "@/pages/home/components/recommend/index.vue";
import Empty from "@/components/empty/index.vue";
import NavBar from "@/components/navBar/index.vue";

import { useMerchant } from "@/pages/merchant/index";
import { AppModule } from "@/store/modules/app";
import { useLogin } from "@/composables/login";
import { useGroupBuy } from "@/composables/groupBuy";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
import { useLog } from "@/composables/useLog";
const { infoShow, showVip } = useLogin();
const userInfo = computed(() => {
  return UserModule.userInfo;
});
const { groupBuyList, getGroupBuyListByHot } = useGroupBuy();

// 使用日志插件
const { logger, getStats } = useLog({ tag: "HomePage" });

const scrollThreshold = computed(() => {
  return AppModule.statusBarHeight + AppModule.navBarHeight;
});

const scrollView = ref<HTMLElement | null>(null);

const scrollToItem = (itemId: string) => {
  const element = document.getElementById(itemId);
  if (scrollView.value && element) {
    scrollView.value.scrollTo({
      behavior: "smooth",
      top: element.offsetTop - scrollView.value.offsetTop,
    });
  }
};

const {
  tapLampAction,
  bannerList,
  barrageList,
  tapBannerAction,
  getHomeList,
  goodsList,
  getGoodsList,
  goodsTabList,
  handleScrollToLower,
  handleHomeTab,
  current,
  goodsParams,
  goodsTapClick,
} = useGoods();
const currentVew = ref("");
onMounted(async () => {
  logger.info("首页加载开始");
  const startTime = Date.now();

  current.value = AppModule.productTabIndex;
  getGroupBuyListByHot();
  await getGoodsList(goodsTabList.value[current.value].value);
  await getHomeList();

  const loadTime = Date.now() - startTime;
  logger.info(`首页加载完成，耗时: ${loadTime}ms`);

  if (AppModule.productTabIndex !== 0) {
    setTimeout(() => {
      currentVew.value = "currentTab";
      AppModule.changeProductTabIndex(0);
    }, 500);
  }
});
// onShow(() => {
//     getHomeList()
// })

const handleSearch = (content: string) => {
  logger.info(`搜索关键词: ${content}`);
  goodsParams.value.key = content;
  goodsParams.value.page = 1;

  getGoodsList(goodsTabList.value[current.value].value);
};
const navOpacity = ref(0);
const handleScroll = (e: any) => {
  const scrollTop = e.detail.scrollTop;
  navOpacity.value = Math.min(scrollTop / scrollThreshold.value, 1);
};

// 长按 Logo 导出日志（调试用）
const handleLogoLongPress = async () => {
  try {
    const stats = await getStats();
    if (stats) {
      uni.showModal({
        title: "日志信息",
        content: `文件数: ${stats.totalFiles}\n总大小: ${stats.totalSizeReadable}`,
        confirmText: "导出",
        success: async (res) => {
          if (res.confirm) {
            const { exportLogs } = useLog();
            const path = await exportLogs();
            uni.showToast({ title: "导出成功", icon: "success" });
          }
        },
      });
    }
  } catch (error) {
    logger.error("获取日志统计失败", error);
  }
};
onShareAppMessage(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.richcw.cn/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: "https://cdn.richcw.cn/tycw-mp/kaju/share.png",
    path: "/pages/welcome/index",
  };
});
</script>

<style lang="scss" scoped></style>
