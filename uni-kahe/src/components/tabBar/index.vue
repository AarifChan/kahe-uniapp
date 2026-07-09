<template>
  <view
    class="tab-bar fixed left-0 bottom-0 w-full flex flex-col z-99"
    style="height: calc(132rpx + env(safe-area-inset-bottom))"
  >
    <image
      class="tab-bar-bg w-750 h-138"
      src="/static/kahe-202510/ka-he/tab-bar/tabBar-bg2.png"
    />
    <view class="tab-bar-content absolute left-0 top-0 w-750 h-138 flex flex-row items-center justify-evenly">
      <view
        v-for="(item, index) in tabList"
        :id="index + 'tabBarId'"
        :key="index + 'tabBarKey'"
        class="tab-bar-content-item relative flex flex-col items-center w-full"
        @tap.stop="switchTab(item.selectPath, index)"
      >
        <view class="tab-bar-content-item-select w-full h-109 flex flex-row items-center justify-center">
          <!-- <image
            v-show="index === currentIndex"
            class="tab-bar-content-item-select-img w-102 h-117"
            src="/static/kahe-202510/ka-he/tab-bar/item-active.png"
          />

          <image
            v-show="index !== currentIndex"
            class="tab-bar-content-item-select-img w-102 h-117"
            src="/static/kahe-202510/ka-he/tab-bar/item-normal.png"
          /> -->
        </view>
        <view class="tab-bar-content-item-info absolute left-0 top-0 w-full h-full flex flex-col items-center justify-start">
          <image
            v-show="index === currentIndex"
            :src="item.iconSelected"
            :class="[
              'w-80 h-80',
            ]"
            :style="index === 3 || index === 4 ? { transform: 'translateY(12rpx)' } : {}"
          />
          <image
            v-show="index !== currentIndex"
            :src="item.iconNormal"
            :class="[
              'w-80 h-80',
            ]"
            :style="index === 3 || index === 4 ? { transform: 'translateY(12rpx)' } : {}"
          />
          <text
            :style="{ color: index === currentIndex ? '#A86114' : '#8B8B8B' }"
            :class="[
              'font-normal text-22',
              index === 0 || index === 1 ? 'mr-18' : '',
            ]"
            >{{ item.text }}
          </text>
        </view>
      </view>
    </view>
    <view class="tab-bar-bottom w-full bg-[#fdfdf1]" style="height: env(safe-area-inset-bottom)" />
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { AppModule } from "@/store/modules/app";
import type { TabBarItem } from "@/model";
import { getPageOptions } from "@/utils/tools";
import { getLastPage } from "@/utils";

const currentIndex = computed(() => {
  return AppModule.currentTabIndex;
});

onMounted(() => {
  let lastPage = getLastPage();

  let index = tabList
    .map((item) => item.selectPath)
    .indexOf(`/${lastPage.route}`);
  // console.log("page:", lastPage.route, index);
  // AppModule.changeCurrentTabIndex(index);

  uni.setNavigationBarTitle({
    title: tabList[AppModule.currentTabIndex].title,
  });
});
watch(
  () => AppModule.currentTabIndex,
  (oldIndex, newIndex) => {
    if (newIndex !== oldIndex) {
      uni.setNavigationBarTitle({
        title: tabList[newIndex].title,
      });
    }
  }
);

const tabList: TabBarItem[] = [
  {
    text: "首页",
    title: "首页",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kaju/tabbar/icon1-normal.png",
    iconSelected:
      "/static/kaju/tabbar/icon1-active.png",
  },
  {
    text: "商家",
    title: "商家",
    selectPath: "/pages/merchant/index",
    iconNormal: "/static/kaju/tabbar/icon2-normal.png",
    iconSelected:
      "/static/kaju/tabbar/icon2-active.png",
  },
  {
    text: "抽卡机",
    title: "抽卡机",
    selectPath: "/pages/machine/index",
    iconNormal:
      "/static/kaju/tabbar/icon3-normal.png",
    iconSelected:
      "/static/kaju/tabbar/icon3-active.png",
  },
  {
    text: "寄存柜",
    title: "寄存柜",
    selectPath: "/pages/box/index",
    iconNormal: "/static/kaju/tabbar/icon4-normal.png",
    iconSelected:
      "/static/kaju/tabbar/icon4-active.png",
  },
  {
    text: "我的",
    title: "我的",
    selectPath: "/pages/mine/index",
    iconNormal: "/static/kaju/tabbar/icon5-normal.png",
    iconSelected:
      "/static/kaju/tabbar/icon5-active.png",
  },
];

const switchTab = (path: string, index: number) => {
  // uni.switchTab({
  //   url: path,
  //   complete(result) {
  //     // uni.hideLoading();
  //   },
  // });
  console.log(path, index);
  AppModule.changeCurrentTabIndex(index);
  // uni.showLoading();
};
</script>

<style lang="scss" scoped></style>
