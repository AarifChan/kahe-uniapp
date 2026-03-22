<template>
    <view class="groupBuyItem">
        <image class="groupBuyItem-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/home/item-bg.png" />
        <image class="groupBuyItem-logo" :src="item.logo" />
        <view class="groupBuyItem-num">{{ item.num }}/{{ item.total }}</view>
        <view class="groupBuyItem-info">
            <!--            <view class="groupBuyItem-info-subTitle SimHei-font" style="margin-top: 15rpx">{{isTimeout ? '已结束' : '剩余时间'}}</view>-->
            <view v-if="!isTimeout" class="groupBuyItem-info-row" style="margin-top: 5rpx">
                <view class="groupBuyItem-info-row-last SimHei-font">
                    <view class="groupBuyItem-info-row-last-value price-font">{{
                        day
                    }}</view>
                    <view class="groupBuyItem-info-row-last-title">天</view>
                    <view class="groupBuyItem-info-row-last-value price-font">{{
                        hour
                    }}</view>
                    <view class="groupBuyItem-info-row-last-title">时</view>
                    <view class="groupBuyItem-info-row-last-value price-font">{{
                        minute
                    }}</view>
                    <view class="groupBuyItem-info-row-last-title">分</view>
                    <view class="groupBuyItem-info-row-last-value price-font">{{
                        second
                    }}</view>
                    <view class="groupBuyItem-info-row-last-title">秒</view>
                </view>
            </view>
            <view class="groupBuyItem-info-title text-flow-ellipsis-single">{{
                item.title
            }}</view>

            <view class="groupBuyItem-info-progress" style="margin-top: 5rpx">
                <view v-if="item.total > 0" class="groupBuyItem-info-progress-value"
                    :style="{ width: `${(item.num / item.total) * 100.0}%` }"></view>
            </view>
            <view class="groupBuyItem-info-row" style="margin-top: 12rpx">
                <view class="groupBuyItem-info-row">
                    <view class="groupBuyItem-info-row-price price-font">¥{{ item.price }}</view>
                </view>
                <view class="groupBuyItem-info-row-merchant">
                    <image class="groupBuyItem-info-row-merchant-logo" :src="item.merchant?.icon" />
                    <view class="groupBuyItem-info-row-merchant-name text-flow-ellipsis-single">{{ item.merchant?.name
                        ?? "" }}</view>
                </view>
            </view>
        </view>
        <!-- <view class="groupBuyItem-empty" v-if="isOver">
      <image
        style="width: 132rpx; height: 113rpx"
        src="https://jms.85gui7.com/kahe-202510/product/sell-out.png"
      />
    </view> -->
    </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType } from "vue";
import type { GroupBuyItem } from "@/model";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, hour, day, second, minute, isTimeout } =
    useTimeCount();

const props = defineProps({
    item: {
        type: Object as PropType<GroupBuyItem>,
        default: {} as GroupBuyItem,
    },
});

const isOver = computed(() => {
    return props.item.num === 0 || isTimeout.value;
});

onMounted(() => {
    startTimeRemain(props.item.openTime);
});
</script>

<style lang="scss" scoped>
.groupBuyItem {
    width: 100%;
    //padding: 10rpx;
    box-sizing: border-box;
    aspect-ratio: 331 / 500;
    position: relative;
    overflow: hidden;
    margin-bottom: 0;
    // background-image: url("https://jms.85gui7.com/kahe-202510/ka-he/home/item-bg.png");
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    //background-color: white;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;

    &-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    &-logo {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
    }

    &-num {
        position: absolute;
        right: 14rpx;
        top: 251rpx;
        border-radius: 4rpx;
        font-weight: 400;
        font-size: 20rpx;
        color: #ffffff;
        padding: 2rpx 9rpx;
        background: rgba($color: #000000, $alpha: 0.7);
        z-index: 1;
    }

    &-info {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0 12rpx 12rpx;
        box-sizing: border-box;
        z-index: 1;

        &-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            &-price {
                font-weight: 400;
                font-size: 32rpx;
                color: #000000;
                text-align: right;
                line-height: 46rpx;
                padding-right: 6rpx;
                width: 97rpx;
                height: 46rpx;
                background-image: url("https://jms.85gui7.com/kahe-202510/ka-he/home/price-bg.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            &-last {
                display: flex;
                flex-direction: row;
                align-items: center;

                &-title {
                    font-weight: 400;
                    font-size: 22rpx;
                    color: #000000;
                }

                &-value {
                    text-align: center;
                    line-height: 30rpx;
                    font-weight: 400;
                    font-size: 22rpx;
                    color: #ffffff;
                    width: 30rpx;
                    height: 30rpx;
                    background: #1ae1ff;
                    border-radius: 6rpx;
                }
            }

            &-merchant {
                display: flex;
                flex-direction: row;
                align-items: center;

                &-name {
                    max-width: 120rpx;
                    margin-left: 5rpx;
                    font-weight: normal;
                    font-size: 18rpx;
                    color: #504f4f;
                }

                &-logo {
                    width: 36rpx;
                    height: 36rpx;
                    border-radius: 50%;
                }
            }
        }

        &-progress {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 12rpx;
            background: #e0e0e0;
            border-radius: 6rpx;
            overflow: hidden;

            &-value {
                height: 100%;
                background: #F95151;
            }
        }

        &-subTitle {
            font-weight: 400;
            font-size: 24rpx;
            color: #6e6e6e;
        }

        &-title {
            font-weight: normal;
            font-size: 24rpx;
            color: #000000;
            line-height: 36rpx;
        }

        &-price {
            color: #000000;
            font-size: 40rpx;
        }
    }

    &-empty {
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: rgba($color: #000000, $alpha: 0.69);
    }
}
</style>
