<template>
    <view class="petSkill relative w-full h-screen">
        <image class="petSkill-bg w-full h-full" src="/static/kahe-202510/pet/skill-bg.png" />
        <view class="petSkill-content absolute left-0 top-0 w-full">
            <view class="petSkill-content-top relative w-full flex flex-row items-center justify-center" style="padding-top: 16px;">
                <image class="petSkill-content-top-bg w-696 h-206" src="/static/kahe-202510/pet/intro-top.png" />
                <text class="petSkill-content-top-title theme-font absolute top-60 left-82 text-48 font-normal text-black">已收集</text>
                <text class="petSkill-content-top-subTitle absolute bottom-50 left-82 text-40 font-normal text-black">0/{{petList.length}}</text>
            </view>
            <scroll-view class="petSkill-content-list relative w-full flex flex-col" style="padding-top: 16px; height: calc(100vh - 184rpx - 206rpx - 60rpx);" :scroll-y="true" :scroll-x="false">
                <view class="petSkill-content-list-content px-30" style="width: calc(100% - 60rpx);">
                    <pet-intro-card v-for="(item, index) in petList" :key="'pet-intro-card'+index" :item="item" />

                </view>
            </scroll-view>
            <view class="petSkill-content-bottom relative w-full" @tap.stop="handleClickBack">
                <image class="petSkill-content-bottom-bg w-750 h-184" src="/static/kahe-202510/pet/bottom-bg.png" />
                <view class="petSkill-content-bottom-btn absolute top-50 left-0 w-full flex flex-row items-center justify-center">
                    <view class="petSkill-content-bottom-btn-info relative w-634 h-75">
                        <image class="petSkill-content-bottom-btn-info-bg w-full h-full" src="/static/kahe-202510/pet/bottom-btn-bg.png" />
                        <text class="petSkill-content-bottom-btn-info-title theme-font absolute left-0 top-8 w-full text-50 font-normal text-black text-center">返回宠物小屋</text>
                    </view>

                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>

import { computed, onMounted } from 'vue'
import PetModule from '@/store/modules/pet'
import PetIntroCard from '../components/introduceCard/index.vue'
const petList = computed(() => {
    return PetModule.petList
})

onMounted(() => {
    console.log('petList:', petList.value)
})

const handleClickBack = () => {
    uni.navigateBack()
}

</script>

<style lang="scss" scoped>
</style>
