<template>
    <view class="limitlessItem">
        <image class="limitlessItem-bg" src="https://jms.85gui7.com/kahe/product/limitless-card.png" />
        <view class="limitlessItem-info">
            <text class="limitlessItem-info-title theme-font">{{item.title}}</text>
            <image class="limitlessItem-info-image" :src="item.image" />
            <text class="limitlessItem-info-name theme-font text-flow-ellipsis-single">{{item.name}}</text>
        </view>
    </view>
</template>

<script lang="ts" setup>

import { type PropType } from 'vue'

export interface LimitLessModel {
    title: string
    image: string
    name: string
    prob: string
    levelName: string
}

defineProps({
    item: {
        default: {
        } as LimitLessModel,
        type: Object as PropType<LimitLessModel>
    }
})

</script>

<style lang="scss" scoped>
.limitlessItem{
    position: relative;
    width: 139rpx;
    height: 203rpx;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-info{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        &-title{
            margin-top: 6rpx;
            font-size: 20rpx;
            font-weight: 400;
            color: #649BFF;
            height: 24rpx;
        }
        &-image{
            margin-top: 4rpx;
            width: 112rpx;
            height: 112rpx;
            background-color: white;
        }
        &-name{
            margin-top: 20rpx;
            padding: 0 4rpx;
            width: calc(100% - 8rpx);
            font-size: 24rpx;
            font-weight: 400;
            color: #649BFF;
        }
    }

}
</style>
