<template>
    <view class="relative w-full flex flex-row items-center justify-between">
        <custom-button width="152rpx" height="42rpx" :title="title" :text-color="color"
                       font-size="26rpx"
                       border-radius="0"
                       :theme-font="false"
                       :text-stroke = 'false'
        />
        <view class="flex flex-row items-center">
            <text class="text-24 font-normal text-black mr-22">{{value}}</text>
            <image class="w-32 h-49" src="/static/kahe/common/right-arrow.png" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/custom/button/index.vue'
defineProps({
    title: {
        default: '',
        type: String
    },
    color: {
        default: 'white',
        type: String
    },
    value: {
        default: '',
        type: String
    }
})
</script>

<style lang="scss" scoped>
</style>
