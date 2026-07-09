<template>
    <view class="relative w-full flex flex-col justify-end">
        <view class="flex flex-row items-end justify-start ml-60 -mb-60">
            <view
                v-for="(item, index) in secondRow"
                :key="index"
                class="w-140 h-140 -ml-30 first:ml-0"
                @tap.stop="emits('didTapPet', item.id)"
            >
                <image class="w-full h-full" :scale="0.88" :src="item.icon" />
            </view>
        </view>
        <view class="ml-80 flex flex-row items-end -mb-20 justify-start">
            <view
                v-for="(item, index) in firstRow"
                :key="index"
                class="w-140 h-140 -ml-30 first:ml-0"
                @tap.stop="emits('didTapPet', item.id)"
            >
                <image class="w-full h-full"  :scale="secondRow.length > 0 ? 0.95 : 1.0" :src="item.icon" />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { type PetModel } from '@/composables/pet/model'
import { type PropType, computed } from 'vue'

const props = defineProps({
    list: {
        default: [] as PetModel[],
        type: Array as PropType<PetModel[]>
    }
})
const firstRow = computed(() => {
    if (props.list.length > 3) {
        return props.list.slice(0, 4)
    } else {
        return props.list.slice(0, props.list.length)
    }
})

const secondRow = computed(() => {
    if (props.list.length > 3) {
        return props.list.slice(4, props.list.length)
    } else {
        return []
    }
})
const emits = defineEmits(['didTapPet'])
</script>

<style lang="scss" scoped>
</style>
