<template>
    <view class="relative rounded-4 h-82 w-full flex flex-row items-center justify-center overflow-hidden">
        <image class="absolute w-full h-full left-0 top-0" src="/static/kahe-202510/images/pay-button.png" />
        <text class="relative text-44 font-normal text-white theme-font text-stroke-main">去支付</text>
        <text class="relative text-44 font-normal text-white theme-font text-stroke-main"
            >{{ isMall ? '¥' : '' }}{{ price }}</text
        >
        <view class="absolute top-0 right-0">
            <view class="relative" v-if="discountPrice > 0">
                <image
                    class="absolute top-0 right-0 w-169 h-25"
                    src="/static/kahe/common/pay-price-count.png"
                />
                <text class="absolute -top-[2rpx] right-[6rpx] w-150 text-right text-20 font-normal text-white"
                    >已抵扣¥{{ discountPrice }}</text
                >
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    isMall: {
        default: false,
        type: Boolean
    },
    price: {
        default: '',
        type: String
    },
    discountPrice: {
        default: 0,
        type: Number
    }
})
</script>

<style lang="scss" scoped>
</style>
