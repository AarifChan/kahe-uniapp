<template>
    <view class="relative w-208 h-248 mr-[15px] inline-block rounded-2">
        <view class="relative w-208 h-208 border-2 border-[#95c4fe] rounded-8">
            <image class="w-full h-full" mode="widthFix" :src="item.image" />
            <text class="absolute right-0 bottom-0 w-60 h-30 text-21 text-center font-normal text-black bg-[#53A4FF]">{{ item.num }}</text>
        </view>
        <text class="w-full text-center text-24 font-normal text-[#1a385b]">{{ item.name }}</text>
    </view>
</template>

<script lang="ts" setup>
import type { UIDayVIPItem } from '@/model'
import type { PropType } from 'vue'

defineProps({
    item: {
        default: {
        } as UIDayVIPItem,
        type: Object as PropType<UIDayVIPItem>
    }
})
</script>

<style lang="scss" scoped>
</style>
