<template>
    <view class="mine-data relative flex items-center justify-center w-300 h-120">
        <image class="mine-data-moneyBg absolute left-0 top-0 w-full h-full" src="/static/kahe-202510/images/money-bg.png">
        </image>
        <image
            class="mine-data-icon absolute"
            :style="{ width: width, height: height, left: left, top: top }"
            :src="icon"
        />
        <view class="mine-data-info relative flex flex-col items-center ml-20">
            <text class="mine-data-info-title theme-font text-28 font-normal text-black">{{ title }}</text>
            <text class="mine-data-info-subTitle theme-font text-26 font-normal text-black" style="transform: translateY(10rpx)">{{ value }}</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    value: {
        type: Number,
        default: 0
    },
    icon: {
        default: '',
        type: String
    },
    width: {
        default: '',
        type: String
    },
    height: {
        default: '',
        type: String
    },
    left: {
        default: '',
        type: String
    },
    top: {
        default: '',
        type: String
    }
})
</script>

<style lang="scss" scoped></style>
