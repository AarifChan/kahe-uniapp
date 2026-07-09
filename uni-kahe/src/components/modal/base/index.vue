<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">

        <slot name="content"></slot>
        <view class="common relative bg-transparent w-626 h-756">
            <view class="common-content absolute left-0 top-0 w-full h-full bg-white rounded-10 overflow-hidden">
                <view class="common-content-top w-full h-73 bg-gradient-[linear-gradient(-90deg,#3AE5FD,#7C7FF5)]">
                    <view class="common-content-top-title text-40 leading-73 font-normal text-white text-center theme-font">{{ title }}</view>
                </view>
                <slot />
                <view class="common-content-bottom absolute bottom-22 left-0 w-full flex-center" @tap.stop="emits('update:show', false)">
                    <custom-button title="确定" />
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import CustomButton from '@/components/custom/button/index.vue'
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    title: {
        default: '',
        type: String
    },
    content: {
        default: '',
        type: String
    }
})
const vShow = ref(false)
watch(() => props.show, value => {
    vShow.value = value
})
const emits = defineEmits(['update:show'])
</script>

<style lang="scss" scoped></style>
