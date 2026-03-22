<template>
    <view class="boxTab">
        <view class="boxTab-list">
            <view
                class="boxTab-list-item theme-font"
                :class="
                    current === index
                        ? 'boxTab-list-select text-stroke-select'
                        : 'text-stroke-normal'
                "
                v-for="(item, index) in tabList"
                :key="index"
                @tap.stop="emits('update:current', index)"
            >
                {{ item.title }}
            </view>
        </view>
        <view class="boxTab-tips" @tap.stop="emits('didTapTips')">
            <image
                class="boxTab-tips-img"
                src="https://jms.85gui7.com/kahe/box/question.png"
            />
            <text class="boxTab-tips-title">规则</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useModal } from '@/composables/modal'

defineProps({
    current: {
        default: 0,
        type: Number
    }
})

const emits = defineEmits(['update:current', 'didTapTips', 'tabDidChange'])
const didTapTab = (index: number) => {
    emits('update:current')
    emits('tabDidChange', index)
}
const tabList = ref([
    {
        title: '待处理',
        value: 0
    },
    {
        title: '已发货',
        value: 1
    },
    {
        title: '已处理',
        value: 2
    },
    {
        title: '宝箱',
        value: 3
    }
])
</script>

<style lang="scss" scoped>
.boxTab {
    padding: 8px 15px 0 15px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    @include flex(row);
    justify-content: space-between;
    &-list {
        @include flex(row);
        &-item {
            font-size: 44rpx;
            font-weight: 400;
            color: white;
            margin-right: 24rpx;
        }
    }
    &-tips {
        margin-top: 4rpx;
        position: relative;
        width: 130rpx;
        height: 48rpx;
        background: rgba(0, 0, 0, 0);
        border: 2rpx solid #000000;
        border-radius: 4rpx;
        @include flex-xy-center(row);
        &-title {
            margin-left: 8rpx;
            font-size: 32rpx;
            font-weight: 300;
            color: #000000;
        }
        &-img {
            width: 30rpx;
            height: 30rpx;
        }
    }
}

.text-stroke-select {
    text-shadow: -4rpx -4rpx 0 #73b2ff, 4rpx -4rpx 0 #73b2ff,
        -4rpx 4rpx 0 #73b2ff, 4rpx 4rpx 0 #73b2ff; /* 设置描边效果 */
}

.text-stroke-normal {
    text-shadow: -4rpx -4rpx 0 #4d4d4d, 4rpx -4rpx 0 #4d4d4d,
        -4rpx 4rpx 0 #4d4d4d, 4rpx 4rpx 0 #4d4d4d; /* 设置描边效果 */
}
</style>
