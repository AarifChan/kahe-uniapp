<template>
    <view class="redBagItem relative w-[calc(100%-24rpx)] flex flex-row items-center justify-between border-b-1 border-[#4558CB] mx-12 py-20">
        <view class="redBagItem-left flex flex-row items-center">
            <image class="redBagItem-left-img w-80 h-80 rounded-40 border-1 border-white" :src="item?.avatar" :scale="0.8" />
            <view class="redBagItem-left-info ml-12 flex flex-col">
                <text class="redBagItem-left-info-title font-normal text-20 text-black">{{item?.nickname}}</text>
                <text class="redBagItem-left-info-title font-normal text-20 text-black">{{item?.comment}}</text>
            </view>
        </view>
        <view class="redBagItem-right flex flex-col justify-end items-end">
            <view class="redBagItem-right-top flex flex-row items-center">
                <text class="redBagItem-right-top-title font-normal text-20 text-[#851C2E]" v-if="item?.amountNew">（新人额外+{{item.amountNew}}）</text>
                <image class="redBagItem-right-top-img w-28 h-35" src="/static/kahe-202510/redEnvelope/ticket.png" />
                <text class="redBagItem-right-top-value font-normal text-20 text-black">+{{item?.amount}}</text>
            </view>
            <text class="redBagItem-right-title font-normal text-20 text-[#851C2E]">分享者+{{item?.amount}}点券</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { RedBagUserModel } from '@/composables/redBag/model'

defineProps({
    item: {
        default: null,
        type: Object as PropType<RedBagUserModel | null>
    }
})

</script>

<style lang="scss" scoped>
</style>
