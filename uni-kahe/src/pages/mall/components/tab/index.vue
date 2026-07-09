<template>
    <view class="relative flex flex-row items-center justify-between w-full box-border p-8 px-16">
        <image class="w-256 h-71" src="/static/kahe-202510/mall/mall-tab-title.png" />
        <view class="relative flex flex-row items-center justify-start"
        >
            <text
                class="text-36 font-normal text-[#727272] px-10 price-font"
                :class="current === 0 ? 'text-white' : ''"
                @tap.stop="didClick(0)"
                >综合</text
            >
            <text
                class="text-36 font-normal text-[#727272] px-10 price-font"
                :class="current === 1 ? 'text-white' : ''"
                @tap.stop="didClick(1)"
                >新品</text
            >
            <view class="flex flex-row items-center" @tap.stop="didClick(2)"
            >
                <text class="text-36 font-normal text-[#727272] px-10 price-font">价格</text>
                <view class="flex flex-col items-center"
                >
                    <view
                        class="w-0 h-0 mb-4"
                        style="border-left: 14rpx solid transparent; border-right: 14rpx solid transparent; border-bottom: 14rpx solid #727272;"
                        :style="isAscending ? { borderBottomColor: '#ffffff' } : {}"
                    />
                    <view
                        class="w-0 h-0"
                        style="border-left: 14rpx solid transparent; border-right: 14rpx solid transparent; border-top: 14rpx solid #727272;"
                        :style="!isAscending ? { borderTopColor: '#ffffff' } : {}"
                    />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const current = ref(0)
const isAscending = ref(true)
const emits = defineEmits(['didChange'])

const didClick = (type: number) => {
    switch (type) {
        case 0:
        case 1:
            current.value = type
            break
        case 2:
            isAscending.value = !isAscending.value
            break
        default:
            break
    }
    emits('didChange', {
        sort: current.value,
        sType: isAscending.value ? 'asc' : 'desc'
    })
}
</script>

<style lang="scss" scoped></style>
