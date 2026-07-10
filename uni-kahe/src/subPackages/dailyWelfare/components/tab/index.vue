<template>
    <view class="dailyTab relative w-full flex flex-row items-center justify-center h-80">
        <view v-if="isAll" class="dailyTab-btn relative w-318 h-77">
            <image
                class="dailyTab-btn-img w-full h-full"
                :src="
                    isAll
                        ? '/static/kahe-202510/home-upgrade/btn-style3-selected.png'
                        : '/static/kahe-202510/home-upgrade/btn-style3-normal.png'
                "
            />
            <view
                class="dailyTab-btn-title theme-font absolute left-0 top-10 w-full h-full text-center font-normal text-42 text-white"
                :style="isAll
                    ? { textShadow: '1rpx 3rpx 0rpx #89372e', WebkitTextStroke: '2px #89372e' }
                    : { textShadow: '1rpx 3rpx 0rpx #2e3789', WebkitTextStroke: '2px #2b2da3' }"
                >全部放券</view
            >
        </view>
        <view v-else class="dailyTab-btn relative w-318 h-77">
            <image
                class="dailyTab-btn-img w-full h-full"
                :src="
                    !isAll
                        ? '/static/kahe-202510/home-upgrade/btn-style3-selected.png'
                        : '/static/kahe-202510/home-upgrade/btn-style3-normal.png'
                "
            />
            <view
                class="dailyTab-btn-title theme-font absolute left-0 top-10 w-full h-full text-center font-normal text-42 text-white"
                :style="!isAll
                    ? { textShadow: '1rpx 3rpx 0rpx #89372e', WebkitTextStroke: '2px #89372e' }
                    : { textShadow: '1rpx 3rpx 0rpx #2e3789', WebkitTextStroke: '2px #2b2da3' }"
                >本店放券</view
            >
        </view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    isAll: {
        default: true,
        type: Boolean
    }
})
const didClickTab = (isAll: boolean) => {
    emits('update:isAll', isAll)
    emits('didUpdateTab')
}
const emits = defineEmits(['update:isAll', 'didUpdateTab'])
</script>

<style lang="scss" scoped>
</style>
