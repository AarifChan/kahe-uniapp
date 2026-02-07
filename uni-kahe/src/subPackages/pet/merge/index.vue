<template>
    <view class="merge">
        <image class="merge-bg" src="https://jms.85gui7.com/kahe-202510/pet/pet-bg.png" />
        <view class="merge-top">
            <top v-model:left="leftSelectPet" v-model:right="rightSelectPet" @did-click-merge="handleMerge" />
        </view>
        <view class="merge-bottom">
            <view class="merge-bottom-handle">
                <handle :is-detail="true" @did-change-filter="handlePetFilter" />
            </view>
            <scroll-view class="merge-bottom-scroll" :scroll-y="true" :enable-flex="true" scroll-with-animation
                         @scrolltolower="handleMinePetScrollToLower"
            >
                <view class="merge-bottom-scroll-content">
                    <pet v-for="(item, index) in minePetList" :key="'pet'+index" :item="item"
                         :selected="leftSelectPet?.id === item.id || rightSelectPet?.id === item.id"
                         @tap.stop="handleClickItem(item)"
                    />
                </view>
            </scroll-view>
        </view>

        <result v-model:show="resultModal" :item="resultPet" :type="2" />
    </view>
</template>

<script lang="ts" setup>
import Top from '../components/merge/index.vue'
import Pet from '@/pages/pet/components/pet/index.vue'
import Handle from '@/pages/pet/components/handle/index.vue'
import { usePet } from '@/composables/pet'
import { onMounted } from 'vue'
import { PetModel } from '@/composables/pet/model'
import { ShowToast } from '@/utils'
import Result from '@/subPackages/pet/components/result/index.vue'
import { eventBus } from '@/utils/event'

const {
    leftSelectPet,
    rightSelectPet,
    minePetList,
    handleMerge,
    getMinePetList,
    handleMinePetScrollToLower,
    handlePetFilter,
    resultModal,
    resultPet
} = usePet()
onMounted(() => {
    getMinePetList()
})

const handleClickItem = (item: PetModel) => {
    if (item.level === 4) {
        ShowToast('等级已达最高，无法融合')
        return
    }
    if (!leftSelectPet.value) {
        if (rightSelectPet.value && rightSelectPet.value?.level !== item.level) {
            ShowToast('请选择相同等级的')
            return
        }
        if (rightSelectPet.value && rightSelectPet.value?.id === item.id) {
            return
        }
        leftSelectPet.value = item
        return
    }
    if (!rightSelectPet.value) {
        if (leftSelectPet.value && leftSelectPet.value?.level !== item.level) {
            ShowToast('请选择相同等级的')
            return
        }
        if (leftSelectPet.value && leftSelectPet.value?.id === item.id) {
            return
        }
        rightSelectPet.value = item
        return
    }
    ShowToast('只能选择两个进行融合')
}
</script>

<style lang="scss" scoped>
.merge{
    position: relative;
    width: 100%;
    &-bg{
        width: 100%;
        height: 100vh;
    }
    &-top{
        position: absolute;
        top: 0;
        left: 0;
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
