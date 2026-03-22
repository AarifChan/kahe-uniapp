
<template>
    <view class="selectNum-rewards">
        <view
            class="selectNum-rewards-list"
        >
            <view class="selectNum-rewards-list-left">
                <image
                    class="selectNum-rewards-list-left-avatar"
                    :src="item.avatar"
                />
                <view class="selectNum-rewards-list-left-info">
                    <view class="selectNum-rewards-list-left-info-name">{{ item.nickName }}</view>
                </view>
            </view>
            <view class="selectNum-rewards-list-right">
                <view class="selectNum-rewards-list-left-info-time">{{ item.time }}</view>

            </view>
            <!--        <view class="selectNum-rewards-list-floor">#{{item.sales}}</view>-->
        </view>
        <view style="width: calc(100% - 36px);height: 1rpx;background-color: #9a9a9a; margin: 0 18px;" />
        <view
            class="selectNum-rewards-list"
        >
            <view class="selectNum-rewards-list-left">
                <image
                    class="selectNum-rewards-list-left-image"
                    :src="item.goodsImage"
                    mode="widthFix"
                />
                <view class="selectNum-rewards-list-left-info">
                    <view class="selectNum-rewards-list-left-info-name">{{ item.title }}</view>
                </view>
            </view>
            <view class="selectNum-rewards-list-right">
                <image
                    :src="item.levelImage"
                    class="selectNum-rewards-list-right-img"
                    mode="heightFix"
                />
            </view>
        </view>
    </view>

</template>

<script setup lang="ts">

import type { PropType } from 'vue'
import type { UIProductRecordModel } from '@/model'

defineProps({

    item: {
        type: Object as () => UIProductRecordModel,
        default: Object as PropType<UIProductRecordModel>
    }
})

</script>

<style scoped lang="scss">
.selectNum-rewards{
    position: relative;
    width: 100%;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    margin-top: 26rpx;
    background: #bbc6cc;
    margin-bottom: 16px
}
.selectNum-rewards-list {
    position: relative;
    //height: 102rpx;
    display: flex;
    padding: 18rpx;
    width: calc(100% - 36rpx);
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 12rpx;
    &-left {
        flex: 1;
        display: flex;
        &-avatar {
            width: 76rpx;
            height: 76rpx;
            border-radius: 50%;
        }
        &-image{
            width: 100rpx;
            height: auto;
        }
        &-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 10rpx;

            &-name {
                font-size: 28rpx;
                color: #000000;
            }
            &-time {
                font-size: 23rpx;
                color: #000000;
            }

        }
    }
    &-right {
        position: relative;
        width: 68rpx;
        height: 60rpx;
        &-img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: -60rpx;
            top: 12rpx;
        }
    }
    &-floor{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 24rpx;
        color: #000000;
    }
}
</style>
