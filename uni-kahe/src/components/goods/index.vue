<template>
    <view class="goodsInfo w-full relative overflow-hidden mb-20 bg-white rounded-30">
        <view class="goodsInfo-empty absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-3 flex flex-row justify-center items-center" v-if="item.productNum === 0">
            <image style="width:137rpx;height: 63rpx" src="/static/jos/1214/sell-out.png" />
        </view>
        <view class="goodsInfo-cover pt-12 px-12 pb-0 relative box-border w-full aspect-ratio-[1/1] h-fit overflow-hidden flex flex-row items-center justify-center">
            <image class="goodsInfo-cover-img h-full rounded-16" :src="item.image" mode="heightFix" />
            <view class="goodsInfo-cover-pattern absolute left-10 bottom-12 z-2 flex flex-col">
                <image v-for="(label, index) in item.labels" :key="'labels:' + index" :src="formatLabelImage(label)"
                    class="goodsInfo-cover-pattern-img mt-8 w-149 h-49" />
            </view>
        </view>
        <view class="goodsInfo-info">
            <view class="goodsInfo-info-content relative w-full h-full">
                <view class="goodsInfo-info-content-bottom px-12 w-full box-border">
                    <view class="goodsInfo-info-content-bottom-title mt-10 ml-10 font-normal text-24 text-black leading-30 h-60 text-ellipsis-2">{{ item.name }}</view>
                    <view class="goodsInfo-info-content-bottom-row1 px-10 box-border flex flex-row items-center justify-between" style="transform: translateY(-16rpx)">
                        <text class="goodsInfo-info-content-bottom-row1-title price-font text-black text-40">{{ isFromMall ? '' : '' }}{{ item.price }}/{{
                                isFromMall ? '点券' : '抽'
                            }}</text>
                    </view>
                </view>
            </view>
        </view>
        <image class="goodsInfo-tags absolute -left-4 -top-2 w-180 h-54" v-if="showTag" :src="item.mainTagImage" />
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UIMallListItemModel, UIProductModel } from '@/model'
defineProps({
    item: {
        default: {
        } as UIProductModel | UIMallListItemModel,
        type: Object as PropType<UIProductModel | UIMallListItemModel>
    },
    showTag: {
        default: true,
        type: Boolean
    },
    isFromMall: {
        default: false,
        type: Boolean
    }
})

const formatLabelImage = (index: number) => {
    return '/static/kahe-202510/tags/mode' + index + '.png'
}
</script>

<style lang="scss" scoped></style>
