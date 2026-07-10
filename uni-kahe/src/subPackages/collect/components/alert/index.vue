<template>
    <tn-popup v-model="vShow" :overlay-opacity="0.88" open-direction="center" bg-color="transparent"
              :overlay-closeable="false"
    >
        <view class="collect-alert relative w-584 h-308">
            <image class="collect-alert-bg w-full h-full" src="/static/kahe-202510/collect/modal-bg.png" />
            <view class="collect-alert-content absolute left-0 top-0 w-full h-full flex flex-col items-center">
                <view class="collect-alert-content-title mt-16 font-normal text-25 text-white text-shadow-[-1px_-1px_0_#361574,1px_-1px_0_#361574,-1px_1px_0_#361574,1px_1px_0_#361574]">集赏行动</view>

                <view class="collect-alert-content-tips mt-80 font-normal text-25 leading-30 text-center text-black w-448">点击确认后，将损耗所填入的材料并且无
                    法撤回，请谨慎操作！
                </view>
                <view class="collect-alert-content-bottom mt-48 flex flex-row items-center justify-between w-400">
                    <view class="collect-alert-content-bottom-btn relative w-138 h-46" @tap.stop="emits('confirm')">
                        <image class="collect-alert-content-bottom-btn-img w-full h-full" src="/static/kahe-202510/collect/btn2.png" />
                        <view class="collect-alert-content-bottom-btn-title absolute left-0 top-4 w-full text-center font-normal text-25 text-white text-shadow-[0rpx_3rpx_0rpx_#744215]">确定</view>
                    </view>
                    <view class="collect-alert-content-bottom-btn relative w-138 h-46" @tap.stop="emits('update:show', false)">
                        <image class="collect-alert-content-bottom-btn-img w-full h-full" src="/static/kahe-202510/collect/btn1.png" />
                        <view class="collect-alert-content-bottom-btn-title absolute left-0 top-4 w-full text-center font-normal text-25 text-white text-shadow-[0rpx_3rpx_0rpx_#744215]">取消</view>
                    </view>
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
    show: {
        default: false,
        type: Boolean
    }
})
const vShow = ref(props.show)
watch(() => props.show, value => {
    vShow.value = value
})

const emits = defineEmits(['update:show', 'confirm'])
</script>

<style lang="scss" scoped>
</style>
