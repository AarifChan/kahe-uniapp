<template>
    <view class="people">
        <view class="people-title theme-font">当期<text>{{ value }}</text><text style="color: #ff2a2a">{{ total}}</text>人</view>
        <view class="people-line"></view>
        <scroll-view :enable-flex="true" :scroll-x="true" class="people-user">
            <view
                class="people-user-item"
                v-for="(item, index) in list"
                :key="index"
            >
                <image class="people-user-item-img" :src="item.user.avatar" />
                <view class="people-user-item-num">{{item.num}}</view>
                <view
                    class="people-user-item-title text-flow-ellipsis-single"
                >{{ item.user.nickname }}</view>
            </view>
        </scroll-view>
    </view>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue'
import type { UIWelfareUserList } from '@/model'

defineProps({
    value: {
        type: String,
        default: '参与'
    },
    list: {
        type: Array as PropType<UIWelfareUserList[]>,
        default: () => []
    },
    total: {
        type: Number,
        default: 0
    }
})
</script>
<style lang="scss" scoped>
.people {
    position: relative;
    margin-top: 40rpx;
    width: 688rpx;
    height: 217rpx;
    background: #ffffff;
    border-radius: 20rpx;
    opacity: 0.97;

    &-title {
        position: absolute;
        left: 32rpx;
        top: 10rpx;
        font-weight: 400;
        font-size: 30rpx;
        color: #000000;
        z-index: 1;
    }
    &-line {
        width: 178rpx;
        position: absolute;
        left: 32rpx;
        top: 35rpx;
        height: 10rpx;
        background-color: #5ea2fd;
        z-index: 0;
    }
    &-user {
        position: relative;
        display: flex;
        height: 100%;
        width: 100%;
        padding: 68rpx 20rpx 0 20rpx;
        box-sizing: border-box;
        white-space: nowrap;
        &-item {
            position: relative;
            display: inline-block;
            margin-right: 16rpx;
            &-img {
                width: 93rpx;
                height: 93rpx;
                border-radius: 50%;
            }
            &-num{
                position: absolute;
                top:0;
                right: -4rpx;
                width: 28rpx;
                height: 28rpx;
                border-radius: 14rpx;
                color: white;
                font-size: 20rpx;
                text-align: center;
                line-height: 28rpx;
                background-color: #61A4FD;
            }
            &-title {
                width: 93rpx;
                text-align: center;
                font-weight: normal;
                font-size: 18rpx;
                color: #000000;
            }
        }
    }
}
</style>
