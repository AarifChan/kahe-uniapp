<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="dailySuccess">
            <image
                class="dailySuccess-bg"
                src="https://jms.85gui7.com/kahe-202510/home-upgrade/modal-success.png"
            />
            <image
                class="dailySuccess-close"
                src="https://jms.85gui7.com/kahe-202510/home-upgrade/close.png"
                @tap.stop="emits('update:show', false)"
            />
            <view class="dailySuccess-btn" @tap.stop="emits('didClickUse')">
                <image
                    class="dailySuccess-btn-img"
                    src="https://jms.85gui7.com/kahe-202510/home-upgrade/btn-style2-normal.png"
                />
                <view class="dailySuccess-btn-title theme-font">去使用</view>
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
watch(
    () => props.show,
    value => {
        vShow.value = value
    }
)
const emits = defineEmits(['update:show', 'didClickUse'])
</script>

<style lang="scss" scoped>
.dailySuccess {
    position: relative;
    background-color: transparent;
    width: 637rpx;
    height: 616rpx;
    &-bg {
        width: 100%;
        height: 100%;
    }
    &-close {
        position: absolute;
        top: 50rpx;
        right: 50rpx;
        width: 43rpx;
        height: 39rpx;
    }
    &-btn {
        position: absolute;
        bottom: 68rpx;
        right: 26rpx;
        width: 210rpx;
        height: 62rpx;
        &-img {
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
            font-size: 36rpx;
            color: #ffffff;
            text-shadow: 0 2rpx 0 #a02301;
        }
    }
}
</style>
