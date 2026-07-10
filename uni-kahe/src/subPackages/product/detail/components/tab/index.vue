<template>
    <view class="normalCenterTab relative flex w-full" :style="{ marginTop: '-24rpx' }">
        <text class="normalCenterTab-price theme-font px-30 text-28 font-normal text-black" :style="{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }">¥{{product.price}}元</text>
        <view class="normalCenterTab-content relative flex flex-row" :style="{ marginTop: '-30rpx' }">
            <view class="normalCenterTab-content-item relative w-158 h-74 mr-20" @tap.stop="didClickTab(0)">
                <image class="normalCenterTab-content-item-bg w-full h-full" :src=" currentTab === 0 ? '/static/kahe/product/tab1.png' : '/static/kahe/product/tab2.png'" />
                <text class="normalCenterTab-content-item-title theme-font absolute left-0 top-10 w-full text-24 font-normal text-white text-center" :style="{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }">赏池一览</text>
            </view>
            <view class="normalCenterTab-content-item relative w-158 h-74 mr-20" @tap.stop="didClickTab(1)">
                <image class="normalCenterTab-content-item-bg w-full h-full" :src=" currentTab === 1 ? '/static/kahe/product/tab1.png' : '/static/kahe/product/tab2.png'" />
                <text class="normalCenterTab-content-item-title theme-font absolute left-0 top-10 w-full text-24 font-normal text-white text-center" :style="{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }">抽赏记录</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>

import { PropType, ref } from 'vue'
import { UIProductDetailModel } from '@/model'

const props = defineProps({
    current: {
        default: 0,
        type: Number
    },
    product: {
        default: {
        } as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>
    }
})

const currentTab = ref(props.current)

const didClickTab = (index: number) => {
    if (currentTab.value === index) {
        return
    }
    currentTab.value = index
    emits('update:current', index)
    emits('tabDidChange', index)
}

const emits = defineEmits(['update:current', 'tabDidChange'])

</script>

<style lang="scss" scoped>
</style>
