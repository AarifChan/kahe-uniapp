<template>
    <view class="dailyItem">
        <image class="dailyItem-bg" src="https://jms.85gui7.com/kahe-202510/home-upgrade/daily-item.png" />
        <view class="dailyItem-content">
            <view class="dailyItem-content-top">
                <view class="dailyItem-content-top-title theme-font"
                    >满{{ item.useMinPrice }}减{{ item.couponPrice }}</view
                >
                <view
                    v-if="item.cates"
                    class="dailyItem-content-top-subTitle text-flow-ellipsis-multiple"
                    >{{ handleLimit(item) }}</view
                >
                <view class="dailyItem-content-top-merchant">
                    <image
                        class="dailyItem-content-top-merchant-img"
                        :src="item.merchant.icon"
                    />
                    <view class="dailyItem-content-top-merchant-title">{{
                        item.merchant.name
                    }}</view>
                </view>
            </view>
            <view class="dailyItem-content-bottom">
                <view
                    class="dailyItem-content-bottom-btn"
                    @tap.stop="emits('didClickItem')"
                >
                    <image
                        class="dailyItem-content-bottom-btn-img"
                        :src="
                            item.receiveStatus === 0
                                ? 'https://jms.85gui7.com/kahe-202510/home-upgrade/btn-style1-normal.png'
                                : 'https://jms.85gui7.com/kahe-202510/home-upgrade/btn-style1-disable.png'
                        "
                    />
                    <view
                        class="dailyItem-content-bottom-btn-title theme-font"
                        >{{
                            item.receiveStatus === 0 ? '领取' : '已领取'
                        }}</view
                    >
                </view>
                <view class="dailyItem-content-bottom-title"
                    >今日在本店消费满{{ item.receiveScore }}可领取</view
                >
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { CouponModel } from '@/model'

import { getMainTagName } from '@/utils/tools/image'

defineProps({
    item: {
        default: {},
        type: Object as PropType<CouponModel>
    }
})

const handleLimit = (item: CouponModel) => {
    return item.cates?.map(item => getName(Number(item))).join('、') + '可用'
}

const getName = (value: number) => {
    return getMainTagName(value)
}

const emits = defineEmits(['didClickItem'])
</script>

<style lang="scss" scoped>
.dailyItem {
    position: relative;
    width: 100%;
    aspect-ratio: 353 / 380;
    &-bg {
        width: 100%;
        height: 100%;
    }
    &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        &-top {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            &-title {
                margin-top: 50rpx;
                font-weight: 400;
                font-size: 36rpx;
                color: #191919;
            }
            &-subTitle {
                width: calc(100% - 52px);
                font-weight: normal;
                text-align: center;
                font-size: 26rpx;
                color: #727272;
            }
            &-merchant {
                margin-top: 50rpx;
                display: flex;
                flex-direction: row;
                align-items: center;
                &-img {
                    width: 36rpx;
                    height: 36rpx;
                    background-color: #b7b7b7;
                    border-radius: 50%;
                }
                &-title {
                    margin-left: 5rpx;
                    font-weight: normal;
                    font-size: 18rpx;
                    color: #504f4f;
                }
            }
        }
        &-bottom {
            position: absolute;
            bottom: 30rpx;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            &-btn {
                position: relative;
                width: 169rpx;
                height: 51rpx;
                &-img {
                    width: 100%;
                    height: 100%;
                }
                &-title {
                    position: absolute;
                    top: 2rpx;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    font-weight: 400;
                    font-size: 30rpx;
                    color: #ffffff;
                    text-shadow: 0 2rpx 0 #a02301;
                }
            }
            &-title {
                font-weight: normal;
                font-size: 16rpx;
                color: #ffffff;
            }
        }
    }
}
</style>
