<template>
    <!-- <image class="sort-up" :src="isUp ? '/static/kahe-202510/groupBuy/up-active.png' : '/static/kahe-202510/groupBuy/up.png'" />
        <image class="sort-down" :src="!isUp ? '/static/kahe-202510/groupBuy/down-active.png' : '/static/kahe-202510/groupBuy/down.png'" /> -->
    <view class="sort ml-[12rpx] flex flex-col items-center justify-center">
        <view class="sort-up w-0 h-0 border-l-[9rpx_solid_transparent] border-r-[9rpx_solid_transparent] border-b-[11rpx_solid_#d0d0d0] transition-[all_0.2s_ease]" :class="isUp ? 'border-b-[#731f1f]' : ''"></view>
        <view class="sort-down w-0 h-0 mt-[5rpx] border-l-[9rpx_solid_transparent] border-r-[9rpx_solid_transparent] border-t-[11rpx_solid_#d0d0d0] transition-[all_0.2s_ease]" :class="!isUp ? 'border-t-[#731f1f]' : ''"></view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    isUp: {
        default: true,
        type: Boolean
    }
})

</script>

<style lang="scss" scoped></style>
