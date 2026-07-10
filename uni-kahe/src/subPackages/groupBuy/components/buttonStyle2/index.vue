<template>
    <view class="groupBuyBtn2 relative w-[453rpx] h-[131rpx]">
        <image class="groupBuyBtn2-bg w-full h-full" src="/static/kahe-202510/groupBuy/btn3.png" />
        <view class="groupBuyBtn2-title absolute left-0 top-[42rpx] w-full text-center font-normal text-40 text-[#FFFFFF] theme-font">{{title}}</view>
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
