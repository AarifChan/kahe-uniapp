<template>
    <view class="pay-button">
        <image class="pay-button-payBtn" src="https://jms.85gui7.com/kahe-202510/images/pay-button.png" />
        <text class="pay-button-title theme-font text-stroke-main">去支付</text>
        <text class="pay-button-value theme-font text-stroke-main"
            >{{ isMall ? '¥' : '' }}{{ price }}</text
        >
        <view class="pay-button-tips">
            <view class="pay-button-tips-content" v-if="discountPrice > 0">
                <image
                    class="pay-button-tips-content-img"
                    src="https://jms.85gui7.com/kahe/common/pay-price-count.png"
                />
                <text class="pay-button-tips-content-title"
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
.pay-button {
    position: relative;
    border-radius: 4rpx;
    height: 82rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &-payBtn {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    &-title {
        position: relative;
        font-size: 44rpx;
        font-weight: 400;
        color: #ffffff;
    }
    &-value {
        position: relative;
        font-size: 44rpx;
        font-weight: 400;
        color: #ffffff;
    }
    &-tips {
        position: absolute;
        top: 0;
        right: 0;

        &-content {
            position: relative;
            &-img {
                position: absolute;
                top: 0;
                right: 0;
                width: 169rpx;
                height: 25rpx;
            }
            &-title {
                position: absolute;
                top: -2rpx;
                right: 6rpx;
                width: 150rpx;
                text-align: right;
                font-size: 20rpx;
                font-weight: 400;
                color: #ffffff;
            }
        }
    }
}
</style>
