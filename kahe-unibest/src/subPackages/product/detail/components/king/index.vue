<template>
    <view class="demonKing">
        <view class="king">
            <image src="https://jms.85gui7.com/kahe-202510/ka-he/product/kings-bg.png" class="king-bg" />
            <view class="king-left">
                <view class="king-left-content">
                    <image class="king-left-content-decorate" src="https://jms.85gui7.com/kahe-202510/ka-he/product/border-bg.png" />
                    <image class="king-left-content-avatar" :src="product.demonKing.avatar"
                        v-if="product.demonKing.exist" />
                    <!-- <image class="king-left-content-empty" src="https://jms.85gui7.com/kahe-202510/product/king-empty.png" /> -->
                </view>
            </view>
            <view class="king-info" v-if="product.demonKing.exist">
                <view class="king-info-title theme-font">{{
                    product.demonKing.nickname
                    }}</view>
                <view class="king-info-subTitle">已累计获得{{ product.demonKing.coin }}</view>
            </view>
            <view class="king-info" v-else>
                <view class="king-info-title theme-font">暂无魔王</view>
                <view class="king-info-subTitle">抽[魔王凭证]物品登上王座</view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import type { UIProductDetailModel } from "@/model";
import type { PropType } from "vue";

defineProps({
    product: {
        default: {} as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>,
    },
});
</script>

<style scoped lang="scss">
.demonKing {
    position: relative;
    margin-top: -88rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10rpx;

    .king {
        position: relative;
        display: flex;
        width: 541rpx;
        height: 92rpx;
        align-items: center;

        &-bg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
        }

        &-left {
            // margin-left: 120rpx;
            width: 120rpx;
            height: 116rpx;
            transform: translate(-30rpx, -10rpx);

            &-content {
                position: relative;
                width: 100%;
                height: 100%;

                &-decorate {
                    width: 100%;
                    height: 100%;
                }

                &-avatar {
                    position: absolute;
                    left: 32rpx;
                    top: 28rpx;
                    width: 78rpx;
                    height: 78rpx;
                    border-radius: 50%;
                }

                &-empty {
                    position: absolute;
                    left: 13rpx;
                    top: -12rpx;
                    width: 94rpx;
                    height: 124rpx;
                }
            }
        }

        &-info {
            position: relative;
            // margin-left: 40rpx;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            &-title {
                font-weight: 400;
                font-size: 30rpx;
                color: #000000;
                line-height: 36rpx;
            }

            &-subTitle {
                font-weight: normal;
                font-size: 24rpx;
                color: #000000;
            }
        }
    }
}
</style>
