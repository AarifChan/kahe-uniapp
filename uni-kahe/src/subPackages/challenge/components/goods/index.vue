<template>
  <view
    class="relative w-full aspect-[506/692] overflow-hidden mb-20 bg-white rounded-10"
    style="
      background-image: url(&quot;https://jms.85gui7.com/kahe-202510/ka-he/home/item-bg.png&quot;);
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <view class="w-full aspect-[1/1] overflow-hidden flex-center p-8">
      <view class="relative w-full h-full flex-center">
        <image class="h-full" :src="item.logo" mode="heightFix" />
      </view>

      <view class="absolute left-10 bottom-12 z-2 flex flex-col">
        <image
          v-for="(label, index) in item.labels"
          :key="'labels:' + index"
          :src="formatLabelImage(label)"
          class="mt-8 w-149 h-49"
        />
      </view>
    </view>

    <view class="absolute bottom-8 left-0 w-full">
      <view class="relative w-full h-full">
        <view class="px-12 w-[calc(100%-24rpx)]">
          <view
            class="mt-10 ml-10 font-normal text-24 text-black leading-30 h-60 text-flow-ellipsis-multiple"
            >{{ item.name }}</view
          >
          <view
            class="px-10 box-border flex items-center justify-between translate-y-[-16rpx]"
          >
            <view class="relative w-137 h-46">
              <image
                class="w-full h-full"
                src="https://jms.85gui7.com/kahe-202510/ka-he/integral/price-bg.png"
              />
              <text
                class="absolute left-54 top-4 leading-42 text-black text-28 price-font"
                >{{ isFromMall ? "" : "" }}{{ item.price
                }}{{ isFromMall ? "/点券" : "" }}</text
              >
            </view>
          </view>
        </view>
        <view class="absolute right-19 bottom-17 flex items-center">
          <image class="w-36 h-36 rounded-full" :src="item.merchant?.icon" />
          <view
            class="max-w-[120rpx] ml-5 font-normal text-18 text-[#504F4F] text-flow-ellipsis-single"
            >{{ item.merchant?.name }}</view
          >
        </view>
      </view>
    </view>

    <image
      class="absolute left-[-4rpx] top-[-2rpx] w-180 h-54"
      v-if="showTag"
      :src="item.mainTagImage"
    />
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { UIProductModel } from "@/model";
defineProps({
  item: {
    default: {} as UIProductModel,
    type: Object as PropType<UIProductModel>,
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
  return "https://jms.85gui7.com/kahe-202510/tags/mode" + index + ".png";
};
</script>
