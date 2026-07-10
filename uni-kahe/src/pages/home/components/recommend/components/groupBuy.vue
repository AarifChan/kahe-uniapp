<template>
  <view class="groupBuy inline-block relative w-559 h-202 mr-12 bg-[url(/static/kahe-202510/ka-he/home/good-tiem.png)] bg-cover bg-no-repeat">
    <view class="groupBuy-content w-559 h-202 p-16 flex box-border flex-row items-center">
      <image class="groupBuy-content-icon h-170 w-170 rounded-20" :src="item.logo" />
      <view class="groupBuy-content-info ml-12 flex flex-col" style="width: calc(100% - 170rpx - 12rpx)">
        <view class="groupBuy-content-info-title SimHei-font font-medium text-24 text-black">{{
          item.title
        }}</view>
        <view class="groupBuy-content-info-row flex flex-row items-center justify-between" style="margin-top: 37rpx">
          <view class="groupBuy-content-info-row-price SimHei-font font-normal text-24 text-black"
            >¥{{ item.price }}</view
          >
          <view class="groupBuy-content-info-row-num SimHei-font font-normal text-20 text-black"
            >余{{ item.num }}/共{{ item.total }}</view
          >
        </view>
        <view class="groupBuy-content-info-progress flex flex-row w-full h-12 bg-[#e0e0e0] rounded-6 overflow-hidden" style="margin-top: 5rpx">
          <view
            v-if="item.total > 0"
            class="groupBuy-content-info-progress-value h-full bg-[#ffac5b]"
            :style="progressStyles"
          >
          </view>
        </view>
        <view
          class="groupBuy-content-info-subTitle SimHei-font font-normal text-16 text-[#6e6e6e]"
          style="margin-top: 15rpx"
          >{{ isOver ? "已结束" : "剩余时间" }}</view
        >
        <view class="groupBuy-content-info-row flex flex-row items-center justify-between" style="margin-top: 5rpx">
          <view
            class="groupBuy-content-info-row-last SimHei-font flex flex-row items-center"
            v-show="!isOver"
          >
            <view class="groupBuy-content-info-row-last-value text-center leading-30 font-normal text-22 text-[#845334] w-30 h-30 bg-[#ffd3a2] rounded-6">{{ day }}</view>
            <view class="groupBuy-content-info-row-last-title font-normal text-22 text-black">天</view>
            <view class="groupBuy-content-info-row-last-value text-center leading-30 font-normal text-22 text-[#845334] w-30 h-30 bg-[#ffd3a2] rounded-6">{{ hour }}</view>
            <view class="groupBuy-content-info-row-last-title font-normal text-22 text-black">时</view>
            <view class="groupBuy-content-info-row-last-value text-center leading-30 font-normal text-22 text-[#845334] w-30 h-30 bg-[#ffd3a2] rounded-6">{{
              minute
            }}</view>
            <view class="groupBuy-content-info-row-last-title font-normal text-22 text-black">分</view>
            <view class="groupBuy-content-info-row-last-value text-center leading-30 font-normal text-22 text-[#845334] w-30 h-30 bg-[#ffd3a2] rounded-6">{{
              second
            }}</view>
            <view class="groupBuy-content-info-row-last-title font-normal text-22 text-black">秒</view>
          </view>
          <view class="groupBuy-content-info-row-merchant flex flex-row items-center">
            <image
              class="groupBuy-content-info-row-merchant-logo w-36 h-36 rounded-full"
              :src="item.merchant?.icon"
            />
            <view
              class="groupBuy-content-info-row-merchant-name max-w-120 ml-5 font-normal text-18 text-black text-ellipsis"
              >{{ item.merchant?.name ?? "" }}</view
            >
          </view>
        </view>
      </view>
      <image
        class="groupBuy-content-tag absolute left-26 -top-4 w-59 h-34"
        src="/static/kahe-202510/ka-he/home/kami-tag.png"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType } from "vue";
import { type GroupBuyItem } from "@/model";

import { divideAndTruncate } from "@/utils/tools";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, hour, day, second, minute, isTimeout } =
  useTimeCount();

const props = defineProps({
  item: {
    type: Object as PropType<GroupBuyItem>,
    default: {} as GroupBuyItem,
  },
});

const progressStyles = computed(() => {
  const a = props.item.num;
  const b = props.item.total;
  const progress = divideAndTruncate(a, b);
  return {
    width: `${progress * 100.0}%`,
  };
});

const isOver = computed(() => {
  const num = props.item.num;
  return num === 0 || isTimeout.value;
});

onMounted(() => {
  startTimeRemain(props.item.openTime);
});
</script>

<style lang="scss" scoped></style>
