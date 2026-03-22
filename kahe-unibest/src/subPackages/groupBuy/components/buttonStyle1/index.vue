<template>
    <view class="groupBuyBtn">
        <image class="groupBuyBtn-bg" src="https://jms.85gui7.com/kahe-202510/groupBuy/btn2.png" />
        <view class="groupBuyBtn-title theme-font">{{title}}</view>
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
.groupBuyBtn{
    position: relative;
    width: 296rpx;
    height: 131rpx;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-title{
        position: absolute;
        left: 68rpx;
        top: 38rpx;
        text-align: center;
        font-weight: 400;
        font-size: 40rpx;
        color: #FFFFFF;
    }
}
</style>
