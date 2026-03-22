<template>
    <view class="container">
        <view class="mallTab">
            <text class="mallTab-item price-font" :class="current === 0 ? 'mallTab-active' : ''"
                @tap.stop="didClick(0)">最新</text>
            <text class="mallTab-item price-font" :class="current === 1 ? 'mallTab-active' : ''"
                @tap.stop="didClick(1)">进度</text>
            <text class="mallTab-item price-font" :class="current === 2 ? 'mallTab-active' : ''"
                @tap.stop="didClick(2)">价格</text>
            <view class="mallTab-price" @tap.stop="handleSort">
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
.container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 16px;
}

.mallLogo {
    width: 256rpx;
    height: 71rpx;
}

.rule {
    font-size: 30rpx;
    color: #794627;
    line-height: 56rpx;
    text-align: center;
    width: 146rpx;
    height: 56rpx;
    background: linear-gradient(90deg, #ffd3a2 0%, #fdf2d8 100%);
    border-radius: 8rpx;
}

.mallTab {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    &-price {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    &-sort {
        display: flex;
        flex-direction: column;
        align-items: center;

        &-up {
            width: 0;
            height: 0;
            border-left: 14rpx solid transparent;
            border-right: 14rpx solid transparent;
            border-bottom: 14rpx solid #565656;
            margin-bottom: 4rpx;
        }

        &-up-active {
            border-bottom: 14rpx solid #ffffff;
        }

        &-down {
            width: 0;
            height: 0;
            border-left: 14rpx solid transparent;
            border-right: 14rpx solid transparent;
            border-top: 14rpx solid #731F1F;
        }

        &-down-active {
            border-top: 14rpx solid #731F1F;
        }
    }

    &-item {
        font-size: 26rpx;
        font-weight: 400;
        color: #731F1F;
        padding: 0 10rpx;
    }

    &-active {
        color: #731F1F;
    }
}
</style>
