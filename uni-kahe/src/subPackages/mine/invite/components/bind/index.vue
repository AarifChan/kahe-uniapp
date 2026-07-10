<template>
    <tn-popup v-model="vShow" open-direction="center" bg-color="transparent" @close="emits('update:show', false)">

        <view class="bind relative">
            <view class="bind-info relative ml-12 w-727 h-393">
                <image class="bind-info-bg w-full h-full bg-transparent" src="/static/kahe-202510/invite/invite-1-bg.png" />
                <image class="bind-info-item absolute top-30 left-44 w-58 h-58" src="/static/kahe-202510/invite/invite-item1.png" />
                <view class="bind-info-title theme-font absolute top-34 left-128 font-400 text-36 text-white">我的盟主</view>
                <view class="bind-info-subTitle absolute top-56 left-348 font-normal text-24 text-[#FEFFFD]">和盟主一起畅玩，不再孤单！</view>
                <view class="bind-info-content theme-font absolute left-48 top-152 flex flex-col items-center"
                    :style="{ width: 'calc(100% - 96rpx)' }"
                >
                    <view class="bind-info-content-title w-450 text-32 text-center text-white">是否确定成为{{ nickname }}的盟友，一起共享收益？ 确定后，{{ nickname }}将成为您的盟主</view>
                    <view class="bind-info-content-bottom mt-24 flex flex-row items-center">
                        <view class="bind-info-content-bottom-btn relative w-242 h-89" @tap.stop="emits('didTapConfirm')">
                            <image class="bind-info-content-bottom-btn-bg w-full h-full"  src="/static/kahe-202510/invite/invite-tag.png"  />
                            <view class="bind-info-content-bottom-btn-text theme-font absolute left-0 top-32 text-center w-full font-400 text-30 text-[#FEFFFD]"
                                :style="{ textShadow: '1rpx 3rpx 0 #30B7C7' }"
                            >确 认</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </tn-popup>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
    show: Boolean,
    nickname: {
        default: '',
        type: String
    }
})
const vShow = ref(props.show)
watch(() => props.show, value => {
    vShow.value = value
})
const emits = defineEmits(['update:show', 'didTapConfirm'])
</script>
<style lang="scss" scoped>
</style>
