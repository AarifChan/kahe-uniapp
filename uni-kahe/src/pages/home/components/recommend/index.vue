<template>
  <view>
    <view class="flex flex-row justify-around w-full pt-16">
      <view class="w-509 h-220 relative">
        <item
          v-if="groupList.length > 0"
          :item="groupList[0]"
          @tap.stop="handleClickItem(groupList[0])"
        />
        <view
          class="w-94 h-33 line-height-none text-center absolute top-0 right-4 font-theme"
          @tap.stop="handleGroupBuyPage"
          style="
            background: linear-gradient(0deg, #ffeec5);
            box-shadow: 0rpx 2rpx 0rpx 0rpx #774718;
            border-radius: 17rpx;
            border: 2rpx solid #cda374;
          "
          >more</view
        >
      </view>
      <view class="flex flex-col justify-between">
        <view
          @tap.stop="handleChallengePage"
          class="w-204 h-105"
          style="
            background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/challenge-item1.png&quot;);
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
          "
        ></view>
        <view
          class="w-204 h-105"
          @tap.stop="handleMatchPage"
          style="
            background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/challenge-item2.png&quot;);
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
          "
        ></view>
      </view>
    </view>
    <!--    <view class="recommend">-->
    <!--      &lt;!&ndash; <image class="recommend-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/common/card-item.png" /> &ndash;&gt;-->

    <!--      <view class="recommend-box">-->
    <!--        &lt;!&ndash; <image class="recommend-box-img" src="https://jms.85gui7.com/kahe-202510/ka-he/home/kami-title1.png" />-->
    <!--              <image class="recommend-box-go" src="https://jms.85gui7.com/kahe-202510/ka-he/home/kami-go1.png" @tap.stop="handleGroupBuyPage" /> &ndash;&gt;-->
    <!--        <view class="top">-->
    <!--          <view class="top-title theme-font">热门拼团</view>-->
    <!--          <view class="top-hot">-->
    <!--            <view class="line"></view>-->
    <!--            <text>正在火热活动中!!!</text>-->
    <!--          </view>-->
    <!--          <view class="top-wrapper">-->
    <!--            <view class="dot"></view>-->
    <!--            <view class="line"></view>-->
    <!--            <view class="dot"></view>-->
    <!--          </view>-->
    <!--          <view class="top-more" @tap.stop="handleGroupBuyPage">more</view>-->
    <!--        </view>-->
    <!--      </view>-->
    <!--      <scroll-view class="recommend-scroll" :scroll-x="true">-->
    <!--        <group-buy-->
    <!--          v-for="(item, index) in groupList"-->
    <!--          :item="item"-->
    <!--          :id="'groupItem:' + item.id"-->
    <!--          :key="'groupItem:' + item.id"-->
    <!--          @tap.stop="handleClickItem(item)"-->
    <!--        />-->
    <!--      </scroll-view>-->
    <!--    </view>-->
  </view>
</template>
<script lang="ts" setup>
import type { UIRecommendModel, GroupBuyItem } from "@/model";
import { PropType } from "vue";
import GroupBuy from "./components/groupBuy.vue";
import Item from "./components/item.vue";
import { ShowToast } from "@/utils";

defineProps({
  // list: {
  //   type: Array as PropType<UIRecommendModel[]>,
  //   default: () => [],
  // },
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

const handleChallengePage = () => {
  uni.navigateTo({
    url: "/subPackages/challenge/list/index",
  });
};

const handleMatchPage = () => {
  ShowToast("敬请期待");
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
