<template>
    <view class="vip">
        <!-- <image src="https://jms.85gui7.com/kahe-202510/images/mine-bg.png" style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;" /> -->
        <view class="vip-top">
            <view class="vip-top-content">
                <image src="https://jms.85gui7.com/kahe-202510/ka-he/mine/svip-bg.png" class="vip-top-bg" />
                <view class="vip-top-content-avatar">
                    <decorate-avatar :avatar="userInfo.avatar" :level="userInfo.vip" />
                </view>
                <view class="vip-top-content-title">
                    <!-- <image class="vip-top-content-title-img" src="https://jms.85gui7.com/kahe-202510/images/mine-nickname.png" /> -->
                    <view class="vip-top-content-title-text">{{
                        userInfo.nickname ?? "用户昵称"
                        }}</view>
                </view>
                <view class="vip-top-content-rightTitle" @tap.stop="handleShowRule">
                    <!-- <image class="vip-top-content-rightTitle-img" src="https://jms.85gui7.com/kahe-202510/images/vip-right-bg.png"
                        style="width: 109rpx;height: 42rpx;position: absolute;left: 0;top: 0;" /> -->
                    <text class="vip-top-content-rightTitle-title" style="font-size: 16rpx;
                    color: #000000; position: relative;">规则说明</text>
                </view>
                <view class="vip-top-content-info">
                    <view class="vip-top-content-info-level">
                        <text class="vip-top-content-info-level-before theme-font">VIP{{ userInfo.vip }}</text>
                        <view class="vip-top-content-info-level-progress">
                            <view class="vip-top-content-info-level-progress-value" :style="progressStyle"></view>
                            <text class="vip-top-content-info-level-progress-title  text-flow-ellipsis-single">今日成长值{{
                                userInfo.expDay ?? 0 }}点</text>
                        </view>
                        <text class="vip-top-content-info-level-before theme-font">VIP{{ userInfo.vip + 1 }}</text>
                    </view>
                    <view class="vip-top-content-info-current">
                        <view style="margin-right: 50rpx; display: flex;">
                            <view class="vip-top-content-info-current-title">当前</view>
                            <view class="vip-top-content-info-current-value">{{ userInfo.exp ?? 0 }}</view>
                            <view class="vip-top-content-info-current-title">点，需要{{ currentLevelExp }}点升级</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="vip-table">
            <view class="vip-table-head">
                <image class="vip-table-head-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/mine/top1.png" />
                <view class="vip-table-head-title theme-font" style="color: #fff;">等级</view>
                <view class="vip-table-head-title theme-font">升级奖励</view>
                <view class="vip-table-head-title theme-font">每日奖励</view>
            </view>
            <scroll-view class="vip-table-content" :enable-flex="true" :scroll-y="true" scroll-with-animation>
                <view v-for="(item, index) in vipModels" :id="'vip-table:id' + index" :key="'vip-table:key' + index"
                    class="vip-table-content-row">
                    <image class="vip-table-content-row-bg"
                        :src="item.id === userInfo.vip ? 'https://jms.85gui7.com/kahe-202510/ka-he/mine/top2.png' : 'https://jms.85gui7.com/kahe-202510/ka-he/mine/top3.png'" />
                    <view class="vip-table-content-row-item">
                        <text class="vip-table-content-row-item-title theme-font">{{ item.id }}</text>
                    </view>
                    <view class="vip-table-content-row-item vip-table-content-row-column">
                        <view v-for="(v, vIndex) in item.rewards" :id="index + 'reward:id' + vIndex"
                            :key="index + 'reward:key' + vIndex" class="vip-table-content-row-item-c">
                            <image src="https://jms.85gui7.com/kahe-202510/images/vip-icon1.png" style="height: 27rpx;" mode="heightFix"
                                v-if="v.name === '点券'" />
                            <image :src="v.logo" style="height: 27rpx;" mode="heightFix" v-if="v.logo" />
                            <text class="vip-table-content-row-item-c-title">{{ v.name }} x{{ v.num }}</text>
                        </view>
                    </view>
                    <view class="vip-table-content-row-item vip-table-content-row-column">
                        <view v-for="(v, vIndex) in item.rewardsDay" :id="index + 'rewardsDay:id' + vIndex"
                            :key="index + 'rewardsDay:key' + vIndex" class="vip-table-content-row-item-d">
                            <image src="https://jms.85gui7.com/kahe-202510/images/vip-icon1.png" style="height: 27rpx;" mode="heightFix"
                                v-if="v.name === '点券'" />
                            <text class="vip-table-content-row-item-d-title"> {{ v.num ? v.num + v.name : v.name
                                }}</text>
                        </view>

                    </view>
                </view>
                <view class="empty"></view>
                <empty :show="vipModels.length === 0" />
            </scroll-view>
        </view>
        <!-- <bottom-bar /> -->
        <view class="page-control">
            <image class="page-control-arrow" src="https://jms.85gui7.com/kahe/vip/left.png" mode="aspectFit"
                @tap.stop="changePage(false)" />
            <view v-for="(item, index) in pageItem" :id="'vip-pageControl:id' + index" :key="'vip-pageControl:' + index"
                class="page-control-item" :class="item === pageParams.page ? 'active' : ''"
                @tap.stop="changeCurrentPage(item)">{{ item }}
            </view>
            <image class="page-control-arrow" src="https://jms.85gui7.com/kahe/vip/right.png" mode="aspectFit"
                @tap.stop="changePage(true)" />
        </view>
        <common-model v-model:show="modelShow" :title="title" :content="content" />
    </view>
</template>

<script lang="ts" setup>
import CommonModel from '@/components/modal/index.vue'
import { UserModule } from '@/store/modules/user'
import { ref, computed, onMounted } from 'vue'
import type { VipsLevelModel } from '@/model'
import BottomBar from '@/components/bottom/index.vue'
import Empty from '@/components/empty/index.vue'
import DecorateAvatar from '@/components/custom/DecorateAvatar/index.vue'

import { modalContent } from '@/utils/tools/content'
const userInfo = ref(computed(() => UserModule.userInfo))

const currentLevelExp = ref(
    computed(() => {
        let levelExp = 0
        for (const item of UserModule.vipLevelsModel) {
            if (item.id === userInfo.value.vip + 1) {
                levelExp = item.exp = item.exp ?? 0
            }
        }
        return levelExp
    })
)

const needExp = ref(
    computed(() => {
        const userExp = userInfo.value.exp
        let levelExp = 0
        for (const item of UserModule.vipLevelsModel) {
            if (item.id === userInfo.value.vip) {
                levelExp = item.exp = item.exp ?? 0
            }
        }
        if (levelExp) {
            return userExp - levelExp > 0 ? userExp - levelExp : 0
        } else {
            return 0
        }
    })
)

const totalPage = ref(0)

const vipModels = computed((): VipsLevelModel[] => UserModule.vipLevelsModel)

const pageItem = ref([] as number[])

const progress = ref(
    computed(() => {
        if (currentLevelExp.value > 0) {
            console.log('need:', needExp.value, currentLevelExp.value - lastLevelExp.value)
            return Math.floor((needExp.value / (currentLevelExp.value - lastLevelExp.value)) * 100)
        } else {
            return 100
        }
    })
)

const lastLevelExp = computed(() => {
    let levelExp = 0
    for (const item of UserModule.vipLevelsModel) {
        if (item.id === userInfo.value.vip) {
            levelExp = item.exp = item.exp ?? 0
        }
    }
    return levelExp
})

const progressStyle = ref(
    computed(() => `width:${progress.value}%`)
)

const pageParams = ref({
    limit: 200,
    page: 1
})

const changePage = (isForward: boolean) => {
    if (isForward && totalPage.value > pageParams.value.page) {
        pageParams.value.page++
    } else if (!isForward && pageParams.value.page > 1) {
        pageParams.value.page--
    } else {
        return
    }
    loadVipLevelData()
}

const loadVipLevelData = async () => {
    const totalNum = await UserModule.getVipLevelList(pageParams.value)
    console.log('totalNum', totalNum)
    const page = Math.ceil(totalNum / pageParams.value.limit)

    const items: number[] = []
    for (let i = 1; i <= page; i++) {
        items.push(i)
    }
    totalPage.value = page
    pageItem.value = items
}

const changeCurrentPage = (index: number) => {
    pageParams.value.page = index
    loadVipLevelData()
}
const modelShow = ref(false)
const title = ref('VIP规则')
const content = ref('')
const handleShowRule = () => {
    modelShow.value = true
    content.value = modalContent(5)
}

onMounted(() => {
    loadVipLevelData()
})
</script>

<style lang="scss" scoped>
.vip {
    position: relative;
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    background: linear-gradient(to bottom, #fee8cb 100%, #fffaf2 100%);

    &-top {
        padding: 24rpx;
        box-sizing: border-box;

        &-bg {
            width: 100%;
            height: 253rpx;
        }

        &-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;

            &-avatar {
                position: absolute;
                left: -10rpx;
                top: -10rpx;
            }

            &-rightTitle {
                padding-left: 5rpx;
                position: absolute;
                right: 26rpx;
                top: 25rpx;
                text-align: center;
                line-height: 25rpx;
                width: 98rpx;
                height: 34rpx;
                background: linear-gradient(0deg, #FFEEC5);
                box-shadow: 0rpx 2rpx 0rpx 0rpx #774718;
                border-radius: 17rpx;
                border: 2px solid #CDA374;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            &-title {
                position: absolute;
                left: 165rpx;
                top: 25rpx;
                display: flex;
                flex-direction: row;
                align-items: center;

                // &-img {
                //     width: 100%;
                //     height: 100%;
                //     position: absolute;
                //     left: 0;
                //     top: 0;
                // }

                &-text {
                    position: relative;
                    color: #000000;
                    font-size: 30rpx;
                    margin-left: 20rpx;
                }
            }

            &-info {
                pointer-events: none;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                &-title {
                    margin-top: 8rpx;
                    margin-left: 14rpx;
                    font-size: 30rpx;
                    font-weight: 400;
                    color: #FFFFFF;
                }

                &-level {
                    margin-top: 40rpx;
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;

                    &-before {
                        font-size: 36rpx;
                        font-weight: 400;
                        color: #BF5133;
                    }

                    &-progress {
                        position: relative;
                        width: 338rpx;
                        height: 21rpx;
                        background-color: #B9C4C7;
                        border-radius: 10rpx;
                        margin: 0 10rpx;

                        &-value {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background-color: #FF673E;
                            border-radius: 10rpx;
                        }

                        &-title {
                            position: absolute;
                            top: -30rpx;
                            left: 50%;
                            transform: translateX(-50%);
                            line-height: 28rpx;
                            font-family: Adobe Heiti Std;
                            font-weight: normal;
                            font-size: 20rpx;
                            color: #000000;
                        }
                    }
                }

                &-current {
                    // position: absolute;
                    // bottom: 100rpx;
                    // left: 50%;
                    // transform: translateX(-50%);
                    display: flex;
                    flex-direction: row;
                    align-items: baseline;
                    justify-content: center;
                    width: 100%;

                    &-title {
                        font-family: Adobe Heiti Std;
                        font-weight: normal;
                        font-size: 20rpx;
                        color: #000000;
                    }

                    &-value {
                        font-size: 20rpx;
                        color: #000000;
                    }
                }
            }

            &-decorate {
                position: absolute;
                right: 0;
                top: 0;
                width: 256rpx;
                height: 256rpx;
            }
        }
    }

    &-table {
        width: 100%;
        padding: 8rpx 20rpx 8rpx 20rpx;
        box-sizing: border-box;
        overflow: auto;
        flex: 1;

        &-head {
            position: relative;
            // width: 707rpx;
            height: 60rpx;
            border-radius: 4rpx;
            display: flex;

            &-bg {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }

            &-title {
                position: relative;
                font-size: 26rpx;
                font-weight: 400;
                text-align: center;
                line-height: 60rpx;
                width: 25%;
                color: #000000;
            }

            &-title:nth-of-type(1) {
                margin-left: -20rpx;
            }

            &-title:nth-of-type(2) {
                margin-left: 20rpx;
            }

            &-title:nth-of-type(3) {
                margin-left: 125rpx;
            }

        }

        &-content {
            &-row {
                position: relative;
                display: flex;
                height: 135rpx;
                align-items: center;
                justify-content: space-evenly;
                margin-bottom: 10rpx;

                &-bg {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                &-item {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: baseline;
                    width: 30%;

                    &-title {
                        font-size: 50rpx;
                        color: #FFFFFF;
                        margin-left: -94rpx;
                    }

                    &-c {
                        display: flex;
                        align-items: center;
                        margin-left: -55rpx;

                        &-title {
                            position: relative;
                            font-size: 24rpx;
                            color: #000;
                        }
                    }

                    &-d {
                        display: flex;
                        margin-left: 60rpx;
                        align-items: center;

                        &-title {
                            font-size: 24rpx;
                            color: #000;

                        }
                    }
                }

                &-column {
                    display: flex;
                    flex-direction: column;
                }
            }

            &-empty {
                height: 60rpx;
                width: 100%;
            }
        }
    }

    &-question {
        position: fixed;
        right: 60rpx;
        bottom: 220rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &-content {
            position: relative;

            &-icon {
                position: absolute;
                left: calc((100% - 30rpx) / 2);
                top: 40rpx;
                width: 30rpx;
                height: 46rpx;
            }
        }
    }
}

.page-control {
    // position: fixed;
    // bottom: calc(env(safe-area-inset-bottom) + 26rpx);
    // left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: calc(env(safe-area-inset-bottom) + 103rpx);
    background: #FDFDF1;
    box-shadow: 0rpx 2rpx 0rpx 0rpx rgba(243, 182, 113, 0.58);
    padding-bottom: env(safe-area-inset-bottom);

    &-arrow {
        width: 48rpx;
        height: 48rpx;
        margin: 0 12rpx;
    }

    &-item {

        width: 42rpx;
        height: 42rpx;
        border-radius: 2rpx;
        border: 2rpx solid #4D4D4D;
        font-size: 34rpx;
        line-height: 42rpx;
        text-align: center;
        color: #4D4D4D;
        margin: 0 12rpx;

        &.active {
            color: #000000;
            border: 2rpx solid #000000;
        }
    }
}
</style>
