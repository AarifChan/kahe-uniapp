<template>
  <view class="box-item relative py-16 box-border min-h-228 w-full bg-white shadow-[0rpx_1rpx_1rpx_0rpx_rgba(212,222,233,0.5),0rpx_0rpx_5rpx_0rpx_#d4dee9] rounded-4 flex flex-row items-center justify-between mb-32" @tap.stop="emits('didTapDetail', item)">
    <view class="box-item-left relative ml-36 flex flex-row items-start">
      <image class="box-item-left-img w-178 h-165 rounded-8" :src="item.logo" mode="widthFix" />
      <view class="box-item-left-info relative ml-48 mt-16 h-full flex flex-col justify-start">
        <text class="box-item-left-info-title font-normal text-38 text-black w-280 text-ellipsis-2 theme-font">{{ item.title }}</text>
        <view class="box-item-left-info-other flex flex-col">
          <text class="box-item-left-info-other-title text-24 font-normal text-[#727272]">当前有{{ item.num }}件商品待处理</text>
        </view>
      </view>
    </view>
    <view class="box-item-right absolute right-50 bottom-24">
      <select-item
        :is-select="item.selected"
        color="other"
        @tap.stop="emits('didTapSelect', item)"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UIMineBoxModel } from "@/model";
import SelectItem from "../select/index.vue";
import { type PropType } from "vue";

defineProps({
  item: {
    default: {} as UIMineBoxModel,
    type: Object as PropType<UIMineBoxModel>,
  },
});
const emits = defineEmits(["didTapDetail", "didTapSelect"]);
</script>

<style lang="scss" scoped>
</style>
