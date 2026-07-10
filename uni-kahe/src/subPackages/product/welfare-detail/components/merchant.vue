<template>
  <view class="merchant w-full mt-32 px-32 py-32 box-border flex flex-row items-center justify-between rounded-20 bg-[#fffbef]"
    style="box-shadow: 4rpx 4rpx 5rpx 0rpx rgba(0, 0, 0, 0.13);"
  >
    <view class="merchant-left flex flex-row items-center">
      <image class="merchant-avatar relative w-109 h-109 bg-white rounded-full"
        style="box-shadow: 0rpx 3rpx 7rpx 0rpx #ddc79c;"
        :src="merchant.icon"
      />
      <view class="merchant-info relative ml-28 flex flex-col">
        <view
          class="merchant-info-title theme-font text-ellipsis text-36 font-normal text-black"
          >{{ merchant?.name }}</view
        >
        <view
          class="merchant-info-bar relative mt-24 ml-12 mb-12 w-115 h-27 rounded-14 flex items-center"
          :style="{
            backgroundColor: getTagBgColor(merchant?.tag),
          }"
        >
          <image
            class="merchant-info-bar-tag absolute w-44 h-35"
            style="left: -22rpx; top: calc((27rpx - 35rpx) / 2);"
            :src="getTagIcon(merchant.tag)"
          />
          <text class="merchant-info-bar-title absolute left-26 top-0 text-20 font-normal text-white"
            style="line-height: 27rpx;"
          >{{
            getLevelName(merchant.tag)
          }}</text>
        </view>
      </view>
    </view>
    <view class="merchant-btn theme-font w-146 h-56 bg-[#53d6ac] rounded-8 text-center text-30 font-normal text-white"
      style="box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f; line-height: 56rpx;"
      @tap.stop="didClickMerchant(merchant)"
      >进店看看</view
    >
  </view>
</template>

<script lang="ts" setup>
import {
  getLevelName,
  getTagBgColor,
  getTagIcon,
} from "@/pages/merchant/index";
import { MerchantModel } from "@/model";
import { PropType } from "vue";
import { useMerchant } from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
defineProps({
  merchant: {
    default: {} as MerchantModel,
    type: Object as PropType<MerchantModel>,
  },
});
</script>

<style lang="scss" scoped>
</style>
