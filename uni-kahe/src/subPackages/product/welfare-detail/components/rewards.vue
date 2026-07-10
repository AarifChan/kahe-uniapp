<template>
    <view class="people relative mt-40 w-688 bg-white rounded-20 opacity-97 box-border flex flex-col items-center"
        style="min-height: 150rpx; padding: 45rpx 28rpx 30rpx 28rpx;"
    >
        <view class="people-title theme-font absolute left-32 top-10 text-30 font-normal text-black z-1">当期<text>{{ detail.status===2 ? value : '未开奖' }}</text><text style="color: #ff2a2a" v-if="detail.status===2">{{ list.length }}</text>{{detail.status===2 ? "人":""}}</view>
        <view class="people-line absolute left-32 top-35 w-178 h-10 bg-[#5ea2fd] z-0" />
        <scroll-view :enable-flex="true" :scroll-y="true" class="people-reward w-full flex flex-col items-center rounded-20"
            style="min-height: 298rpx;"
            v-if="detail.status===2"
        >
            <view class="people-reward-goods mt-20 w-full flex flex-col rounded-20 border-2 border-[#BCD9FF]"
                style="padding: 18rpx 30rpx;"
                v-for="(item,index) in list" :key="index"
            >
                <view class="people-reward-goods-top flex items-center justify-between mb-10">
                    <view class="flex items-center">
                        <image :src="item.user?.avatar" class="w-68 h-68 rounded-full" />
                        <view class="people-reward-goods-top-nickName text-18 text-black ml-17">{{ item.user?.nickname }}</view>
                    </view>
                    <!--                    <view class="people-reward-goods-top-time">{{item.time}}</view>-->
                </view>
                <view class="people-reward-goods-line w-608 h-2 bg-[#BCD9FF]"></view>
                <view class="people-reward-goods-bottom flex items-center justify-between mt-10"
                    v-for="(goods, zIndex) in item.goods" :key="index+'goods'+zIndex"
                >
                    <image :src="goods.goodsDto?.image" class="w-44 h-63" />
                    <view class="people-reward-goods-top-time text-18 text-black">{{goods.goodsDto.name}}x{{goods.num}}</view>
                </view>
            </view>
        </scroll-view>
        <view class="people-time absolute text-28 text-gray" style="left: 50%; top: 50%; transform: translate(-50%, -50%);" v-else>{{ time }}后抽取<text style="color: #ff2a2a;">{{ total }}</text>人</view>
    </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { UIWelareRewardListItem } from '@/model'
import type { WelfareDetailInfo } from '@/model/welfare'

const props = defineProps({
    value: {
        type: String,
        default: '参与'
    },
    list: {
        type: Array as () => UIWelareRewardListItem[],
        default: [] as UIWelareRewardListItem[]
    },
    detail: {
        type: Object as () =>WelfareDetailInfo,
        default: {
        } as WelfareDetailInfo
    },
    time: {
        type: String,
        default: ''
    }
})
const total = computed(() => {
    let num = 0
    props.detail.goods?.forEach((item) => {
        num += item.num
    })
    return num
})
</script>
<style lang="scss" scoped>
</style>
