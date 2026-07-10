<template>
  <view
    class="groupBuyItem w-full p-10 box-border aspect-ratio-[331/500] relative overflow-hidden mb-0 rounded-12 flex flex-col bg-[url('/static/kahe-202510/ka-he/home/item-bg.png')] bg-[length:100%_100%] bg-center bg-no-repeat"
  >
    <!--        <image class="groupBuyItem-bg" src="/static/kahe-202510/ka-he/home/item-bg.png"  />-->
    <image
      class="groupBuyItem-logo relative w-full aspect-ratio-[1/1]"
      :src="item.logo"
    />
    <view
      class="groupBuyItem-num absolute right-[14rpx] top-[251rpx] rounded-4 font-normal text-20 text-[#FFFFFF] py-2 px-9 bg-[rgba(0,0,0,0.7)] z-1"
    >
      {{ item.num }}/{{ item.total }}
    </view>
    <view
      class="groupBuyItem-info relative flex flex-col px-12 pb-12 box-border z-1"
    >
      <!--            <view class="groupBuyItem-info-subTitle SimHei-font" style="margin-top: 15rpx">{{isTimeout ? '已结束' : '剩余时间'}}</view>-->
      <view
        v-if="!isTimeout"
        class="groupBuyItem-info-row flex flex-row items-center justify-between"
        style="margin-top: 5rpx"
      >
        <view
          class="groupBuyItem-info-row-last SimHei-font flex flex-row items-center"
        >
          <view
            class="groupBuyItem-info-row-last-value price-font text-center leading-[30rpx] font-normal text-22 text-[#FFFFFF] w-[30rpx] h-[30rpx] bg-[#1AE1FF] rounded-6"
            >{{ day }}</view
          >
          <view
            class="groupBuyItem-info-row-last-title font-normal text-22 text-[#000000]"
            >天</view
          >
          <view
            class="groupBuyItem-info-row-last-value price-font text-center leading-[30rpx] font-normal text-22 text-[#FFFFFF] w-[30rpx] h-[30rpx] bg-[#1AE1FF] rounded-6"
            >{{ hour }}</view
          >
          <view
            class="groupBuyItem-info-row-last-title font-normal text-22 text-[#000000]"
            >时</view
          >
          <view
            class="groupBuyItem-info-row-last-value price-font text-center leading-[30rpx] font-normal text-22 text-[#FFFFFF] w-[30rpx] h-[30rpx] bg-[#1AE1FF] rounded-6"
            >{{ minute }}</view
          >
          <view
            class="groupBuyItem-info-row-last-title font-normal text-22 text-[#000000]"
            >分</view
          >
          <view
            class="groupBuyItem-info-row-last-value price-font text-center leading-[30rpx] font-normal text-22 text-[#FFFFFF] w-[30rpx] h-[30rpx] bg-[#1AE1FF] rounded-6"
            >{{ second }}</view
          >
          <view
            class="groupBuyItem-info-row-last-title font-normal text-22 text-[#000000]"
            >秒</view
          >
        </view>
      </view>
      <view
        class="groupBuyItem-info-title text-flow-ellipsis-single font-normal text-24 text-[#000000] leading-[36rpx]"
        >{{ item.title }}</view
      >

      <view
        class="groupBuyItem-info-progress flex flex-row w-full h-[12rpx] bg-[#E0E0E0] rounded-6 overflow-hidden"
        style="margin-top: 5rpx"
      >
        <view
          v-if="item.total > 0"
          class="groupBuyItem-info-progress-value h-full bg-[#F95151]"
          :style="{ width: `${(item.num / item.total) * 100.0}%` }"
        ></view>
      </view>
      <view
        class="groupBuyItem-info-row flex flex-row items-center justify-between"
        style="margin-top: 12rpx"
      >
        <view
          class="groupBuyItem-info-row flex flex-row items-center justify-between"
        >
          <view
            class="groupBuyItem-info-row-price price-font font-normal text-32 text-[#000000] text-right leading-[46rpx] pr-[6rpx] w-[97rpx] h-[46rpx] bg-[url('/static/kahe-202510/ka-he/home/price-bg.png')] bg-no-repeat bg-[length:100%_100%]"
            >¥{{ item.price }}</view
          >
        </view>
        <view
          class="groupBuyItem-info-row-merchant flex flex-row items-center"
        >
          <image
            class="groupBuyItem-info-row-merchant-logo w-36 h-36 rounded-full"
            :src="item.merchant?.icon"
          />
          <view
            class="groupBuyItem-info-row-merchant-name text-flow-ellipsis-single max-w-[120rpx] ml-[5rpx] font-normal text-18 text-[#504F4F]"
            >{{ item.merchant?.name ?? "" }}</view
          >
        </view>
      </view>
    </view>
    <!-- <view class="groupBuyItem-empty" v-if="isOver">
      <image
        style="width: 132rpx; height: 113rpx"
        src="/static/kahe-202510/product/sell-out.png"
      />
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType } from "vue";
import type { GroupBuyItem } from "@/model";
import { useTimeCount } from "@/composables/countTime";

const { startTimeRemain, hour, day, second, minute, isTimeout } =
  useTimeCount();

const props = defineProps({
  item: {
    type: Object as PropType<GroupBuyItem>,
    default: {} as GroupBuyItem,
  },
});

const isOver = computed(() => {
  return props.item.num === 0 || isTimeout.value;
});

onMounted(() => {
  startTimeRemain(props.item.openTime);
});
</script>

<style lang="scss" scoped></style>
