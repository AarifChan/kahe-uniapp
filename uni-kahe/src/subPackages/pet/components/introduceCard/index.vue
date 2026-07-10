<template>
    <view class="introduceCard relative flex flex-row items-center justify-end h-176 mb-30">
        <view class="introduceCard-info relative mt-20 -ml-40 w-588 h-148">
            <image
                class="introduceCard-info-bg w-full h-full"
                src="/static/kahe-202510/pet/info-bg.png"
            />
            <text class="introduceCard-info-title theme-font text-stroke absolute left-66 -top-24 text-32 font-normal text-white">{{ item.skill }}</text>
            <text class="introduceCard-info-sub absolute left-60 top-50 text-24 font-normal text-black leading-33" style="width: calc(100% - 100rpx);">{{ item.mark }}</text>
        </view>
        <view class="introduceCard-pet absolute top-0 left-0 w-152 h-176">
            <pet-card  :item="item" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import PetCard from '@/pages/pet/components/pet/index.vue'
import { PetModel } from '@/composables/pet/model'
import { type PropType } from 'vue'

defineProps({
    item: {
        default: {
        } as PetModel,
        type: Object as PropType<PetModel>
    }
})

</script>

<style lang="scss" scoped>
</style>
