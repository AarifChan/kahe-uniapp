<template>
  <!--  <NavBar :opacity="1" title="商家" position="sticky" />-->
  <scroll-view
    :scroll-y="true"
    class="merchant"
    @scroll="handleScroll"
    @scrolltolower="handleMallScrollToLower"
  >
    <image class="merchant-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/bg-top.png" />
    <view class="merchant-content">
      <view class="merchant-content-top">
        <image
          class="merchant-content-logo"
          src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/logo.png"
        />
        <view class="merchant-content-search">
          <Search @did-tap-search="didTapSearch" placeholder="请输入商家名称" />
        </view>
      </view>

      <view class="merchant-content-list">
        <view class="merchant-content-tab">
          <Tab
            :list="merchantCateList"
            v-model:current="currentTab"
            @did-click="didClickTab"
          />
        </view>
        <Card
          v-for="(item, index) in merchantList"
          :key="'merchant-item' + index"
          :level="item.tag"
          :item="item"
          @did-click-info="didClickMerchant"
          @did-click-item="goodsTapClick"
        />
      </view>
    </view>
  </scroll-view>
  <TabBar />
</template>

<script lang="ts" setup>
import Search from "@/components/search/index.vue";
import Tab from "./components/tab/index.vue";
import Card from "./components/card/index.vue";
import NavBar from "@/components/navBar/index.vue";
import TabBar from "@/components/tabBar/index.vue";
import { computed, onMounted, ref } from "vue";
import { useMerchant } from "@/pages/merchant/index";
import { useGoods } from "@/composables/goods";
import { AppModule } from "@/store/modules/app";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
const { goodsTapClick } = useGoods();
const {
  getMerchantList,
  merchantList,
  didClickMerchant,
  merchantCateList,
  currentTab,
  didClickTab,
  didTapSearch,
  handleMallScrollToLower,
} = useMerchant();

onMounted(() => {
  getMerchantList();
});

const scrollThreshold = computed(() => {
  return AppModule.statusBarHeight + AppModule.navBarHeight;
});
const navOpacity = ref(0);
const handleScroll = (e) => {
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
.merchant {
  position: relative;
  width: 100%;
  height: calc(100vh - env(safe-area-inset-bottom) - 132rpx);
  overflow: hidden;
  background-color: $main-bg;
  &-bg {
    width: 100%;
    aspect-ratio: 721 / 362;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &-top {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;
      width: 100%;
      box-sizing: border-box;
    }
    &-logo {
      width: 180rpx;
      height: 71rpx;
    }
    &-search {
      position: relative;
      width: calc(100% - 210rpx);
    }
    &-tab {
      position: absolute;
      top: -90rpx;
      left: 0;
      width: 100%;
      margin: 24rpx 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    &-list {
      width: 100%;
      margin-top: 60rpx;
      padding-top: 80rpx;
      background: rgba(255, 255, 255, 0);
      border-radius: 30rpx;
      border: 3rpx solid #dac096;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
