<template>
    <view class="home-tab relative w-full">
        <view class="home-tab-list relative flex flex-row gap-16 h-62 items-center">
            <view class="home-tab-list-item relative h-full pb-10" v-for="(item, index) in list" :key="index" @tap.stop="clickItem(index)">
                <view class="home-tab-list-item-normal flex justify-center items-center h-full px-20 font-normal text-32 text-black" v-if="current !== index"
                >{{ item.title }}</view>
                <view class="home-tab-list-item-select relative flex justify-center items-center h-full w-115" v-else
                >
                    <view class="home-tab-list-item-select-title text-40 text-white theme-font" :style="{ textShadow: '-2rpx -2rpx 0 #000000, 2rpx -2rpx 0 #000000, -2rpx 2rpx 0 #000000, 2rpx 2rpx 0 #000000' }"
                    >{{ item.title }}</view>
                    <view class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-5 bg-[#ffa21e] rounded-3" />
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
</style>
