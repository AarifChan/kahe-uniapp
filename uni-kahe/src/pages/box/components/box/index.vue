<template>
    <view class="box-item" @tap.stop="emits('didTapDetail', item)">
        <view class="box-item-left">
            <image class="box-item-left-img" :src="item.logo" mode="widthFix" />
            <view class="box-item-left-info">
                <text class="box-item-left-info-title text-flow-ellipsis-multiple theme-font">{{ item.title }}</text>
                <view class="box-item-left-info-other">
                    <text class="box-item-left-info-other-title">当前有{{ item.num }}件商品待处理</text>
                </view>
            </view>
        </view>
        <view class="box-item-right">
            <select-item :is-select="item.selected" color="other" @tap.stop="emits('didTapSelect', item)" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { UIMineBoxModel } from "@/model";
import SelectItem from "../select/index.vue";
import { type PropType } from "vue";

defineProps({
    item: {
        default: {} as UIMineBoxModel,
        type: Object as PropType<UIMineBoxModel>,
    },
});
const emits = defineEmits(["didTapDetail", "didTapSelect"]);
</script>

<style lang="scss" scoped>
.box-item {
    position: relative;
    padding: 16rpx 0;
    box-sizing: border-box;
    // min-height: 228rpx;
    height: 100%;
    width: 100%;
    background: #ffffff;
    box-shadow:
        0rpx 1rpx 1rpx 0rpx rgba(212, 222, 233, 0.5),
        0rpx 0rpx 5rpx 0rpx #d4dee9;
    border-radius: 4rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32rpx;

    &-left {
        position: relative;
        margin-left: 36rpx;
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        &-img {
            width: 178rpx;
            height: 165rpx;
            border-radius: 8rpx;
        }

        &-arrow {
            position: absolute;
            right: -30rpx;
            top: 0;
            width: 32rpx;
            height: 49rpx;
        }

        &-info {
            margin-left: 48rpx;
            margin-top: 16rpx;
            position: relative;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: flex-start;

            &-title {
                font-weight: 400;
                color: #000000;
                width: 280rpx;
                font-size: 38rpx;
            }

            &-other {
                display: flex;
                flex-direction: column;

                &-title {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #727272;
                }
            }
        }
    }

    &-right {
        position: absolute;
        right: 50rpx;
        bottom: 24rpx;
    }
}
</style>
