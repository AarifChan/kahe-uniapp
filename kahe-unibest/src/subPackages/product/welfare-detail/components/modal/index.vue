<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="priceInput">
            <image
                class="priceInput-bg"
                src="https://jms.85gui7.com/kahe-202510/home-upgrade/price-input.png"
            />
            <view class="priceInput-content">
                <view class="priceInput-content-title">请输入本次活动指令</view>
                <view class="priceInput-content-input">
                    <tn-input
                        v-model="input"
                        type="text"
                        clearable
                        placeholder="请输入"
                        :border="false"
                        height="40"
                        label-class="priceInput-content-input-label"
                    />
                </view>
                <view
                    class="priceInput-content-btn"
                    @tap.stop="emits('didTapConfirm', input)"
                >
                    <image
                        class="priceInput-content-btn-bg"
                        src="https://jms.85gui7.com/kahe-202510/home-upgrade/price-input-btn.png"
                    />
                    <view class="priceInput-content-btn-title">确定</view>
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
.priceInput {
    position: relative;
    background-color: transparent;
    width: 584rpx;
    height: 308rpx;
    &-bg {
        width: 100%;
        height: 100%;
    }
    &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        &-title {
            position: absolute;
            top: 8rpx;
            left: 0;
            width: 100%;
            text-align: center;
            font-weight: 400;
            font-size: 25rpx;
            color: #ffffff;
            text-shadow: 0rpx 3rpx 0rpx #361574;
        }
        &-input {
            position: absolute;
            top: 135rpx;
            left: 94rpx;
            width: 398rpx;
            height: 40rpx;
            background: #d3d3d3;
            box-shadow: 0rpx 0rpx 5rpx 0rpx #bcbcbc;
            border-radius: 6rpx;
            &-label {
                color: black;
                font-size: 36rpx;
            }
        }

        &-btn {
            position: absolute;
            bottom: 16rpx;
            left: calc((100% - 217rpx) / 2);
            width: 217rpx;
            height: 51rpx;
            &-bg {
                width: 100%;
                height: 100%;
            }
            &-title {
                position: absolute;
                top: 4rpx;
                left: 0;
                width: 100%;
                text-align: center;
                font-weight: 400;
                font-size: 25rpx;
                color: #ffffff;
                text-shadow: 0 3rpx 0 #744215;
            }
        }
    }
}
</style>
