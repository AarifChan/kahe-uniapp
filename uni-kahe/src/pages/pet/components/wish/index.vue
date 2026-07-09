<template>
    <view class="relative w-445 h-164">
        <image class="w-full h-full" src="/static/kahe-202510/pet/wish-bg.png" />
        <scroll-view class="absolute top-0 flex flex-col" :scroll-y="true" :scroll-x="false" :style="{ left: '8px', width: 'calc(100% - 8px)', height: 'calc(100% - 16px)' }">
            <text class="inline-block font-normal text-28 text-black theme-font">今日心愿(满足心愿可获得神秘奖励)</text>
            <text
                v-for="(item, index) in taskList"
                :key="index"
                class="inline-block font-normal text-24 text-black"
            >{{ index + 1 }}.今天达到{{ item.total }}流水即可获得神秘奖励（{{ item.score }}/{{
                item.total
            }}）</text>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import type { TaskModel } from '@/composables/pet/model'
defineProps({
    taskList: {
        default: [] as TaskModel[],
        type: Array as PropType<TaskModel[]>
    }
})
</script>

<style lang="scss" scoped>
</style>
