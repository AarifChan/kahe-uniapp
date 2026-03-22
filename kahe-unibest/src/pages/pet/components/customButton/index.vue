<template>
    <view class="petButton" :style="{ width: width}">
        <image class="petButton-bg" src="https://jms.85gui7.com/kahe-202510/pet/btn-bg.png" />
        <view class="petButton-content">
            <text class="petButton-content-title theme-font">{{title}}</text>
        </view>

        <view class="petButton-sort" v-if="sorted">
            <image class="petButton-sort-up" :src="sorted ? 'https://jms.85gui7.com/kahe-202510/pet/up-active.png': 'https://jms.85gui7.com/kahe-202510/pet/up.png' "  />
            <image class="petButton-sort-down" :src="sorted ? 'https://jms.85gui7.com/kahe-202510/pet/down.png': 'https://jms.85gui7.com/kahe-202510/pet/down-active.png' "  />
        </view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    sorted: {
        default: false,
        type: Boolean
    },
    width: {
        default: '142rpx',
        type: String
    }
})
</script>

<style lang="scss" scoped>
.petButton{
    position: relative;
    width: 142rpx;
    height: 60rpx;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-content{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &-title{
            line-height: 100%;
            font-weight: 400;
            font-size: 32rpx;
            color: #FFFFFF;

        }
    }

    &-sort{
        position: absolute;
        top: 15rpx;
        right: 15rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-up{
            width: 23rpx;
            height: 13rpx;
        }
        &-down{
            margin-top: 4rpx;
            width: 23rpx;
            height: 13rpx;
        }
    }
}
</style>
