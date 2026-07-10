<template>
  <view class="merchantInfoGoods w-full relative overflow-hidden mb-20 bg-white rounded-30 shadow-[0rpx_2rpx_7rpx_0rpx_rgba(12,19,52,0.6)]">
    <view class="merchantInfoGoods-empty absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-3 flex flex-row items-center justify-center" v-if="item.productNum === 0">
      <image
        style="width: 137rpx; height: 63rpx"
        src="/static/jos/1214/sell-out.png"
      />
    </view>
    <view class="merchantInfoGoods-cover pt-12 px-12 relative w-full aspect-ratio-[1/1] h-auto box-border overflow-hidden flex flex-row items-center justify-center">
      <image
        class="merchantInfoGoods-cover-img h-full rounded-16"
        :src="item.image"
        mode="heightFix"
      />
      <view class="merchantInfoGoods-cover-pattern absolute left-10 bottom-12 z-2 flex flex-col">
        <image
          v-for="(label, index) in item.labels"
          :key="'labels:' + index"
          :src="formatLabelImage(label)"
          class="merchantInfoGoods-cover-pattern-img mt-8 w-149 h-49"
        />
      </view>
    </view>
    <view class="merchantInfoGoods-info">
      <view class="merchantInfoGoods-info-content relative w-full h-full">
        <view class="merchantInfoGoods-info-content-bottom px-12 w-[calc(100%-24rpx)]">
          <view
            class="merchantInfoGoods-info-content-bottom-title text-ellipsis-2 mt-10 ml-10 text-24 font-normal text-black leading-30 h-60 mb-0"
            >{{ item.name }}</view
          >
          <view class="merchantInfoGoods-info-content-bottom-row1 px-10 box-border flex flex-row items-center justify-between" :style="{ transform: 'translateY(-16rpx)' }">
            <text
              class="merchantInfoGoods-info-content-bottom-row1-title price-font text-black text-40"
              >{{ isFromMall ? "" : "" }}{{ item.price
              }}{{ isFromMall ? "点券" : "" }}</text
            >
          </view>
        </view>
      </view>
    </view>
    <image
      class="merchantInfoGoods-tags absolute -left-4 -top-2 w-180 h-54"
      v-if="showTag"
      :src="item.mainTagImage"
    />
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { UIMallListItemModel, UIProductModel } from "@/model";
defineProps({
  item: {
    default: {} as UIProductModel | UIMallListItemModel,
    type: Object as PropType<UIProductModel | UIMallListItemModel>,
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
  return "/static/kahe-202510/tags/mode" + index + ".png";
};
</script>

<style lang="scss" scoped>
</style>
