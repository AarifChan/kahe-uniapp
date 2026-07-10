<template>
  <view class="topInfo relative mx-auto my-16 w-[730rpx] h-[341rpx]">
    <image class="topInfo-bg w-full h-full" src="/static/kahe-202510/groupBuy/top-card.png" />
    <view class="topInfo-content absolute top-0 left-0 w-full h-full box-border flex flex-col gap-20 p-16">
      <view class="topInfo-content-head flex flex-row items-start justify-between">
        <view class="left text-50 leading-[normal] text-white">{{ detail.price }}</view>
        <view class="right flex flex-col items-end gap-20">
          <view class="row flex flex-row items-center justify-end gap-20 text-white text-20">
            <view class="title text-24 text-white">距离结束还剩</view>
            <view class="time flex flex-row items-center gap-10">
              <view class="timeItem relative w-[50rpx] h-[54rpx]">
                <image
                  class="timeItem-img w-full h-full"
                  src="/static/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day absolute left-0 top-[6rpx] w-full text-center text-20 text-black">{{ day }}</view>
                <view class="timeItem-unit absolute left-0 bottom-0 w-full text-center text-18 text-white">天</view>
              </view>
              <view class="timeItem relative w-[50rpx] h-[54rpx]">
                <image
                  class="timeItem-img w-full h-full"
                  src="/static/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day absolute left-0 top-[6rpx] w-full text-center text-20 text-black">{{ hour }}</view>
                <view class="timeItem-unit absolute left-0 bottom-0 w-full text-center text-18 text-white">时</view>
              </view>
              <view class="timeItem relative w-[50rpx] h-[54rpx]">
                <image
                  class="timeItem-img w-full h-full"
                  src="/static/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day absolute left-0 top-[6rpx] w-full text-center text-20 text-black">{{ minute }}</view>
                <view class="timeItem-unit absolute left-0 bottom-0 w-full text-center text-18 text-white">分</view>
              </view>
              <view class="timeItem relative w-[50rpx] h-[54rpx]">
                <image
                  class="timeItem-img w-full h-full"
                  src="/static/kahe-202510/groupBuy/time-item.png"
                />
                <view class="timeItem-day absolute left-0 top-[6rpx] w-full text-center text-20 text-black">{{ second }}</view>
                <view class="timeItem-unit absolute left-0 bottom-0 w-full text-center text-18 text-white">秒</view>
              </view>
            </view>
          </view>
          <view class="row flex flex-row items-center justify-end gap-20 text-white text-20">
            编号：{{ detail?.sid }}
          </view>
        </view>
      </view>
      <view>
        <view class="topInfo-content-progress relative flex flex-row w-full h-14 bg-black rounded-6 overflow-hidden">
          <view
            v-if="detail.total > 0"
            class="topInfo-content-progress-value h-full bg-white"
            :style="{
              width: `${((detail.total - detail.sales) / detail.total) * 100.0}%`,
            }"
          ></view>
        </view>
        <view class="topInfo-content-row1 flex flex-row justify-between">
          <view class="topInfo-content-row1-subTitle font-normal text-20 text-white"
            >开售 {{ detail.openTime }}</view
          >
          <view class="topInfo-content-row1-subTitle font-normal text-20 text-white"
            >余{{ detail.total - detail.sales }}/共{{ detail.total }}</view
          >
        </view>
      </view>
      <view
        class="topInfo-content-title theme-font text-ellipsis text-42 text-[#fcd09d] w-full text-left"
        >{{ detail.title }}</view
      >
      <scroll-view class="topInfo-content-row2 relative whitespace-nowrap" scroll-x>
        <view
          v-for="(item, index) in detail.prices"
          :key="'price' + index"
          class="topInfo-content-row2-price inline-block w-[202rpx] h-41 leading-41 mr-12 font-normal text-20 text-[#794627] text-center bg-[url(/static/kahe-202510/groupBuy/discount-item.png)] bg-no-repeat bg-[length:100%_100%] rounded-4"
          >单笔满{{ item.num }}份｜{{ item.price }}/份</view
        >
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { GroupBuyDetail } from "@/model";
import { onMounted, PropType, watch } from "vue";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, remainingTime, isTimeout, day, hour, second, minute } =
  useTimeCount();
const props = defineProps({
  detail: {
    default: {} as GroupBuyDetail,
    type: Object as PropType<GroupBuyDetail>,
  },
});
watch(
  () => props.detail,
  (value) => {
    if (value && value.id) {
      startTimeRemain(value.openTime);
    }
  }
);
onMounted(() => {});
</script>

<style scoped lang="scss">
</style>
