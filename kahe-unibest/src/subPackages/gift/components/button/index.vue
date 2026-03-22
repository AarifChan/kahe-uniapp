<template>
    <view class="custom-btn theme-font text-stroke-main">
        <image class="custom-btn-small" src="https://jms.85gui7.com/kahe-202510/discount/btn.png" />
        <view class="custom-btn-content">
            <slot />
            <text :class="size === 'small' ? 'custom-btn-content-small' : 'custom-btn-content-big' ">{{title}}</text>
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
.custom-btn{
    position: relative;
    &-small{
        width: 168rpx;
        height: 74rpx;
    }

    &-content{
        position: absolute;
        top: -8rpx;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &-small{
            font-weight: 500;
            font-size: 38rpx;
            color: #FFFFFF;
            line-height: 36rpx;
            //text-stroke: 1px #0F2268;
            //-webkit-text-stroke: 1px #0F2268;
        }
    }
}
</style>
