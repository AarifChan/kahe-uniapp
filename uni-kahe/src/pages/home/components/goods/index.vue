<template>
    <view class="homeGoods">
        <image class="homeGoods-bg" mode="widthFix" src="https://jms.85gui7.com/kahe-202510/ka-he/home/item-bg.png" />
        <!--        <view class="homeGoods-empty" v-if="item.isSellout">-->
        <!--            <image-->
        <!--                style="width:137rpx;height: 63rpx"-->
        <!--                src="https://jms.85gui7.com/jos/1214/sell-out.png"-->
        <!--            />-->
        <!--        </view>-->

        <view class="homeGoods-cover">
            <view class="homeGoods-cover-top">
                <image class="homeGoods-cover-top-img" :src="item.image" mode="heightFix" />
            </view>

            <view class="homeGoods-cover-pattern">
                <image v-for="(label, index) in item.labels" :key="'labels:' + index" :src="formatLabelImage(label)"
                    class="homeGoods-cover-pattern-img" />
            </view>
        </view>
        <view class="homeGoods-info">
            <view class="homeGoods-info-content">
                <view class="homeGoods-info-content-bottom">
                    <view class="homeGoods-info-content-bottom-title text-flow-ellipsis-single">{{ item.name }}</view>
                    <view class="homeGoods-info-content-bottom-row1">
                        <view class="homeGoods-info-content-bottom-row1-price">
                            <image class="homeGoods-info-content-bottom-row1-price-img"
                                src="https://jms.85gui7.com/kahe-202510/ka-he/home/price-bg.png" />
                            <text class="homeGoods-info-content-bottom-row1-price-title price-font">{{ isFromMall ? "" :
                                "" }}{{ item.price
                                }}{{ isFromMall ? "/点券" : "" }}</text>
                        </view>
                    </view>
                </view>
                <view class="homeGoods-info-content-merchant" v-if="!hideMerchant">
                    <image class="homeGoods-info-content-merchant-logo" :src="item.merchant?.icon" />
                    <view class="homeGoods-info-content-merchant-name text-flow-ellipsis-single">{{ item.merchant?.name
                        }}</view>
                </view>
            </view>
        </view>
        <image class="homeGoods-tags" v-if="showTag" :src="item.mainTagImage" />
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { UIMallListItemModel, UIProductModel } from "@/model";
defineProps({
    item: {
        default: {} as UIProductModel,
        type: Object as PropType<UIProductModel>,
    },
    showTag: {
        default: true,
        type: Boolean,
    },
    isFromMall: {
        default: false,
        type: Boolean,
    },
    hideMerchant: {
        default: false,
        type: Boolean,
    },
});

const formatLabelImage = (index: number) => {
    return "https://jms.85gui7.com/kahe-202510/ka-he/tag/tag" + index + ".png";
};

const formatLabelName = (index: number) => {
    switch (index) {
        case 1:
            return "满开";
        case 2:
            return "隐藏";
        case 3:
            return "宝箱";
        case 4:
            return "魔王";
        case 5:
            return "排队";
        case 6:
            return "联盟";
    }
};
</script>

<style lang="scss" scoped>
.homeGoods {
    width: 100%;
    aspect-ratio: 506 / 692;
    position: relative;
    overflow: hidden;
    margin-bottom: 20rpx;
    background-color: white;
    border-radius: 10rpx;

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
        width: 180rpx;
        height: 54rpx;
    }

    &-cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-top {
            position: relative;
            width: calc(100% - 8rpx);
            height: calc(100% - 8rpx);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;


            &-img {
                border-radius: 10rpx 10rpx 0 0;
                height: 100%;
            }
        }

        &-pattern {
            position: absolute;
            right: 4rpx;
            bottom: 4rpx;
            z-index: 2;
            display: flex;
            //   flex-direction: column;
            align-items: center;

            &-img {
                margin-right: 8rpx;
                width: 65rpx;
                height: 34rpx;
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
            height: 100%;

            &-bottom {
                padding: 0 12rpx;
                width: calc(100% - 24rpx);

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

                    &-price {
                        position: relative;
                        width: 97rpx;
                        height: 46rpx;

                        &-img {
                            width: 100%;
                            height: 100%;
                        }

                        &-title {
                            position: absolute;
                            right: 8rpx;
                            top: 4rpx;
                            line-height: 42rpx;
                            color: #000;
                            font-size: 28rpx;
                        }
                    }

                    &-title {
                        color: #000000;
                        font-size: 40rpx;
                    }
                }
            }

            &-merchant {
                position: absolute;
                right: 19rpx;
                bottom: 17rpx;
                display: flex;
                flex-direction: row;
                align-items: center;

                &-name {
                    max-width: 120rpx;
                    margin-left: 5rpx;
                    font-weight: normal;
                    font-size: 18rpx;
                    color: #000000;
                }

                &-logo {
                    width: 36rpx;
                    height: 36rpx;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>
