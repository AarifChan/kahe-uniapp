<template>
    <view class="card">
        <view class="bottoms">
            <image src="https://jms.85gui7.com/kahe-202510/ka-he/machine/btn-bg.png" class="bottoms-bg" />
            <view class="content">
                <view class="content-Progressbar">
                    <view class="content-Progressbar-bg">
                        <view class="content-Progressbar-bg-style" :style="luckProgress" />
                    </view>
                </view>
                <text class="content-title theme-font">单人{{ (productDetail.another / 5).toFixed(0)
                }}包,必出高罕卡</text>
            </view>
            <view class="btnList">
                <view class="btnList-bolist" v-for="(item, index) in list" :key="index"
                    @tap.stop="$emit('tapCards', item)">
                    <image src="https://jms.85gui7.com/kahe-202510/ka-he/machine/card-btn.png" class="img" />
                    <view class="num theme-font">{{ item.num / 5 }}包</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import type { UIProductDetailModel, UIProductPriceCard } from '@/model'
import { computed, type PropType } from 'vue'
const props = defineProps({
    list: {
        default: () => [],
        type: Array as PropType<UIProductPriceCard[]>
    },
    productDetail: {
        default: () => { },
        type: Object as PropType<UIProductDetailModel>
    }
})
const luckProgress = computed(() => {
    if (!props.productDetail?.luckyMax) {
        return "";
    }
    const luckProgress =
        (props.productDetail?.luckyVal / props.productDetail?.luckyMax) * 100;
    return `width:${luckProgress}%`;
});
</script>
<style lang="scss" scoped>
.card {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom));
    display: flex;
    width: calc(100%);
    flex-direction: row;

    .bottoms {
        width: 100%;
        // 68rpx
        position: relative;
        height: 244rpx;
        display: flex;
        flex-direction: column;
        align-items: center;


        &-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            bottom: 0;
            inset: 0;
            z-index: -1;
        }

        .content {
            margin: 25rpx 0;
            display: flex;
            flex-direction: column;
            align-items: center;

            &-title {
                font-size: 24rpx;
                color: #CD5700;
                margin-right: 24rpx;
            }

            &-Progressbar {
                margin-top: 8rpx;
                width: 406rpx;
                height: 18rpx;

                &-bg {
                    position: relative;
                    width: 406rpx;
                    height: 18rpx;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 9rpx;

                    &-ProgressbarBg {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        z-index: 0;
                    }

                    &-style {
                        position: absolute;
                        max-width: 100%;
                        top: 0;
                        height: 18rpx;
                        border-radius: 9rpx;
                        left: 0;
                        background-color: #CD5700;
                    }
                }
            }

            &-img {
                position: absolute;
                top: 32rpx;
                right: 46rpx;
                width: 93rpx;
                height: 92rpx;
            }
        }

        .btnList {
            width: 100%;
            padding: 0 45rpx;
            box-sizing: border-box;
            display: grid;
            gap: 28rpx;
            grid-template-columns: repeat(4, 1fr);

            &-bolist {
                position: relative;
                width: 100%;
                height: 67rpx;

                .img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }

                .num {
                    position: relative;
                    font-weight: 400;
                    font-size: 26rpx;
                    color: #DA571D;
                    width: 100%;
                    text-align: center;
                    margin-top: 4rpx;
                }
            }
        }

    }
}
</style>
