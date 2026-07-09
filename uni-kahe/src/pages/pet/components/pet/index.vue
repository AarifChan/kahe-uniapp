<template>
    <view class="relative w-full flex flex-row items-center justify-center aspect-ratio-[152/176]">
        <view class="absolute top-10 left-10 bg-[#3C3C3C]" :style="{ width: 'calc(100% - 20rpx)', height: 'calc(100% - 20rpx)' }" />
        <image class="absolute top-10 left-10" :src="item.icon" :style="{ width: 'calc(100% - 20rpx)', height: 'calc(100% - 20rpx)' }" />
        <image class="absolute bottom-0 left-10 aspect-ratio-[132/41]" src="/static/kahe-202510/pet/card-bottom.png" :style="{ width: 'calc(100% - 20rpx)' }" />
        <text class="absolute left-16 w-[calc(100%-32rpx)] font-normal text-24 text-[#FFFFFF] text-center theme-font text-stroke" :style="{ bottom: '8px' }">{{item.name}}</text>
        <image class="absolute left-0 top-0 w-full h-full" :src="'/static/kahe-202510/pet/level' + item.level + '.png' " />
        <image v-if="selected" class="absolute -left-8 -top-8 w-47 h-46" src="/static/kahe-202510/pet/select.png" />
    </view>
</template>

<script lang="ts" setup>
import { PetModel } from '@/composables/pet/model'
import { type PropType } from 'vue'

defineProps({
    scale: {
        default: 1,
        type: Number
    },
    item: {
        default: {
        } as PetModel,
        type: Object as PropType<PetModel>
    },
    selected: {
        default: false,
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
</style>
