<template>
    <view class="rights absolute top-0 right-12">
        <view
            class="rights-list relative flex flex-col items-center justify-center mb-20"
            v-for="(item, index) in list"
            :key="index"
            @tap.stop="$emit('tapItem', item)"
        >
            <image
                class="rights-list-img w-80 h-82"
                :src="item.image"
            />
            <image class="rights-list-texts -mt-2 w-53 h-26" :src="item.text">{{
                item.text
            }}</image>
        </view>
    </view>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import type{ UIIconItem } from '@/model'

defineProps({
    list: {
        type: Array as PropType<UIIconItem[]>,
        default: () => []
    }
})
</script>
<style lang="scss" scoped>
</style>
