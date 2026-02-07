<template>
  <view class="tab-bar">
    <image class="tab-bar-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/tabBar-bg2.png" />
    <view class="tab-bar-content">
      <view
        v-for="(item, index) in tabList"
        :id="index + 'tabBarId'"
        :key="index + 'tabBarKey'"
        class="tab-bar-content-item"
        @tap.stop="switchTab(item.selectPath, index)"
      >
        <view class="tab-bar-content-item-select">
          <!-- <image
            v-show="index === currentIndex"
            class="tab-bar-content-item-select-img"
            src="https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item-active.png"
          />

          <image
            v-show="index !== currentIndex"
            class="tab-bar-content-item-select-img"
            src="https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item-normal.png"
          /> -->
        </view>
        <view class="tab-bar-content-item-info">
          <image
            v-show="index === currentIndex"
            :src="item.iconSelected"
            :class="[
              'tab-bar-content-item-info-img',
              index === 3 || index === 4 ? 'margin' : '',
            ]"
          />
          <image
            v-show="index !== currentIndex"
            :src="item.iconNormal"
            :class="[
              'tab-bar-content-item-info-img',
              index === 3 || index === 4 ? 'margin' : '',
            ]"
          />
          <text
            :style="{ color: index === currentIndex ? '#A86114' : '#8B8B8B' }"
            :class="[
              'tab-bar-content-item-info-text',
              index === 0 || index === 1 ? 'move_right' : '',
            ]"
            >{{ item.text }}
          </text>
        </view>
      </view>
    </view>
    <view class="tab-bar-bottom" />
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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
  console.log("page:", lastPage.route, index);
  AppModule.changeCurrentTabIndex(index);
});

const tabList: TabBarItem[] = [
  {
    text: "首页",
    title: "首页",
    selectPath: "/pages/home/index",
    iconNormal: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item1.png",
    iconSelected: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item1-active.png",
  },
  {
    text: "商家",
    title: "商家",
    selectPath: "/pages/merchant/index",
    iconNormal: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item2.png",
    iconSelected: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item2-active.png",
  },
  {
    text: "抽卡机",
    title: "抽卡机",
    selectPath: "/pages/machine/index",
    iconNormal: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item3-active.png",
    iconSelected: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item3-active.png",
  },
  {
    text: "盒柜",
    title: "盒柜",
    selectPath: "/pages/box/index",
    iconNormal: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item4.png",
    iconSelected: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item4-active.png",
  },
  {
    text: "我的",
    title: "我的",
    selectPath: "/pages/mine/index",
    iconNormal: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item5.png",
    iconSelected: "https://jms.85gui7.com/kahe-202510/ka-he/tab-bar/item5-active.png",
  },
];

const switchTab = (path: string, index: number) => {
  uni.switchTab({
    url: path,
    complete(result) {
      // uni.hideLoading();
    },
  });
  AppModule.changeCurrentTabIndex(index);
  // uni.showLoading();
};
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  left: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  height: calc(132rpx + env(safe-area-inset-bottom));
  bottom: 0;
  z-index: 99;

  &-bg {
    width: 750rpx;
    height: 138rpx;
  }

  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 750rpx;
    height: 138rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    &-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      &-select {
        width: 100%;
        height: 109rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-img {
          width: 102rpx;
          height: 117rpx;
        }
      }

      &-center {
        position: absolute;
        left: 0;
        top: -40rpx;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-img {
          width: 128rpx;
          height: 133rpx;
        }
      }

      &-info {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        &-img {
          width: 80rpx;
          height: 80rpx;
        }

        .margin {
         transform: translateY(12rpx);
        }

        .move_right {
          margin-right: 18rpx;
        }

        &-text {
          // margin-top: -8rpx;
          font-weight: 400;
          font-size: 22rpx;
          // color: #8B8B8B;
        }
      }
    }
  }

  &-bottom {
    width: 100%;
    height: env(safe-area-inset-bottom);
    background-color: #fdfdf1;
  }
}
</style>
