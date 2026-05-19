<template>
    <view class="groupBuyBtnStyle3">
        <image class="groupBuyBtnStyle3-img" src="/static/kahe-202510/groupBuy/btn4.png" />
        <view class="groupBuyBtnStyle3-title">{{title}}</view>
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
.groupBuyBtnStyle3{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-img{
        width: 72rpx;
        height: 72rpx;
    }
    &-title{
        z-index: 2;
        margin-top: -20rpx;
        font-weight: 400;
        font-size: 20rpx;
        color: #FFFFFF;
    }
}
</style>
