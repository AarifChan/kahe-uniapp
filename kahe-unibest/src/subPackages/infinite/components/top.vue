<template>
    <view class="top">
        <image class="top-bg" src="https://jms.85gui7.com/kahe-202510/images/infinite-top-bg.png" />
        <view class="top-left">
            <image class="top-left-bg" src="https://jms.85gui7.com/kahe-202510/product/card-item-bg.png" />
            <view class="top-left-tips">vip客服-可可</view>
            <view class="top-left-title" v-if="types">
                主人，请选择心仪的抽卡机，海量卡牌任您挑选。
            </view>
            <view class="top-left-title" v-else>
                主人，请选择心仪的抽卡机，海量卡牌任您挑选。
            </view>
        </view>
        <image class="top-center" src="https://jms.85gui7.com/kahe-202510/images/infinite-girl.gif"  v-if="types" />
        <image class="top-center" src="https://jms.85gui7.com/kahe-202510/images/card-girl.gif"  v-else />
        <view class="top-right">
            <Barrage :list="goods" />
        </view>
    </view>
</template>
<script setup lang="ts">
import Barrage from '@/components/barrage/index.vue'
import type { UIBarrageModel } from '@/model'
import type { PropType } from 'vue'
defineProps({
    goods: {
        type: Array as PropType<UIBarrageModel[]>,
        default: () => []
    },
    types: {
        type: Boolean,
        default: true
    }
})
</script>
<style lang="scss" scoped>
image{will-change: transform}
.top {
    position: relative;
    width: 100%;
    height: 313rpx;
    display: flex;
    justify-content: space-between;
    padding: 0 30rpx;
    box-sizing: border-box;
    overflow: hidden;
    &-center {
        position: absolute;
        left: 50%;
        top: -20rpx;
        transform: translateX(-50%);
        height: 360rpx;
        width: 340rpx;
    }
    &-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
    &-left {
        margin-top: 167rpx;
        position: relative;
        width: 436rpx;
        height: 104rpx;
        z-index: 99;
        &-tips{
            position: absolute;
            left: 6rpx;
            top: 0;
            font-weight: normal;
            font-size: 18rpx;
            color: #000000;
        }
        &-bg {
            width: 100%;
            height: 100%;

        }
        &-title {
            position: absolute;
            left: 32rpx;
            top: 36rpx;
            margin-right: 8rpx;
            font-size: 20rpx;
            color: #FFFFFF;

        }
    }
    &-right {
        margin-top: 142rpx;
        position: relative;
        width: 242rpx;
        height: 154rpx;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
}
</style>
