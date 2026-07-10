<template>
    <view class="merchantTab relative mx-32 mt-32 mb-10">
        <view class="merchantTab-list relative flex flex-row items-center justify-start">
            <view class="merchantTab-list-item relative h-50 mr-43" v-for="(item, index) in list" :key="index" @tap.stop="clickItem(index)">
                <view class="merchantTab-list-item-content relative w-full">
                    <view
                        class="merchantTab-list-item-content-select theme-font relative text-center font-normal text-30 text-[#FD9D08]"
                        :style="{ textShadow: '-2rpx -2rpx 0 #000, 2rpx -2rpx 0 #000, -2rpx 2rpx 0 #000, 2rpx 2rpx 0 #000' }"
                        v-if="current === index"
                    >
                        <image src="/static/kahe-202510/ka-he/home/round.png" class="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 object-cover" />
                        {{ item.title }}
                    </view>
                    <text
                        class="merchantTab-list-item-content-title theme-font h-full text-center font-normal text-30 text-[#A7A7A7]"
                        :style="{ textShadow: '-2rpx -2rpx 0 #000, 2rpx -2rpx 0 #000, -2rpx 2rpx 0 #000, 2rpx 2rpx 0 #000' }"
                        v-else
                    >{{ item.title }}</text>
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
