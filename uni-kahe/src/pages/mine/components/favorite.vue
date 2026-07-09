<template>
  <view class="w-full flex flex-row items-center justify-center">
    <view class="relative w-391 h-160 mr-[-20rpx]">
      <image class="w-full h-full" src="/static/kaju/mine/mine-group-bg.png" />
      <view
        class="absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center gap-80"
      >
        <view class="flex flex-col" @tap.stop="$emit('didClickFavorite')">
          <image class="w-60 h-60" src="/static/kaju/mine/icon-favorite.png" />
          <view class="text-24">收藏</view>
        </view>
        <view class="flex flex-col" @tap.stop="$emit('didClickCoupon')">
          <image class="w-60 h-60" src="/static/kaju/mine/icon-coupon2.png" />
          <view class="text-24">卡券</view>
        </view>
      </view>
    </view>
    <image
      class="w-338 h-217"
      src="/static/kaju/mine/ingroup-item.png"
      @tap.stop="showInGroupImage"
    />
  </view>
</template>
<script setup lang="ts">
import { showInGroupImage } from "@/utils/tools";

defineProps({
  unReadNum: {
    default: 0,
    type: Number,
  },
});
defineEmits(["didClickFavorite", "didClickCoupon", "didClickContact"]);
</script>
