<template>
    <view class="petBtn">
        <image class="petBtn-img" :src="icon" />
        <text class="petBtn-text">{{title}}</text>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    icon: {
        default: '',
        type: String
    },
    title: {
        default: '',
        type: String
    }
})
</script>

<style lang="scss" scoped>
.petBtn{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 21rpx;
    &-img{
        width: 100rpx;
        height: 100rpx;
    }
    &-text{
        margin-top: -40rpx;
        width: 80rpx;
        height: 28rpx;
        background: rgba(0,0,0, 0.7);
        border-radius: 14rpx;
        font-weight: normal;
        font-size: 20rpx;
        color: #FFFFFF;
        text-align: center;
        line-height: 28rpx;
    }
}
</style>
