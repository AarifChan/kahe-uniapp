<template>
  <view class="inline-block relative" @tap.stop="$emit('click')">
    <view
      class="relative w-200rpx h-200rpx bg-[rgba(253,239,204,0.72)] rounded-10rpx border-5rpx border-solid border-[#fcd570] goodsBox-top"
    >
      <view
        class="absolute left-0 top-0 rounded-12rpx w-full h-full flex flex-row justify-center items-center"
      >
        <image
          class="w-[calc(100%-24rpx)] h-[calc(100%-24rpx)]"
          :src="item?.goodsDto?.image"
          mode="heightFix"
        />
      </view>

      <view
        class="absolute right-4 bottom-4 px-12 py-8 text-[#222] text-20rpx"
        style="
          background-image: url(&quot;https://jms.85gui7.com/kahe-202510/ka-he/common/num_bg.png&quot;);
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        "
        >{{ getTitleByQuality(item.quality) }}</view
      >
      <image
        class="absolute top-0 left-4 w-71 h-50 z-10"
        :src="getLevelImage(index)"
        mode="aspectFit"
      />
    </view>
    <view class="mt-8rpx flex flex-col">
      <view class="w-200rpx text-black text-10px text-flow-ellipsis-single">{{
        item?.goodsDto?.name
      }}</view>
      <view>
        <view class="text-[#909090] text-9px"
          >参考价: {{ item?.goodsDto?.salePrice }}</view
        >

        <view class="text-[#55d8b0] text-9px">
          {{ !item.prob ? `参与商品` : `获得概率${(Number(item.prob) * 100).toFixed(0)}%` }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { ChallengeGoodsItem } from "../../../api";
import type { PropType } from "vue";
import { getLevelImage } from "../../../index";

import { getTitleByQuality } from "@/utils";

defineProps({
  item: {
    default: {} as ChallengeGoodsItem,
    type: Object as PropType<ChallengeGoodsItem>,
  },
  index: {
    default: 0,
    type: Number,
  },
});

defineEmits(["click"]);
</script>

<style scoped>
/* 双层边框效果 - 内层边框通过伪元素实现 */
.goodsBox-top::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10rpx;
  border: 4rpx solid #e2af2f;
  pointer-events: none;
}
</style>
