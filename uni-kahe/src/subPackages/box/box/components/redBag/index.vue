<template>
    <view class="redBag relative w-full box-border py-36 bg-white shadow-[0rpx_1rpx_1rpx_0rpx_rgba(212,222,233,0.5),0rpx_0rpx_5rpx_0rpx_#d4dee9] rounded-4 min-h-228 mb-32 flex flex-row items-center justify-between">
        <view class="redBag-left relative ml-36 h-full flex flex-row items-center">
            <image class="redBag-left-img w-178 h-165 rounded-8" :src="item?.goodsDto?.image" mode="widthFix" />
            <view class="redBag-left-info relative ml-48 mt-16 h-full flex flex-col justify-center">
                <text class="redBag-left-info-title font-normal text-38 text-black w-full text-flow-ellipsis-multiple theme-font">{{item.goodsDto.name}}</text>
                <view class="redBag-left-info-other mt-36 flex flex-col">
                    <text class="redBag-left-info-other-title text-24 font-normal text-[#727272]">指导价:{{item.goodsDto.price}}</text>
                </view>
            </view>
        </view>
        <view class="redBag-btn absolute right-18 bottom-36 w-156 h-45 rounded-22 flex items-center justify-center" :class="item?.status === 0 ? 'enable' : 'disable' " @tap.stop="emits('didClick')"
            :style="{
                background: item?.status === 0
                    ? 'linear-gradient(-90deg, #3AE5FD, #15AFFF)'
                    : 'linear-gradient(-90deg, #AFAFAF, #7D7D7D)',
                color: item?.status === 0 ? 'black' : 'white'
            }"
        >
            <text class="redBag-btn-title font-normal text-25 theme-font">分享红包</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { RedBagListItem } from '@/composables/redBag/model'
import { type PropType } from 'vue'

defineProps({
    item: {
        default: {
        } as RedBagListItem,
        type: Object as PropType<RedBagListItem | null>
    }
})

const emits = defineEmits(['didClick'])
</script>

<style lang="scss" scoped>
</style>
