<template>
    <view class="pay-row">
        <custom-button width="152rpx" height="42rpx" :title="title" :text-color="color"
                       font-size="26rpx"
                       border-radius="0"
                       :theme-font="false"
                       :text-stroke = 'false'
        />
        <view class="pay-row-right">
            <text class="pay-row-right-value">{{value}}</text>
            <image class="pay-row-right-img" src="https://jms.85gui7.com/kahe/common/right-arrow.png" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/custom/button/index.vue'
defineProps({
    title: {
        default: '',
        type: String
    },
    color: {
        default: 'white',
        type: String
    },
    value: {
        default: '',
        type: String
    }
})
</script>

<style lang="scss" scoped>
.pay-row{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &-right{
        display: flex;
        flex-direction: row;
        align-items: center;
        &-value{
            font-size: 24rpx;
            font-weight: 400;
            color: #000000;
            margin-right: 22rpx;
        }

        &-img{
            width: 32rpx;
            height: 49rpx;
        }
    }
}
</style>
