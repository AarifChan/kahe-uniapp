<template>
    <view class="homeTab">
        <scroll-view class="homeTab-list" :enable-flex="true" :scroll-x="true" scroll-with-animation>
            <view class="homeTab-content">
                <view class="homeTab-list-item" v-for="(item, index) in list" :key="index" @tap.stop="clickItem(index)">
                    <view class="homeTab-list-item-select theme-font" v-if="current === index">
                        {{ item.title }}
                        <image src="https://jms.85gui7.com/kahe-202510/ka-he/home/round.png" class="img" />
                    </view>

                    <view v-else class="homeTab-list-item-normal theme-font">{{ item.title }}</view>
                </view>
            </view>
        </scroll-view>
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
.homeTab {
    position: relative;

    // width: calc(750rpx - 32rpx);

    &-content {
        display: flex;
        flex-direction: row;
        width: 100%;
        white-space: nowrap;
        padding: 32rpx 55rpx 16rpx;
    }

    &-list {
        position: relative;
        width: 100%;
        white-space: nowrap; // 确保横向排列不换行

        &-item {
            display: inline-block;
            position: relative;
            margin-right: 40rpx;

            &-normal {
                position: relative;
                text-align: center;
                font-weight: 400;
                font-size: 30rpx;
                color: #A7A7A7;
                // text-stroke: 2rpx #000000;
                // -webkit-text-stroke: 2rpx #000000;
                @include text-stroke(2rpx, #000000);
            }

            &-select {
                position: relative;
                text-align: center;
                font-weight: 400;
                font-size: 30rpx;
                color: #FD9D08;
                // text-stroke: 2rpx #000000;
                // -webkit-text-stroke: 2rpx #000000;
                @include text-stroke(2rpx, #000000);

                .img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 60rpx;
                    height: 60rpx;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>
