<template>
    <view class="redBagItem">
        <view class="redBagItem-left">
            <image class="redBagItem-left-img" :src="item?.avatar" :scale="0.8" />
            <view class="redBagItem-left-info">
                <text class="redBagItem-left-info-title">{{item?.nickname}}</text>
                <text class="redBagItem-left-info-title">{{item?.comment}}</text>
            </view>
        </view>
        <view class="redBagItem-right">
            <view class="redBagItem-right-top">
                <text class="redBagItem-right-top-title" v-if="item?.amountNew">（新人额外+{{item.amountNew}}）</text>
                <image class="redBagItem-right-top-img" src="https://jms.85gui7.com/kahe-202510/redEnvelope/ticket.png" />
                <text class="redBagItem-right-top-value">+{{item?.amount}}</text>
            </view>
            <text class="redBagItem-right-title">分享者+{{item?.amount}}点券</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { RedBagUserModel } from '@/composables/redBag/model'

defineProps({
    item: {
        default: null,
        type: Object as PropType<RedBagUserModel | null>
    }
})

</script>

<style lang="scss" scoped>

.redBagItem{
    position: relative;
    width: calc(100% - 24rpx);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #4558CB;
    margin: 0 12rpx;
    padding: 20rpx 0;
    &-left{
        display: flex;
        flex-direction: row;
        align-items: center;
        &-img{
            width: 80rpx;
            height: 80rpx;
            border-radius: 40rpx;
            border: 1px solid white;
        }
        &-info{
            margin-left: 12rpx;
            display: flex;
            flex-direction: column;
            &-title{
                font-weight: 400;
                font-size: 20rpx;
                color: #000000;
            }
        }
    }

    &-right{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        &-top{
            display: flex;
            flex-direction: row;
            align-items: center;
            &-title{
                font-weight: 400;
                font-size: 20rpx;
                color: #851C2E;
            }
            &-img{
                width: 28rpx;
                height: 35rpx;
            }
            &-value{
                font-weight: 400;
                font-size: 20rpx;
                color: #000000;
            }
        }
        &-title{
            font-weight: normal;
            font-size: 20rpx;
            color: #851C2E;
        }
    }
}
</style>
