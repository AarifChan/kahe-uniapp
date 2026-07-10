<template>
    <view class="vip relative flex flex-col h-screen"
        :style="{ background: 'linear-gradient(to bottom, #fee8cb 100%, #fffaf2 100%)' }"
    >
        <view class="vip-top p-24 box-border">
            <view class="vip-top-content relative w-full flex">
                <image src="/static/kahe-202510/ka-he/mine/svip-bg.png" class="vip-top-bg w-full h-253" />
                <view class="vip-top-content-avatar absolute -left-10 -top-10">
                    <decorate-avatar :avatar="userInfo.avatar" :level="userInfo.vip" />
                </view>
                <view class="vip-top-content-title absolute left-165 top-25 flex flex-row items-center">
                    <view class="vip-top-content-title-text relative text-30 text-black ml-20">{{
                        userInfo.nickname ?? "用户昵称"
                        }}</view>
                </view>
                <view class="vip-top-content-rightTitle absolute right-26 top-25 text-center leading-25 w-98 h-34 rounded-17 flex justify-center items-center box-border pl-5 border-2px border-[#CDA374]"
                    :style="{ background: 'linear-gradient(0deg, #FFEEC5)', boxShadow: '0rpx 2rpx 0rpx 0rpx #774718' }"
                    @tap.stop="handleShowRule"
                >
                    <text class="vip-top-content-rightTitle-title relative text-16 text-black">规则说明</text>
                </view>
                <view class="vip-top-content-info pointer-events-none absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center">
                    <view class="vip-top-content-info-level mt-40 relative flex flex-row items-center justify-start">
                        <text class="vip-top-content-info-level-before theme-font text-36 font-400 text-[#BF5133]">VIP{{ userInfo.vip }}</text>
                        <view class="vip-top-content-info-level-progress relative w-338 h-21 bg-[#B9C4C7] rounded-10 mx-10">
                            <view class="vip-top-content-info-level-progress-value absolute left-0 top-0 h-full bg-[#FF673E] rounded-10" :style="progressStyle"></view>
                            <text class="vip-top-content-info-level-progress-title absolute -top-30 left-1/2 -translate-x-1/2 leading-28 font-normal text-20 text-black text-ellipsis">今日成长值{{
                                userInfo.expDay ?? 0 }}点</text>
                        </view>
                        <text class="vip-top-content-info-level-before theme-font text-36 font-400 text-[#BF5133]">VIP{{ userInfo.vip + 1 }}</text>
                    </view>
                    <view class="vip-top-content-info-current flex flex-row items-baseline justify-center w-full">
                        <view class="mr-50 flex">
                            <view class="vip-top-content-info-current-title font-normal text-20 text-black"
                                :style="{ fontFamily: 'Adobe Heiti Std' }">当前</view>
                            <view class="vip-top-content-info-current-value text-20 text-black">{{ userInfo.exp ?? 0 }}</view>
                            <view class="vip-top-content-info-current-title font-normal text-20 text-black"
                                :style="{ fontFamily: 'Adobe Heiti Std' }">点，需要{{ currentLevelExp }}点升级</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="vip-table w-full p-8 px-20 box-border overflow-auto flex-1">
            <view class="vip-table-head relative h-60 rounded-4 flex">
                <image class="vip-table-head-bg w-full h-full absolute left-0 top-0" src="/static/kahe-202510/ka-he/mine/top1.png" />
                <view class="vip-table-head-title theme-font relative text-26 font-400 text-center leading-60 w-1/4 text-white"
                    :style="{ marginLeft: '-20rpx' }"
                >等级</view>
                <view class="vip-table-head-title theme-font relative text-26 font-400 text-center leading-60 w-1/4 text-black"
                    :style="{ marginLeft: '20rpx' }"
                >升级奖励</view>
                <view class="vip-table-head-title theme-font relative text-26 font-400 text-center leading-60 w-1/4 text-black"
                    :style="{ marginLeft: '125rpx' }"
                >每日奖励</view>
            </view>
            <scroll-view class="vip-table-content" :enable-flex="true" :scroll-y="true" scroll-with-animation>
                <view v-for="(item, index) in vipModels" :id="'vip-table:id' + index" :key="'vip-table:key' + index"
                    class="vip-table-content-row relative flex h-135 items-center justify-evenly mb-10"
                >
                    <image class="vip-table-content-row-bg w-full h-full absolute left-0 top-0"
                        :src="item.id === userInfo.vip ? '/static/kahe-202510/ka-he/mine/top2.png' : '/static/kahe-202510/ka-he/mine/top3.png'" />
                    <view class="vip-table-content-row-item relative flex flex-row justify-center items-baseline"
                        :style="{ width: '30%' }"
                    >
                        <text class="vip-table-content-row-item-title theme-font text-50 text-white -ml-94">{{ item.id }}</text>
                    </view>
                    <view class="vip-table-content-row-item vip-table-content-row-column relative flex flex-col"
                        :style="{ width: '30%' }"
                    >
                        <view v-for="(v, vIndex) in item.rewards" :id="index + 'reward:id' + vIndex"
                            :key="index + 'reward:key' + vIndex" class="vip-table-content-row-item-c flex items-center -ml-55"
                        >
                            <image src="/static/kahe-202510/images/vip-icon1.png" style="height: 27rpx;" mode="heightFix"
                                v-if="v.name === '点券'" />
                            <image :src="v.logo" style="height: 27rpx;" mode="heightFix" v-if="v.logo" />
                            <text class="vip-table-content-row-item-c-title relative text-24 text-black">{{ v.name }} x{{ v.num }}</text>
                        </view>
                    </view>
                    <view class="vip-table-content-row-item vip-table-content-row-column relative flex flex-col"
                        :style="{ width: '30%' }"
                    >
                        <view v-for="(v, vIndex) in item.rewardsDay" :id="index + 'rewardsDay:id' + vIndex"
                            :key="index + 'rewardsDay:key' + vIndex" class="vip-table-content-row-item-d flex items-center ml-60"
                        >
                            <image src="/static/kahe-202510/images/vip-icon1.png" style="height: 27rpx;" mode="heightFix"
                                v-if="v.name === '点券'" />
                            <text class="vip-table-content-row-item-d-title text-24 text-black"> {{ v.num ? v.num + v.name : v.name
                                }}</text>
                        </view>

                    </view>
                </view>
                <view class="empty h-60 w-full"></view>
                <empty :show="vipModels.length === 0" />
            </scroll-view>
        </view>
        <view class="page-control w-full flex flex-row justify-center items-center bg-[#FDFDF1]"
            :style="{ height: 'calc(env(safe-area-inset-bottom) + 103rpx)', boxShadow: '0rpx 2rpx 0rpx 0rpx rgba(243, 182, 113, 0.58)', paddingBottom: 'env(safe-area-inset-bottom)' }"
        >
            <image class="page-control-arrow w-48 h-48 mx-12" src="/static/kahe/vip/left.png" mode="aspectFit"
                @tap.stop="changePage(false)" />
            <view v-for="(item, index) in pageItem" :id="'vip-pageControl:id' + index" :key="'vip-pageControl:' + index"
                class="page-control-item w-42 h-42 rounded-2 border-2 text-34 leading-42 text-center mx-12"
                :class="item === pageParams.page ? 'text-black border-[#000000]' : 'text-[#4D4D4D] border-[#4D4D4D]'"
                @tap.stop="changeCurrentPage(item)">{{ item }}
            </view>
            <image class="page-control-arrow w-48 h-48 mx-12" src="/static/kahe/vip/right.png" mode="aspectFit"
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
</style>
