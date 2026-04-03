<script setup lang="ts">
import Goods from "../components/goods/index.vue";
import { useChallenge } from "../index";
import { onMounted } from "vue";
import { ChallengeBox, ChallengeGoodsItem } from "../api";
const { dataList, getDataList } = useChallenge();
onMounted(() => {
  getDataList();
});
const handleClickItem = (item: ChallengeBox) => {
  uni.navigateTo({
    url: "/subPackages/challenge/detail/index?id=" + item.id,
  });
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
        <view
          class="text-20 text-text-primary font-bold font-price text-ellipsis"
          >每个<text class="text-[#FF0000]">闯关难度</text>不一样，要注意喔！
        </view>
        <view
          class="text-20 text-text-primary font-bold font-price text-ellipsis"
          >一起踏上<text class="text-[#FF0000]">寻找皮卡丘</text
          >的冒险之旅吧~</view
        >
      </view>
    </view>
    <scroll-view scroll-y class="h-[calc(100vh-334rpx)] p-20">
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
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped></style>
