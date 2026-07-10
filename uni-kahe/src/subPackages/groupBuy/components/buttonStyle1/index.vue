<template>
    <view class="groupBuyBtn relative w-[296rpx] h-[131rpx]">
        <image class="groupBuyBtn-bg w-full h-full" src="/static/kahe-202510/groupBuy/btn2.png" />
        <view class="groupBuyBtn-title absolute left-[68rpx] top-[38rpx] text-center font-normal text-40 text-[#FFFFFF] theme-font">{{title}}</view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped></style>
