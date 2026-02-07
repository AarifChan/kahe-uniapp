<template>
    <view class="commonTab">
        <image class="commonTab-bg" :src="currentIndex === 0
            ? 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab1-bg.png'
            : 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab2-bg.png'
            " />
        <view class="commonTab-tab" style="left: 46rpx" @tap.stop="tabDidChange(0)">
            <view v-if="currentIndex === 0" class="commonTab-tab-active" />
            <view class="commonTab-tab-title theme-font" :style="{ opacity: currentIndex === 0 ? 1 : 0.6 }">赏池</view>
        </view>
        <view class="commonTab-tab" style="left: 192rpx" @tap.stop="tabDidChange(1)">
            <view v-if="currentIndex === 1" class="commonTab-tab-active" />
            <view class="commonTab-tab-title theme-font" :style="{ opacity: currentIndex === 1 ? 1 : 0.6 }">记录</view>
        </view>
        <view class="commonTab-style" @tap.stop="didClickMerchant(product.merchant)">
            <image class="commonTab-style-avatar" :src="product.merchant?.icon" />
            <view class="commonTab-style-bar">
                <view class="commonTab-style-bar-title theme-font">{{
                    product.merchant?.name
                    }}</view>
            </view>
        </view>
        <scroll-view v-if="currentIndex === 0" :scroll-y="true" class="commonTab-goods"
            @scrolltolower="emits('scrollToLower')">
            <slot name="goods" />
        </scroll-view>

        <scroll-view v-else :scroll-y="true" class="commonTab-record" @scrolltolower="emits('scrollToLower')">
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
.commonTab {
    position: relative;
    margin: 16rpx 20rpx;
    box-sizing: border-box;
    width: 723rpx;
    //   height: 707rpx;
    height: 100%;
    overflow: hidden;
    padding-bottom: 30rpx;

    &-bg {
        position: relative;
        width: 100%;
        height: 100%;
    }

    &-tab2 {
        position: absolute;
        left: 192rpx;
        top: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5rpx;
    }

    &-tab {
        position: absolute;
        left: 34rpx;
        top: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5rpx;

        &-active {
            width: 7rpx;
            height: 30rpx;
            background: #fe7a4e;
            border-radius: 4rpx;
        }

        &-title {
            font-weight: 400;
            font-size: 36rpx;
            color: #000000;
        }
    }

    &-style {
        position: absolute;
        top: 16rpx;
        right: 40rpx;
        display: flex;
        flex-direction: row;
        align-items: center;

        &-avatar {
            width: 52rpx;
            height: 52rpx;
            border-radius: 50%;
            border: 2rpx solid white;
            z-index: 1;
        }

        &-bar {
            margin-left: -26rpx;
            height: 36rpx;
            background: rgba(255, 255, 255, 0.56);
            border-radius: 18rpx;

            &-title {
                margin-left: 32rpx;
                font-weight: 400;
                font-size: 22rpx;
                color: #000000;
                line-height: 36rpx;
            }
        }
    }

    &-record {
        position: absolute;
        //width: 100%;
        box-sizing: border-box;
        left: 20rpx;
        top: 120rpx;
        height: calc(100vh - 678rpx - env(safe-area-inset-bottom) - 122rpx);
        width: calc(100% - 40rpx);
        display: flex;
        flex-direction: column;
    }

    &-goods {
        position: absolute;
        left: 20rpx;
        top: 120rpx;
        height: calc(100vh - 678rpx - env(safe-area-inset-bottom) - 122rpx);
        // height: 100%;
        width: calc(100% - 40rpx);
    }

    &-list {
        position: relative;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(auto-fill,
                minmax(calc((100% - 60rpx) / 3), 1fr)); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
        grid-gap: 30rpx; // 这是网格间的间隙，根据需要调整

        &-item {
            display: inline-block;
            width: 100%;
        }
    }
}
</style>
