<template>
    <view class="relative flex flex-col items-center justify-center mb-21">
        <image class="w-100 h-100" :src="icon" />
        <text class="-mt-40 w-80 h-28 bg-[rgba(0,0,0,0.7)] rounded-14 font-normal text-20 text-[#FFFFFF] text-center leading-28">{{title}}</text>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    icon: {
        default: '',
        type: String
    },
    title: {
        default: '',
        type: String
    }
})
</script>

<style lang="scss" scoped>
</style>
