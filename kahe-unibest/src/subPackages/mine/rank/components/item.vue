<template>
    <view class="rank-item">
        <text class="rank-item-rank theme-font">{{ item.rank }}</text>
        <image class="rank-item-avatar" :src="item.avatar"></image>
        <view class="rank-item-info">
            <text class="rank-item-title">{{ item.nickName }}</text>
            <text class="rank-item-title">成绩{{ item.score }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

export interface RankItemInfo {
    avatar: string
    nickName: string
    score: number
    rank: number
  }

defineProps({
    item: {
        default: {
        } as RankItemInfo,
        type: Object as PropType<RankItemInfo>
    }
})
</script>

<style lang="scss" scoped>
  .rank-item {
    position: relative;
    width: calc(100% - 60rpx);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16rpx 30rpx;
    border-bottom: 1rpx solid #8889ad;

    &-rank {
      font-size: 40rpx;
      font-weight: 400;
      color: #595A70;
    }
    &-avatar {
      margin-left: 30rpx;
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background-color: lightgray;
    }
    &-info {
      margin-left: 16rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      &-title {
        font-size: 20rpx;
        font-weight: 400;
        color: #1a385b;
      }
    }
  }
</style>
