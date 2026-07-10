<template>
    <view class="container relative w-full flex flex-row items-center justify-between py-16 px-32">
        <view class="mallTab relative flex flex-row items-center justify-start">
            <text class="mallTab-item price-font text-26 font-normal text-[#731F1F] px-10" :class="current === 0 ? 'text-[#731F1F]' : ''"
                @tap.stop="didClick(0)">最新</text>
            <text class="mallTab-item price-font text-26 font-normal text-[#731F1F] px-10" :class="current === 1 ? 'text-[#731F1F]' : ''"
                @tap.stop="didClick(1)">进度</text>
            <text class="mallTab-item price-font text-26 font-normal text-[#731F1F] px-10" :class="current === 2 ? 'text-[#731F1F]' : ''"
                @tap.stop="didClick(2)">价格</text>
            <view class="mallTab-price flex flex-row items-center" @tap.stop="handleSort">
                <!--                <text class="mallTab-item price-font">价格</text>-->
                <Sort :is-up="isAscending" />
            </view>
        </view>

    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Sort from "../sort/index.vue";
const current = ref(0);
const isAscending = ref(true);
const emits = defineEmits(["didChange"]);
const handleSort = () => {
    isAscending.value = !isAscending.value;
    emits("didChange", {
        sort: isAscending.value ? "asc" : "desc",
        sflag: current.value,
    });
};
const didClick = (index: number) => {
    current.value = index;
    emits("didChange", {
        sort: isAscending.value ? "asc" : "desc",
        sflag: index,
    });
};
</script>

<style lang="scss" scoped>
</style>
