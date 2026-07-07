<template>
  <view class="recommend">
    <view class="recommend-left">
      <image
        class="recommend-left-top"
        src="/static/kaju/home/left.png"
        mode="aspectFit"
        @tap.stop="handleChallengePage"
      />
      <image
        class="recommend-left-bottom"
        src="/static/kaju/home/right.png"
        mode="aspectFit"
        @tap.stop="handleMatchPage"
      />
    </view>
    <view class="recommend-right" :style="rightBgStyle">
      <image
        class="recommend-right-more"
        src="/static/kaju/home/more.png"
        mode="aspectFit"
        @tap.stop="handleGroupBuyPage"
      />
      <view class="recommend-right-list">
        <view
          v-for="(item, index) in displayList"
          :key="index"
          class="recommend-right-item"
          @tap.stop="handleClickItem(item)"
        >
          <item :item="item" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { GroupBuyItem } from "@/model";
import { PropType, computed } from "vue";
import Item from "./components/item.vue";
import { ShowToast, currentEnv } from "@/utils";

const props = defineProps({
  groupList: {
    type: Array as PropType<GroupBuyItem[]>,
    default: () => [],
  },
});

const displayList = computed(() => props.groupList.slice(0, 2));

/** 避免模板内 url(&quot;https://...) 编译到 WXML 时引号/斜杠导致 miniprogram-ci 报 unexpected `/` */
const rightBgStyle = {
  backgroundImage: "url(/static/kaju/home/base.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const handleGroupBuyPage = () => {
  uni.navigateTo({
    url: "/subPackages/groupBuy/index/index",
  });
};

const handleChallengePage = () => {
  if (currentEnv() === "mp-weixin") {
    ShowToast("请下载卡牌核心app体验新功能");
    return;
  }
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 280rpx;
  padding: 16rpx 16rpx 0;
  gap: 12rpx;

  &-left {
    position: relative;
    width: 300rpx;
    height: 280rpx;

    &-top {
      position: absolute;
      left: 0;
      top: 0;
      width: 158rpx;
      height: 280rpx;
    }

    &-bottom {
      position: absolute;
      left: 128rpx;
      top: 0;
      width: 158rpx;
      height: 280rpx;
    }
  }

  &-right {
    position: relative;
    height: 280rpx;
    width: 400rpx;

    &-more {
      position: absolute;
      top: -8rpx;
      right: 0rpx;
      width: 110rpx;
      height: 50rpx;
      z-index: 10;
    }

    &-list {
      position: absolute;
      top: 52rpx;
      left: 12rpx;
      right: 12rpx;
      bottom: 12rpx;
      display: flex;
      flex-direction: column;
      gap: 8rpx;
      overflow: hidden;
    }

    &-item {
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
    }
  }
}
</style>
