<template>
  <view
    class="fixed flex w-full flex-row"
    style="bottom: env(safe-area-inset-bottom)"
  >
    <view class="bottoms relative w-full h-244 flex flex-col items-center">
      <image
        src="/static/kahe-202510/ka-he/machine/btn-bg.png"
        class="absolute w-full h-full inset-0"
        style="z-index: -1"
      />
      <view class="content my-25 flex flex-col items-center">
        <view class="content-Progressbar mt-8 w-406 h-18">
          <view
            class="content-Progressbar-bg relative w-406 h-18 rounded-9"
            style="background: rgba(0, 0, 0, 0.3)"
          >
            <view
              class="content-Progressbar-bg-style absolute top-0 left-0 h-18 max-w-full rounded-9"
              :style="luckProgress"
              style="background-color: #cd5700"
            />
          </view>
        </view>
        <text class="content-title theme-font text-24 text-[#CD5700] mr-24"
          >单人{{ (productDetail.another / 5).toFixed(0) }}包,必出高罕卡</text
        >
      </view>
      <view
        class="btnList w-full grid box-border"
        style="
          padding: 0 45rpx;
          gap: 28rpx;
          grid-template-columns: repeat(4, 1fr);
        "
      >
        <view
          class="btnList-bolist relative w-full h-67"
          v-for="(item, index) in list"
          :key="index"
          @tap.stop="$emit('tapCards', item)"
        >
          <image
            src="/static/kahe-202510/ka-he/machine/card-btn.png"
            class="img absolute left-0 top-0 w-full h-full"
          />
          <view
            class="num theme-font relative w-full text-center mt-4 text-26 font-normal text-[#DA571D]"
            >{{ item.num / 5 }}包</view
          >
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { UIProductDetailModel, UIProductPriceCard } from "@/model";
import { computed, type PropType } from "vue";
const props = defineProps({
  list: {
    default: () => [],
    type: Array as PropType<UIProductPriceCard[]>,
  },
  productDetail: {
    default: () => {},
    type: Object as PropType<UIProductDetailModel>,
  },
});
const luckProgress = computed(() => {
  if (!props.productDetail?.luckyMax) {
    return "";
  }
  const luckProgress =
    (props.productDetail?.luckyVal / props.productDetail?.luckyMax) * 100;
  return `width:${luckProgress}%`;
});
</script>
<style lang="scss" scoped></style>
