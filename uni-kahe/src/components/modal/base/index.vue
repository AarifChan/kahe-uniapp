<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">

        <slot name="content"></slot>
        <view class="common">
            <view class="common-content">
                <view class="common-content-top">
                    <view class="common-content-top-title theme-font">{{ title }}</view>
                </view>
                <slot />
                <view class="common-content-bottom" @tap.stop="emits('update:show', false)">
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

<style lang="scss" scoped>
.common {
    position: relative;
    background-color: transparent;
    width: 626rpx;
    height: 756rpx;
    &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 10rpx;
        overflow: hidden;
        &-top {
            width: 100%;
            background: linear-gradient(-90deg, #3AE5FD, #7C7FF5);
            height: 73rpx;
            &-title {
                font-size: 40rpx;
                line-height: 73rpx;
                font-weight: 400;
                color: #FFFFFF;
                text-align: center;
            }
        }

        &-text {
            padding: 8px 50rpx;
            position: relative;
            box-sizing: border-box;
            width: 100%;
            height: calc(100% - 200rpx);
            color: #000000;
            font-size: 13px;
            line-height: 25px;
        }
        &-bottom {
            position: absolute;
            bottom: 22rpx;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
