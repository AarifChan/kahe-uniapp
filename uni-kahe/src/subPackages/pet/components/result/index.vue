<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent">
        <view class="resultModal relative">
            <image class="resultModal-bg w-519 h-754" :src="type === 1 ? '/static/kahe-202510/pet/result-bg1.png' : '/static/kahe-202510/pet/result-bg2.png'" />
            <text class="resultModal-title theme-font absolute left-0 top-66 w-full text-center text-white">获得{{ type === 1 ? '' : '进化的' }}
                <text class="text-stroke" style="color: #73B2FF">{{item?.name}}</text>
            </text>
            <view class="resultModal-content absolute top-176 left-0 w-full h-472 flex flex-row items-center justify-center">
                <image class="resultModal-content-image w-350 h-350" :src="item?.icon" />
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>

import { type PetModel } from '@/composables/pet/model'
import { type PropType, ref , onMounted, watch } from 'vue'

const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    item: {
        default: null,
        type: Object as PropType<PetModel | null>
    },
    type: {
        default: 1,
        type: Number
    }
})

const vShow = ref(false)
onMounted(() => {
    watch(() => props.show, value => {
        vShow.value = value
    })
})

const emits = defineEmits(['update:show'])

</script>

<style lang="scss" scoped>
</style>
