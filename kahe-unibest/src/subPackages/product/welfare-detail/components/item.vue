<template>
    <view class="list">
        <image class="list-img" :src="item.goodsDto.image" />
        <view style="margin-left: 12rpx">
            <view class="list-title theme-font">{{ item.goodsDto.name }}</view>
            <view class="list-text">抽{{ item.num }}份/期</view>
        </view>
    </view>
</template>
<script setup lang="ts">
import type { WareDetailGoods } from '@/model/welfare'
import { type PropType } from 'vue'

defineProps({
    item: {
        type: Object as PropType<WareDetailGoods>,
        default: {
        } as WareDetailGoods
    }
})
</script>
<style lang="scss" scoped>
.list {
    width: 300rpx;
    height: 113rpx;
    background: linear-gradient(180deg, #d8e9fd, #91bff8);
    border-radius: 10rpx;
    border: 4rpx solid #91bff8;
    display: flex;
    align-items: center;
    &-img {
        position: relative;
        width: 86rpx;
        height: calc(86rpx / 320 * 400);
        margin-left: 12rpx;
    }
    &-title {
        position: relative;

        font-weight: 400;
        font-size: 26rpx;
        color: #000000;
    }
    &-text {
        position: relative;

        font-size: 18rpx;
        color: #5d5d5d;
    }
}
</style>
