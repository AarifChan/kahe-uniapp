<template>
    <view class="relative w-142 h-60" :style="{ width: width}">
        <image class="w-full h-full" src="/static/kahe-202510/pet/btn-bg.png" />
        <view class="absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center">
            <text class="font-normal text-32 text-[#FFFFFF] theme-font" style="line-height: 100%">{{title}}</text>
        </view>

        <view class="absolute top-15 right-15 flex flex-col items-center" v-if="sorted">
            <image class="w-23 h-13" :src="sorted ? '/static/kahe-202510/pet/up-active.png': '/static/kahe-202510/pet/up.png' "  />
            <image class="mt-4 w-23 h-13" :src="sorted ? '/static/kahe-202510/pet/down.png': '/static/kahe-202510/pet/down-active.png' "  />
        </view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    sorted: {
        default: false,
        type: Boolean
    },
    width: {
        default: '142rpx',
        type: String
    }
})
</script>

<style lang="scss" scoped>
</style>
