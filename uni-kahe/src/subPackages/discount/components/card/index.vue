<template>
  <view class="discountCard relative w-full box-border px-30 bg-white shadow-[0rpx_2rpx_2rpx_0rpx_#7198df] rounded-30 flex flex-col">
    <view class="discountCard-top relative border-b-1 border-[#bfbfbf] flex flex-row items-center">
      <image class="discountCard-top-item w-134 h-134" src="/static/kahe-202510/discount/icon1.png" />
      <view class="discountCard-top-info flex flex-col">
        <text class="discountCard-top-info-title theme-font text-34 font-normal text-black">首充礼包</text>
      </view>
      <view class="discountCard-top-btn absolute top-20 right-0 w-169 h-70" @tap.stop="emits('didClickItem')">
        <image class="discountCard-top-btn-bg w-full h-full" src="/static/kahe-202510/merchant/btn.png" />
        <text
          class="discountCard-top-btn-text theme-font absolute left-0 top-0 leading-70 text-center w-full font-normal text-30 text-white"
          :style="{ textShadow: '-1px -1px 0 #0f2268, 1px -1px 0 #0f2268, -1px 1px 0 #0f2268, 1px 1px 0 #0f2268' }"
          >领 取</text
        >
      </view>
    </view>
    <view class="discountCard-bottom relative flex flex-row justify-evenly py-24 px-16 w-full box-border">
      <view class="discountCard-bottom-item flex flex-row">
        <image
          class="discountCard-bottom-item-img w-64 h-64"
          src="/static/kahe-202510/discount/item1.png"
        />
        <view class="discountCard-bottom-item-info ml-12 flex flex-col">
          <view class="discountCard-bottom-item-info-title font-normal text-24 text-black">购买必得</view>
          <view class="discountCard-bottom-item-info-subTitle font-normal text-18 text-[#6e6e6e]">1288XX点券</view>
        </view>
      </view>
      <view class="discountCard-bottom-item flex flex-row">
        <image
          class="discountCard-bottom-item-img w-64 h-64"
          src="/static/kahe-202510/discount/item2.png"
        />
        <view class="discountCard-bottom-item-info ml-12 flex flex-col">
          <view class="discountCard-bottom-item-info-title font-normal text-24 text-black">购买必得</view>
          <view class="discountCard-bottom-item-info-subTitle font-normal text-18 text-[#6e6e6e]">1288XX点券</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const emits = defineEmits(["didClickItem"]);
</script>

<style lang="scss" scoped>
</style>
