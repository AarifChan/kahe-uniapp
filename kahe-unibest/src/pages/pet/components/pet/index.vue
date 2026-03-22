<template>
    <view class="petCard">
        <view class="petCard-bg" />
        <image class="petCard-bg" :src="item.icon" />
        <image class="petCard-decorate" src="https://jms.85gui7.com/kahe-202510/pet/card-bottom.png" />
        <text class="petCard-name theme-font text-stroke">{{item.name}}</text>
        <image class="petCard-level" :src="'https://jms.85gui7.com/kahe-202510/pet/level' + item.level + '.png' " />
        <image v-if="selected" class="petCard-select" src="https://jms.85gui7.com/kahe-202510/pet/select.png" />
    </view>
</template>

<script lang="ts" setup>
import { PetModel } from '@/composables/pet/model'
import { type PropType } from 'vue'

defineProps({
    scale: {
        default: 1,
        type: Number
    },
    item: {
        default: {
        } as PetModel,
        type: Object as PropType<PetModel>
    },
    selected: {
        default: false,
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
.petCard{
    position: relative;
    width: 100%;
    aspect-ratio:  152 / 176.0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &-bg{
        position: absolute;
        top: 10rpx;
        left: 10rpx;
        width: calc(100% - 20rpx);
        height: calc(100% - 20rpx);
        background-color: #3C3C3C;
    }
    &-icon{
        position: absolute;
        top: 8px;
        left: 0;
        width: 100%;
        aspect-ratio:  1;
    }
    &-select{
        position: absolute;
        left: -8rpx;
        top: -8rpx;
        width: 47rpx;
        height: 46rpx;
    }

    &-level{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
    }

    &-decorate{
        position: absolute;
        bottom: 0;
        left: 10rpx;
        width: calc(100% - 20rpx);
        aspect-ratio:  132 / 41.0;
    }
    &-name{
        position: absolute;
        bottom: 8rpx;
        left: 16rpx;
        width: calc(100% - 32rpx);
        font-weight: 400;
        font-size: 24rpx;
        color: #FFFFFF;
        text-align: center;
    }
}
</style>
