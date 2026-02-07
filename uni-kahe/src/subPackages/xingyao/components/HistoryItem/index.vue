<template>
  <view class="user-card">
    <!--    <view class="num" v-if="type === 2">#{{ item.id }}</view>-->
    <view class="item">
      <view class="user-info">
        <image class="avatar" :src="user?.avatar" mode="aspectFill" />
        <text class="username">{{ user?.nickname }}</text>
      </view>
      <view class="user-time">
        <view class="date">第{{ aId }}期</view>
        <text>{{
          item.createTime ? dayjs(item.createTime).format("MM-DD HH:mm:ss") : ""
        }}</text>
      </view>
    </view>
    <view class="line"></view>
    <view class="bottom">
      <view class="bottom-right">
        <image class="goods" :src="item.goodsDto?.image" mode="aspectFill" />
        <text>{{ item.goodsDto?.name }}</text>
      </view>
      <view class="left"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { inject, PropType, ref } from "vue";
import { PrizePool, PrizeUser, ShingingLog } from "@/subPackages/xingyao/api";
import dayjs from "dayjs";
defineProps({
  item: {
    default: {} as PrizePool,
    type: Object as PropType<PrizePool>,
  },
  user: {
    default: {} as PrizeUser,
    type: Object as PropType<PrizeUser>,
  },
  aId: Number,
});
</script>

<style scoped lang="scss">
.user-card {
  position: relative;
  width: 100%;
  border: 2rpx solid #972424;
  box-sizing: border-box;
  padding: 40rpx 20rpx;
  border-radius: 12rpx;
  background-color: #fff;
  margin-bottom: 15rpx;

  .num {
    position: absolute;
    top: 8rpx;
    right: 13rpx;
    font-family: SimHei;
    font-weight: 400;
    font-size: 24rpx;
    color: #000000;
  }

  .item {
    // padding: 42rpx 0;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;

    .user-info {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;

      .avatar {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        margin-right: 20rpx;
        flex-shrink: 0;
      }

      .username {
        font-size: 28rpx;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .user-time {
      flex: 1;
      text-align: center;
      font-size: 26rpx;
      color: #666;

      .date {
        font-family: SimHei;
        font-weight: 400;
        font-size: 24rpx;
        color: #000000;
      }
    }
  }

  .line {
    margin: 20rpx 0;
    width: 100%;
    height: 2rpx;
    background: #dfa5a5;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-right {
      display: flex;
      align-items: center;

      .goods {
        width: 43rpx;
        height: 59rpx;
        margin-right: 23rpx;
      }
    }
  }
}
</style>
