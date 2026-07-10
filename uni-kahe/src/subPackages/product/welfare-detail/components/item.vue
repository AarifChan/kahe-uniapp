<template>
    <view class="list w-300 h-113 flex items-center rounded-10 border-4 border-[#91bff8]"
        style="background: linear-gradient(180deg, #d8e9fd, #91bff8);"
    >
        <image class="list-img relative w-86 ml-12" :src="item.goodsDto.image" style="height: calc(86rpx / 320 * 400);" />
        <view style="margin-left: 12rpx">
            <view class="list-title theme-font relative text-26 font-normal text-black">{{ item.goodsDto.name }}</view>
            <view class="list-text relative text-18 text-[#5d5d5d]">抽{{ item.num }}份/期</view>
        </view>
    </view>
</template>
<script setup lang="ts">
import type { WareDetailGoods } from '@/model/welfare'
import { type PropType } from 'vue'

defineProps({
    item: {
        type: Object as PropType<WareDetailGoods>,
        default: {
        } as WareDetailGoods
    }
})
</script>
<style lang="scss" scoped>
</style>
