<template>
    <view class="wish">
        <image class="wish-bg" src="https://jms.85gui7.com/kahe-202510/pet/wish-bg.png" />
        <scroll-view class="wish-content" :scroll-y="true" :scroll-x="false">
            <text class="wish-content-title theme-font">今日心愿(满足心愿可获得神秘奖励)</text>
            <text
                v-for="(item, index) in taskList"
                :key="index"
                class="wish-content-subTitle"
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
.wish{
    position: relative;
    width: 445rpx;
    height: 164rpx;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-content{
        position: absolute;
        left: 8px;
        top: 0;
        width: calc(100% - 8px);
        height: calc(100% - 16px);
        display: flex;
        flex-direction: column;

        &-title{
            display: inline-block;
            font-weight: 400;
            font-size: 28rpx;
            color: #000000;
        }
        &-subTitle{
            display: inline-block;
            font-weight: 400;
            font-size: 24rpx;
            color: #000000;
        }
    }
}
</style>
