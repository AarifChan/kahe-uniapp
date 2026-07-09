<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">

        <view class="relative">
            <image class="w-519 h-697" src="/static/kahe-202510/pet/pet-modal.png" />
            <text class="absolute left-0 top-66 w-full text-center text-white theme-font">是否放生
                <text class="text-stroke" style="color: #73B2FF">{{item?.name}}</text>
            </text>
            <view class="absolute top-153 left-0 w-full h-472 flex flex-row items-center justify-center">
                <image class="w-350 h-350" :src="item?.icon" />
            </view>
            <view class="mt-30 w-full h-70 flex flex-row items-center justify-center">
                <custom-button title="确认放生" @tap.stop="handleConfirm" />
            </view>

        </view>
    </tn-popup>
</template>

<script lang="ts" setup>

import { PetModel } from '@/composables/pet/model'
import { type PropType, ref, watch } from 'vue'
import CustomButton from '@/components/custom/button/index.vue'
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    item: {
        default: null,
        type: Object as PropType<PetModel | null>
    }
})
const vShow = ref(false)

watch(() => props.show, value => {
    vShow.value = value
})
const emits = defineEmits(['update:show', 'didConfirm'])
const handleConfirm = () => {
    emits('didConfirm')
    emits('update:show')
}
</script>

<style lang="scss" scoped>
</style>
