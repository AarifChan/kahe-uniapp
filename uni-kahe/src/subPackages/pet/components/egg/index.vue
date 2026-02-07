<template>
    <view class="egg">
        <view class="egg-bg" />
        <image class="egg-icon" :src="item.icon" />
        <view class="egg-num">{{item.number}}</view>
        <image class="egg-decorate" src="https://jms.85gui7.com/kahe-202510/pet/card-bottom.png" />
        <text class="egg-name theme-font text-stroke">{{item.name}}</text>
        <image class="egg-level" :src="'https://jms.85gui7.com/kahe-202510/pet/level2.png' " />
        <image v-if="selected" class="egg-select" src="https://jms.85gui7.com/kahe-202510/pet/select.png" />
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import type { EggsModel } from '@/composables/pet/model'

defineProps({
    item: {
        default: {
        } as EggsModel,
        type: Object as PropType<EggsModel>
    },
    selected: {
        default: false,
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>

.egg{
    position: relative;
    width: 100%;
    aspect-ratio:  152 / 176.0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-bg{
        position: absolute;
        top: 10rpx;
        left: 10rpx;
        width: calc(100% - 20rpx);
        height: calc(100% - 20rpx);
        background-color: #3C3C3C;
    }
    &-icon{
        position: absolute;
        top: 8px;
        left: 0;
        width: 100%;
        aspect-ratio:  1;
    }

    &-num{
        position: absolute;
        right: 8rpx;
        top: 8rpx;
        background-color: black;
        width: 52rpx;
        height: 24rpx;
        line-height: 24rpx;
        font-size: 20rpx;
        color: white;
        text-align: center;
    }

    &-select{
        position: absolute;
        left: -8rpx;
        top: -8rpx;
        width: 47rpx;
        height: 46rpx;
    }

    &-level{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
    }

    &-decorate{
        position: absolute;
        bottom: 0;
        left: 10rpx;
        width: calc(100% - 20rpx);
        aspect-ratio:  132 / 41.0;
    }
    &-name{
        position: absolute;
        bottom: 8rpx;
        left: 16rpx;
        width: calc(100% - 32rpx);
        font-weight: 400;
        font-size: 24rpx;
        color: #FFFFFF;
        text-align: center;
    }
}
</style>
