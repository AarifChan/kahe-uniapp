<template>
    <view class="commonTab relative w-723 h-full overflow-hidden" style="margin: 16rpx 20rpx; padding-bottom: 30rpx;">
        <image class="commonTab-bg relative w-full h-full" :src="currentIndex === 0
            ? '/static/kahe-202510/ka-he/product/tab1-bg.png'
            : '/static/kahe-202510/ka-he/product/tab2-bg.png'
            " />
        <view class="commonTab-tab absolute top-20 flex flex-row items-center gap-5" style="left: 46rpx" @tap.stop="tabDidChange(0)">
            <view v-if="currentIndex === 0" class="commonTab-tab-active w-7 h-30 bg-[#fe7a4e] rounded-4" />
            <view class="commonTab-tab-title theme-font text-36 font-normal text-black" :style="{ opacity: currentIndex === 0 ? 1 : 0.6 }">赏池</view>
        </view>
        <view class="commonTab-tab absolute top-20 flex flex-row items-center gap-5" style="left: 192rpx" @tap.stop="tabDidChange(1)">
            <view v-if="currentIndex === 1" class="commonTab-tab-active w-7 h-30 bg-[#fe7a4e] rounded-4" />
            <view class="commonTab-tab-title theme-font text-36 font-normal text-black" :style="{ opacity: currentIndex === 1 ? 1 : 0.6 }">记录</view>
        </view>
        <view class="commonTab-style absolute top-16 right-40 flex flex-row items-center" @tap.stop="didClickMerchant(product.merchant)">
            <image class="commonTab-style-avatar w-52 h-52 rounded-full z-1" :src="product.merchant?.icon" style="border: 2rpx solid white;" />
            <view class="commonTab-style-bar h-36 rounded-18 -ml-26" style="background: rgba(255, 255, 255, 0.56);">
                <view class="commonTab-style-bar-title ml-32 text-22 font-normal text-black" style="line-height: 36rpx;">{{
                    product.merchant?.name
                    }}</view>
            </view>
        </view>
        <scroll-view v-if="currentIndex === 0" :scroll-y="true" class="commonTab-goods absolute top-120"
            @scrolltolower="emits('scrollToLower')"
            style="left: 20rpx; width: calc(100% - 40rpx); height: calc(100vh - 678rpx - env(safe-area-inset-bottom) - 122rpx);"
        >
            <slot name="goods" />
        </scroll-view>

        <scroll-view v-else :scroll-y="true" class="commonTab-record absolute top-120 flex flex-col" @scrolltolower="emits('scrollToLower')"
            style="left: 20rpx; width: calc(100% - 40rpx); height: calc(100vh - 678rpx - env(safe-area-inset-bottom) - 122rpx);"
        >
            <slot name="record" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { type UIProductDetailModel } from "@/model";
import { PropType, ref, watch } from "vue";
import { useMerchant } from "@/pages/merchant/index";

const { didClickMerchant } = useMerchant();

const props = defineProps({
    currentIndex: {
        default: 0,
        type: Number,
    },
    product: {
        default: {} as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>,
    },
});

const emits = defineEmits([
    "update:currentIndex",
    "didClickButton",
    "scrollToLower",
    "tabDidChange",
]);

const tabDidChange = (index: number) => {
    emits("update:currentIndex", index);
    emits("tabDidChange", index);
    console.log("tabDidChange", index);
};
</script>

<style scoped lang="scss">
</style>
