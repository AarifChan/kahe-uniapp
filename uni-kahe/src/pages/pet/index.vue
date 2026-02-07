<template>
    <view class="pet">
        <image class="pet-bg" src="https://jms.85gui7.com/kahe-202510/pet/pet-bg.png" />
        <view class="pet-top">
            <top @did-click-item="handleClickItem" />
        </view>
        <view class="pet-wish" v-if="taskList.length > 0">
            <wish :task-list="taskList" />
        </view>
        <view class="pet-online">
            <current-pets :list="onlinePetList" @did-tap-pet="handleOfflinePet" />
        </view>
        <view class="pet-bottom">
            <view class="pet-bottom-handle">
                <handle
                    @did-change-filter="handlePetFilter"
                    @did-click="clickHandle"
                />
            </view>
            <scroll-view class="pet-bottom-scroll"
                         :scroll-y="true"
                         :enable-flex="true"
                         currentPetscroll-with-animation
                         @scrolltolower="scrollToLower"
                         @tap.stop="currentPet=null"
            >
                <view class="pet-bottom-scroll-content">
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

<style lang="scss" scoped>
.pet{
    position: relative;
    width: 100%;
    height: 100%;
    &-bg{
        width: 100%;
        height: 100%;
    }
    &-top{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }
    &-wish{
        position: absolute;
        left: 16rpx;
        top: 32rpx;
        width: 400rpx;
    }

    &-online{
        position: absolute;
        left: 0;
        top: 352rpx;
        width: calc(100% - 200rpx);
        height: 300rpx;
    }

    &-bottom{
        position: absolute;
        left: 0;
        top: 600rpx;
        width: 100%;
        height: calc(100vh - 600rpx - env(safe-area-inset-bottom) - 100rpx);
        display: flex;
        flex-direction: column;
        &-handle{
            padding: 8px 16px 0 16px;
            width: calc(100% - 32px) ;
        }
        &-scroll{
            position: relative;
            width: 100%;
            height: calc(100% - 100rpx);
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
