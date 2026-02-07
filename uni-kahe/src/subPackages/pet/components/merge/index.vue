<template>
    <view class="mergeTop">
        <image class="mergeTop-bg" src="https://jms.85gui7.com/kahe-202510/pet/merge-bg.png" />
        <view class="mergeTop-side leftSide">
            <image class="mergeTop-side-bg" :src=" left ? 'https://jms.85gui7.com/kahe-202510/pet/merge-empty.png' : 'https://jms.85gui7.com/kahe-202510/pet/merge-add.png' " />
        </view>
        <view class="mergeTop-icon leftSide" v-if="left" @tap.stop="emits('update:left', null)">
            <image class="mergeTop-icon-bg" :src="left?.icon" />
        </view>
        <view class="mergeTop-side rightSide">
            <image class="mergeTop-side-bg" :src=" right ? 'https://jms.85gui7.com/kahe-202510/pet/merge-empty.png' : 'https://jms.85gui7.com/kahe-202510/pet/merge-add.png' " />
        </view>
        <view class="mergeTop-icon rightSide" v-if="right" @tap.stop="emits('update:right', null)">
            <image class="mergeTop-icon-bg" :src="right?.icon" />
        </view>
        <image class="leftArrow" src="https://jms.85gui7.com/kahe-202510/pet/side-left.png" />
        <image class="rightArrow" src="https://jms.85gui7.com/kahe-202510/pet/side-right.png" />
        <text class="mergeTop-tips">放入两个同等级的宠物，会随机一个同等级的宠物</text>
        <custom-pet-btn v-if="left && right" class="mergeTop-action theme-font"  @tap.stop="emits('didClickMerge')" title="融合"></custom-pet-btn>
    </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import { PetModel } from '@/composables/pet/model'
import CustomPetBtn from '@/pages/pet/components/customButton/index.vue'
defineProps({
    left: {
        default: null,
        type: Object as PropType<PetModel | null>
    },
    right: {
        default: null,
        type: Object as PropType<PetModel | null>
    }
})
const emits = defineEmits(['update:left', 'update:right', 'didClickMerge'])
</script>

<style lang="scss" scoped>
.mergeTop{
    position: relative;
    width: 100%;
    height: 100%;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-side{
        width: 174rpx;
        height: 174rpx;
        &-bg{
            width: 100%;
            height: 100%;
        }
    }
    &-action{
        position: absolute;
        left: calc((100% - 142rpx) / 2);
        bottom: 32rpx;
        width: 142rpx;
        height: 60rpx;
    }
    &-icon{
        position: relative;
        width: 174rpx;
        height: 174rpx;
        &-bg{
            position: absolute;
            left: 24rpx;
            top: 24rpx;
            width: calc(100% - 48rpx);
            height: calc(100% - 48rpx);
        }
    }
    &-tips{
        position: absolute;
        left: 0;
        top: 18rpx;
        font-weight: normal;
        font-size: 24rpx;
        color: #000000;
        text-align: center;
        width: 100%;
    }
}
.leftSide{
    position: absolute;
    left: 62rpx;
    bottom: 62rpx;
}
.leftArrow{
    position: absolute;
    left: 192rpx;
    bottom: 192rpx;
    width: 60rpx;
    height: 57rpx;
}
.rightArrow{
    position: absolute;
    right: 192rpx;
    bottom: 192rpx;
    width: 60rpx;
    height: 57rpx;
}
.rightSide{
    position: absolute;
    right: 62rpx;
    bottom: 62rpx;
}
</style>
