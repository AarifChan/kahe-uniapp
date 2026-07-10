<template>
    <view class="demonKing relative w-full flex flex-row items-center justify-center" :style="{ marginTop: '-88rpx', marginBottom: '10rpx' }">
        <view class="king relative flex w-541 h-92 items-center">
            <image src="/static/kahe-202510/ka-he/product/kings-bg.png" class="king-bg absolute inset-0 w-full h-full" />
            <view class="king-left w-120 h-116" :style="{ transform: 'translate(-30rpx, -10rpx)' }">
                <view class="king-left-content relative w-full h-full">
                    <image class="king-left-content-decorate w-full h-full" src="/static/kahe-202510/ka-he/product/border-bg.png" />
                    <image class="king-left-content-avatar absolute left-32 top-28 w-78 h-78 rounded-full" :src="product.demonKing.avatar"
                        v-if="product.demonKing.exist" />
                    <!-- <image class="king-left-content-empty" src="/static/kahe-202510/product/king-empty.png" /> -->
                </view>
            </view>
            <view class="king-info relative flex flex-col justify-start" v-if="product.demonKing.exist">
                <view class="king-info-title theme-font text-30 font-normal text-black leading-36">{{
                    product.demonKing.nickname
                    }}</view>
                <view class="king-info-subTitle text-24 font-normal text-black">已累计获得{{ product.demonKing.coin }}</view>
            </view>
            <view class="king-info relative flex flex-col justify-start" v-else>
                <view class="king-info-title theme-font text-30 font-normal text-black leading-36">暂无魔王</view>
                <view class="king-info-subTitle text-24 font-normal text-black">抽[魔王凭证]物品登上王座</view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import type { UIProductDetailModel } from "@/model";
import type { PropType } from "vue";

defineProps({
    product: {
        default: {} as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>,
    },
});
</script>
<style scoped lang="scss">
</style>
