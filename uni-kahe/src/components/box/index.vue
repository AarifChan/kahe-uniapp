<template>
    <view class="goodsBox">
        <view class="goodsBox-decorate">
            <image
                src="https://jms.85gui7.com/jos/common/demon-king.png"
                class="goodsBox-decorate-lucky"
                v-if="item.isLucky"
            />
            <view class="goodsBox-decorate-content">
                <image
                    v-if="item.level === 118"
                    class="goodsBox-decorate-content-gif"
                    src="https://jms.85gui7.com/cyd/lottery/card-lottery1.png"
                    mode="widthFix"
                />
                <image
                    class="goodsBox-decorate-content-hide"
                    src="https://jms.85gui7.com/jos/common/hide-show.png"
                    v-if="item.isHide"
                />
                <image
                    class="goodsBox-decorate-content-img"
                    :src="item.image"
                />
                <image
                    class="goodsBox-decorate-content-bg"
                    :src="item.levelBg"
                    v-if="!info"
                />
                <!--                <image-->
                <!--                    src="https://jms.85gui7.com/kahe-202510/images/levelBg.png"-->
                <!--                    class="goodsBox-decorate-content-levelBg"-->
                <!--                />-->
                <image
                    v-if="!isCard"
                    class="goodsBox-decorate-content-level"
                    :src="getLevelImageByLevel(item.level)"
                    mode="widthFix"
                />
                <image
                    v-if="item.hasRedBag"
                    class="goodsBox-decorate-content-redBag"
                    src="https://jms.85gui7.com/kahe-202510/redEnvelope/reward.png"
                />
                <!--                <view v-else class="goodsBox-decorate-content-level1" :style="levelColor(item.level)">{{formatCardLevel(item.level)}}</view>-->
                <text class="goodsBox-decorate-content-text" v-if="nums"
                    >x{{ item.total }}</text
                >
                <text class="goodsBox-decorate-content-num" v-if="info"
                    >{{ item.last }}/{{ item.total }}</text
                >
                <image
                    v-if="item.isDemon"
                    class="goodsBox-decorate-content-king"
                    src="https://jms.85gui7.com/kahe-202510/common/king.png"
                />
            </view>
        </view>
        <view class="goodsBox-info " v-if="info">
            <view class="goodsBox-info-title text-flow-ellipsis-single">{{
                item.title
            }}</view>
            <view class="goodsBox-info-subTitle"
                >水晶: <text style="color: red">{{ item.price }}</text></view
            >
        </view>
        <view class="goodsBox-info" v-else>
            <view class="goodsBox-info-title text-flow-ellipsis-single">{{
                item.title
            }}</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { UIProductBoxModel } from '@/model'
import type { PropType } from 'vue'
import { formatCardLevel, levelColor } from '@/utils/tools/image'
import { useEnum } from '@/composables/enum'
const { getLevelImageByLevel } = useEnum()
defineProps({
    item: {
        default: {
        } as UIProductBoxModel,
        type: Object as PropType<UIProductBoxModel>
    },
    info: {
        default: true,
        type: Boolean
    },
    level: {
        default: true,
        type: Boolean
    },
    nums: {
        default: true,
        type: Boolean
    },
    isCard: {
        default: false,
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
.goodsBox {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    &-decorate {
        position: relative;
        width: 100%;
        aspect-ratio: 14 / 20;
        //overflow: hidden;
        //width: 140rpx;
        //height: 200rpx;
        //padding-top: 30rpx;

        &-lucky {
            right: -20rpx;
            top: 6rpx;
            position: absolute;
            width: 66rpx;
            height: 62rpx;

            z-index: 2;
        }
        &-content {
            position: relative;
            width: 100%;
            aspect-ratio: 14 / 20;
            &-hide {
                position: absolute;
                top: 8rpx;
                right: 8rpx;
                width: calc(62rpx * 0.8);
                height: calc(58rpx * 0.8);
                z-index: 1;
            }
            &-img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                aspect-ratio: 14 / 20;
                border-radius: 12rpx;
                z-index: 0;
                //width: 100%;
            }
            &-gif {
                position: absolute;
                left: -48rpx;
                top: -66rpx;
                height: 200rpx;
                border-radius: 12rpx;
                width: calc(100% + 96rpx);
            }
            &-bg {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                width: 100%;
                aspect-ratio: 14 / 20;
            }
            &-levelBg {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 107rpx;
                height: 30rpx;
                z-index: 2;
            }
            &-levelBg2 {
                width: 88rpx;
                height: 37rpx;
                position: absolute;
                left: 0;
                bottom: 0;
                z-index: 2;
            }
            &-level1 {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 68rpx;
                text-align: center;
                z-index: 2;
                font-size: 20rpx;
                font-weight: 700;
            }
            &-level {
                //line-height: 40rpx;
                z-index: 2;
                position: absolute;
                left: -20%;
                bottom: 0;
                width: 60%;
                //height: 80rpx;
                //scale: 0.8;
                //font-size: 16rpx;
                //font-weight: 700;
                //&.lefts {
                //    left: -11rpx;
                //}
            }
            &-redBag {
                position: absolute;
                top: -16rpx;
                right: -20rpx;
                width: 73rpx;
                height: 49rpx;
                z-index: 10;
            }
            &-num {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 90rpx;
                text-align: center;
                font-size: 20rpx;
                color: #ffffff;
                z-index: 3;
            }
            &-king {
                position: absolute;
                top: -36rpx;
                right: -16rpx;
                width: 107rpx;
                height: 72rpx;
            }
            &-text {
                position: absolute;
                right: 0;
                top: -19.5rpx;
                width: 39rpx;
                height: 39rpx;
                background: linear-gradient(180deg, #fcd6ff, #c1e1ff);
                border-radius: 50%;
                text-align: center;
                font-size: 24rpx;
                line-height: 39rpx;
                color: #255eb3;
                z-index: 3;
            }
        }
    }

    &-info {
        margin-top: 8rpx;
        display: flex;
        flex-direction: column;
        &-title {
            width: 100%;
            color: #c3dbff;
            font-size: 26rpx;
        }
        &-subTitle {
            color: #c3dbff;
            font-size: 26rpx;
        }
        &-prob {
            color: #c3dbff;
            font-size: 26rpx;
        }
    }
}
</style>
