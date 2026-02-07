<template>
    <view class="empty" v-if="show">{{tips}}</view>
</template>
<script setup lang="ts">

defineProps({
    show: {
        default: false,
        type: Boolean
    },
    tips: {
        default: '暂无更多数据',
        type: String
    }
})

</script>

<style scoped lang="scss">
.empty{
    position: relative;
    padding: 32prx 0;
    width: calc(750rpx - 64rpx);
    font-size: 24rpx;
    color: #9a9a9a;
    text-align: center;
}
</style>
