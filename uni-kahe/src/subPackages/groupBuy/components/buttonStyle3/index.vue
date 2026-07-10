<template>
    <view class="groupBuyBtnStyle3 flex flex-col items-center justify-center">
        <image class="groupBuyBtnStyle3-img w-[72rpx] h-[72rpx]" src="/static/kahe-202510/groupBuy/btn4.png" />
        <view class="groupBuyBtnStyle3-title z-[2] -mt-[20rpx] font-normal text-20 text-[#FFFFFF]">{{title}}</view>
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
