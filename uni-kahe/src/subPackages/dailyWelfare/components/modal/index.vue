<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="dailySuccess relative bg-transparent w-637 h-616">
            <image
                class="dailySuccess-bg w-full h-full"
                src="/static/kahe-202510/home-upgrade/modal-success.png"
            />
            <image
                class="dailySuccess-close absolute top-50 right-50 w-43 h-39"
                src="/static/kahe-202510/home-upgrade/close.png"
                @tap.stop="emits('update:show', false)"
            />
            <view class="dailySuccess-btn absolute bottom-68 right-26 w-210 h-62" @tap.stop="emits('didClickUse')">
                <image
                    class="dailySuccess-btn-img w-full h-full"
                    src="/static/kahe-202510/home-upgrade/btn-style2-normal.png"
                />
                <view
                    class="dailySuccess-btn-title theme-font absolute top-4 left-0 w-full text-center font-normal text-36 text-white"
                    :style="{ textShadow: '0 2rpx 0 #a02301' }"
                >去使用</view>
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
</style>
