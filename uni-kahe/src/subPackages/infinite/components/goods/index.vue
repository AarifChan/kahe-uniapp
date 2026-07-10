<template>
  <view class="homeGoods w-full aspect-ratio-[506/692] relative overflow-hidden mb-20 bg-white rounded-10">
    <image
      class="homeGoods-bg w-full h-full"
      src="/static/kahe-202510/ka-he/home/item-bg.png"
    />
    <!--        <view class="homeGoods-empty" v-if="item.isSellout">-->
    <!--            <image-->
    <!--                style="width:137rpx;height: 63rpx"-->
    <!--                src="/static/jos/1214/sell-out.png"-->
    <!--            />-->
    <!--        </view>-->

    <view class="homeGoods-cover absolute top-0 left-0 w-full aspect-ratio-[1/1] overflow-hidden flex flex-row items-center justify-center">
      <view class="homeGoods-cover-top relative w-full h-full flex flex-row items-center justify-center">
        <image
          class="homeGoods-cover-top-img h-full"
          :src="item.image"
          mode="heightFix"
        />
      </view>

      <view class="homeGoods-cover-pattern absolute left-10 bottom-12 z-2 flex flex-col">
        <image
          v-for="(label, index) in item.labels"
          :key="'labels:' + index"
          :src="formatLabelImage(label)"
          class="homeGoods-cover-pattern-img mt-8 w-149 h-49"
        />
      </view>
    </view>
    <view class="homeGoods-info absolute bottom-0 left-0 w-full">
      <view class="homeGoods-info-content relative w-full h-full">
        <view class="homeGoods-info-content-bottom px-12 w-[calc(100%-24rpx)]">
          <view
            class="homeGoods-info-content-bottom-title text-ellipsis-2 mt-10 ml-10 text-24 font-normal text-black leading-30 h-60 mb-0"
            >{{ item.name }}</view
          >
          <view class="homeGoods-info-content-bottom-row1 px-10 box-border flex flex-row items-center justify-between" :style="{ transform: 'translateY(-16rpx)' }">
            <view class="homeGoods-info-content-bottom-row1-price relative w-137 h-46">
              <image
                class="homeGoods-info-content-bottom-row1-price-img w-full h-full"
                src="/static/kahe-202510/ka-he/integral/price-bg.png"
              />
              <text
                class="homeGoods-info-content-bottom-row1-price-title price-font absolute left-54 top-4 leading-42 text-black text-28"
                >{{ isFromMall ? "" : "" }}{{ item.price
                }}{{ isFromMall ? "/点券" : "" }}</text
              >
            </view>
          </view>
        </view>
        <view class="homeGoods-info-content-merchant absolute right-19 bottom-17 flex flex-row items-center">
          <image
            class="homeGoods-info-content-merchant-logo w-36 h-36 rounded-full"
            :src="item.merchant?.icon"
          />
          <view
            class="homeGoods-info-content-merchant-name max-w-120 ml-5 font-normal text-18 text-[#504f4f] text-ellipsis"
            >{{ item.merchant?.name }}</view
          >
        </view>
      </view>
    </view>
    <image class="homeGoods-tags absolute -left-4 -top-2 w-180 h-54" v-if="showTag" :src="item.mainTagImage" />
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
});

const formatLabelImage = (index: number) => {
  return "/static/kahe-202510/tags/mode" + index + ".png";
};
</script>

<style lang="scss" scoped>
</style>
