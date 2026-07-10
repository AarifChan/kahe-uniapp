<template>
  <view class="scroll-list relative w-full">
    <view class="scroll-list-top relative mx-auto my-16 w-660 h-54">
      <image
        class="scroll-list-top-bg w-full h-full"
        :src="getSpecLevelBgTitleByLevel(item.level)"
      />
      <image
        class="scroll-list-top-level absolute left-0 -top-20 w-100 h-80"
        :src="getLevelImageByLevel(item.level)"
      />
      <image
        class="scroll-list-top-name absolute left-100 top-8 w-91 h-37"
        :src="getLevelImageNameByLevel(item.level)"
      />
      <text class="scroll-list-top-prob absolute left-220 top-20 text-15 font-normal text-black"
        >概率 {{ item.prob }}%(此概率为当前款式概率)</text
      >
    </view>
    <view class="scroll-list-content relative box-border w-full py-20 px-30 grid gap-30" :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 60rpx) / 3), 1fr))' }">
      <goods-item
        class="general-content-list-item inline-block w-full"
        v-for="(goods, index) in item.items"
        @tap.stop="emits('clickDetail', goods)"
        :is-infinite="true"
        :key="index"
        :goods-price="product.payType === 8 ? goods.price : product.price"
        :item="goods"
      />
    </view>
  </view>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import type { UIProductDetailLevelGroup, UIProductDetailModel } from "@/model";
import { useEnum } from "@/composables/enum";
import GoodsItem from "./../generalGoods/index.vue";
const {
  getSpecLevelBgTitleByLevel,
  getLevelImageByLevel,
  getLevelImageNameByLevel,
} = useEnum();
const emits = defineEmits(["clickDetail"]);
defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  item: {
    type: Object as PropType<UIProductDetailLevelGroup>,
    default: {} as UIProductDetailLevelGroup,
  },
});
</script>
<style lang="scss" scoped>
</style>
