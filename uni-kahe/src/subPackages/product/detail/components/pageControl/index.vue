<template>
  <view
    class="pageControl relative mt-10 flex flex-row items-center justify-center"
    :style="{ width: 'calc(100% - 20rpx)', height: '63rpx' }"
  >
    <view
      class="pageControl-side relative w-123 h-60"
      @tap.stop="emits('didClickChangeBox', true)"
    >
      <image
        class="pageControl-side-bg w-full h-full"
        src="/static/kahe-202510/ka-he/product/left.png"
      />
    </view>
    <view
      class="pageControl-center relative w-403 h-56 flex flex-row items-center justify-center mx-20 rounded-20 bg-[#5ad7af]"
      :style="{
        boxShadow: '0rpx 4rpx 0rpx 0rpx #43a17f',
        textShadow:
          '-1px -1px 0 #378d6e, 1px -1px 0 #378d6e, -1px 1px 0 #378d6e, 1px 1px 0 #378d6e',
      }"
    >
      <text class="pageControl-center-title text-22 font-normal text-white">第</text>
      <text class="pageControl-center-value text-22 font-normal text-white">{{ product.current }}</text>
      <text class="pageControl-center-title text-22 font-normal text-white"
        >/{{ product.lastSeq }}箱 商品剩余</text
      >
      <text class="pageControl-center-value text-22 font-normal text-white">{{ product.num }}</text>
      <text class="pageControl-center-title text-22 font-normal text-white"
        >/{{ product.total }}</text
      >
    </view>
    <view
      class="pageControl-side relative w-123 h-60"
      @tap.stop="emits('didClickChangeBox', false)"
    >
      <image
        class="pageControl-side-bg w-full h-full"
        src="/static/kahe-202510/ka-he/product/right.png"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { UIProductDetailModel } from "@/model";
import type { PropType } from "vue";

defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  currentBox: {
    default: 1,
    type: Number,
  },
  totalBox: {
    default: 10,
    type: Number,
  },
  leaveNum: {
    default: 1,
    type: Number,
  },
  totalNum: {
    default: 80,
    type: Number,
  },
});

const emits = defineEmits(["didClickChangeBox"]);
</script>

<style lang="scss" scoped>
</style>
