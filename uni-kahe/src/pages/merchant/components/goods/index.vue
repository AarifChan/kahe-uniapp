<template>
    <view class="merchantGoods">
        <image class="merchantGoods-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/item-bg.png" />
        <view class="merchantGoods-empty" v-if="item.productNum === 0">
            <image style="width: 120rpx; height: 100rpx" src="https://jms.85gui7.com/kahe-202510/ka-he/common/Sellingout.png" />
        </view>
        <view class="merchantGoods-cover">
            <image class="merchantGoods-cover-img" :src="item.logo" />
            <view class="merchantGoods-cover-pattern">
                <image v-for="(label, index) in item.labels" :key="'labels:' + index" :src="formatLabelImage(label)"
                    class="merchantGoods-cover-pattern-img" />
            </view>
        </view>
        <view class="merchantGoods-info">
            <view class="merchantGoods-info-content">
                <view class="merchantGoods-info-content-bottom">
                    <view class="merchantGoods-info-content-bottom-title text-flow-ellipsis-single">{{ item.title }}
                    </view>
                    <view class="merchantGoods-info-content-bottom-row1">
                        <image class="merchantGoods-info-content-bottom-row1-bg"
                            src="https://jms.85gui7.com/kahe-202510/ka-he/home/price-bg.png" />
                        <text class="merchantGoods-info-content-bottom-row1-title price-font">{{ item.price }}</text>
                    </view>
                </view>
            </view>
        </view>
        <image class="merchantGoods-tags" v-if="showTag" :src="getMainTagImagePath(Number(item.mainTag))" />
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { ProductBoxModel } from "@/model";
import { getMainTagImagePath } from "@/utils/tools/image";
defineProps({
    item: {
        default: {} as ProductBoxModel,
        type: Object as PropType<ProductBoxModel>,
    },
    showTag: {
        default: true,
        type: Boolean,
    },
    isFromMall: {
        default: false,
        type: Boolean,
    },
});

const formatLabelImage = (index: number) => {
    return "https://jms.85gui7.com/kahe-202510/ka-he/tag/tag" + index + ".png";
};
</script>

<style lang="scss" scoped>
.merchantGoods {
    position: relative;
    width: 153rpx;
    height: 203rpx;
    border-radius: 10rpx;
    overflow: hidden;

    &-bg {
        width: 100%;
        height: 100%;
    }

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

    &-tags {
        position: absolute;
        left: -4rpx;
        top: -2rpx;
        width: calc(180rpx * 0.4);
        height: calc(54rpx * 0.4);
    }

    &-cover {
        position: absolute;
        top: 4rpx;
        left: 8rpx;
        width: calc(100% - 16rpx);
        box-sizing: border-box;
        aspect-ratio: 1;
        height: fit-content;
        overflow: hidden;
        border-radius: 4rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-img {
            width: 100%;
            height: 100%;
        }

        &-pattern {
            position: absolute;
            right: 2rpx;
            bottom: 4rpx;
            z-index: 2;
            display: flex;
            flex-direction: column;

            &-img {
                margin-top: 4rpx;
                width: calc(65rpx * 0.4);
                height: calc(34rpx * 0.4);
            }
        }
    }

    &-info {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        &-content {
            position: relative;
            width: 100%;

            &-bottom {
                position: relative;
                padding: 0 12rpx 12rpx;
                width: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;

                &-title {
                    font-weight: 400;
                    font-size: 16rpx;
                    color: #000000;
                    width: 100%;
                    line-height: 18rpx;
                    margin-bottom: 4rpx;
                }

                &-row1 {
                    position: relative;
                    width: calc(97rpx * 0.6);
                    height: calc(46rpx * 0.6);

                    &-bg {
                        width: 100%;
                        height: 100%;
                    }

                    &-title {
                        position: absolute;
                        right: 8rpx;
                        min-width: 32rpx;
                        bottom: 0;
                        text-align: center;
                        color: #000000;
                        font-size: 16rpx;
                    }
                }
            }
        }
    }
}
</style>
