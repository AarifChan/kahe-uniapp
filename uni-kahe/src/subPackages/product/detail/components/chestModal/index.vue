<template>
    <tn-popup v-model="vShow" :overlay-opacity="0.88" open-direction="center" bg-color="transparent"
        :overlay-closeable="false" @close="emits('update:show', false)">
        <view class="chestModal relative w-688 h-1051 bg-[#F6F7E5]">
            <!-- <image class="chestModal-bg w-full h-full" src="/static/kahe-202510/infinite-mode/bg.png" /> -->

            <view class="chestModal-content absolute left-0 top-0 w-full h-full flex flex-col items-center">
                <view class="chestModal-content-title w-full flex justify-center py-20 box-border bg-[#CC8156] theme-font">
                    <text class="context font-400 text-40 text-[#FFF4DA]">{{
                        getContent().title
                        }}</text>
                </view>
                <view class="chestModal-content-tips relative w-655 h-120 box-border bg-[#EADEB8] rounded-20 flex items-center justify-center"
                    :style="{ margin: '30rpx 0 60rpx 0' }">
                    <view class="chestModal-content-tips-content font-normal text-26 text-[#7C4E33]" v-if="type === 1">该赏池再抽{{ product.another }}发必出{{
                        product.nextLevel
                        }}以上，若提前出则重置。</view>
                    <view class="chestModal-content-tips-content font-normal text-26 text-[#7C4E33]" v-else>每次购买都会按照概率触发掉落</view>
                </view>
                <view class="chestModal-content-titles font-400 text-50 text-[#CC8156] theme-font">{{
                    getContent().tips1
                    }}</view>
                <view class="chestModal-content-subTitle font-normal text-26 text-[#CC8156]">{{
                    getContent().tips2
                    }}</view>
                <scroll-view :scroll-y="true" scroll-with-animation class="chestModal-content-goods relative mt-20 w-659 flex-1 bg-[#EADEB8] rounded-20 mb-20">
                    <view class="chestModal-content-goods-list relative box-border w-full pt-20 pr-30 pb-20 pl-20 grid gap-30"
                        :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 60rpx) / 3), 1fr))' }">
                        <goods-item class="chestModal-content-goods-list-item inline-block w-full" v-for="(item, index) in goodsList"
                            :key="index" :show-price="type !== 1" :item="item" :is-infinite="true"
                            :goods-price="price" />
                    </view>
                </scroll-view>
            </view>
            <image class="chestModal-close absolute top-15 right-16 w-40 h-40" src="/static/kahe-202510/infinite-mode/close.png"
                @tap.stop="emits('update:show', false)" />
        </view>
    </tn-popup>
</template>

<script lang="ts" setup>
import { type PropType, ref, watch } from "vue";
import GoodsItem from "../generalGoods/index.vue";
import type { UIProductBoxModel, UIProductDetailModel } from "@/model";
const props = defineProps({
    show: {
        default: false,
        type: Boolean,
    },
    product: {
        default: {} as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>,
    },
    type: {
        default: 1,
        type: Number,
    },
    price: {
        default: 0,
        type: Number,
    },
    goodsList: {
        default: () => [],
        type: Array as PropType<UIProductBoxModel[]>,
    },
});
const vShow = ref(false);

const getContent = () => {
    if (props.type === 1) {
        return {
            title: "保底模式",
            tips1: "宝箱内含赏品",
            tips2: "开启宝箱100%必中其一",
        };
    } else {
        return {
            title: "隐藏掉落",
            tips1: "隐藏奖励内含赏品",
            tips2: "每次购买会按照以下概率触发掉落",
        };
    }
};

watch(
    () => props.show,
    (value) => {
        vShow.value = value;
    }
);
const emits = defineEmits(["update:show"]);
</script>

<style lang="scss" scoped>
</style>
