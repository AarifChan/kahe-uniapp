<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="inGroupModal">
            <image
                class="inGroupModal-bg"
                src="https://jms.85gui7.com/kahe-202510/home-upgrade/inGroup-bg.png"
            />
            <image
                class="inGroupModal-qrcode"
                src="https://jms.85gui7.com/kahe-202510/home-upgrade/inGroup.png"
                @longpress="emits('showImage')"
            />
            <image
                class="inGroupModal-close"
                src="https://jms.85gui7.com/kahe-202510/home-upgrade/inGroup-close.png"
                @click="emits('update:show', false)"
            />
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
watch(
    () => props.show,
    value => {
        vShow.value = value
    }
)
const emits = defineEmits(['update:show', 'showImage'])
</script>

<style lang="scss" scoped>
.inGroupModal {
    position: relative;
    background-color: transparent;
    width: 717rpx;
    height: 1035rpx;
    &-bg {
        width: 100%;
        height: 100%;
    }
    &-close {
        position: absolute;
        bottom: 30rpx;
        left: 315rpx;
        width: 63rpx;
        height: 63rpx;
    }
    &-qrcode {
        position: absolute;
        top: 260rpx;
        left: 180rpx;
        width: 314rpx;
        height: 314rpx;
    }
}
</style>
