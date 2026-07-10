<template>
    <view class="egg relative w-full flex flex-row items-center justify-center" style="aspect-ratio: 152 / 176;">
        <view class="egg-bg absolute top-10 left-10 bg-[#3C3C3C]" style="width: calc(100% - 20rpx); height: calc(100% - 20rpx);" />
        <image class="egg-icon absolute left-0 w-full" style="top: 8px; aspect-ratio: 1;" :src="item.icon" />
        <view class="egg-num absolute right-8 top-8 bg-black text-white text-20 text-center leading-24" style="width: 52rpx; height: 24rpx;">{{item.number}}</view>
        <image class="egg-decorate absolute bottom-0 left-10" style="width: calc(100% - 20rpx); aspect-ratio: 132 / 41;" src="/static/kahe-202510/pet/card-bottom.png" />
        <text class="egg-name absolute bottom-8 left-16 text-24 font-normal text-white text-center theme-font text-stroke" style="width: calc(100% - 32rpx);">{{item.name}}</text>
        <image class="egg-level absolute left-0 top-0 w-full h-full" :src="'/static/kahe-202510/pet/level2.png' " />
        <image v-if="selected" class="egg-select absolute -left-8 -top-8 w-47 h-46" src="/static/kahe-202510/pet/select.png" />
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import type { EggsModel } from '@/composables/pet/model'

defineProps({
    item: {
        default: {
        } as EggsModel,
        type: Object as PropType<EggsModel>
    },
    selected: {
        default: false,
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
</style>
