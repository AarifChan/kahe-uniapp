<template>
    <view class="redEnvelope relative w-full h-screen">
        <image class="redEnvelope-bg w-full h-full" src="/static/kahe-202510/redEnvelope/bg1.png" />
        <view class="redEnvelope-content absolute left-0 top-0 w-full h-full flex flex-col">
            <view class="redEnvelope-content-top relative w-full flex flex-row items-center">
                <decorate-avatar
                    class="redEnvelope-content-top-avatar w-90 h-90"
                    :level="redBagOwner?.level"
                    :avatar="redBagOwner?.avatar"
                    :scale="0.8"
                />
                <view class="redEnvelope-content-top-tips relative mt-48 ml-80 px-16 h-66 leading-66 bg-[#ffe5de] rounded-8 font-normal text-24 text-black"
                    >{{ detail?.redbag.title }}
                </view>
                <view
                    class="absolute mt-48"
                    :style="{
                        left: 'calc(90rpx + 80rpx - 20rpx)',
                        top: '18rpx',
                        width: 0,
                        height: 0,
                        borderTop: '16rpx solid transparent',
                        borderBottom: '16rpx solid transparent',
                        borderRight: '20rpx solid #ffe5de',
                    }"
                />
            </view>

            <view class="redEnvelope-content-card mt-42 relative flex flex-row items-center justify-center">
                <view class="redEnvelope-content-card-item relative w-201 h-324 flex flex-col justify-start items-center">
                    <view class="redEnvelope-content-card-item-goods relative mt-48 overflow-hidden w-198 h-198">
                        <image
                            class="redEnvelope-content-card-item-goods-img w-full h-full"
                            :src="detail?.goodsDto.image"
                            mode="widthFix"
                        />
                        <image
                            class="redEnvelope-content-card-item-goods-level absolute w-74 h-52 left-0 bottom-0"
                            :src="getLevelImageByLevel(detail?.goodsDto.level ?? 0)"
                        />
                    </view>

                    <view class="redEnvelope-content-card-item-bottom w-[calc(100%-24rpx)] h-123 p-12 bg-black flex flex-col">
                        <text class="redEnvelope-content-card-item-bottom-title font-normal text-18 text-white text-flow-ellipsis-single"
                            >{{ detail?.goodsDto.name }}
                        </text>
                        <text class="redEnvelope-content-card-item-bottom-subTitle font-normal text-18 text-[#929292] text-flow-ellipsis-single"
                            >获得日期:{{ parseTime(detail?.redbag?.createTime, '{y}-{m}-{d}') }}
                        </text>
                        <text class="redEnvelope-content-card-item-bottom-subTitle font-normal text-18 text-[#929292] text-flow-ellipsis-single"
                            >指导价:{{ detail?.goodsDto.price }}
                        </text>
                    </view>
                    <image
                        class="redEnvelope-content-card-item-bg absolute left-0 top-0 w-full h-full"
                        src="/static/kahe-202510/redEnvelope/item-bg.png"
                    />
                </view>
            </view>
            <view class="redEnvelope-content-center relative mt-68 mx-40 w-[calc(100%-80rpx)]">
                <view class="redEnvelope-content-center-head relative w-full">
                    <text class="redEnvelope-content-center-head-title font-normal text-24 text-white text-left"
                        >已领取{{ detail?.redbag.totalNum - detail?.redbag?.num }}/{{ detail?.redbag?.totalNum }}个
                    </text>
                    <view class="redEnvelope-content-center-head-center absolute top-0 left-[calc((100%-300rpx)/2)] w-300 flex flex-row items-center justify-center">
                        <image
                            class="redEnvelope-content-center-head-center-img w-73 h-49"
                            src="/static/kahe-202510/redEnvelope/count.png"
                        />
                        <text class="redEnvelope-content-center-head-center-title font-normal text-24 text-white"
                            >≥{{ detail?.redbag.amount }}元
                        </text>
                    </view>
                </view>
                <scroll-view class="redEnvelope-content-center-list mt-26 mx-4 w-[calc(100%-52rpx)] h-508 p-18 bg-[rgba(255,255,255,0.4)]"
                >
                    <user-row
                        v-for="(item, index) in userList"
                        :item="item"
                        :key="'userRow' + index"
                    />
                    <view
                        class="redEnvelope-content-center-list-empty relative w-full h-full flex flex-col items-center justify-center"
                        v-if="userList.length === 0"
                    >
                        <image
                            class="redEnvelope-content-center-list-empty-img w-209 h-208"
                            src="/static/kahe-202510/redEnvelope/big.png"
                        />
                        <text class="redEnvelope-content-center-list-empty-title mt-52 font-normal text-22 text-[#773131]"
                            >暂时还无人领取，快抢先一步吧～
                        </text>
                    </view>
                </scroll-view>
                <view
                    class="redEnvelope-content-center-tips mt-32 mx-4 w-[calc(100%-40rpx)] flex p-16 flex-row items-center justify-between bg-[rgba(255,255,255,0.4)]"
                    v-if="redBagState === RedBagState.normal"
                >
                    <text class="redEnvelope-content-center-tips-title ml-24 font-normal text-20 text-[#773131]"
                        >{{ currentComment }}
                    </text>
                    <view
                        class="redEnvelope-content-center-tips-btn w-126 h-47 bg-[#f8c259] shadow-[2rpx_1rpx_4rpx_0rpx_rgba(25,39,138,0.25)] rounded-4 flex flex-row items-center justify-center"
                        @tap.stop="changeComment"
                    >
                        <image
                            class="redEnvelope-content-center-tips-btn-img w-23 h-20"
                            src="/static/kahe-202510/redEnvelope/exchange.png"
                        />
                        <text class="redEnvelope-content-center-tips-btn-title font-normal text-27 text-[#a32c40] theme-font"
                            >换一换
                        </text>
                    </view>
                </view>
                <view class="redEnvelope-content-center-tips mt-32 mx-4 w-[calc(100%-40rpx)] flex p-16 flex-row items-center justify-between bg-[rgba(255,255,255,0.4)]" v-else
                >
                    <text
                        class="redEnvelope-content-center-tips-title ml-24 font-normal text-20 text-[#773131]"
                        style="width: 100%; text-align: center"
                    >
                        {{ getRedBagStateTips(redBagState) }}
                    </text>
                </view>
            </view>
            <view
                class="redEnvelope-content-bottom absolute flex flex-col items-center left-0 w-screen"
                :style="{ bottom: 'calc(env(safe-area-inset-bottom) / 2)' }"
            >
                <view class="redEnvelope-content-bottom-head flex flex-row items-center">
                    <text class="redEnvelope-content-bottom-head-title font-normal text-20 text-[#315dff]"
                        >分享者累计总获得:
                    </text>
                    <image
                        class="redEnvelope-content-bottom-head-img w-28 h-35"
                        src="/static/kahe-202510/redEnvelope/ticket.png"
                    />
                    <text class="redEnvelope-content-bottom-head-value font-normal text-20 text-white"
                        >{{ Number(detail?.redbag.totalNew - detail?.redbag.amountNew).toFixed(2) }}
                    </text>
                </view>
                <button
                    v-if="redBagState === RedBagState.share"
                    open-type="share"
                    plain
                    class="redEnvelope-content-bottom-btn relative w-248 h-78 bg-transparent p-0 m-0 border-none"
                    style="border: none; background: transparent;"
                >
                    <image
                        class="redEnvelope-content-bottom-btn-bg w-full h-full"
                        src="/static/kahe-202510/redEnvelope/share-btn.png"
                    />
                    <text class="redEnvelope-content-bottom-btn-title absolute left-0 top-0 w-full h-78 text-center leading-78 font-normal text-38 text-white theme-font"
                        >分 享 红 包
                    </text>
                </button>
                <view
                    v-else-if="redBagState === RedBagState.normal"
                    open-type="share"
                    class="redEnvelope-content-bottom-btn relative w-248 h-78 bg-transparent p-0 m-0 border-none"
                    style="border: none; background: transparent;"
                    @tap.stop="handleReceivedRedBag"
                >
                    <image
                        class="redEnvelope-content-bottom-btn-bg w-full h-full"
                        src="/static/kahe-202510/redEnvelope/share-btn.png"
                    />
                    <text class="redEnvelope-content-bottom-btn-title absolute left-0 top-0 w-full h-78 text-center leading-78 font-normal text-38 text-white theme-font"
                        >领 取 红 包
                    </text>
                </view>
                <text
                    v-else
                    class="redEnvelope-content-bottom-btn-tips w-full h-78 text-center leading-78 font-normal text-38 text-white theme-font"
                    >{{
                        redBagState === RedBagState.received
                            ? '已 领 取'
                            : redBagState === RedBagState.finished
                            ? '已 领 完'
                            : '已 过 期'
                    }}
                </text>

                <view class="redEnvelope-content-bottom-time flex flex-row items-center">
                    <image
                        class="redEnvelope-content-bottom-time-img w-27 h-27"
                        src="/static/kahe-202510/redEnvelope/time.png"
                    />
                    <text class="redEnvelope-content-bottom-time-title ml-8 font-normal text-20 text-white"
                        >截止时间：{{ detail?.redbag.expiretime }}
                    </text>
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
</style>
