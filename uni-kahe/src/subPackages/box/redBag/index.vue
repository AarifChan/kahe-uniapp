<template>
    <view class="redEnvelope">
        <image class="redEnvelope-bg" src="https://jms.85gui7.com/kahe-202510/redEnvelope/bg1.png" />
        <view class="redEnvelope-content">
            <view class="redEnvelope-content-top">
                <decorate-avatar
                    class="redEnvelope-content-top-avatar"
                    :level="redBagOwner?.level"
                    :avatar="redBagOwner?.avatar"
                    :scale="0.8"
                />
                <view class="redEnvelope-content-top-tips">{{
                    detail?.redbag.title
                }}</view>
            </view>
            <view class="redEnvelope-content-card">
                <view class="redEnvelope-content-card-item">
                    <view class="redEnvelope-content-card-item-goods">
                        <image
                            class="redEnvelope-content-card-item-goods-img"
                            :src="detail?.goodsDto.image"
                            mode="widthFix"
                        />
                        <image
                            class="redEnvelope-content-card-item-goods-level"
                            :src="
                                getLevelImageByLevel(
                                    detail?.goodsDto.level ?? 0
                                )
                            "
                        />
                    </view>
                    <view class="redEnvelope-content-card-item-bottom">
                        <text
                            class="redEnvelope-content-card-item-bottom-title text-flow-ellipsis-single"
                            >{{ detail?.goodsDto.name }}</text
                        >
                        <text
                            class="redEnvelope-content-card-item-bottom-subTitle text-flow-ellipsis-single"
                            >获得日期:{{
                                parseTime(
                                    detail?.redbag?.createTime,
                                    '{y}-{m}-{d}'
                                )
                            }}</text
                        >
                        <text
                            class="redEnvelope-content-card-item-bottom-subTitle text-flow-ellipsis-single"
                            >指导价:{{ detail?.goodsDto.price }}</text
                        >
                    </view>
                    <image
                        class="redEnvelope-content-card-item-bg"
                        src="https://jms.85gui7.com/kahe-202510/redEnvelope/item-bg.png"
                    />
                </view>
            </view>
            <view class="redEnvelope-content-center">
                <view class="redEnvelope-content-center-head">
                    <text class="redEnvelope-content-center-head-title"
                        >已领取{{
                            detail?.redbag.totalNum - detail?.redbag?.num
                        }}/{{ detail?.redbag?.totalNum }}个</text
                    >
                    <view class="redEnvelope-content-center-head-center">
                        <image
                            class="redEnvelope-content-center-head-center-img"
                            src="https://jms.85gui7.com/kahe-202510/redEnvelope/count.png"
                        />
                        <text
                            class="redEnvelope-content-center-head-center-title"
                            >≥{{ detail?.redbag.amount }}元</text
                        >
                    </view>
                </view>
                <scroll-view class="redEnvelope-content-center-list">
                    <user-row
                        v-for="(item, index) in userList"
                        :item="item"
                        :key="'userRow' + index"
                    />
                    <view
                        class="redEnvelope-content-center-list-empty"
                        v-if="userList.length === 0"
                    >
                        <image
                            class="redEnvelope-content-center-list-empty-img"
                            src="https://jms.85gui7.com/kahe-202510/redEnvelope/big.png"
                        />
                        <text
                            class="redEnvelope-content-center-list-empty-title"
                            >暂时还无人领取，快抢先一步吧～</text
                        >
                    </view>
                </scroll-view>
                <view
                    class="redEnvelope-content-center-tips"
                    v-if="redBagState === RedBagState.normal"
                >
                    <text class="redEnvelope-content-center-tips-title">{{
                        currentComment
                    }}</text>
                    <view
                        class="redEnvelope-content-center-tips-btn"
                        @tap.stop="changeComment"
                    >
                        <image
                            class="redEnvelope-content-center-tips-btn-img"
                            src="https://jms.85gui7.com/kahe-202510/redEnvelope/exchange.png"
                        />
                        <text
                            class="redEnvelope-content-center-tips-btn-title theme-font"
                            >换一换</text
                        >
                    </view>
                </view>
                <view class="redEnvelope-content-center-tips" v-else>
                    <text
                        class="redEnvelope-content-center-tips-title"
                        style="width: 100%; text-align: center"
                    >
                        {{ getRedBagStateTips(redBagState) }}
                    </text>
                </view>
            </view>
            <view class="redEnvelope-content-bottom">
                <view class="redEnvelope-content-bottom-head">
                    <text class="redEnvelope-content-bottom-head-title"
                        >分享者累计总获得:</text
                    >
                    <image
                        class="redEnvelope-content-bottom-head-img"
                        src="https://jms.85gui7.com/kahe-202510/redEnvelope/ticket.png"
                    />
                    <text class="redEnvelope-content-bottom-head-value">{{
                        Number(
                            detail?.redbag.totalNew - detail?.redbag.amountNew
                        ).toFixed(2)
                    }}</text>
                </view>
                <button
                    v-if="redBagState === RedBagState.share"
                    open-type="share"
                    class="redEnvelope-content-bottom-btn"
                >
                    <image
                        class="redEnvelope-content-bottom-btn-bg"
                        src="https://jms.85gui7.com/kahe-202510/redEnvelope/share-btn.png"
                    />
                    <text
                        class="redEnvelope-content-bottom-btn-title theme-font"
                        >分 享 红 包</text
                    >
                </button>
                <view
                    v-else-if="redBagState === RedBagState.normal"
                    open-type="share"
                    class="redEnvelope-content-bottom-btn"
                    @tap.stop="handleReceivedRedBag"
                >
                    <image
                        class="redEnvelope-content-bottom-btn-bg"
                        src="https://jms.85gui7.com/kahe-202510/redEnvelope/share-btn.png"
                    />
                    <text
                        class="redEnvelope-content-bottom-btn-title theme-font"
                        >领 取 红 包</text
                    >
                </view>
                <text
                    v-else
                    class="redEnvelope-content-bottom-btn-tips theme-font"
                    >{{
                        redBagState === RedBagState.received
                            ? '已 领 取'
                            : redBagState === RedBagState.finished
                            ? '已 领 完'
                            : '已 过 期'
                    }}</text
                >

                <view class="redEnvelope-content-bottom-time">
                    <image
                        class="redEnvelope-content-bottom-time-img"
                        src="https://jms.85gui7.com/kahe-202510/redEnvelope/time.png"
                    />
                    <text class="redEnvelope-content-bottom-time-title"
                        >截止时间：{{ detail?.redbag.expiretime }}</text
                    >
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import DecorateAvatar from '@/components/custom/DecorateAvatar/index.vue'
import { RedBagState, useRedBag } from '@/composables/redBag'
import { onMounted } from 'vue'
import { parseTime } from '@/utils/tools'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import UserRow from '../components/redBag/index.vue'
import { useEnum } from '@/composables/enum'
const { getLevelImageByLevel } = useEnum()
const {
    getRedBagDetail,
    detail,
    currentComment,
    changeComment,
    handleReceivedRedBag,
    redBagOwner,
    userList,
    redBagState,
    getRedBagStateTips
} = useRedBag()

onMounted(() => {
    getRedBagDetail()
})

onShareAppMessage(() => {
    return {
        title: `${detail.value?.redbag.title}，一起来瓜分红包吧`,
        imageUrl: `${detail.value?.goodsDto.image}`,
        path: `/subPackages/box/redBag/index?id=${detail.value?.redbag.id}`
    }
})
onShareTimeline(() => {
    return {
        title: `${detail.value?.redbag.title}，一起来瓜分红包吧`,
        imageUrl: `${detail.value?.goodsDto.image}`,
        path: `/subPackages/box/redBag/index?id=${detail.value?.redbag.id}`
    }
})
</script>

<style lang="scss" scoped>
.redEnvelope {
    position: relative;
    width: 100%;
    height: 100vh;
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
        display: flex;
        flex-direction: column;

        &-top {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            &-avatar {
                width: 90rpx;
                height: 90rpx;
            }
            &-tips {
                margin-top: 48rpx;
                margin-left: 80rpx;
                position: relative;
                padding: 0 16rpx;
                height: 66rpx;
                line-height: 66rpx;
                background: #ffe5de;
                border-radius: 8rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #000000;
            }
            &-tips::before {
                position: absolute;
                left: -20rpx;
                top: 18rpx;
                content: '';
                width: 0;
                height: 0;
                border-top: 16rpx solid transparent;
                border-bottom: 16rpx solid transparent;
                border-right: 20rpx solid #ffe5de;
            }
        }

        &-card {
            margin-top: 42rpx;
            position: relative;
            align-items: center;
            justify-content: center;
            display: flex;
            flex-direction: row;
            &-item {
                position: relative;
                width: 201rpx;
                height: 324rpx;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                &-goods {
                    position: relative;
                    margin-top: 48rpx;
                    overflow: hidden;
                    width: 198rpx;
                    height: 198rpx;
                    &-img {
                        width: 100%;
                        height: 100%;
                    }
                    &-level {
                        position: absolute;
                        width: 74rpx;
                        height: 52rpx;
                        left: 0;
                        bottom: 0;
                    }
                }

                &-bottom {
                    width: calc(100% - 24rpx);
                    height: 123rpx;
                    padding: 12rpx;
                    background-color: black;
                    display: flex;
                    flex-direction: column;
                    &-title {
                        font-weight: 400;
                        font-size: 18rpx;
                        color: #ffffff;
                    }
                    &-subTitle {
                        font-weight: 400;
                        font-size: 18rpx;
                        color: #929292;
                    }
                }
                &-bg {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        &-center {
            position: relative;
            margin: 68rpx 40rpx 0 40rpx;
            width: calc(100% - 80rpx);
            &-head {
                position: relative;
                width: 100%;
                &-title {
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #ffffff;
                    text-align: left;
                }
                &-center {
                    position: absolute;
                    top: 0;
                    left: calc((100% - 300rpx) / 2);
                    width: 300rpx;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    &-img {
                        width: 73rpx;
                        height: 49rpx;
                    }
                    &-title {
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #ffffff;
                    }
                }
            }
            &-list {
                margin: 26rpx 4rpx 0 4rpx;
                width: calc(100% - 16rpx - 36rpx);
                height: 508rpx;
                padding: 18rpx;
                background-color: rgba(255, 255, 255, 0.4);
                &-empty {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    &-img {
                        width: 209rpx;
                        height: 208rpx;
                    }
                    &-title {
                        margin-top: 52rpx;
                        font-weight: 400;
                        font-size: 22rpx;
                        color: #773131;
                    }
                }
            }
            &-tips {
                margin: 32rpx 4rpx 0 4rpx;
                width: calc(100% - 40rpx);
                display: flex;
                padding: 16rpx;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                background-color: rgba(255, 255, 255, 0.4);
                &-title {
                    margin-left: 24rpx;
                    font-weight: 400;
                    font-size: 20rpx;
                    color: #773131;
                }
                &-btn {
                    width: 126rpx;
                    height: 47rpx;
                    background: #f8c259;
                    box-shadow: 2rpx 1rpx 4rpx 0rpx rgba(25, 39, 138, 0.25);
                    border-radius: 4rpx;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;

                    &-img {
                        width: 23rpx;
                        height: 20rpx;
                    }
                    &-title {
                        font-weight: 400;
                        font-size: 27rpx;
                        color: #a32c40;
                    }
                }
            }
        }

        &-bottom {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            left: 0;
            width: 100vw;
            bottom: calc(env(safe-area-inset-bottom) / 2);
            &-head {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-title {
                    font-weight: normal;
                    font-size: 20rpx;
                    color: #315dff;
                }
                &-img {
                    width: 28rpx;
                    height: 35rpx;
                }
                &-value {
                    font-weight: 400;
                    font-size: 20rpx;
                    color: #ffffff;
                }
            }
            &-btn {
                border: none;
                padding: 0;
                margin: 0;
                position: relative;
                width: 248rpx;
                height: 78rpx;
                background-color: transparent;
                &-bg {
                    width: 100%;
                    height: 100%;
                }
                &-title {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 78rpx;
                    text-align: center;
                    line-height: 78rpx;
                    font-weight: 400;
                    font-size: 38rpx;
                    color: #ffffff;
                }
                &-tips {
                    width: 100%;
                    height: 78rpx;
                    text-align: center;
                    line-height: 78rpx;
                    font-weight: 400;
                    font-size: 38rpx;
                    color: #ffffff;
                }
            }
            &-btn::after {
                border: none;
                background-color: transparent;
            }
            &-time {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-img {
                    width: 27rpx;
                    height: 27rpx;
                }
                &-title {
                    margin-left: 8rpx;
                    font-weight: 400;
                    font-size: 20rpx;
                    color: #ffffff;
                }
            }
        }
    }
}
</style>
