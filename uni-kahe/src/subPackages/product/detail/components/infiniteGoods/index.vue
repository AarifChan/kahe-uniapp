<template>
    <view class="scroll-list">
        <view class="scroll-list-top">
            <image class="scroll-list-top-bg" :src="getSpecLevelBgTitleByLevel(item.level)" />
            <image class="scroll-list-top-level" :src="getLevelImageByLevel(item.level)" />
            <image class="scroll-list-top-name" :src="getLevelImageNameByLevel(item.level)" />
            <text class="scroll-list-top-prob">概率 {{ item.prob }}%(此概率为当前款式概率)</text>
        </view>
        <view class="scroll-list-content">
            <goods-item class="general-content-list-item" v-for="(goods, index) in item.items"
                @tap.stop="emits('clickDetail', goods)" :is-infinite="true" :key="index" :goods-price="product.price"
                :item="goods" />
        </view>
    </view>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import type { UIProductDetailLevelGroup, UIProductDetailModel } from '@/model'
import { useEnum } from '@/composables/enum'
import GoodsItem from './../generalGoods/index.vue'
const { getSpecLevelBgTitleByLevel, getLevelImageByLevel, getLevelImageNameByLevel } = useEnum()
const emits = defineEmits(['clickDetail'])
defineProps({
    product: {
        default: {
        } as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>
    },
    item: {
        type: Object as PropType<UIProductDetailLevelGroup>,
        default: {
        } as UIProductDetailLevelGroup
    }
})

</script>
<style lang="scss" scoped>
.scroll {
    box-sizing: border-box;
    margin-top: 42rpx;
    position: relative;
    width: 100%;

    &-list {
        position: relative;
        width: 100%;

        &-top {
            position: relative;
            margin: 16rpx auto;
            width: 660rpx;
            height: 54rpx;

            &-bg {
                width: 100%;
                height: 100%;
            }

            &-level {
                position: absolute;
                left: 0;
                top: -20rpx;
                width: 100rpx;
                height: 80rpx;
            }

            &-name {
                position: absolute;
                left: 100rpx;
                top: 8rpx;
                width: 91rpx;
                height: 37rpx;
            }

            &-prob {
                position: absolute;
                left: 220rpx;
                top: 20rpx;
                font-weight: normal;
                font-size: 15rpx;
                color: #000;
            }
        }

        &-content {
            position: relative;
            box-sizing: border-box;
            width: 100%;
            padding: 20rpx 30rpx 20rpx 30rpx;
            display: grid;
            grid-template-columns: repeat(auto-fill,
                    minmax(calc((100% - 60rpx) / 3), 1fr)); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
            grid-gap: 30rpx; // 这是网格间的间隙，根据需要调整

            &-item {
                display: inline-block;
                width: 100%;
            }
        }
    }

}
</style>
