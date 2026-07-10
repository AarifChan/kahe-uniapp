<template>
    <view class="exploration relative w-full h-screen">
        <image class="exploration-bg w-full h-full" src="/static/kahe-202510/pet/pet-bg.png" />
        <view class="exploration-top absolute left-0 top-0 w-full h-600">
            <top />
        </view>
        <view class="exploration-top absolute left-0 top-0 w-full h-600">
            <explore :item="dispatchPet" @did-click-action="handleClick" />
        </view>
        <view class="exploration-bottom absolute left-0 top-600 w-full flex flex-col" style="height: calc(100vh - 600rpx - 100rpx);">
            <view class="exploration-bottom-handle" style="padding: 8px 16px 0 16px; width: calc(100% - 32px) ;">
                <handle @did-click="clickHandle" @did-change-filter="handlePetFilter" />
            </view>
            <scroll-view class="exploration-bottom-scroll relative w-full h-full" :scroll-y="true" :enable-flex="true" scroll-with-animation
                         @scrolltolower="handleMinePetScrollToLower"
            >
                <view class="exploration-bottom-scroll-content relative" style="padding: 8px 16px 24px 16px; width: calc(100% - 32px); display: grid; grid-template-columns: repeat(auto-fill, minmax(calc( (100% - 30px) / 4), 1fr)); grid-gap: 10px;">
                    <pet v-for="(item, index) in minePetList" :key="'pet'+index" :item="item" :selected="currentPet?.id === item.id"
                         @tap.stop="currentPet=item"
                    />
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import Top from '@/pages/pet/components/top/index.vue'
import Pet from '@/pages/pet/components/pet/index.vue'
import Handle from '@/pages/pet/components/handle/index.vue'
import Explore from '../components/exploration/index.vue'
import { usePet } from '@/composables/pet'
import { onMounted } from 'vue'
import { PetModel } from '@/composables/pet/model'

const {
    minePetList,
    currentPet,
    dispatchPet,
    getMinePetList,
    handleMinePetScrollToLower,
    handlePetFilter,
    handleExplorePet,
    handleOnlinePet,
    cancelExplorePet,
    handleAboundPet,
    getDispatchPetList

} = usePet()
onMounted(() => {
    getMinePetList()
    getDispatchPetList()
})
const handleSelectPet = (item: PetModel) => {
    if (!dispatchPet.value) {
        return
    }
    currentPet.value = item
    console.log('currentPet:', currentPet.value)
}
const handleClick = (index: number) => {
    if (index === 1) {
        handleExplorePet()
    }
    if (index === 2) {
        cancelExplorePet()
    }
}
const clickHandle = (index: number) => {
    if (index === 1) {
        handleAboundPet()
    }
    if (index === 2) {
        handleOnlinePet()
    }
}
</script>

<style lang="scss" scoped>
</style>
