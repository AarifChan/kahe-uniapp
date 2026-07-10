<template>
    <view class="mergeTop relative w-full h-full">
        <image class="mergeTop-bg w-full h-full" src="/static/kahe-202510/pet/merge-bg.png" />
        <view class="mergeTop-side leftSide absolute left-62 bottom-62 w-174 h-174">
            <image class="mergeTop-side-bg w-full h-full" :src=" left ? '/static/kahe-202510/pet/merge-empty.png' : '/static/kahe-202510/pet/merge-add.png' " />
        </view>
        <view class="mergeTop-icon leftSide absolute left-62 bottom-62 w-174 h-174" v-if="left" @tap.stop="emits('update:left', null)">
            <image class="mergeTop-icon-bg absolute left-24 top-24" style="width: calc(100% - 48rpx); height: calc(100% - 48rpx);" :src="left?.icon" />
        </view>
        <view class="mergeTop-side rightSide absolute right-62 bottom-62 w-174 h-174">
            <image class="mergeTop-side-bg w-full h-full" :src=" right ? '/static/kahe-202510/pet/merge-empty.png' : '/static/kahe-202510/pet/merge-add.png' " />
        </view>
        <view class="mergeTop-icon rightSide absolute right-62 bottom-62 w-174 h-174" v-if="right" @tap.stop="emits('update:right', null)">
            <image class="mergeTop-icon-bg absolute left-24 top-24" style="width: calc(100% - 48rpx); height: calc(100% - 48rpx);" :src="right?.icon" />
        </view>
        <image class="leftArrow absolute left-192 bottom-192 w-60 h-57" src="/static/kahe-202510/pet/side-left.png" />
        <image class="rightArrow absolute right-192 bottom-192 w-60 h-57" src="/static/kahe-202510/pet/side-right.png" />
        <text class="mergeTop-tips absolute left-0 top-18 w-full text-24 font-normal text-black text-center">放入两个同等级的宠物，会随机一个同等级的宠物</text>
        <custom-pet-btn v-if="left && right" class="mergeTop-action theme-font absolute bottom-32 w-142 h-60" style="left: calc((100% - 142rpx) / 2);"  @tap.stop="emits('didClickMerge')" title="融合"></custom-pet-btn>
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
</style>
