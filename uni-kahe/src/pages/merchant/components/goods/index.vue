<template>
    <view class="relative w-153 h-203 rounded-10 overflow-hidden">
        <image class="w-full h-full" src="/static/kahe-202510/ka-he/merchant/item-bg.png" />
        <view class="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-3 flex flex-row justify-center items-center" v-if="item.productNum === 0">
            <image class="w-120 h-100" src="/static/kahe-202510/ka-he/common/Sellingout.png" />
        </view>
        <view class="absolute top-4 left-8 overflow-hidden rounded-4 flex flex-row items-center justify-center aspect-ratio-[1/1]" style="width: calc(100% - 16rpx);">
            <image class="w-full h-full" :src="item.logo" />
            <view class="absolute right-2 bottom-4 z-2 flex flex-col">
                <image v-for="(label, index) in item.labels" :key="'labels:' + index" :src="formatLabelImage(label)"
                    class="mt-4" style="width: calc(65rpx * 0.4); height: calc(34rpx * 0.4);" />
            </view>
        </view>
        <view class="absolute bottom-0 left-0 w-full">
            <view class="relative w-full">
                <view class="relative px-12 pb-12 w-full box-border flex flex-col">
                    <view class="font-normal text-16 text-black w-full leading-18 mb-4 text-ellipsis">{{ item.title }}</view>
                    <view class="relative" style="width: calc(97rpx * 0.6); height: calc(46rpx * 0.6);">
                        <image class="w-full h-full"
                            src="/static/kahe-202510/ka-he/home/price-bg.png" />
                        <text class="absolute right-8 min-w-32 bottom-0 text-center text-black text-16 price-font">{{ item.price }}</text>
                    </view>
                </view>
            </view>
        </view>
        <image class="absolute -left-4 -top-2" v-if="showTag" :src="getMainTagImagePath(Number(item.mainTag))" style="width: calc(180rpx * 0.4); height: calc(54rpx * 0.4);" />
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { ProductBoxModel } from "@/model";
import { getMainTagImagePath } from "@/utils/tools/image";
defineProps({
    item: {
        default: {} as ProductBoxModel,
        type: Object as PropType<ProductBoxModel>,
    },
    showTag: {
        default: true,
        type: Boolean,
    },
    isFromMall: {
        default: false,
        type: Boolean,
    },
});

const formatLabelImage = (index: number) => {
    return "/static/kahe-202510/ka-he/tag/tag" + index + ".png";
}
</script>

<style lang="scss" scoped></style>
