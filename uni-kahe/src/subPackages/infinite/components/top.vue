<template>
    <view class="top relative w-full h-313 flex justify-between px-30 box-border overflow-hidden">
        <image class="top-bg absolute inset-0 w-full h-full z-0" src="/static/kahe-202510/images/infinite-top-bg.png" :style="{ willChange: 'transform' }" />
        <view class="top-left mt-167 relative w-436 h-104 z-99">
            <image class="top-left-bg w-full h-full" src="/static/kahe-202510/product/card-item-bg.png" :style="{ willChange: 'transform' }" />
            <view class="top-left-tips absolute left-6 top-0 font-normal text-18 text-black">vip客服-可可</view>
            <view class="top-left-title absolute left-32 top-36 mr-8 text-20 text-white" v-if="types">
                主人，请选择心仪的抽卡机，海量卡牌任您挑选。
            </view>
            <view class="top-left-title absolute left-32 top-36 mr-8 text-20 text-white" v-else>
                主人，请选择心仪的抽卡机，海量卡牌任您挑选。
            </view>
        </view>
        <image class="top-center absolute left-1/2 -top-20 -translate-x-1/2 h-360 w-340" src="/static/kahe-202510/images/infinite-girl.gif"  v-if="types" :style="{ willChange: 'transform' }" />
        <image class="top-center absolute left-1/2 -top-20 -translate-x-1/2 h-360 w-340" src="/static/kahe-202510/images/card-girl.gif"  v-else :style="{ willChange: 'transform' }" />
        <view class="top-right mt-142 relative w-242 h-154 flex justify-center overflow-hidden">
            <Barrage :list="goods" />
        </view>
    </view>
</template>
<script setup lang="ts">
import Barrage from '@/components/barrage/index.vue'
import type { UIBarrageModel } from '@/model'
import type { PropType } from 'vue'
defineProps({
    goods: {
        type: Array as PropType<UIBarrageModel[]>,
        default: () => []
    },
    types: {
        type: Boolean,
        default: true
    }
})
</script>
<style lang="scss" scoped>
</style>
