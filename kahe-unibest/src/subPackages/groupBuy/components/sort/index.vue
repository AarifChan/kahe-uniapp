<template>
    <!-- <image class="sort-up" :src="isUp ? 'https://jms.85gui7.com/kahe-202510/groupBuy/up-active.png' : 'https://jms.85gui7.com/kahe-202510/groupBuy/up.png'" />
        <image class="sort-down" :src="!isUp ? 'https://jms.85gui7.com/kahe-202510/groupBuy/down-active.png' : 'https://jms.85gui7.com/kahe-202510/groupBuy/down.png'" /> -->
    <view class="sort">
        <view class="sort-up" :class="{ active: isUp }"></view>
        <view class="sort-down" :class="{ active: !isUp }"></view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    isUp: {
        default: true,
        type: Boolean
    }
})

</script>

<style lang="scss" scoped>
// .sort{
//     margin-left: 12rpx;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     &-up{
//         width: 18rpx;
//         height: 11rpx;
//     }
//     &-down{
//         margin-top: 5rpx;
//         width: 18rpx;
//         height: 10rpx;
//     }
// }
.sort {
    margin-left: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-up,
    &-down {
        width: 0;
        height: 0;
        border-left: 9rpx solid transparent;
        border-right: 9rpx solid transparent;
        transition: all 0.2s ease;
    }

    &-up {
        border-bottom: 11rpx solid #d0d0d0; // 默认灰色

        &.active {
            border-bottom-color: #731f1f; // 激活状态为主题色
        }
    }

    &-down {
        margin-top: 5rpx;
        border-top: 11rpx solid #d0d0d0; // 默认灰色

        &.active {
            border-top-color: #731f1f; // 激活状态为主题色
        }
    }
}
</style>
