<template>
    <view class="info flex flex-col items-center relative">
        <view class="info-avatar relative w-138 h-148 flex flex-row items-center justify-center">
            <image
                v-if="info.avatar !== ''"
                class="info-avatar-head absolute top-20 w-120 h-120 rounded-full"
                :src="info.avatar"
            />
            <image
                v-if="info.avatar !== ''"
                class="info-avatar-border absolute w-138 h-148"
                :src="info.decorate"
            />
            <text class="info-title text-ellipsis absolute -bottom-34 text-28 text-black text-center">{{
                info.nickName
            }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

export interface RankInfo {
    avatar: string
    decorate: string
    nickName: string
    score: string
    rank: number
  }

defineProps({
    info: {
        default: {
        } as RankInfo,
        type: Object as PropType<RankInfo>
    }
})
</script>

<style lang="scss" scoped>
</style>
