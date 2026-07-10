<template>
    <view class="custom-btn relative theme-font text-stroke-main">
        <image class="custom-btn-small w-168 h-74" src="/static/kahe-202510/discount/btn.png" />
        <view class="custom-btn-content absolute -top-8 left-0 w-full h-full flex flex-row items-center justify-center">
            <slot />
            <text class="text-38 font-medium text-white leading-36">{{title}}</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
defineProps({
    size: {
        default: 'small',
        type: String
    },
    title: {
        default: '',
        type: String
    }
})
</script>

<style lang="scss" scoped>
</style>
