<template>
    <view class="redBag">
        <view class="redBag-left">
            <image class="redBag-left-img" :src="item?.goodsDto?.image" mode="widthFix" />
            <view class="redBag-left-info">
                <text class="redBag-left-info-title text-flow-ellipsis-multiple theme-font text-flow-ellipsis-multiple">{{item.goodsDto.name}}</text>
                <view class="redBag-left-info-other">
                    <text class="redBag-left-info-other-title">指导价:{{item.goodsDto.price}}</text>
                </view>
            </view>
        </view>
        <view class="redBag-btn" :class="item?.status === 0 ? 'enable' : 'disable' " @tap.stop="emits('didClick')">
            <text class="redBag-btn-title theme-font">分享红包</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { RedBagListItem } from '@/composables/redBag/model'
import { type PropType } from 'vue'

defineProps({
    item: {
        default: {
        } as RedBagListItem,
        type: Object as PropType<RedBagListItem | null>
    }
})

const emits = defineEmits(['didClick'])
</script>

<style lang="scss" scoped>
.redBag{
    width: 100%;
    box-sizing: border-box;
    padding: 36rpx 0;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0rpx 1rpx 1rpx 0rpx rgba(212,222,233,0.5), 0rpx 0rpx 5rpx 0rpx #D4DEE9;
    border-radius: 4rpx;
    min-height: 228rpx;
    margin-bottom: 32rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &-left{
        position: relative;
        margin-left: 36rpx;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        &-img{
            width: 178rpx;
            height: 165rpx;
            border-radius: 8rpx;
        }
        &-info{
            position: relative;
            margin-left: 48rpx;
            margin-top: 16rpx;

            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;

            &-title{
                font-weight: 400;
                color: #000000;
                width: 100%;
                font-size: 38rpx;
            }
            &-other{
                margin-top: 36rpx;
                display: flex;
                flex-direction: column;
                &-title{
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #727272;
                }
            }

        }
    }

    &-btn{
        position: absolute;
        right: 18rpx;
        bottom: 36rpx;
        width: 156rpx;
        height: 45rpx;
        border-radius: 22rpx;
        &-bg{
            width: 156rpx;
            height: 45rpx;
        }
        &-title{
            position: absolute;
            left: 0;
            top:0;
            width: 100%;
            height: 100%;
            line-height: 45rpx;
            text-align: center;
            font-weight: 400;
            font-size: 25rpx;

        }
    }
}
.enable{
    background: linear-gradient(-90deg, #3AE5FD, #15AFFF);
    color: black;
}
.disable{
    background: linear-gradient(-90deg, #AFAFAF, #7D7D7D);
    color: white;
}
</style>
