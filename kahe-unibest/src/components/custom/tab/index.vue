<template>
    <view class="common-tab">
        <view class="common-tab-list">
            <view class="common-tab-list-item" v-for="(item, index) in list" :key="index" @tap.stop="clickItem(index)">
                <view :class="index === current ? 'common-tab-list-item-select' : 'common-tab-list-item-content'">
                    <image class="common-tab-list-item-content-select" v-if="current===index" src="https://jms.85gui7.com/kahe-202510/home/home-tab.png" />
                    <text class="common-tab-list-item-content-title theme-font" :class="current===index ? 'common-tab-list-item-content-title-select': ''">{{
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

<style lang="scss" scoped>
.common-tab {
    position: relative;
    padding: 24rpx 0 24rpx 0;
    align-items: center;
    &-list {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background: rgba(255,255,255, 0.45);
        border-radius: 25rpx;
        &-item {
            position: relative;
            &-content{
                position: relative;
                width: 120rpx;
                height: 50rpx;
                &-title {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    line-height: 50rpx;
                    height: 100%;
                    font-weight: 400;
                    font-size: 34rpx;
                    color: #51B3F9;
                    text-align: center;
                    &-select{
                        font-weight: 400;
                        font-size: 34rpx;
                        color: #245070;
                    }
                }
                &-select{
                    position: absolute;
                    left: -8rpx;
                    top: -10rpx;
                    width: 160rpx;
                    height: 65rpx;
                }
            }
            &-select{
                width: 160rpx;
                height: 50rpx;
            }
        }
    }
}
</style>
