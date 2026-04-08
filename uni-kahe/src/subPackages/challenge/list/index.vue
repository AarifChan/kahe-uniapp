<script setup lang="ts">
import Goods from "../components/goods/index.vue";
import Lamb from "../components/lamb/index.vue";
import { useChallenge } from "../index";
import { onMounted, ref } from "vue";
import { ChallengeBox, ChallengeGoodsItem } from "../api";

const {
  dataList,
  barrageList,
  hasMore,
  getHomeData,
  refreshList,
  loadMoreList,
} = useChallenge();

const refreshing = ref(false);
const loading = ref(false);

onMounted(() => {
  getHomeData();
});

const handleClickItem = (item: ChallengeBox) => {
  uni.navigateTo({
    url: "/subPackages/challenge/detail/index?id=" + item.id,
  });
};

// 下拉刷新
const onRefresh = async () => {
  refreshing.value = true;
  await Promise.all([getHomeData(), refreshList()]);
  refreshing.value = false;
};

// 加载更多
const onLoadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  await loadMoreList();
  loading.value = false;
};
</script>

<template>
  <view class="w-full h-vh bg-gradient-to-b from-#FFE1A7 to-#FFF3DB">
    <view
      class="w-full h-334 relative"
      style="
        background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/list-top-bg.webp&quot;);
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
      "
    >
      <view class="absolute top-188 left-370 flex-1">
        <view class="text-20 text-[#333] font-bold font-price text-ellipsis"
          >每个<text class="text-[#FF0000]">闯关难度</text>不一样，要注意喔！
        </view>
        <view class="text-20 text-[#333] font-bold font-price text-ellipsis"
          >一起踏上<text class="text-[#FF0000]">寻找皮卡丘</text
          >的冒险之旅吧~</view
        >
      </view>
    </view>
    <Lamb :barrage-list="barrageList" />
    <scroll-view
      scroll-y
      class="h-[calc(100vh-334rpx)] p-20"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
    >
      <view class="flex flex-wrap gap-[20rpx]">
        <view
          class="w-[calc(50%-10rpx)]"
          v-for="(item, index) in dataList"
          :key="index"
          @tap.stop="handleClickItem(item)"
        >
          <goods :item="item" />
        </view>
      </view>
      <!-- 加载状态 -->
      <view class="text-center py-20 text-24rpx text-gray-500">
        <text v-if="loading"
          >加载中...
          <text class="inline-block animate-spin"
            >⏳</text
          ></text
        >
        <text v-else-if="!hasMore && dataList.length > 0"
          >没有更多了</text
        >
        <text v-else-if="dataList.length === 0">暂无数据</text>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped></style>
