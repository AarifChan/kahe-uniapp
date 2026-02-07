<template>
    <view class="title theme-font">{{ value }}</view>
    <view class="line"></view>
</template>
<script setup lang="ts">
defineProps({
    value: {
        type: String,
        default: "",
    },
});
</script>
<style lang="scss" scoped>
.title {
    position: absolute;
    left: 32rpx;
    top: 10rpx;
    font-weight: 400;
    font-size: 30rpx;
    color: #000000;
    z-index: 1;
}
.line {
    width: 110rpx;
    position: absolute;
    left: 32rpx;
    top: 35rpx;
    height: 10rpx;
    background-color: #5ea2fd;
    z-index: 0;
}
</style>
