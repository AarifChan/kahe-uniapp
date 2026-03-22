<template>
    <view class="bottom">
        <view class="bottom-left">
            <view class="bottom-left-title theme-font"
                >我的排名：{{ mineRanks.rank }}</view
            >
            <view class="bottom-left-value theme-font"
                >我的成绩: {{ mineRanks.score }}</view
            >
        </view>
        <image
            class="bottom-btn"
            src="https://jms.85gui7.com/kahe-202510/images/rewardbtn.png"
            @tap.stop="emits('didClickReward')"
        />
    </view>
</template>
<script setup lang="ts">
import type { RankUser } from '@/model/activity'
defineProps({
    mineRanks: {
        default: {
        } as RankUser,
        type: Object as ()=>RankUser
    }
})

const emits = defineEmits(['didClickReward'])
</script>
<style lang="scss" scoped>
.bottom {
    position: fixed;
    left: 0;
    bottom: env(safe-area-inset-bottom);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 104rpx;
    background-color: #000;
    opacity: 0.7;
    padding: 0 24rpx;
    box-sizing: border-box;
    &-left {
        display: flex;
        flex-direction: column;
        &-title,
        &-value {
            font-size: 32rpx;
            font-weight: 400;
            color: #ffffff;
        }
    }

    &-btn {
        width: 200rpx;
        height: 68rpx;
    }
}
</style>
