<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="priceInput relative w-584 h-308 bg-transparent">
            <image
                class="priceInput-bg w-full h-full"
                src="/static/kahe-202510/home-upgrade/price-input.png"
            />
            <view class="priceInput-content absolute left-0 top-0 w-full h-full">
                <view class="priceInput-content-title absolute top-8 left-0 w-full text-center text-25 font-normal text-white"
                    style="text-shadow: 0rpx 3rpx 0rpx #361574;"
                >请输入本次活动指令</view>
                <view class="priceInput-content-input absolute left-94 top-135 w-398 h-40 bg-[#d3d3d3] rounded-6 flex items-center"
                    style="box-shadow: 0rpx 0rpx 5rpx 0rpx #bcbcbc;"
                >
                    <tn-input
                        v-model="input"
                        type="text"
                        clearable
                        placeholder="请输入"
                        :border="false"
                        height="40"
                    />
                </view>
                <view
                    class="priceInput-content-btn absolute bottom-16 w-217 h-51"
                    style="left: calc((100% - 217rpx) / 2);"
                    @tap.stop="emits('didTapConfirm', input)"
                >
                    <image
                        class="priceInput-content-btn-bg w-full h-full"
                        src="/static/kahe-202510/home-upgrade/price-input-btn.png"
                    />
                    <view class="priceInput-content-btn-title absolute top-4 left-0 w-full text-center text-25 font-normal text-white"
                        style="text-shadow: 0 3rpx 0 #744215;"
                    >确定</view>
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
const props = defineProps({
    show: {
        default: false,
        type: Boolean
    }
})
const vShow = ref(props.show)
const input = ref('')
watch(
    () => props.show,
    value => {
        input.value = ''
        vShow.value = value
    }
)
const emits = defineEmits(['update:show', 'didTapConfirm'])
</script>

<style lang="scss" scoped>
</style>
