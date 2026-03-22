<template>
  <view class="recommend">
    <!-- <image class="recommend-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/common/card-item.png" /> -->
    <view class="recommend-box">
      <!-- <image class="recommend-box-img" src="https://jms.85gui7.com/kahe-202510/ka-he/home/kami-title1.png" />
            <image class="recommend-box-go" src="https://jms.85gui7.com/kahe-202510/ka-he/home/kami-go1.png" @tap.stop="handleGroupBuyPage" /> -->
      <view class="top">
        <view class="top-title theme-font">热门拼团</view>
        <view class="top-hot">
          <view class="line"></view>
          <text>正在火热活动中!!!</text>
        </view>
        <view class="top-wrapper">
          <view class="dot"></view>
          <view class="line"></view>
          <view class="dot"></view>
        </view>
        <view class="top-more" @tap.stop="handleGroupBuyPage">more</view>
      </view>
    </view>
    <scroll-view class="recommend-scroll" :scroll-x="true">
      <group-buy
        v-for="(item, index) in groupList"
        :item="item"
        :id="'groupItem:' + item.id"
        :key="'groupItem:' + item.id"
        @tap.stop="handleClickItem(item)"
      />
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import type { UIRecommendModel, GroupBuyItem } from "@/model";
import { PropType } from "vue";
import GroupBuy from "./components/groupBuy.vue";

defineProps({
  list: {
    type: Array as PropType<UIRecommendModel[]>,
    default: () => [],
  },
  groupList: {
    type: Array as PropType<GroupBuyItem[]>,
    default: () => [],
  },
});

const handleGroupBuyPage = () => {
  uni.navigateTo({
    url: "/subPackages/groupBuy/index/index",
  });
};

const handleClickItem = (item: GroupBuyItem) => {
  uni.navigateTo({
    url: `/subPackages/groupBuy/detail/index?id=${item.id}`,
  });
};
</script>
<style lang="scss" scoped>
.recommend {
  margin: 18rpx 0 0 16rpx;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: calc(100% - 16rpx);

  &-bg {
    width: 734rpx;
    height: 306rpx;
  }

  //background: linear-gradient(
  //  90deg,
  //  rgba(87, 206, 255, 0.51),
  //  rgba(177, 217, 255, 1)
  //);
  //border-radius: 20rpx 0 0 20rpx;
  &-box {
    // position: absolute;
    width: calc(100% - 32rpx);
    // top: 16rpx;
    // left: 16rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 68rpx;

    .top {
      width: 100%;
      display: flex;
      align-items: center;

      &-title {
        margin-right: 13rpx;
        font-weight: 400;
        font-size: 30rpx;
        color: #fd9d08;
        @include text-stroke(2rpx, #000000);
      }

      &-hot {
        position: relative;
        z-index: 1;

        .line {
          position: absolute;
          bottom: 10rpx;
          width: 156rpx;
          height: 6rpx;
          background: #ffcc3b;
          z-index: 0;
        }

        text {
          position: relative;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          font-size: 20rpx;
          color: #303030;
          line-height: 37rpx;
        }
      }

      &-wrapper {
        display: flex;
        align-items: center;
        flex: 1;
        margin: 0 14rpx;

        .dot {
          width: 8rpx;
          height: 8rpx;
          background-color: #e2b67c;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .line {
          flex: 1;
          height: 2rpx;
          background-color: #e2b67c;
        }
      }

      &-more {
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 26rpx;
        color: #000000;
        line-height: 37rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 94rpx;
        height: 33rpx;
        background: linear-gradient(0deg, #ffeec5);
        box-shadow: 0rpx 2rpx 0rpx 0rpx #774718;
        border-radius: 17rpx;
        border: 2px solid #cda374;
      }
    }

    &-img {
      width: 197rpx;
      height: 68rpx;
    }

    &-go {
      width: 151rpx;
      height: 37rpx;
    }
  }

  &-scroll {
    position: relative;
    width: 100%;
    white-space: nowrap;
  }
}
</style>
