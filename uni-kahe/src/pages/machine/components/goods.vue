<template>
  <view class="grid grid-cols-3 gap-y-20 justify-items-center m-32">
    <view
      v-for="(item, index) in list"
      :key="index + 'goods-row'"
      @tap.stop="emits('tapCardListItem', item)"
    >
      <view class="relative w-233 h-318">
        <image class="w-full h-full" :src="item.logo" />
        <image
          class="absolute left-0 top-0 w-full h-full"
          src="/static/kaju/common/goods-item-bg.png"
        />
      </view>
      <view
        class="text-center w-full leading-38 h-40 bg-[#000000] rounded-20 text-24 text-white"
        >含<text>{{ item.goods?.length ?? 0 }}</text
        >种卡牌</view
      >
      <view class="flex flex-row justify-between mt-8">
        <view class="text-24 text-black alibaba-font">{{ item.title }}</view>
        <view class="flex flex-row mt-16">
          <view class="text-18 text-[#FE452C] alibaba-font">￥</view>
          <view class="text-24 text-[#FE452C] alibaba-font">{{
            item.price
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { type ProductBoxModel } from "@/model";
defineProps({
  list: {
    type: Array as () => ProductBoxModel[],
    default: () => [],
  },
});
const emits = defineEmits(["tapCardListItem"]);
</script>
<style lang="scss" scoped></style>
