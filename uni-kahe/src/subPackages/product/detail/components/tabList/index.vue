<template>
    <view class="normalTab">
        <view class="normalTab-content">
            <view
                class="normalTab-content-item"
                @tap.stop="didClickTab(index)"
                v-for="(item, index) in tabList"
                :key="index"
            >
                <image
                    class="normalTab-content-item-bg"
                    :src="
                        currentTab === index ? 'https://jms.85gui7.com/kahe-202510/product/product-tab-item.png' : ''
                    "
                />
                <text
                    class="normalTab-content-item-title theme-font"
                    :class="currentTab === index ? 'active' : ''"
                >{{item}}</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { UIProductDetailModel } from '@/model'

const props = defineProps({
    current: {
        default: 0,
        type: Number
    },
    product: {
        default: {
        } as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>
    }
})

const tabList = ref(['赏池一览', '抽赏记录'])

const currentTab = ref(props.current)

const didClickTab = (index: number) => {
    if (currentTab.value === index) {
        return
    }
    currentTab.value = index
    emits('update:current', index)
    emits('tabDidChange', index)
}

const emits = defineEmits(['update:current', 'tabDidChange'])
</script>

<style lang="scss" scoped>
.normalTab {
    position: relative;
    display: flex;
    width: 332rpx;
    height: 57rpx;
    background-color: rgba(0,0,0, 0.2);
    border-radius: 28.5rpx;
    &-content {
        position: relative;
        display: flex;
        flex-direction: row;
        &-item {
            position: relative;
            width: 166rpx;
            height: 57rpx;
            &-bg {
                width: 100%;
                height: 100%;
            }
            &-title {
                position: absolute;
                left: 50%;
                top: 50%;
                font-weight: 400;
                font-size: 28rpx;
                color: #868686;
                line-height: 36rpx;
                transform: translate(-50%, -50%);
                white-space: nowrap;
                &.active {
                    color: #11FFEB;
                }
            }
        }
    }
}
</style>
