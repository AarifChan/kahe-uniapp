<template>
  <view
    class="merchantCard relative w-730 h-201 mx-auto my-32 box-border p-32 flex flex-row items-center justify-between bg-[url('/static/kahe-202510/groupBuy/merchat-bg.png')]"
    :style="{
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <view class="left relative w-full flex flex-row items-center">
      <view class="avatar w-131 h-131 bg-[#ffffff] shadow-[0rpx_3rpx_7rpx_0rpx_#d4d4d4] rounded-full p-8">
        <image class="avatar-img w-full h-full rounded-full" :src="merchant?.icon" />
      </view>
      <view class="info relative ml-24 flex flex-col" :style="{ width: 'calc(100% - 160rpx)' }">
        <view class="info-name text-flow-ellipsis-single font-normal text-30 text-white">{{
          merchant?.name
        }}</view>
        <view
          class="info-bar relative mt-32 ml-12 w-115 h-27 bg-[#ff7276] rounded-14"
          :style="{
            backgroundColor: getTagBgColor(merchant?.tag),
          }"
        >
          <image class="info-bar-tag absolute -left-22 -top-4 w-44 h-35" :src="getTagIcon(merchant.tag)" />
          <text class="info-bar-title absolute left-26 top-0 font-normal text-20 text-white leading-27">{{ getLevelName(merchant.tag) }}</text>
        </view>
      </view>
    </view>
    <view class="right-btn theme-font absolute right-32 top-90 w-142 h-56 rounded-28 text-center leading-56 font-normal text-30 text-[#794627] bg-gradient-[linear-gradient(90deg,#ffd3a2_0%,#fdf2d8_100%)]" @tap.stop="didClickMerchant(merchant)">进店看看</view>
  </view>
</template>

<script setup lang="ts">
import { UIMerchant } from "@/model";
import { PropType } from "vue";
import {
  getLevelName,
  getTagBgColor,
  getTagIcon,
  useMerchant,
} from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
defineProps({
  merchant: {
    default: {} as UIMerchant,
    type: Object as PropType<UIMerchant>,
  },
});
</script>

<style lang="scss" scoped></style>
