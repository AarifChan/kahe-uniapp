<template>
    <view class="normalBottom">
        <image class="normalBottom-bg" src="https://jms.85gui7.com/kahe/product/normal-bottom-bg2.png" />
        <view class="normalBottom-other" />
        <view class="normalBottom-info">
            <view class="normalBottom-info-top">
                <image class="normalBottom-info-top-side" src="https://jms.85gui7.com/kahe/product/left-btn.png" @tap.stop="handleChangeNum(true)" />
                <view class="normalBottom-info-top-center">
                    <text class="normalBottom-info-top-center-title theme-font text-stroke-white">冲</text>
                    <text class="normalBottom-info-top-center-value theme-font text-stroke-white">{{current}}</text>
                    <text class="normalBottom-info-top-center-title theme-font text-stroke-white">发</text>
                </view>
                <image class="normalBottom-info-top-side" src="https://jms.85gui7.com/kahe/product/right-btn.png" @tap.stop="handleChangeNum(false)" />
            </view>
            <view class="normalBottom-info-center">
                <view class="normalBottom-info-center-item" v-for="(item, index) in cardsArray" :key="'card-index'+index" @tap.stop="didSelectCard(item)">
                    <image class="normalBottom-info-center-item-bg" :src="item.num === current ? 'https://jms.85gui7.com/kahe/product/item1.png' : 'https://jms.85gui7.com/kahe/product/item2.png'" />
                    <text class="normalBottom-info-center-item-title theme-font text-stroke">冲{{item.num}}发</text>
                </view>
            </view>
            <view class="normalBottom-info-btn" @tap.stop="emits('didTapChoose')">
                <image class="normalBottom-info-btn-bg" src="https://jms.85gui7.com/kahe/product/normal-chase-bg.png" />
                <text class="normalBottom-info-btn-title theme-font text-stroke">立即抽赏</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import { UIProductPriceCard } from '@/model'

const props = defineProps({
    cardsArray: {
        default: () => [],
        type: Array as PropType<UIProductPriceCard[]>
    },
    current: {
        default: 1,
        type: Number
    }
})

const emits = defineEmits(['update:current', 'didTapChoose'])

const handleChangeNum = (isLeft: boolean) => {
    if (isLeft && props.current > 1) {
        emits('update:current', props.current - 1)
        return
    }
    if (!isLeft) {
        emits('update:current', props.current + 1)
    }
}

const didSelectCard = (item: UIProductPriceCard) => {
    emits('update:current', item.num)
}

</script>

<style lang="scss" scoped>

.normalBottom{
    position: relative;
    display: flex;
    flex-direction: column;
    &-bg{
        width: 750rpx;
        height: 248rpx;
    }
    &-other{
        width: 100%;
        height: env(safe-area-inset-bottom);
        background-color: #393939;
    }

    &-info{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 146rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-top{
            margin-top: 60rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: calc(100% - 60rpx);
            padding: 0 30rpx;
            &-side{
                width: 125rpx;
                height: 63rpx;
            }
            &-center{

                display: flex;
                flex-direction: row;
                align-items: baseline;
                &-title{
                    font-size: 30rpx;
                    font-weight: 400;
                    color: #3B7CFF;

                }
                &-value{
                    font-size: 60rpx;
                    font-weight: 400;
                    color: #3B7CFF;
                    padding: 0 12rpx;
                }
            }

        }

        &-center{
            margin-top: 10rpx;
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            &-item{
                position: relative;
                padding: 8rpx 40rpx;
                &-bg{
                    width: 132rpx;
                    height: 53rpx;
                }
                &-title{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 70rpx;
                    font-size: 25rpx;
                    font-weight: 400;
                    line-height: 70rpx;
                    color: #FFFFFF;
                    text-align: center;

                }
            }
        }
        &-btn{
            position: relative;
            margin-top: 16rpx;
            &-bg{
                width: 650rpx;
                height: 80rpx;
            }
            &-title{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                line-height: 80rpx;
                font-size: 40rpx;
                font-weight: 400;
                color: #FFFFFF;
                text-align: center;
            }
        }
    }
}
</style>
