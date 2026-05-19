<template>
  <view class="relative w-509 h-220 overflow-visible" :style="cardBgStyle">
    <view class="pt-60 px-16 flex flex-row">
      <!-- 左侧图片区域 -->
      <view class="relative w-126 h-126 flex-shrink-0">
        <image
          class="absolute left-0 top-0 w-59 h-34 z-10"
          src="/static/kahe-202510/challenge/pingtuan-tag.png"
          mode="aspectFit"
        />
        <image
          class="w-126 h-126 rounded-16"
          :src="item.logo"
          mode="aspectFill"
        />
      </view>

      <!-- 信息区域 -->
      <view class="flex-1 ml-16 flex flex-col justify-center min-w-0">
        <!-- 标题 -->
        <view
          class="text-24 text-[#333] font-bold text-ellipsis leading-34"
        >
          {{ item.title }}
        </view>

        <!-- 价格和库存 -->
        <view class="flex items-center justify-between mt-8">
          <view class="text-32 text-[#000000] font-price font-bold">
            ¥{{ item.price }}
          </view>
          <view class="text-20 text-[#999]">
            余{{ item.num }}/共{{ item.total }}
          </view>
        </view>

        <!-- 进度条 -->
        <view class="w-full h-10 mt-6 bg-[#e5e5e5] rounded-5 overflow-hidden">
          <view
            v-if="item.total > 0"
            class="h-full bg-primary rounded-5"
            :style="progressStyles"
          ></view>
        </view>

        <!-- 倒计时区域 -->
        <view class="flex items-center justify-between mt-8">
          <view class="flex items-center">
            <view class="w-32 h-28 bg-[#FFD3A2] rounded-6 flex-center">
              <text class="text-18 text-[#845334] font-bold">{{ day }}</text>
            </view>
            <text class="text-18 text-[#666] mx-4">天</text>
            <view class="w-32 h-28 bg-[#FFD3A2] rounded-6 flex-center">
              <text class="text-18 text-[#845334] font-bold">{{
                hour
              }}</text>
            </view>
            <text class="text-18 text-[#666] mx-4">时</text>
            <view class="w-32 h-28 bg-[#FFD3A2] rounded-6 flex-center">
              <text class="text-18 text-[#845334] font-bold">{{
                minute
              }}</text>
            </view>
            <text class="text-18 text-[#666] mx-4">分</text>
            <view class="w-32 h-28 bg-[#FFD3A2] rounded-6 flex-center">
              <text class="text-18 text-[#845334] font-bold">{{
                second
              }}</text>
            </view>
            <text class="text-18 text-[#845334] mx-4">秒</text>
          </view>

          <!-- 商家信息 -->
          <view class="flex items-center">
            <image
              class="w-32 h-32 rounded-full"
              :src="item.merchant?.icon ?? ''"
              mode="aspectFill"
            />
          </view>
        </view>
      </view>
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

/** 用对象样式避免内联 url(&quot;...) 编译到 WXML 时引号/斜杠被误解析（miniprogram-ci 报 unexpected `/`） */
const cardBgStyle = {
  backgroundImage:
    "url(/static/kahe-202510/challenge/recomand-bg.png)",
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
