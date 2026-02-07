<template>
    <view class="dailyTab">
        <view v-if="isAll" class="dailyTab-btn">
            <image
                class="dailyTab-btn-img"
                :src="
                    isAll
                        ? 'https://jms.85gui7.com/kahe-202510/home-upgrade/btn-style3-selected.png'
                        : 'https://jms.85gui7.com/kahe-202510/home-upgrade/btn-style3-normal.png'
                "
            />
            <view
                class="dailyTab-btn-title theme-font"
                :class="isAll ? 'select' : 'normal'"
                >全部放券</view
            >
        </view>
        <view v-else class="dailyTab-btn">
            <image
                class="dailyTab-btn-img"
                :src="
                    !isAll
                        ? 'https://jms.85gui7.com/kahe-202510/home-upgrade/btn-style3-selected.png'
                        : 'https://jms.85gui7.com/kahe-202510/home-upgrade/btn-style3-normal.png'
                "
            />
            <view
                class="dailyTab-btn-title theme-font"
                :class="!isAll ? 'select' : 'normal'"
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
.dailyTab {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    &-btn {
        position: relative;
        width: 318rpx;
        height: 77rpx;
        &-img {
            width: 100%;
            height: 100%;
        }
        &-title {
            position: absolute;
            left: 0;
            top: 10rpx;
            width: 100%;
            text-align: center;
            height: 100%;
            font-weight: 400;
            font-size: 42rpx;
            color: #ffffff;
            text-shadow: 1rpx 3rpx 0 #89372e;
        }
        .normal {
            text-shadow: 1rpx 3rpx 0rpx #2e3789;
            text-stroke: 2px #2b2da3;
        }
        .select {
            text-shadow: 1rpx 3rpx 0rpx #89372e;
            text-stroke: 2px #89372e;
        }
    }
}
</style>
