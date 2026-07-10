<template>
    <view class="rank-item relative flex flex-row items-center py-16 px-30 border-b-1 border-[#8889ad]"
        :style="{ width: 'calc(100% - 60rpx)' }"
    >
        <text class="rank-item-rank theme-font text-40 font-400 text-[#595A70]">{{ item.rank }}</text>
        <image class="rank-item-avatar ml-30 w-80 h-80 rounded-full bg-[lightgray]" :src="item.avatar"></image>
        <view class="rank-item-info ml-16 flex flex-col justify-center items-start">
            <text class="rank-item-title text-20 font-400 text-[#1a385b]">{{ item.nickName }}</text>
            <text class="rank-item-title text-20 font-400 text-[#1a385b]">成绩{{ item.score }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

export interface RankItemInfo {
    avatar: string
    nickName: string
    score: number
    rank: number
  }

defineProps({
    item: {
        default: {
        } as RankItemInfo,
        type: Object as PropType<RankItemInfo>
    }
})
</script>

<style lang="scss" scoped>
</style>
