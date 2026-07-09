<template>
  <view
    class="relative w-710 h-258 my-30 mx-30 flex items-center box-border"
    v-for="(item, index) in list"
    :key="index"
    @tap.stop="emits('tapCardListItem', item)"
  >
    <image class="w-full h-full absolute left-0 top-0 z-0" src="/static/kahe-202510/ka-he/machine/item-bg.png" />
    <view class="relative w-92 ml-50">
      <image class="w-full h-full" :src="item.logo" mode="widthFix" />
    </view>
    <view class="relative w-518 ml-28"
    >
      <view class="relative text-30 text-black theme-font">{{ item.title }}</view>
      <view class="flex items-center"
      >
        <view class="relative mr-20 text-28 text-black price-font">￥{{ item.price }}</view>
        <view class="text-center w-143 leading-30 h-30 bg-[#f1855f] rounded-6 text-16 text-white"
          >含<text>{{ item.goods?.length ?? 0 }}</text>种卡牌</view
        >
      </view>
      <view class="flex"
      >
        <scroll-view
          :scroll-x="true"
          :enable-flex="true"
          scroll-with-animation
          class="whitespace-nowrap w-full mt-10"
        >
          <view
            class="inline-block relative w-60 mr-12"
            style="height: calc(60rpx / 300 * 420);"
            v-for="(goods, index) in item.goods"
            :key="index"
          >
            <image
              class="w-full h-full"
              :src="goods.image"
            />
          </view>
        </scroll-view>
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
