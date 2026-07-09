<template>
    <view class="common-tab relative py-24 px-0 items-center">
        <view class="common-tab-list relative flex flex-row items-center justify-start bg-[rgba(255,255,255,0.45)] rounded-25">
            <view class="common-tab-list-item relative" v-for="(item, index) in list" :key="index" @tap.stop="clickItem(index)">
                <view class="relative" :class="index === current ? 'w-160 h-50' : 'w-120 h-50'"
                >
                    <image class="absolute -left-8 -top-10 w-160 h-65" v-if="current===index" src="/static/kahe-202510/home/home-tab.png" />
                    <text class="absolute top-0 left-0 w-full h-full leading-50 text-center font-normal text-34 theme-font" :class="current===index ? 'text-[#245070]': 'text-[#51B3F9]'">{{
                        item.title
                    }}</text>
                </view>

            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

interface ItemType {
    title: string
    value: number
}
defineProps({
    current: {
        default: 0,
        type: Number
    },
    list: {
        default: [] as ItemType[],
        type: Array as PropType<ItemType[]>
    },
    search: {
        default: false,
        type: Boolean
    }
})

const emits = defineEmits(['update:current', 'didClick'])

const clickItem = (index: number) => {
    emits('update:current', index)
    emits('didClick', index)
}
</script>

<style lang="scss" scoped></style>
