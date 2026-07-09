<template>
    <view class="p-8 pt-0 px-15 relative w-full box-border flex flex-row justify-between">
        <view class="flex flex-row">
            <view
                class="text-44 font-normal text-white mr-24 theme-font"
                :style="current === index ? { textShadow: '-4rpx -4rpx 0 #73b2ff, 4rpx -4rpx 0 #73b2ff, -4rpx 4rpx 0 #73b2ff, 4rpx 4rpx 0 #73b2ff' } : { textShadow: '-4rpx -4rpx 0 #4d4d4d, 4rpx -4rpx 0 #4d4d4d, -4rpx 4rpx 0 #4d4d4d, 4rpx 4rpx 0 #4d4d4d' }"
                v-for="(item, index) in tabList"
                :key="index"
                @tap.stop="emits('update:current', index)"
            >
                {{ item.title }}
            </view>
        </view>
        <view class="mt-4 relative w-130 h-48 bg-transparent border-2 border-black rounded-4 flex flex-row items-center justify-center" @tap.stop="emits('didTapTips')">
            <image
                class="w-30 h-30"
                src="/static/kahe/box/question.png"
            />
            <text class="ml-8 text-32 font-light text-black">规则</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useModal } from '@/composables/modal'

defineProps({
    current: {
        default: 0,
        type: Number
    }
})

const emits = defineEmits(['update:current', 'didTapTips', 'tabDidChange'])
const didTapTab = (index: number) => {
    emits('update:current')
    emits('tabDidChange', index)
}
const tabList = ref([
    {
        title: '待处理',
        value: 0
    },
    {
        title: '已发货',
        value: 1
    },
    {
        title: '已处理',
        value: 2
    },
    {
        title: '宝箱',
        value: 3
    }
])
</script>

<style lang="scss" scoped></style>
