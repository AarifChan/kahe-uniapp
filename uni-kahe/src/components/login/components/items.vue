<template>
    <view class="login-item relative w-477 h-134 mb-8">
        <image class="login-item-bg w-full h-full" src="/static/kahe/login/item-bg.png" />
        <view class="login-item-content absolute left-40 top-0 h-full flex flex-row items-center justify-between" style="width: calc(100% - 80rpx)">
            <view class="login-item-content-left flex flex-col">
                <text class="login-item-content-left-title theme-font text-40 text-white font-normal">{{item.title}}</text>
                <text class="login-item-content-left-subTitle theme-font text-30 font-normal text-[#BCD2FF]">{{item.subTitle}}</text>
            </view>
            <view class="login-item-content-icon flex flex-row items-center justify-center w-100 h-100">
                <image class="login-item-content-icon-img w-full h-full" :src="item.icon" />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'

export interface LoginItemType{
    title: string
    subTitle: string
    width: string
    height: string
    icon: string

}

defineProps({
    item: {
        default: {
        } as LoginItemType,
        type: Object as PropType<LoginItemType>
    }
})

</script>

<style lang="scss" scoped></style>
