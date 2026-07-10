<template>
    <view class="normalBottom relative flex flex-col">
        <image class="normalBottom-bg w-750 h-248" src="/static/kahe/product/normal-bottom-bg2.png" />
        <view class="normalBottom-other w-full bg-[#393939]" :style="{ height: 'env(safe-area-inset-bottom)' }" />
        <view class="normalBottom-info absolute left-0 top-0 w-full h-146 flex flex-col items-center justify-center">
            <view class="normalBottom-info-top mt-60 flex flex-row items-center justify-between"
                :style="{ width: 'calc(100% - 60rpx)', padding: '0 30rpx' }"
            >
                <image class="normalBottom-info-top-side w-125 h-63" src="/static/kahe/product/left-btn.png" @tap.stop="handleChangeNum(true)" />
                <view class="normalBottom-info-top-center flex flex-row items-baseline">
                    <text class="normalBottom-info-top-center-title theme-font text-30 font-normal text-[#3B7CFF]" :style="{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }">冲</text>
                    <text class="normalBottom-info-top-center-value theme-font text-60 font-normal text-[#3B7CFF] px-12" :style="{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }">{{current}}</text>
                    <text class="normalBottom-info-top-center-title theme-font text-30 font-normal text-[#3B7CFF]" :style="{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }">发</text>
                </view>
                <image class="normalBottom-info-top-side w-125 h-63" src="/static/kahe/product/right-btn.png" @tap.stop="handleChangeNum(false)" />
            </view>
            <view class="normalBottom-info-center mt-10 relative flex flex-row items-center justify-center">
                <view class="normalBottom-info-center-item relative py-8 px-40" v-for="(item, index) in cardsArray" :key="'card-index'+index" @tap.stop="didSelectCard(item)">
                    <image class="normalBottom-info-center-item-bg w-132 h-53" :src="item.num === current ? '/static/kahe/product/item1.png' : '/static/kahe/product/item2.png'" />
                    <text class="normalBottom-info-center-item-title theme-font absolute left-0 top-0 w-full h-70 text-center leading-70 text-25 font-normal text-[#FFFFFF]" :style="{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }">冲{{item.num}}发</text>
                </view>
            </view>
            <view class="normalBottom-info-btn relative mt-16" @tap.stop="emits('didTapChoose')">
                <image class="normalBottom-info-btn-bg w-650 h-80" src="/static/kahe/product/normal-chase-bg.png" />
                <text class="normalBottom-info-btn-title theme-font absolute left-0 top-0 w-full h-full text-center leading-80 text-40 font-normal text-[#FFFFFF]" :style="{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }">立即抽赏</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import { UIProductPriceCard } from '@/model'

const props = defineProps({
    cardsArray: {
        default: () => [],
        type: Array as PropType<UIProductPriceCard[]>
    },
    current: {
        default: 1,
        type: Number
    }
})

const emits = defineEmits(['update:current', 'didTapChoose'])

const handleChangeNum = (isLeft: boolean) => {
    if (isLeft && props.current > 1) {
        emits('update:current', props.current - 1)
        return
    }
    if (!isLeft) {
        emits('update:current', props.current + 1)
    }
}

const didSelectCard = (item: UIProductPriceCard) => {
    emits('update:current', item.num)
}

</script>

<style lang="scss" scoped>
</style>
