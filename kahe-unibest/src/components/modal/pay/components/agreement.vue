<template>
    <view class="agreement">
        <image class="agreement-img" :src="checked ? 'https://jms.85gui7.com/kahe/common/checked.png' : 'https://jms.85gui7.com/kahe/common/unchecked.png' " />
        <text class="agreement-title">已阅读并同意</text>
        <text class="agreement-title agreement-subTitle">《心跳潮玩服务协议》</text>
    </view>
</template>

<script lang="ts" setup>

defineProps({
    checked: {
        default: true,
        type: Boolean
    }
})

</script>

<style lang="scss" scoped>
.agreement{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-img{
        width: 35rpx;
        height: 30rpx;
    }
    &-title{
        margin-left: 10rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #000000;
    }
    &-subTitle{
        color: #4B71FF
    }
}
</style>
