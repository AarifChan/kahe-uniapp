<template>
    <view class="cards relative flex flex-col">
        <view class="cards-list relative box-border w-full h-full px-20 grid gap-16"
            :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 16rpx * 3) / 4), 1fr))' }">
            <view class="cards-list-item relative flex w-full h-78 justify-center"
                v-for="(item, index) in cardsArray.filter((n) => n.num !== -1)" :key="index"
                @tap.stop="emits('didTapChoose', item.num)">
                <view v-if="queueLockTime && item.num === 1" class="cards-list-item-queue absolute -top-60 left-0 z-90"
                    :style="{ width: 'calc(155rpx * 1)', height: 'calc(60rpx * 1)' }">
                    <image class="cards-list-item-queue-bg w-full h-full"
                        src="/static/kahe-202510/product/lock-queue.png" />
                    <text class="cards-list-item-queue-title absolute top-8 left-16 w-full font-normal text-20 text-black"
                        :style="{ width: 'calc(100% - 10rpx)' }">每发锁{{ queueLockTime }}秒</text>
                </view>
                <image src="/static/kahe-202510/ka-he/common/common-btn-bg.png"
                    class="cards-list-item-img absolute left-0 top-0 w-full h-full" />
                <text class="cards-list-item-text relative w-full text-center font-400 leading-78 text-34 text-white theme-font whitespace-nowrap"
                    :style="{ textShadow: '-1px -1px 0 #936120, 1px -1px 0 #936120, -1px 1px 0 #936120, 1px 1px 0 #936120', fontSize: cardFontSize(item.num) }">冲{{ item.num }}发</text>
            </view>
        </view>
        <!--    <view class="cards-bottom" v-if="!isInfinite">-->
        <!--      <view class="cards-bottom-exchange" @tap.stop="emits('didTapChangeBox')">-->
        <!--        <image-->
        <!--          class="cards-bottom-exchange-img"-->
        <!--          src="/static/kahe-202510/product/reload.png"-->
        <!--        />-->
        <!--        <text class="cards-bottom-exchange-text theme-font">换箱</text>-->
        <!--      </view>-->
        <!--      <image-->
        <!--        v-if="allShow"-->
        <!--        class="cards-bottom-other"-->
        <!--        src="/static/kahe-202510/product/other-bg.png"-->
        <!--        @tap.stop="emits('didTapChoose', -1)"-->
        <!--      />-->
        <!--    </view>-->
    </view>
</template>
<script setup lang="ts">
import { computed, type PropType } from "vue";
import type { UIProductPriceCard } from "@/model";
const props = defineProps({
    cardsArray: {
        default: () => [],
        type: Array as PropType<UIProductPriceCard[]>,
    },
    isInfinite: {
        default: false,
        type: Boolean,
    },
    queueLockTime: {
        default: 0,
        type: Number,
    },
});

const allShow = computed(() => {
    return props.cardsArray.filter((n) => n.num === -1).length > 0;
});

// 按钮宽度有限，按字数缩小字号保证“冲X发”显示完整
const cardFontSize = (num: number) => {
    const len = `冲${num}发`.length;
    if (len <= 3) return "34rpx";
    if (len === 4) return "30rpx";
    return "26rpx";
};

const emits = defineEmits(["didTapChoose", "didTapChangeBox"]);
</script>
<style lang="scss" scoped>
</style>
