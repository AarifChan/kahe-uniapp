<template>
  <view
    class="collect-goods relative w-full aspect-ratio-[216/302] overflow-hidden rounded-20 shadow-[0rpx_3rpx_3rpx_0rpx_#587a95]"
    @tap.stop="emits('didSelect', item)"
  >
    <view
      class="collect-goods-top relative w-full aspect-ratio-[1/1] box-border bg-white flex flex-row items-center justify-center"
    >
      <image
        class="collect-goods-top-logo w-180 h-180"
        :src="item.goods.image"
        mode="heightFix"
      />
      <view
        class="collect-goods-top-num absolute bottom-20 right-16 py-6 px-12 bg-[rgba(40,177,255,0.7)] rounded-4 font-normal text-24 text-white z-3"
        >X{{ item.num }}</view
      >
    </view>
    <view
      class="collect-goods-bottom absolute bottom-24 left-16 w-[calc(100%-32rpx)] flex flex-col z-3"
    >
      <view
        class="collect-goods-bottom-title font-normal text-20 text-white leading-20 h-40 text-ellipsis-2 text-shadow-[-1px_-1px_0_#1aa1ff,1px_-1px_0_#1aa1ff,-1px_1px_0_#1aa1ff,1px_1px_0_#1aa1ff]"
        >{{ item.goods.name }}</view
      >
      <view
        class="collect-goods-bottom-subTitle font-normal text-20 text-white leading-20 mt-8 text-shadow-[-1px_-1px_0_#1aa1ff,1px_-1px_0_#1aa1ff,-1px_1px_0_#1aa1ff,1px_1px_0_#1aa1ff]"
        >助力值:{{ Number(item.goods.price * item.num).toFixed(2) }}</view
      >
    </view>

    <image
      class="collect-goods-bg absolute left-0 top-0 w-full h-full z-2"
      src="/static/kahe-202510/collect/card-bg.png"
    />
    <view
      class="collect-goods-select z-3 absolute right-24 top-16 w-34 h-34 rounded-16 border-2 border-[#68d6ff] flex flex-row items-center justify-center"
    >
      <view
        v-if="item.selected"
        class="collect-goods-select-target p-4 w-26 h-26 rounded-13 bg-[#68d6ff]"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { UserGoodsSelectModel } from "@/subPackages/collect/detail/index";

defineProps({
  item: {
    default: {} as UserGoodsSelectModel,
    type: Object as PropType<UserGoodsSelectModel>,
  },
});
const emits = defineEmits(["didSelect"]);
</script>

<style lang="scss" scoped>
</style>
