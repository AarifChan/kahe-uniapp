<template>
    <view class="limitlessItem relative w-139 h-203">
        <image class="limitlessItem-bg w-full h-full" src="/static/kahe/product/limitless-card.png" />
        <view class="limitlessItem-info absolute left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
            <text class="limitlessItem-info-title theme-font mt-6 text-20 font-normal text-[#649BFF] h-24">{{item.title}}</text>
            <image class="limitlessItem-info-image mt-4 w-112 h-112 bg-white" :src="item.image" />
            <text class="limitlessItem-info-name theme-font text-ellipsis mt-20 px-4 text-24 font-normal text-[#649BFF]" :style="{ width: 'calc(100% - 8rpx)' }">{{item.name}}</text>
        </view>
    </view>
</template>

<script lang="ts" setup>

import { type PropType } from 'vue'

export interface LimitLessModel {
    title: string
    image: string
    name: string
    prob: string
    levelName: string
}

defineProps({
    item: {
        default: {
        } as LimitLessModel,
        type: Object as PropType<LimitLessModel>
    }
})

</script>

<style lang="scss" scoped>
</style>
