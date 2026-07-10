<template>
  <view class="remark relative w-730 h-341 mx-auto mb-16">
    <image class="remark-bg w-full h-full" src="/static/kahe-202510/groupBuy/remark-bg.png" />
    <view class="remark-content absolute left-0 top-0 w-full h-full">
      <view class="remark-content-info absolute top-4 right-10 flex flex-row items-center gap-4">
        <view class="title font-normal text-24 text-[#794627] leading-30">随机卡密</view>
        <image class="icon w-30 h-30" src="/static/kahe-202510/groupBuy/info.png" />
      </view>
      <image class="remark-content-gift absolute top-44 left-35 w-70 h-50" src="/static/kahe-202510/groupBuy/gift.png" />
      <view class="remark-content-title absolute top-52 left-130 text-white text-30">{{ detail.title }}卡密一张</view>
      <view
        class="remark-content-content absolute left-16 top-108 flex flex-row items-center gap-20"
        :style="{
          width: 'calc(100% - 32rpx)',
          height: 'calc(100% - 108rpx - 18rpx)',
        }"
        @tap.stop="emits('didClick')"
      >
        <view class="remark-content-content-title theme-font text-30 text-[#ffffff]">备注</view>
        <view
          class="remark-content-content-detail w-560 text-white word-break-break-all"
          :style="{
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': 4,
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
          }"
        >{{
          stripHTMLTags(detail.remark)
        }}</view>
        <image
          class="remark-content-content-right w-14 h-25"
          src="/static/kahe-202510/groupBuy/right-arrow.png"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { GroupBuyDetail } from "@/model";
import { PropType } from "vue";

defineProps({
  detail: {
    default: {} as GroupBuyDetail,
    type: Object as PropType<GroupBuyDetail>,
  },
});

const emits = defineEmits(["didClick"]);

const stripHTMLTags = (html: string) => {
  return html?.replace(/<[^>]*>/g, "") ?? "";
};
</script>

<style lang="scss" scoped></style>
