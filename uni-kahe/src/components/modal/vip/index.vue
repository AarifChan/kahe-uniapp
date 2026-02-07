<template>
    <tn-popup
        v-model="vShow"
        open-direction="center"
        bg-color="transparent"
        @close="emits('update:show', false)"
    >
        <view class="vipModal">
            <image class="vipModal-bg" src="https://jms.85gui7.com/kahe-202510/images/vip-bg.png" />
            <view class="vipModal-content">
                <view class="vipModal-content-top">
                    <text class="vipModal-content-top-title"
                        >尊贵的vip{{ vip }}，今日奖励给您奉上！</text
                    >
                </view>
                <scroll-view
                    class="vipModal-content-list"
                    :enable-flex="true"
                    :scroll-x="true"
                    scroll-with-animation
                >
                    <item
                        v-for="(item, index) in list"
                        :key="index"
                        :id="index"
                        :item="item"
                    />
                </scroll-view>
                <view class="vipModal-content-bottom">
                    <custom-button
                        title="收下奖励"
                        :theme-font="true"
                        @tap.stop="emits('update:show', false)"
                    />
                </view>
            </view>
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import Item from './components/item.vue'
import CustomButton from '@/components/custom/button/index.vue'
import type { UIDayVIPItem } from '@/model'
import { type PropType, watch, ref } from 'vue'

const props = defineProps({
    show: {
        default: false,
        type: Boolean
    },
    vip: {
        default: 0,
        type: Number
    },
    list: {
        default: [] as UIDayVIPItem[],
        type: Array as PropType<UIDayVIPItem[]>
    }
})
const vShow = ref(false)

watch(() => props.show, value => {
    vShow.value = value
})

const emits = defineEmits(['update:show'])
</script>

<style lang="scss" scoped>
.vipModal {
    position: relative;
    width: 675rpx;
    height: 547rpx;
    overflow: hidden;
    &-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    &-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
        overflow: hidden;

        &-top {
            width: 100%;
            // background: linear-gradient(-90deg, #3AE5FD, #7C7FF5);
            height: 73rpx;
            &-title {
                margin-left: 36rpx;
                font-size: 26rpx;
                font-weight: 400;
                color: #000000;
            }
        }

        &-list {
            position: relative;
            white-space: nowrap;
            margin-top: 15px;
            height: 248rpx;
            margin-left: 15px;
            width: calc(100% - 30px);
        }
        &-bottom {
            position: absolute;
            left: 0;
            bottom: 18rpx;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
        }
    }
}
</style>
