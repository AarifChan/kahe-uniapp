<template>
    <view class="container">
        <image class="mallLogo" src="https://jms.85gui7.com/kahe-202510/mall/mall-tab-title.png" />
        <view class="mallTab">
            <text
                class="mallTab-item price-font"
                :class="current === 0 ? 'mallTab-active' : ''"
                @tap.stop="didClick(0)"
                >综合</text
            >
            <text
                class="mallTab-item price-font"
                :class="current === 1 ? 'mallTab-active' : ''"
                @tap.stop="didClick(1)"
                >新品</text
            >
            <view class="mallTab-price" @tap.stop="didClick(2)">
                <text class="mallTab-item price-font">价格</text>
                <view class="mallTab-sort">
                    <view
                        class="mallTab-sort-up"
                        :class="isAscending ? 'mallTab-sort-up-active' : ''"
                    />
                    <view
                        class="mallTab-sort-down"
                        :class="!isAscending ? 'mallTab-sort-down-active' : ''"
                    />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const current = ref(0)
const isAscending = ref(true)
const emits = defineEmits(['didChange'])

const didClick = (type: number) => {
    switch (type) {
        case 0:
        case 1:
            current.value = type
            break
        case 2:
            isAscending.value = !isAscending.value
            break
        default:
            break
    }
    emits('didChange', {
        sort: current.value,
        sType: isAscending.value ? 'asc' : 'desc'
    })
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 16px;
}
.mallLogo {
    width: 256rpx;
    height: 71rpx;
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
            border-bottom: 14rpx solid #727272;
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
            border-top: 14rpx solid #727272;
        }
        &-down-active {
            border-top: 14rpx solid #ffffff;
        }
    }
    &-item {
        font-size: 36rpx;
        font-weight: 400;
        color: #727272;
        padding: 0 10rpx;
    }
    &-active {
        color: #ffffff;
    }
}
</style>
