<template>
    <view class="general-top">
        <image class="general-top-img" src="https://jms.85gui7.com/kahe-202510/ka-he/product/product-top.png" />
        <view class="general-top-btn">
            <view class="general-top-btn-item style1 theme-font" @tap.stop="tapShowModel(0)">发货须知</view>
            <view class="general-top-btn-item style2 theme-font" @tap.stop="tapShowModel(1)">购买说明</view>
            <view class="general-top-btn-item style3 theme-font" @tap.stop="tapShowModel(2)">品相定义</view>
        </view>
        <view class="general-top-content">
            <image class="general-top-content-img" :src="product.image" />
            <view class="general-top-content-info">
                <view class="general-top-content-info-title theme-font">{{
                    product.title
                    }}</view>
                <view style="
            display: flex;
            flex-direction: row;
            align-items: baseline;
            margin-top: 25rpx;
          ">
                    <text class="general-top-content-info-tag">￥</text>
                    <view class="general-top-content-info-center theme-font">{{
                        product.price
                        }}</view>
                </view>
                <view style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 16rpx;
          ">
                    <view class="general-top-content-info-num" v-if="choose">商品余量:{{ product.num }}/{{ product.total }}
                    </view>
                    <view class="general-top-content-info-people" :style="{ width: choose ? '268rpx' : '299rpx' }">
                        <view class="general-top-content-info-people-bg" :style="widthStyle" />
                    </view>
                </view>
            </view>
        </view>
        <view class="general-top-reload" @tap.stop="emits('didTapChange')" v-if="!choose">
            <image class="general-top-reload-icon" src="https://jms.85gui7.com/kahe-202510/ka-he/product/reload-icon.png" />
            <text class="general-top-reload-text theme-font">换一套</text>
        </view>
        <image class="general-top-logo" src="https://jms.85gui7.com/kahe-202510/ka-he/common/logo.png" />
    </view>
</template>
<script setup lang="ts">
import type { UIProductDetailModel } from "@/model";
import { type PropType, computed } from "vue";

const emits = defineEmits(["tapShowModel", "didTapReload", "didTapChange"]);
const props = defineProps({
    product: {
        default: {} as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>,
    },
    choose: {
        default: false,
        type: Boolean,
    },
});
const widthStyle = computed(() => {
    return `width:${(props.product.num / props.product.total) * 100}%`;
});
const tapShowModel = (value: number) => {
    emits("tapShowModel", value);
};
</script>
<style lang="scss" scoped>
.general-top {
    position: relative;
    margin: 0 auto 18rpx auto;
    width: 738rpx;
    height: 311rpx;
    @include flex-xy-center();

    &-logo {
        position: absolute;
        left: 0;
        top: 0;
        width: 180rpx;
        height: 71rpx;
    }

    &-btn {
        position: absolute;
        right: 16rpx;
        top: 28rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16rpx;

        &-item {
            font-size: 28rpx;
            text-align: center;
            padding: 4rpx 6rpx;
            border-radius: 10rpx;
            margin-right: 16rpx;
            color: #ffffff;
        }

        .style1 {
            background: #7fff85;
            border-radius: 4rpx;
            border: 2rpx solid #29984b;
            color: #237927;
        }

        .style2 {
            background: #fffa70;
            border-radius: 4rpx;
            border: 2rpx solid #785e30;
            color: #85733a;
        }

        .style3 {
            background: #7cd2f0;
            border-radius: 4rpx;
            border: 2rpx solid #785e30;
            color: #237927;
        }
    }

    &-img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    &-content {
        position: absolute;
        top: 104rpx;
        left: 32rpx;
        width: calc(100% - 64rpx);
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 175rpx;

        &-img {
            aspect-ratio: 1;
            width: 175rpx;
            height: 175rpx;
        }

        &-info {
            position: relative;
            display: flex;
            flex-direction: column;
            margin-left: 26rpx;
            margin-top: 22rpx;

            &-title {
                font-weight: 400;
                font-size: 30rpx;
                color: #000000;
            }

            &-tag {
                font-weight: normal;
                font-size: 30rpx;
                color: #000000;
            }

            &-center {
                font-weight: normal;
                font-size: 50rpx;
                color: #000000;
            }

            &-num {
                font-size: 20rpx;
                color: #000000;
            }

            &-people {
                position: relative;
                width: 299rpx;
                height: 16rpx;
                background: #c2beb0;
                border-radius: 8rpx;
                overflow: hidden;

                &-bg {
                    position: absolute;
                    left: 0;
                    top: 0;
                    max-width: 100%;
                    height: 100%;
                    background: #ff6161;
                    border-radius: 8rpx;
                    transition: width 1s ease;
                }

                &-text {
                    font-weight: normal;
                    font-size: 20rpx;
                    color: #000000;
                }
            }
        }
    }

    &-reload {
        position: absolute;
        right: 54rpx;
        bottom: 42rpx;
        width: 140rpx;
        height: 50rpx;
        background: #5ad7af;
        box-shadow: 0 4rpx 0 0 #43a17f;
        border-radius: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 13rpx;

        &-icon {
            width: 36rpx;
            height: 38rpx;
        }

        &-text {
            font-weight: 400;
            font-size: 24rpx;
            color: #ffffff;
        }
    }
}
</style>
