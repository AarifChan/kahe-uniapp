<template>
    <view class="dailyItem relative w-full aspect-ratio-[353/380]">
        <image class="dailyItem-bg w-full h-full" src="/static/kahe-202510/home-upgrade/daily-item.png" />
        <view class="dailyItem-content absolute inset-0 w-full h-full">
            <view class="dailyItem-content-top w-full flex flex-col items-center">
                <view class="dailyItem-content-top-title theme-font mt-50 font-normal text-36 text-[#191919]"
                    >满{{ item.useMinPrice }}减{{ item.couponPrice }}</view
                >
                <view
                    v-if="item.cates"
                    class="dailyItem-content-top-subTitle text-center font-normal text-26 text-[#727272]"
                    :style="{ width: 'calc(100% - 52px)' }"
                    >{{ handleLimit(item) }}</view
                >
                <view class="dailyItem-content-top-merchant mt-50 flex flex-row items-center">
                    <image
                        class="dailyItem-content-top-merchant-img w-36 h-36 bg-[#b7b7b7] rounded-full"
                        :src="item.merchant.icon"
                    />
                    <view class="dailyItem-content-top-merchant-title ml-5 font-normal text-18 text-[#504f4f]">{{
                        item.merchant.name
                    }}</view>
                </view>
            </view>
            <view class="dailyItem-content-bottom absolute bottom-30 left-0 w-full flex flex-col items-center">
                <view
                    class="dailyItem-content-bottom-btn relative w-169 h-51"
                    @tap.stop="emits('didClickItem')"
                >
                    <image
                        class="dailyItem-content-bottom-btn-img w-full h-full"
                        :src="
                            item.receiveStatus === 0
                                ? '/static/kahe-202510/home-upgrade/btn-style1-normal.png'
                                : '/static/kahe-202510/home-upgrade/btn-style1-disable.png'
                        "
                    />
                    <view
                        class="dailyItem-content-bottom-btn-title theme-font absolute top-2 left-0 w-full text-center font-normal text-30 text-white"
                        :style="{ textShadow: '0 2rpx 0 #a02301' }"
                        >{{
                            item.receiveStatus === 0 ? '领取' : '已领取'
                        }}</view
                    >
                </view>
                <view class="dailyItem-content-bottom-title font-normal text-16 text-white"
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
</style>
