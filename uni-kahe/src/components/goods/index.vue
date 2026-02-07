<template>
    <view class="goodsInfo">
        <view class="goodsInfo-empty" v-if="item.productNum === 0">
            <image style="width:137rpx;height: 63rpx" src="https://jms.85gui7.com/jos/1214/sell-out.png" />
        </view>
        <view class="goodsInfo-cover">
            <image class="goodsInfo-cover-img" :src="item.image" mode="heightFix" />
            <view class="goodsInfo-cover-pattern">
                <image v-for="(label, index) in item.labels" :key="'labels:' + index" :src="formatLabelImage(label)"
                    class="goodsInfo-cover-pattern-img" />
            </view>
        </view>
        <view class="goodsInfo-info">
            <view class="goodsInfo-info-content">
                <view class="goodsInfo-info-content-bottom">
                    <view class="goodsInfo-info-content-bottom-title text-flow-ellipsis-multiple">{{ item.name }}</view>
                    <view class="goodsInfo-info-content-bottom-row1">
                        <text class="goodsInfo-info-content-bottom-row1-title price-font">{{ isFromMall ? '' : '' }}{{
                            item.price }}/{{
                                isFromMall ? '点券' : '抽'
                            }}</text>
                    </view>
                </view>
            </view>
        </view>
        <image class="goodsInfo-tags" v-if="showTag" :src="item.mainTagImage" />
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UIMallListItemModel, UIProductModel } from '@/model'
defineProps({
    item: {
        default: {
        } as UIProductModel | UIMallListItemModel,
        type: Object as PropType<UIProductModel | UIMallListItemModel>
    },
    showTag: {
        default: true,
        type: Boolean
    },
    isFromMall: {
        default: false,
        type: Boolean
    }
})

const formatLabelImage = (index: number) => {
    return 'https://jms.85gui7.com/kahe-202510/tags/mode' + index + '.png'
}
</script>

<style lang="scss" scoped>
.goodsInfo {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-bottom: 20rpx;
    background-color: white;
    border-radius: 30rpx;

    &-empty {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 3;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    &-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    &-tags {
        position: absolute;
        left: -4rpx;
        top: -2rpx;
        width: 180rpx;
        height: 54rpx;
    }

    &-cover {
        padding: 12rpx 12rpx 0 12rpx;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        aspect-ratio: 1 / 1;
        height: fit-content;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-img {
            //width: 100%;
            height: 100%;
            border-radius: 16rpx;
        }

        &-pattern {
            position: absolute;
            left: 10rpx;
            bottom: 12rpx;
            z-index: 2;
            display: flex;
            flex-direction: column;

            &-img {
                margin-top: 8rpx;
                width: 149rpx;
                height: 49rpx;
            }
        }
    }

    &-info {
        &-content {
            position: relative;
            width: 100%;
            height: 100%;

            &-bottom {
                padding: 0 12rpx;
                width: 100%;
                box-sizing: border-box;

                &-title {
                    margin-top: 10rpx;
                    margin-left: 10rpx;
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #000000;
                    line-height: 30rpx;
                    height: 60rpx;
                    margin-bottom: 0;
                }

                &-row1 {
                    padding: 0 10rpx;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    transform: translateY(-16rpx);

                    &-title {
                        color: #000000;
                        font-size: 40rpx;
                    }
                }
            }
        }
    }
}
</style>
