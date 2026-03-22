<template>
    <view class="mine-data">
        <image class="mine-data-moneyBg" src="https://jms.85gui7.com/kahe-202510/images/money-bg.png">
        </image>
        <image
            class="mine-data-icon"
            :style="{ width: width, height: height, left: left, top: top }"
            :src="icon"
        />
        <view class="mine-data-info">
            <text class="mine-data-info-title theme-font">{{ title }}</text>
            <text class="mine-data-info-subTitle theme-font">{{ value }}</text>
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

<style lang="scss" scoped>
.mine-data {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300rpx;
    height: 120rpx;
    &-moneyBg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    &-icon {
        position: absolute;
        left: 8rpx;
        top: 8rpx;
    }

    &-info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 20rpx;
        &-title {
            font-size: 28rpx;
            font-weight: 400;
            color: #000000;
        }
        &-subTitle {
            transform: translateY(10rpx);
            font-size: 26rpx;
            font-weight: 400;
            color: #000000;
        }
    }
}
</style>
