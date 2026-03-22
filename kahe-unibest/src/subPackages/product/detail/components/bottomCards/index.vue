<template>
    <view class="cards">
        <view class="cards-list">
            <view class="cards-list-item" v-for="(item, index) in cardsArray.filter((n) => n.num !== -1)" :key="index"
                @tap.stop="emits('didTapChoose', item.num)">
                <view v-if="queueLockTime && item.num === 1" class="cards-list-item-queue">
                    <image class="cards-list-item-queue-bg"
                        src="https://jms.85gui7.com/kahe-202510/product/lock-queue.png" />
                    <text class="cards-list-item-queue-title">每发锁{{ queueLockTime }}秒</text>
                </view>
                <image src="https://jms.85gui7.com/kahe-202510/ka-he/common/common-btn-bg.png"
                    class="cards-list-item-img" />
                <text class="cards-list-item-text theme-font">冲{{ item.num }}发</text>
            </view>
        </view>
        <!--    <view class="cards-bottom" v-if="!isInfinite">-->
        <!--      <view class="cards-bottom-exchange" @tap.stop="emits('didTapChangeBox')">-->
        <!--        <image-->
        <!--          class="cards-bottom-exchange-img"-->
        <!--          src="https://jms.85gui7.com/kahe-202510/product/reload.png"-->
        <!--        />-->
        <!--        <text class="cards-bottom-exchange-text theme-font">换箱</text>-->
        <!--      </view>-->
        <!--      <image-->
        <!--        v-if="allShow"-->
        <!--        class="cards-bottom-other"-->
        <!--        src="https://jms.85gui7.com/kahe-202510/product/other-bg.png"-->
        <!--        @tap.stop="emits('didTapChoose', -1)"-->
        <!--      />-->
        <!--    </view>-->
    </view>
</template>
<script setup lang="ts">
import { computed, type PropType } from "vue";
import type { UIProductPriceCard } from "@/model";
const props = defineProps({
    cardsArray: {
        default: () => [],
        type: Array as PropType<UIProductPriceCard[]>,
    },
    isInfinite: {
        default: false,
        type: Boolean,
    },
    queueLockTime: {
        default: 0,
        type: Number,
    },
});

const allShow = computed(() => {
    return props.cardsArray.filter((n) => n.num === -1).length > 0;
});

const emits = defineEmits(["didTapChoose", "didTapChangeBox"]);
</script>
<style lang="scss" scoped>
.cards {
    width: 100%;
    position: relative;
    // left: 0;
    // bottom: calc(env(safe-area-inset-bottom) + 8rpx);
    display: flex;
    flex-direction: column;

    &-list {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 20rpx;
        display: grid;
        grid-template-columns: repeat(auto-fill,
                minmax(calc((100% - 16rpx * 3) / 4), 1fr)); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
        grid-gap: 16rpx; // 这是网格间的间隙，根据需要调整

        &-item {
            position: relative;
            display: flex;
            width: 100%;
            height: 78rpx;
            margin-right: 20rpx;
            @include flex-x-center();

            &-img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }

            &-text {
                position: relative;
                width: 100%;
                text-align: center;
                font-weight: 400;
                line-height: 78rpx;
                font-size: 34rpx;
                color: #ffffff;
                @include text-stroke-color(#936120);
            }

            &-queue {
                position: absolute;
                top: -60rpx;
                left: 0;
                width: calc(155rpx * 1);
                height: calc(60rpx * 1);
                z-index: 90;

                &-bg {
                    width: 100%;
                    height: 100%;
                }

                &-title {
                    position: absolute;
                    top: 8rpx;
                    left: 16rpx;
                    width: calc(100% - 10rpx);
                    font-weight: normal;
                    font-size: 20rpx;
                    color: #000000;
                }
            }
        }

        &-item:nth-child(4) {
            margin-right: 0;
        }
    }

    &-bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 8rpx 42rpx;
        width: calc(100% - 84rpx);

        &-exchange {
            display: flex;
            flex-direction: row;
            width: 242rpx;
            height: 62rpx;
            background: #3a3a3a;
            border-radius: 31rpx;

            &-img {
                margin-top: -9rpx;
                width: 80rpx;
                height: 80rpx;
            }

            &-text {
                line-height: 62rpx;
                margin-left: 24rpx;
                font-weight: 400;
                font-size: 40rpx;
                color: #ffffff;
            }
        }

        &-other {
            margin-left: 16rpx;
            width: 328rpx;
            height: 78rpx;
        }
    }
}
</style>
