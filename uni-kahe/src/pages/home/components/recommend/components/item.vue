<template>
  <view
    class="flex flex-row items-center box-border w-full py-8 px-12 gap-12 rounded-16 bg-[#FFF8F1]"
    :style="itemBgStyle"
  >
    <view class="relative flex-shrink-0 w-88 h-88">
      <image
        class="item-pic-tag absolute -top-4 -left-4 w-50 h-28 z-10"
        src="/static/kahe-202510/challenge/pingtuan-tag.png"
        mode="aspectFit"
      />
      <image
        class="item-pic-logo w-full h-full rounded-12"
        :src="item.logo"
        mode="aspectFill"
      />
    </view>

    <view class="item-info flex-1 flex flex-col justify-between min-w-0 h-88">
      <view
        class="item-row flex flex-row items-center justify-between w-full min-w-0"
      >
        <view
          class="item-title flex-1 font-bold text-22 text-[#333] leading-30 overflow-hidden text-ellipsis whitespace-nowrap mr-8"
          >{{ item.title }}</view
        >
        <view
          class="item-price flex-shrink-0 font-bold text-26 text-[#ff4d4f] leading-30"
          >¥{{ item.price }}</view
        >
      </view>

      <view class="item-countdown flex items-center">
        <text
          class="item-countdown-text text-20 text-[#666] leading-28 font-mono"
          >{{ isOver ? "已结束" : remainingTime }}</text
        >
      </view>

      <view
        class="item-row flex flex-row items-center justify-between w-full min-w-0"
      >
        <view
          class="item-progress flex-1 h-8 bg-[#e5e5e5] rounded-4 overflow-hidden mr-8"
        >
          <view
            v-if="item.total > 0"
            class="item-progress-value h-full bg-[#ffac5b] rounded-4"
            :style="progressStyles"
          ></view>
        </view>
        <text class="item-remain flex-shrink-0 text-18 text-[#999] leading-24"
          >余{{ item.num }}/共{{ item.total }}</text
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType } from "vue";
import { type GroupBuyItem } from "@/model";

import { divideAndTruncate } from "@/utils/tools";
import { useTimeCount } from "@/composables/countTime";

const { startTimeRemain, remainingTime, isTimeout } = useTimeCount();

const props = defineProps({
  item: {
    type: Object as PropType<GroupBuyItem>,
    default: () => ({}) as GroupBuyItem,
  },
});

/** 用对象样式避免内联 url(&quot;...) 编译到 WXML 时引号/斜杠被误解析（miniprogram-ci 报 unexpected `/`） */
const itemBgStyle = {
  backgroundImage: "url(/static/kaju/home/good-bg.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

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
