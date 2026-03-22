<template>
    <view class="currentPet">
        <view class="currentPet-row2">
            <view
                v-for="(item, index) in secondRow"
                :key="index"
                class="currentPet-row2-item"
                @tap.stop="emits('didTapPet', item.id)"
            >
                <image class="currentPet-row2-item-img" :scale="0.88" :src="item.icon" />
            </view>
        </view>
        <view class="currentPet-row1">
            <view
                v-for="(item, index) in firstRow"
                :key="index"
                class="currentPet-row1-item"
                @tap.stop="emits('didTapPet', item.id)"
            >
                <image class="currentPet-row1-item-img"  :scale="secondRow.length > 0 ? 0.95 : 1.0" :src="item.icon" />
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
.currentPet{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    &-row2 {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        margin-left: 60rpx;
        margin-bottom: -60rpx;
        &-item {
            width: 140rpx;
            height: 140rpx;
            margin-left: -30rpx;
            &-img{
                width: 100%;
                height: 100%;
            }
        }
        &-item:first-child {
            margin-left: 0;
        }
    }
    &-row1 {
        margin-left: 80rpx;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: -20rpx;
        justify-content: flex-start;

        &-item {
            width: 140rpx;
            height: 140rpx;
            margin-left: -30rpx;
            &-img{
                width: 100%;
                height: 100%;
            }
        }
        &-item:first-child {
            margin-left: 0;
        }
    }
}
</style>
