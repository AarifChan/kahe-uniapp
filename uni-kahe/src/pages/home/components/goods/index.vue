<template>
  <view class="w-full relative overflow-hidden mb-20 flex flex-col">
    <view
      class="relative w-full aspect-ratio-[1/1] overflow-hidden flex flex-row items-center justify-center"
    >
      <image
        class="w-full h-full aspect-ratio-[1/1]"
        src="/static/kaju/common/good-bg.png"
      />
      <view
        class="absolute left-4 top-4 flex flex-row items-center justify-center"
        style="width: calc(100% - 8rpx); height: calc(100% - 8rpx)"
      >
        <image class="h-full" :src="item.image" mode="heightFix" />
      </view>

      <view
        class="homeGoods-cover-pattern absolute right-8 top-8 z-2 flex flex-row items-center"
      >
        <image
          v-for="(label, index) in item.labels"
          :key="'labels:' + index"
          :src="formatLabelImage(label)"
          class="homeGoods-cover-pattern-img mr-8 w-65 h-34 rounded-4"
        />
      </view>
    </view>
    <view class="mt-8 relative w-full flex flex-col justify-between">
      <view class="relative w-full h-full">
        <view class="px-12 box-border w-full">
          <view
            class="font-normal text-24 text-black leading-30 text-ellipsis"
            >{{ item.name }}</view
          >
          <view class="box-border flex flex-row items-center justify-between">
            <view class="relative">
              <text class="price-font text-[#fe452c] text-24 leading-42"
                >{{ isFromMall ? "" : "" }}{{ item.price
                }}{{ isFromMall ? "/点券" : "" }}</text
              >
            </view>
            <view class="flex flex-row items-center" v-if="!hideMerchant">
              <image
                class="w-36 h-36 rounded-full"
                :src="item.merchant?.icon"
              />
              <view
                class="max-w-120 ml-5 font-normal text-18 text-black text-ellipsis"
                >{{ item.merchant?.name }}</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="showTag" />
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { UIMallListItemModel, UIProductModel } from "@/model";
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
  hideMerchant: {
    default: false,
    type: Boolean,
  },
});

const formatLabelImage = (index: number) => {
  return "/static/kahe-202510/ka-he/tag/tag" + index + ".png";
};

const formatLabelName = (index: number) => {
  switch (index) {
    case 1:
      return "满开";
    case 2:
      return "隐藏";
    case 3:
      return "宝箱";
    case 4:
      return "魔王";
    case 5:
      return "排队";
    case 6:
      return "联盟";
  }
};
</script>

<style lang="scss" scoped></style>
