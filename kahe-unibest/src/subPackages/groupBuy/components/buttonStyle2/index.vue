<template>
    <view class="groupBuyBtn2">
        <image class="groupBuyBtn2-bg" src="https://jms.85gui7.com/kahe-202510/groupBuy/btn3.png" />
        <view class="groupBuyBtn2-title theme-font">{{title}}</view>
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

<style lang="scss" scoped>
.groupBuyBtn2{
    position: relative;
    width: 453rpx;
    height: 131rpx;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-title{
        position: absolute;
        left: 0;
        top: 42rpx;
        width: 100%;
        text-align: center;
        font-weight: 400;
        font-size: 40rpx;
        color: #FFFFFF;
    }
}
</style>
