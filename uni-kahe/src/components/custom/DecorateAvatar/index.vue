<template>
    <view
        class="avatar"
        :style="scale ? `transform: scale(${scale});margin-left: 10rpx;` : ''"
    >
        <image class="avatar-img" :src="avatar" />
        <image
            v-if="levelImage !== ''"
            class="avatar-decorate"
            :src="levelImage"
        />
    </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
    avatar: {
        default: '',
        type: String
    },
    level: {
        default: 0,
        type: Number
    },
    scale: {
        type: Number,
        default: 1
    }
})

const levelImage = computed(() => {
    const level = props.level

    if (!level) {
        return ''
    }
    return `https://jms.85gui7.com/kahe-202510/vip/${level}.png`
})
</script>

<style lang="scss">
.avatar {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    transform: translate(0, 0);
    &-decorate {
        position: absolute;
        left: -44rpx;
        top: -38rpx;
        width: 220rpx;
        height: 220rpx;
    }
    &-title {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 14rpx;
        text-align: center;
        font-weight: 600;
        font-size: 26rpx;
        color: #6d9dff;
    }

    &-img {
        margin-top: 8rpx;
        width: 128rpx;
        height: 128rpx;
        border-radius: 64rpx;
        background-color: #f0f0f0;
    }
}
</style>
