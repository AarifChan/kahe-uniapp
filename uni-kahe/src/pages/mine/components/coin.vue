<script setup lang="ts">
import { isAuditVersion } from "@/config";

defineProps({
  momey: {
    default: 0,
    type: Number,
  },
  coin: {
    default: 0,
    type: Number,
  },

  integral: {
    default: 0,
    type: Number,
  },
});
const emits = defineEmits(["didClickItem"]);
</script>

<template>
  <view class="relative flex flex-row items-center justify-center">
    <image class="w-692 h-184 mt-50rpx" src="/static/kaju/mine/coin-bg.png" />
    <view
      class="absolute left-0 top-0 w-full flex flex-row items-center justify-center gap-200"
    >
      <view
        class="flex flex-col items-center"
        @tap.stop="emits('didClickItem', 'money')"
      >
        <image class="w-106 h-106" src="/static/kaju/mine/icon-coupon.png" />
        <view class="text-40 text-[#3b1900] font-other">{{ momey }}</view>
        <view class="text-22 text-[#3b1900]">无门槛抵扣券</view>
      </view>
      <view
        v-if="!isAuditVersion"
        class="flex flex-col items-center"
        @tap.stop="emits('didClickItem', 'integral')"
      >
        <image class="w-106 h-106" src="/static/kaju/mine/icon-star.png" />
        <view class="text-40 text-[#3b1900] font-other">{{ integral }}</view>
        <view class="text-22 text-[#3b1900]">积分</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
