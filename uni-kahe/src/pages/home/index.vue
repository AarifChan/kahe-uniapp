<template>
  <!-- :opacity="navOpacity" -->
  <!--  <NavBar title="首页" :opacity="1" position="sticky" />-->
  <scroll-view
    class="home"
    :scroll-y="true"
    :scroll-with-animation="true"
    :scroll-into-view="currentVew"
    @scrolltolower="handleScrollToLower"
    @scroll="handleScroll"
  >
    <!-- 搜索 -->
    <view class="home-search">
      <image
        class="logo"
        src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/logo.png"
      />
      <Search
        @did-tap-search="handleSearch"
        placeholder="请输入你想要搜索的内容"
        style="flex: 1"
      />
    </view>
    <!-- 公告 -->
    <bulletinar />
    <view class="home-banner">
      <banner
        :list="bannerList"
        @tap-lamp-action="tapLampAction"
        @tap-banner-action="tapBannerAction"
      />
      <!-- <image class="home-banner-logo" src="https://jms.85gui7.com/kahe-202510/ka-he/common/logo.png" /> -->
    </view>
    <view class="home-bottom">
      <!-- <image class="home-bottom-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/home/module-bg.png" /> -->
      <view class="home-bottom-content">
        <items />
        <recommend v-if="groupBuyList.length > 0" :group-list="groupBuyList" />
        <tab
          id="currentTab"
          v-model:current="current"
          :list="goodsTabList"
          :search="true"
          @did-click="handleHomeTab"
        />
        <view class="home-bottom-padding">
          <view
            v-for="(item, index) in goodsList"
            :key="index"
            class="home-padding-item"
            @tap.stop="goodsTapClick(item)"
          >
            <goods :item="item" />
          </view>
          <empty :show="goodsList.length === 0" />
        </view>
      </view>
    </view>
  </scroll-view>
  <TabBar />
</template>

<script lang="ts" setup>
import bulletinar from "@/components/bulletinar/index.vue";
import Search from "@/components/search/index.vue";
import TabBar from "@/components/tabBar/index.vue";
import Tab from "./components/tab/index.vue";
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
import { useGroupBuy } from "@/composables/groupBuy";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
const { groupBuyList, getGroupBuyListByHot } = useGroupBuy();

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
  current.value = AppModule.productTabIndex;
  getGroupBuyListByHot();
  await getGoodsList(goodsTabList.value[current.value].value);
  await getHomeList();
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
  goodsParams.value.key = content;
  goodsParams.value.page = 1;

  getGoodsList(goodsTabList.value[current.value].value);
};
const navOpacity = ref(0);
const handleScroll = (e: any) => {
  const scrollTop = e.detail.scrollTop;
  navOpacity.value = Math.min(scrollTop / scrollThreshold.value, 1);
};
onShareAppMessage(() => {
  return {
    title: `${
      UserModule.userInfo?.nickname ?? ""
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: "https://jms.85gui7.com/kahe-202510/common/share.jpg",
    path: "/pages/welcome/index",
  };
});
onShareTimeline(() => {
  return {
    title: `${
      UserModule.userInfo?.nickname ?? ""
    }邀请你来卡核抽取各种稀有卡牌！`,
    imageUrl: "https://jms.85gui7.com/kahe-202510/common/share.jpg",
    path: "/pages/welcome/index",
  };
});
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: calc(100vh - 132rpx - env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: $main-bg;

  &-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18rpx;
    box-sizing: border-box;

    .logo {
      margin-right: 22rpx;
      width: 149rpx;
      height: 65rpx;
      object-fit: cover;
    }
  }

  &-bulletin {
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    height: 40rpx;
    overflow: hidden;
    margin-bottom: 12rpx;

    .img {
      width: 115rpx;
      height: 40rpx;
      object-fit: cover;
      margin-right: 20rpx;
      flex-shrink: 0;
    }

    .bulletin-content {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
    }

    .scroll-wrapper {
      display: inline-flex;
      white-space: nowrap;
      transition: transform 0.05s linear;
    }

    .scroll-item {
      display: inline-block;
      padding-right: 100rpx;
      /* 每条公告之间的间距 */
      font-size: 26rpx;
      color: #333;
      line-height: 40rpx;
    }
  }

  &-banner {
    position: relative;
    width: 100%;

    &-logo {
      position: absolute;
      left: 32rpx;
      top: calc(env(safe-area-inset-top) + 42rpx);
      width: 179rpx;
      height: 71rpx;
    }
  }

  &-bottom {
    margin-top: -80rpx;
    position: relative;
    width: 100%;

    &-bg {
      width: 750rpx;
      height: 483rpx;
    }

    &-content {
      position: absolute;
      width: 100%;
      top: 100rpx;
      left: 0;
      display: flex;
      flex-direction: column;
    }

    &-padding {
      box-sizing: border-box;
      width: 100%;
      padding: 0 30rpx;
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc((100% - 10px) / 2), 1fr)
      ); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
      grid-gap: 10px; // 这是网格间的间隙，根据需要调整
    }
  }
}
</style>
