<template>
  <view class="activityItem relative w-full aspect-ratio-[224/333]">
    <image class="activityItem-bg w-full h-full" src="/static/kahe-202510/ka-he/welfare/item-bg.png" />

    <view class="activityItem-top absolute top-0 left-16 w-186 h-34">
      <image
        class="activityItem-top-bg w-full h-full"
        src="/static/kahe-202510/ka-he/welfare/title-bg.png"
      />
      <view class="activityItem-top-title absolute left-0 top-8 w-full text-center text-18 text-[#501111]">{{ item.title }}</view>
    </view>
    <view class="activityItem-info absolute left-0 top-40 w-full flex flex-col items-center">
      <image class="activityItem-info-img w-80 h-80 bg-white rounded-8 border-1 border-white" :src="item.merchant?.icon" />
      <view class="activityItem-info-title mt-12 text-center font-normal text-20 w-4/5 text-[#454545] text-ellipsis">{{
        item.merchant?.name
      }}</view>
    </view>
    <scroll-view
      class="activityItem-list absolute bottom-86 left-8 w-[calc(100%-16rpx)] h-80 whitespace-nowrap"
      :enable-flex="true"
      :scroll-x="true"
      scroll-with-animation
    >
      <image
        class="activityItem-list-item inline-block w-60 h-60 bg-white rounded-8 mr-16"
        v-for="(zItem, index) in item.goods"
        :key="zItem.goodsDto.id"
        :src="zItem.goodsDto.image"
        mode="heightFix"
      />
    </scroll-view>

    <view class="activityItem-btn absolute bottom-32 left-[calc(50%-65rpx)] w-124 h-42" @tap.stop="emits('didClickItem', item)">
      <image
        class="activityItem-btn-img w-full h-full"
        src="/static/kahe-202510/ka-he/welfare/btn-bg.png"
      />
      <view
        class="activityItem-btn-title theme-font absolute left-0 top-0 w-full text-center leading-38 font-normal text-22 text-[#fefefe]"
        :style="{ textShadow: '-1px -1px 0 #428d28, 1px -1px 0 #428d28, -1px 1px 0 #428d28, 1px 1px 0 #428d28' }"
      >立即进入</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { UIWelfareList } from "@/model";

defineProps({
  item: {
    default: {},
    type: Object as PropType<UIWelfareList>,
  },
});
const emits = defineEmits(["didClickItem"]);
</script>

<style lang="scss" scoped>
</style>
