<template>
  <view
    class="relative w-164 h-219 bg-[#FFF8F1] rounded-12 flex flex-col items-center overflow-hidden"
  >
    <view
      class="absolute left-9 top-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-3 flex flex-row justify-center items-center"
      v-if="item.productNum === 0"
    >
      <image
        class="w-120 h-100"
        src="/static/kahe-202510/ka-he/common/Sellingout.png"
      />
    </view>
    <view
      class="relative mt-8 w-151 h-151 overflow-hidden flex flex-row items-center justify-center sticker-2-4-5-2-4"
    >
      <image class="w-full h-full" :src="item.logo" />
      <view class="absolute right-2 bottom-4 z-2 flex flex-col">
        <image
          v-for="(label, index) in item.labels"
          :key="'labels:' + index"
          :src="formatLabelImage(label)"
          class="mt-4"
          style="width: calc(65rpx * 0.4); height: calc(34rpx * 0.4)"
        />
      </view>
    </view>
    <view
      class="relative mt-4 px-12 pb-12 w-full box-border flex flex-col justify-item-start"
    >
      <view class="font-normal text-20 text-black w-full mb-4 text-ellipsis">{{
        item.title
      }}</view>
      <text class="font-bold text-[#FE452C] text-20 price-font">{{
        item.price
      }}</text>
    </view>
    <view
      class="absolute left-8 w-64 text-center top-2 theme-font bg-[#8BB7FF] text-white rounded-b-8 border-3px border-[#FFF8F1] text-16 text-stroke-2-[#3B44B9]"
      >{{ getMainTagName(Number(item.mainTag)) }}</view
    >
    <!--    <image-->
    <!--      class="absolute -left-4 -top-2"-->
    <!--      v-if="showTag"-->
    <!--      :src="getMainTagImagePath(Number(item.mainTag))"-->
    <!--      style="width: calc(180rpx * 0.4); height: calc(54rpx * 0.4)"-->
    <!--    />-->
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { ProductBoxModel } from "@/model";
import { getMainTagImagePath, getMainTagName } from "@/utils/tools/image";
defineProps({
  item: {
    default: {} as ProductBoxModel,
    type: Object as PropType<ProductBoxModel>,
  },
  showTag: {
    default: true,
    type: Boolean,
  },
  isFromMall: {
    default: false,
    type: Boolean,
  },
});

const formatLabelImage = (index: number) => {
  return "/static/kahe-202510/ka-he/tag/tag" + index + ".png";
};
</script>

<style lang="scss" scoped></style>
