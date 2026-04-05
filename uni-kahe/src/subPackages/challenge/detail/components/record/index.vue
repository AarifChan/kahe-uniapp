<template>
  <view class="relative h-full pv-16 px-16 box-border">
    <view class="w-full relative flex box-border overflow-x-auto">
      <view
        class="shrink-0 mr-12rpx px-36 h-40rpx rounded-18rpx text-center leading-40"
        :class="sortIndex === item.value ? 'bg-[#AC5A3E]' : 'bg-[#e8ad82]'"
        v-for="(item, index) in tabs"
        :key="item.value"
        :id="item.value"
        @tap.stop="sortTabAction(item)"
      >
        <view class="text-24rpx text-white">{{ item.label }}</view>
      </view>
    </view>
    <view
      class="relative pt-0 px-20rpx pb-28rpx box-border w-full bg-[#fffbef] shadow-[0rpx_3rpx_7rpx_0_rgba(217,190,134,0.5)] rounded-10rpx flex flex-col justify-center mt-26rpx first:mt-0"
      v-for="(item, index) in recordList"
      :key="index"
    >
      <view
        class="absolute right-8 top-4 py-8rpx px-32rpx bg-[#f0ead8] rounded-10rpx text-black text-24rpx"
        >#{{ item.sales }}</view
      >
      <view class="flex justify-between items-center pb-16rpx">
        <view class="flex items-center">
          <decorate-avatar
            :avatar="item.avatar"
            :level="item.vip"
            :scale="0.6"
            style="margin-left: -16px"
          />
          <view class="text-28rpx text-[#333]">{{ item.nickName }}</view>
        </view>
        <view class="text-20rpx text-[#545454]">{{ item.createTime }}</view>
      </view>
      <view
        class="top-[58%] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-20rpx)] h-2rpx bg-[#E2DBC5] z-1"
      />
      <view class="relative flex justify-between items-center">
        <view class="flex flex-row items-center">
          <image
            class="w-80 mr-22rpx rounded-4rpx"
            :src="item.goods.goodsDto.image"
            mode="widthFix"
          />
          <view class="text-28rpx text-[#333]"
            >{{ item.goods.goodsDto.name }}x{{ item.goods.num }}
          </view>
        </view>
      </view>
    </view>
  </view>
  <empty :show="recordList.length === 0" />
</template>
<script setup lang="ts">
import DecorateAvatar from "@/components/custom/DecorateAvatar/index.vue";
import { ref, computed } from "vue";
import Empty from "@/components/empty/index.vue";
import { LogListObject } from "@/subPackages/challenge/api";

interface TabItem {
  label: string;
  value: number;
}

const props = defineProps({
  level: {
    type: Number,
    default: 0,
  },
  recordList: {
    type: Array as () => LogListObject[],
    default: [] as LogListObject[],
  },
});

const tabs = computed<TabItem[]>(() => {
  const list: TabItem[] = [{ label: "全部", value: -1 }];
  for (let i = props.level; i >= 1; i--) {
    list.push({ label: `${i}关赏`, value: i });
  }

  return list;
});

const sortIndex = ref(-1);
const emits = defineEmits(["sortTabAction"]);
const sortTabAction = (item: { label: string; value: number }) => {
  sortIndex.value = item.value;
  emits("sortTabAction", item.value);
};
</script>
