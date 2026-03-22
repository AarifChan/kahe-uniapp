<template>
    <view class="exploration">
        <image class="exploration-bg" src="https://jms.85gui7.com/kahe-202510/pet/pet-bg.png" />
        <view class="exploration-top">
            <top />
        </view>
        <view class="exploration-top">
            <explore :item="dispatchPet" @did-click-action="handleClick" />
        </view>
        <view class="exploration-bottom">
            <view class="exploration-bottom-handle">
                <handle @did-click="clickHandle" @did-change-filter="handlePetFilter" />
            </view>
            <scroll-view class="exploration-bottom-scroll" :scroll-y="true" :enable-flex="true" scroll-with-animation
                         @scrolltolower="handleMinePetScrollToLower"
            >
                <view class="exploration-bottom-scroll-content">
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
.exploration{
    position: relative;
    width: 100%;
    height: 100vh;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-top{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 600rpx;
    }
    &-bottom{
        position: absolute;
        left: 0;
        top: 600rpx;
        width: 100%;
        height: calc(100vh - 600rpx - 100rpx);
        display: flex;
        flex-direction: column;
        &-handle{
            padding: 8px 16px 0 16px;
            width: calc(100% - 32px) ;
        }
        &-scroll{
            position: relative;
            width: 100%;
            height: 100%;
            &-content{
                position: relative;
                padding: 8px 16px 24px 16px;
                width: calc(100% - 32px);
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(calc( (100% - 30px) / 4), 1fr)); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
                grid-gap: 10px; // 这是网格间的间隙，根据需要调整

            }
        }

    }
}
</style>
