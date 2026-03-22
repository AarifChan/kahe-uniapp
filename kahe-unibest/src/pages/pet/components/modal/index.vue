<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">

        <view class="petModal">
            <image class="petModal-bg" src="https://jms.85gui7.com/kahe-202510/pet/pet-modal.png" />
            <text class="petModal-title theme-font">是否放生
                <text class="text-stroke" style="color: #73B2FF">{{item?.name}}</text>
            </text>
            <view class="petModal-content">
                <image class="petModal-content-image" :src="item?.icon" />
            </view>
            <view class="petModal-bottom">
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
.petModal{
    position: relative;

    &-bg{
        width: 519rpx;
        height: 697rpx;
    }
    &-bottom{
        margin-top: 30rpx;
        width: 100%;
        height: 70rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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
        top: 153rpx;
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
