<template>
    <view class="home-tab">
        <view class="home-tab-list">
            <view class="home-tab-list-item" v-for="(item, index) in list" :key="index" @tap.stop="clickItem(index)">
                <view class="home-tab-list-item-select" v-if="current === index">
                    <!-- <image
            class="home-tab-list-item-select-img"
            src="https://jms.85gui7.com/kahe-202510/ka-he/home/tab-bg.png"
          /> -->
                    <view class="home-tab-list-item-select-title theme-font">{{ item.title }}</view>
                </view>
                <view v-else class="home-tab-list-item-normal">{{ item.title }}</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface ItemType {
    title: string;
    value: number;
}

defineProps({
    current: {
        default: 0,
        type: Number,
    },
    list: {
        default: [] as ItemType[],
        type: Array as PropType<ItemType[]>,
    },
    search: {
        default: false,
        type: Boolean,
    },
});
const emits = defineEmits(["update:current", "didClick"]);

const clickItem = (index: number) => {
    emits("update:current", index);
    emits("didClick", index);
};
</script>

<style lang="scss" scoped>
.home-tab {
    position: relative;
    width: 100%;

    &-list {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 16rpx;
        height: 62rpx;
        align-items: center;

        &-item {
            position: relative;
            height: 100%; // ✅ 固定高度，防止跳动
            padding-bottom: 10rpx; // 下划线空间

            &-normal {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%; // ✅ 占满父容器高度
                padding: 0 20rpx;
                font-weight: 400;
                font-size: 32rpx;
                color: #000000;
            }

            &-select {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%; // ✅ 和 normal 一样
                width: 115rpx;

                &-title {
                    font-size: 40rpx;
                    color: #ffffff;
                    @include text-stroke(2rpx, #000000);
                }

                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    height: 5rpx;
                    background-color: #ffa21e;
                    border-radius: 3rpx;
                }
            }
        }
    }
}
</style>
