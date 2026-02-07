<template>
    <view class="normalCenterTab">
        <text class="normalCenterTab-price theme-font text-stroke-white">¥{{product.price}}元</text>
        <view class="normalCenterTab-content">
            <view class="normalCenterTab-content-item" @tap.stop="didClickTab(0)">
                <image class="normalCenterTab-content-item-bg" :src=" currentTab === 0 ? 'https://jms.85gui7.com/kahe/product/tab1.png' : 'https://jms.85gui7.com/kahe/product/tab2.png'" />
                <text class="normalCenterTab-content-item-title theme-font text-stroke">赏池一览</text>
            </view>
            <view class="normalCenterTab-content-item" @tap.stop="didClickTab(1)">
                <image class="normalCenterTab-content-item-bg" :src=" currentTab === 1 ? 'https://jms.85gui7.com/kahe/product/tab1.png' : 'https://jms.85gui7.com/kahe/product/tab2.png'" />
                <text class="normalCenterTab-content-item-title theme-font text-stroke">抽赏记录</text>
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
.normalCenterTab{
    margin-top: -24rpx;
    position: relative;
    display: flex;
    width: 100%;
    &-price{
        padding: 0 30rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #000000;
    }
    &-content{
        position: relative;
        margin-top: -30rpx;
        display: flex;
        flex-direction: row;
        &-item{
            position: relative;
            width: 158rpx;
            height: 74rpx;
            margin-right: 20rpx;
            &-bg{
                width: 100%;
                height: 100%;
            }
            &-title{
                position: absolute;
                left: 0;
                top: 10rpx;
                width: 100%;
                font-size: 24rpx;
                font-weight: 400;
                color: #FFFFFF;
                text-align: center;
            }
        }

    }

}
</style>
