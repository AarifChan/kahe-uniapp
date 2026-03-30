<script setup lang="ts">
const prizeList = [
  {
    name: "参与赏品",
    image: "https://jms.85gui7.com/kahe-202510/challenge/tab1.png",
  },
  {
    name: "第1关赏品",
    image: "https://jms.85gui7.com/kahe-202510/challenge/tab1.png",
  },
  {
    name: "第2关赏品",
    image: "https://jms.85gui7.com/kahe-202510/challenge/tab1.png",
  },
  {
    name: "第3关赏品",
    image: "https://jms.85gui7.com/kahe-202510/challenge/tab1.png",
  },
  {
    name: "第4关赏品",
    image: "https://jms.85gui7.com/kahe-202510/challenge/tab1.png",
  },
];
</script>

<template>
  <view class="p-16rpx">
    <view
      class="relative h-420 z-0 p-16rpx"
      style="
        background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/top-bg.png&quot;);
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
      "
    >
      <!-- 顶部标题栏 -->
      <view class="relative flex items-center justify-between pl-54rpx">
        <view class="flex items-center">
          <text class="text-26rpx text-[#685252] ml-12">箱子名称xxxx</text>
        </view>
        <view class="flex gap-12">
          <view
            class="bg-[#7FB5FF] px-4rpx border-1rpx border-[#233D79] rounded-4rpx"
          >
            <text class="text-20rpx text-[#233D79] font-theme">晶相定义</text>
          </view>
          <view
            class="px-4rpx py-2rpx bg-[#7FFF85] border-1rpx border-[#237927] rounded-4rpx"
          >
            <text class="text-20rpx text-[#237927] font-theme">购买须知</text>
          </view>
          <view
            class="px-4rpx py-2rpx border-1rpx border-[#85733A] bg-[#FFFA70] rounded-4rpx"
          >
            <text class="text-20rpx text-[#85733A] font-theme">发管说明</text>
          </view>
        </view>
      </view>

      <!-- 奖品横向滚动区域 -->
      <view class="relative mt-24">
        <scroll-view scroll-x enable-flex class="whitespace-nowrap px-20">
          <view
            v-for="(item, index) in prizeList"
            :key="index"
            class="inline-block mr-16"
          >
            <view
              class="w-180 h-250 rounded-16 overflow-hidden border-10rpx border-[#FCD570]"
            >
              <view class="p-12">
                <image
                  :src="item.image"
                  class="w-146 h-146 rounded-12"
                  mode="aspectFit"
                />
              </view>
              <view class="h-60 flex-center bg-[#FCD570]">
                <text class="text-26 font-bold font-other text-[#8B4513]">
                  {{ item.name }}
                </text>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
