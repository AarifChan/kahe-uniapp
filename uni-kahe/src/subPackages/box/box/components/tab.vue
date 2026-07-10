<template>
    <view class="boxTab relative w-full box-border flex flex-row justify-between"
        :style="{ padding: '8px 15px 0 15px' }"
    >
        <view class="boxTab-list flex flex-row">
            <view
                class="boxTab-list-item font-normal text-44 text-white mr-24 theme-font"
                :class="
                    current === index
                        ? 'boxTab-list-select text-shadow-[-4rpx_-4rpx_0_#73b2ff,4rpx_-4rpx_0_#73b2ff,-4rpx_4rpx_0_#73b2ff,4rpx_4rpx_0_#73b2ff]'
                        : 'text-shadow-[-4rpx_-4rpx_0_#4d4d4d,4rpx_-4rpx_0_#4d4d4d,-4rpx_4rpx_0_#4d4d4d,4rpx_4rpx_0_#4d4d4d]'
                "
                v-for="(item, index) in tabList"
                :key="index"
                @tap.stop="emits('update:current', index)"
            >
                {{ item.title }}
            </view>
        </view>
        <view class="boxTab-tips mt-4rpx relative w-130 h-48 bg-[rgba(0,0,0,0)] border-2 border-black rounded-4 flex flex-row items-center justify-center" @tap.stop="emits('didTapTips')">
            <image
                class="boxTab-tips-img w-30 h-30"
                src="/static/kahe/box/question.png"
            />
            <text class="boxTab-tips-title ml-8 font-light text-32 text-black">规则</text>
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

<style lang="scss" scoped>
</style>
