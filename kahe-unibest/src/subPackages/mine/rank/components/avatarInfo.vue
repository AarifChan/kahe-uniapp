<template>
    <view class="info">
        <view class="info-avatar">
            <image
                v-if="info.avatar !== ''"
                class="info-avatar-head"
                :src="info.avatar"
            />
            <image
                v-if="info.avatar !== ''"
                class="info-avatar-border"
                :src="info.decorate"
            />
            <text class="info-title text-flow-ellipsis-single">{{
                info.nickName
            }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

export interface RankInfo {
    avatar: string
    decorate: string
    nickName: string
    score: string
    rank: number
  }

defineProps({
    info: {
        default: {
        } as RankInfo,
        type: Object as PropType<RankInfo>
    }
})
</script>

<style lang="scss" scoped>
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    &-avatar {
        position: relative;
        width: 138rpx;
        height: 148rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &-head {
            position: absolute;
            top: 20rpx;
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
        }
        &-border {
            position: absolute;
            width: 138rpx;
            height: 148rpx;
        }
        &-img {
            width: 120rpx;
            height: 120rpx;
            border-radius: 60rpx;
        }
        &-bottom {
            position: absolute;
            left: 0;
            bottom: 46rpx;
            width: 100%;
            display: flex;
            flex-direction: column;

            &-title {
                font-size: 20rpx;
                font-weight: 400;
                color: #5a221a;
                text-align: center;
            }
        }
    }
    &-title {
        position: absolute;
        bottom: -34rpx;
        font-size: 28rpx;
        color: #000000;
        text-align: center;
    }
}
</style>
