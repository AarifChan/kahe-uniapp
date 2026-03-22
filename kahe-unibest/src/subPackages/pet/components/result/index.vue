<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent">
        <view class="resultModal">
            <image class="resultModal-bg" :src="type === 1 ? 'https://jms.85gui7.com/kahe-202510/pet/result-bg1.png' : 'https://jms.85gui7.com/kahe-202510/pet/result-bg2.png'" />
            <text class="resultModal-title theme-font">获得{{ type === 1 ? '' : '进化的' }}
                <text class="text-stroke" style="color: #73B2FF">{{item?.name}}</text>
            </text>
            <view class="resultModal-content">
                <image class="resultModal-content-image" :src="item?.icon" />
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
.resultModal{
    position: relative;

    &-bg{
        width: 519rpx;
        height: 754rpx;
    }
    &-title{
        position: absolute;
        left: 0;
        top: 66rpx;
        width: 100%;
        text-align: center;
        color: white;
    }
    &-content{
        position: absolute;
        top: 176rpx;
        left: 0;
        width: 100%;
        height: 472rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &-image{
            width: 350rpx;
            height: 350rpx;
        }
    }
}
</style>
