<template>
    <view
        class="recommendItem"
    >
        <image class="recommendItem-img" :src="item.image" />
        <view class="recommendItem-content">
            <text class="recommendItem-content-title">{{
                item.title
            }}</text>
            <view class="recommendItem-content-texts">
                <text>¥{{ item.price }}</text>
                <text>{{ item.productNum }}/{{ item.lastSeqNo }}箱</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { UIRecommendModel } from '@/model'
import type { PropType } from 'vue'

defineProps({
    item: {
        type: Object as PropType<UIRecommendModel>,
        default: {
        } as UIRecommendModel
    }
})
</script>

<style lang="scss" scoped>
.recommendItem {
    position: relative;

    width: 472rpx;
    height: 202rpx;
    display: inline-block;
    border-radius: 30rpx;
    overflow: hidden;
    margin-right: 12rpx;
    &-img {
        width: 100%;
        height: 100%;
    }
    &-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 61rpx;
        background-color: #090514;
        opacity: 0.7;
        &-title {
            position: absolute;
            left: 10rpx;
            top: 0;
            z-index: 1;
            font-size: 18rpx;
            color: #ffffff;
            line-height: 36rpx;
        }
        &-texts {
            position: absolute;
            left: 10rpx;
            bottom: 4rpx;
            z-index: 1;
            width: calc(100% - 20rpx);
            display: flex;
            justify-content: space-between;
            font-size: 18rpx;
            color: #ffffff;
        }
    }
}
</style>
