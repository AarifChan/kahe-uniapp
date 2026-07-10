
<template>
    <view class="selectNum-rewards relative w-full rounded-10 flex flex-col mt-26 bg-[#bbc6cc] mb-[16px]">
        <view
            class="selectNum-rewards-list relative flex items-center justify-between py-18 px-18 mb-12"
            :style="{ width: 'calc(100% - 36rpx)', boxSizing: 'border-box' }"
        >
            <view class="selectNum-rewards-list-left flex-1 flex">
                <image
                    class="selectNum-rewards-list-left-avatar w-76 h-76 rounded-full"
                    :src="item.avatar"
                />
                <view class="selectNum-rewards-list-left-info flex flex-col justify-center ml-10">
                    <view class="selectNum-rewards-list-left-info-name text-28 text-[#000000]">{{ item.nickName }}</view>
                </view>
            </view>
            <view class="selectNum-rewards-list-right relative w-68 h-60">
                <view class="selectNum-rewards-list-left-info-time text-23 text-[#000000]">{{ item.time }}</view>

            </view>
            <!--        <view class="selectNum-rewards-list-floor">#{{item.sales}}</view>-->
        </view>
        <view style="width: calc(100% - 36px);height: 1rpx;background-color: #9a9a9a; margin: 0 18px;" />
        <view
            class="selectNum-rewards-list relative flex items-center justify-between py-18 px-18 mb-12"
            :style="{ width: 'calc(100% - 36rpx)', boxSizing: 'border-box' }"
        >
            <view class="selectNum-rewards-list-left flex-1 flex">
                <image
                    class="selectNum-rewards-list-left-image w-100 h-auto"
                    :src="item.goodsImage"
                    mode="widthFix"
                />
                <view class="selectNum-rewards-list-left-info flex flex-col justify-center ml-10">
                    <view class="selectNum-rewards-list-left-info-name text-28 text-[#000000]">{{ item.title }}</view>
                </view>
            </view>
            <view class="selectNum-rewards-list-right relative w-68 h-60">
                <image
                    :src="item.levelImage"
                    class="selectNum-rewards-list-right-img w-full h-full absolute top-12"
                    :style="{ left: '-60rpx' }"
                    mode="heightFix"
                />
            </view>
        </view>
    </view>

</template>

<script setup lang="ts">

import type { PropType } from 'vue'
import type { UIProductRecordModel } from '@/model'

defineProps({

    item: {
        type: Object as () => UIProductRecordModel,
        default: Object as PropType<UIProductRecordModel>
    }
})

</script>

<style scoped lang="scss">
</style>
