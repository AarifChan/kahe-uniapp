<template>
    <view class="product-record relative pt-10 px-24 pb-24" :style="{ width: 'calc(100% - 48rpx)' }">
        <view
            class="product-record-item relative mb-16"
            v-for="(item, index) in recordList"
            :key="'product-item' + index"
        >
            <view class="product-record-item-bg w-702 h-122 bg-[#dfe5e8] rounded-10 border-4 border-[#729ccb]" />
            <view class="product-record-item-content absolute left-0 top-0 w-full h-full flex flex-row items-center justify-between">
                <view
                    class="product-record-item-content-num absolute top-0 text-24 text-white bg-[#729CCB]"
                    :style="{ right: '-6rpx', borderRadius: '0rpx 8rpx 0rpx 8rpx' }"
                >{{ item.sales }}</view>
                <view class="product-record-item-content-info ml-26 flex flex-row items-center">
                    <image
                        class="product-record-item-content-info-avatar w-70 h-70 rounded-35"
                        :src="item.avatar"
                    />
                    <view class="product-record-item-content-info-center ml-12 flex flex-col">
                        <text
                            class="product-record-item-content-info-center-title text-24 font-normal text-[#649bff]"
                        >{{ item.nickName }}在{{ item.time }}获得</text>
                        <text
                            class="product-record-item-content-info-center-subTitle text-22 font-normal text-[#649bff]"
                        >{{ item.title }}</text>
                    </view>
                </view>
                <image
                    v-if="item.isHide"
                    class="product-record-item-content-hide absolute right-130 w-62 h-58"
                    :style="{ top: '15px' }"
                    src="/static/jos/common/hide-show.png"
                />
                <image
                    class="product-record-item-content-level h-60 mr-12"
                    mode="heightFix"
                    :src="item.levelImage"
                />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { UIProductRecordModel } from '@/model'
defineProps({
    recordList: {
        type: Array as () => UIProductRecordModel[],
        default: [] as UIProductRecordModel[]
    }
})
</script>

<style lang="scss" scoped>
</style>
