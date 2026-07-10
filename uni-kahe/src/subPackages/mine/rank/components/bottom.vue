<template>
    <view class="bottom fixed left-0 flex flex-row items-center justify-between w-full h-104 bg-black opacity-70 px-24 box-border"
        :style="{ bottom: 'env(safe-area-inset-bottom)' }"
    >
        <view class="bottom-left flex flex-col">
            <view class="bottom-left-title theme-font text-32 font-400 text-white"
                >我的排名：{{ mineRanks.rank }}</view
            >
            <view class="bottom-left-value theme-font text-32 font-400 text-white"
                >我的成绩: {{ mineRanks.score }}</view
            >
        </view>
        <image
            class="bottom-btn w-200 h-68"
            src="/static/kahe-202510/images/rewardbtn.png"
            @tap.stop="emits('didClickReward')"
        />
    </view>
</template>
<script setup lang="ts">
import type { RankUser } from '@/model/activity'
defineProps({
    mineRanks: {
        default: {
        } as RankUser,
        type: Object as ()=>RankUser
    }
})

const emits = defineEmits(['didClickReward'])
</script>
<style lang="scss" scoped>
</style>
