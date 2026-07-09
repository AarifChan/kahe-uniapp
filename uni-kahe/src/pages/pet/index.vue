<template>
    <view class="pet relative w-full h-full">
        <image class="pet-bg w-full h-full" src="/static/kahe-202510/pet/pet-bg.png" />
        <view class="pet-top absolute left-0 top-0 w-full">
            <top @did-click-item="handleClickItem" />
        </view>
        <view class="pet-wish absolute left-16 top-32 w-400" v-if="taskList.length > 0">
            <wish :task-list="taskList" />
        </view>
        <view class="pet-online absolute left-0 top-352 h-300" style="width: calc(100% - 200rpx)">
            <current-pets :list="onlinePetList" @did-tap-pet="handleOfflinePet" />
        </view>
        <view class="pet-bottom absolute left-0 top-600 w-full flex flex-col" style="height: calc(100vh - 600rpx - env(safe-area-inset-bottom) - 100rpx)">
            <view class="pet-bottom-handle pt-8 px-16 pb-0" style="width: calc(100% - 32px)">
                <handle
                    @did-change-filter="handlePetFilter"
                    @did-click="clickHandle"
                />
            </view>
            <scroll-view class="pet-bottom-scroll relative w-full"
                         style="height: calc(100% - 100rpx)"
                         :scroll-y="true"
                         :enable-flex="true"
                         currentPetscroll-with-animation
                         @scrolltolower="scrollToLower"
                         @tap.stop="currentPet=null"
            >
                <view class="pet-bottom-scroll-content relative pt-8 pb-24 px-16 grid gap-10" style="width: calc(100% - 32px); grid-template-columns: repeat(auto-fill, minmax(calc((100% - 30px) / 4), 1fr))">
                    <pet
                        v-for="(item, index) in minePetList"
                        :key="'pet'+index"
                        :item="item"
                        :selected="currentPet?.id === item.id"
                        @tap.stop="currentPet=item"
                    />
                </view>
            </scroll-view>
        </view>
        <confirm-modal v-model:show="resultModal" :item="currentPet" @did-confirm="handleAboundPet" />
    </view>
</template>

<script setup lang="ts">
import Top from './components/top/index.vue'
import Wish from './components/wish/index.vue'
import Handle from './components/handle/index.vue'
import CurrentPets from './components/currentPets/index.vue'
import { usePet } from '@/composables/pet'
import Pet from './components/pet/index.vue'
import ConfirmModal from './components/modal/index.vue'
import { eventBus } from '@/utils/event'
import { onMounted } from 'vue'
import PetModule from '@/store/modules/pet'
const {
    onlinePetList,
    minePetList,
    currentPet,
    taskList,
    resultModal,
    getPetPageData,
    handleMinePetScrollToLower,
    handlePetFilter,
    handleOfflinePet,
    handleOnlinePet,
    handleAboundPet

} = usePet()

onMounted(() => {
    getPetPageData()
})

eventBus.on('minePetUpdate', async () => {
    await getPetPageData()
})

eventBus.on('didLogin', async (_: any) => {
    await PetModule.getConfig()
    await getPetPageData()
})

const handleClickItem = (index: number) => {
    switch (index) {
    case 0:
        uni.navigateTo({
            url: '/subPackages/pet/introduce/index'
        })
        break
    case 1:
        uni.navigateTo({
            url: '/subPackages/pet/exploration/index'
        })
        break
    case 2:
        uni.navigateTo({
            url: '/subPackages/pet/eggs/index'
        })
        break
    case 3:
        uni.navigateTo({
            url: '/subPackages/pet/merge/index'
        })
        break
    default:
        break
    }
}

const clickHandle = (index: number) => {
    if (index === 1) {
        resultModal.value = true
    }
    if (index === 2) {
        handleOnlinePet()
    }
}
const scrollToLower = () => {
    handleMinePetScrollToLower()
}

</script>

<style lang="scss" scoped></style>
