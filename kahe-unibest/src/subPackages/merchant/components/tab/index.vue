<template>
    <view class="merchantTab">
        <view class="merchantTab-list">
            <view class="merchantTab-list-item" v-for="(item, index) in list" :key="index" @tap.stop="clickItem(index)">
                <view class="merchantTab-list-item-content">
                    <view class="merchantTab-list-item-content-select theme-font" v-if="current === index">
                        <image src="https://jms.85gui7.com/kahe-202510/ka-he/home/round.png" class="img" />
                        {{ item.title }}
                    </view>
                    <text class="merchantTab-list-item-content-title theme-font" v-else>{{ item.title }}</text>
                </view>
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
.merchantTab {
    position: relative;
    margin: 32rpx 32rpx 10rpx 32rpx;

    &-list {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        &-item {
            position: relative;

            height: 50rpx;
            margin-right: 43rpx;

            &-content {
                position: relative;
                width: 100%;

                &-title {
                    height: 100%;
                    text-align: center;
                    font-weight: 400;
                    font-size: 30rpx;
                    color: #A7A7A7;
                    @include text-stroke(2rpx, #000);
                }

                &-select {
                    position: relative;
                    text-align: center;
                    font-weight: 400;
                    font-size: 30rpx;
                    color: #FD9D08;
                    @include text-stroke(2rpx, #000);

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
}
</style>
