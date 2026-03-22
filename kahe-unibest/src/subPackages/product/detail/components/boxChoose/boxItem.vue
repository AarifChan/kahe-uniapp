<template>
    <view class="boxItem">
        <image class="boxItem-img" src="https://jms.85gui7.com/kahe/product/box-selected.png" v-if="selected" />
        <image class="boxItem-img" src="https://jms.85gui7.com/kahe/product/box-normal.png" v-else />
        <text class="boxItem-title">{{index}}</text>
    </view>
</template>

<script lang="ts" setup>

defineProps({
    selected: {
        default: false,
        type: Boolean
    },
    index: {
        default: 0,
        type: Number
    }
})

const emits = defineEmits(['update:selected'])

</script>

<style lang="scss" scoped>
.boxItem{
    margin-right: 22rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-img{
        width: 61rpx;
        height: 61rpx;
    }
    &-title{
        margin-top: 20rpx;

        width: 26rpx;
        height: 16rpx;
        background: #262626;
        opacity: 0.6;
        border-radius: 2rpx;
        font-size: 12rpx;
        line-height: 16rpx;
        text-align: center;
        font-weight: 400;
        color: #FFFFFF;
    }
}
</style>
