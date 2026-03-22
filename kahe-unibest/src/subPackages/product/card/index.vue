<template>
    <view calss="cards">
        <image class="cards-cardBg" src="https://jms.85gui7.com/kahe-202510/ka-he/machine/newCard-bg.png" />
        <Lamp ref="barrageRef" @tapLampAction="tapLampAction" :list="barrageList" />
        <view class="cards-mains">
            <view class="cards-mains-awardBg">
                <!-- <image src="https://jms.85gui7.com/kahe-202510/images/award-bg.png" class="cards-mains-awardBg-imgs" /> -->
                <image class="cards-mains-awardBg-prize" :src="productDetail.image" />
            </view>
            <Rightmo :list="itemList" @tapItem="tapItem" />
        </view>
        <!-- <view class="cards-box"> -->
        <!-- <image class="cards-box-bg" src="https://jms.85gui7.com/kahe-202510/product/king-bg.png" /> -->
        <!-- <view class="cards-box-content">
                <text class="cards-box-content-title theme-font">单人{{ (productDetail.another / 5).toFixed(0)
                    }}包,必出高罕卡</text>
                <view class="cards-box-content-Progressbar">
                    <view class="cards-box-content-Progressbar-bg">
                        <view class="cards-box-content-Progressbar-bg-style" :style="luckProgress" />
                    </view>
                                   <view class="cards-box-Progressbar-num">{{luckLabel}}</view>
                </view>
            </view> -->
        <!-- <image class="cards-box-img" src="https://jms.85gui7.com/kahe-202510/product/card-decorate.png" /> -->
        <!-- </view> -->
        <view class="cards-box">
            <text>{{ productDetail.title }}</text>
        </view>
        <bottoms :list="cardsList" @tapCards="didTapPurchaseNum" :product-detail="productDetail" />
        <pay v-model:show="payShow" :goods="payItem" :merchant="productDetail.merchant" @did-tap-pay="didTapPay"
            @did-tap-coupon="didTapCoupon" :show-skip="true" v-model:skip-checked="skipLottery" />
        <reward v-model:show="rewardShow" :reward-list="rewardList" :types="false" :is-card="true" :nums="true"
            @did-click-smash="didTapSmashRightNow" />
        <smash v-model:show="smashShow" :recycleGoods="recycleGoods" @did-tap-smash="handleSmashGoods" />
        <card-show v-model:show="cardShow" :title="changeTitle[currentValue]" :current="currentValue"
            :sortList="sortList" @sort-tab-action="sortTabAction" :recordList="recordList"
            :level-group-list="levelGroupList" :goodsList="goodsList" :levelList="levelList"
            @scroll-to-lower="scrollToLower" />
        <lottery v-model:show="lotteryShow" :is-skip="false" :list="lotteryList" @did-tap-continue="didTapContinue" />
    </view>
</template>
<script setup lang="ts">
import Lamp from "@/components/lamp/index.vue";
import Pay from "@/components/modal/pay/index.vue";
import Rightmo from "./components/rightmo.vue";
import Bottoms from "./components/bottom.vue";
import Reward from "@/components/modal/reward/index.vue";
import Lottery from "@/components/lottery/index.vue";
import Smash from "@/components/modal/smash/index.vue";
import CardShow from "@/components/modal/cardsModal/index.vue";
import { userCards } from "@/composables/cards";
import { onMounted, watch, ref, computed } from "vue";
import { useGoods } from "@/composables/goods";
import { useProductDetail } from "@/composables/product/detail";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
const { itemList, tapItem, cardShow, changeTitle, currentValue } = userCards();
const { getBarrageList, barrageList, tapLampAction } = useGoods();
const {
    levelList,
    goodsList,
    loadRecordList,
    scrollToLower,
    sortList,
    smashShow,
    recycleGoods,
    handleSmashGoods,
    loadData,
    productDetail,
    cardsList,
    didTapPurchaseNum,
    levelGroupList,
    payShow,
    payItem,
    didTapPay,
    didTapCoupon,
    rewardShow,
    lotteryList,
    lotteryShow,
    rewardList,
    recordList,
    sortTabAction,
    skipLottery,
    didTapSmashRightNow,
} = useProductDetail();
const barrageRef = ref();
watch(
    () => barrageList.value,
    () => {
        barrageRef.value.play(barrageList.value, 4);
    }
);

const luckLabel = computed(() => {
    const luckVal = productDetail.value.luckyVal / 5;
    const totalVal = productDetail.value.luckyMax / 5;
    return `${luckVal.toFixed(0)}/${totalVal.toFixed(0)}`;
});

watch(
    () => rewardShow.value,
    (v) => {
        if (!v) {
            getBarrageList();
        }
    }
);
watch(
    () => cardShow.value,
    async (v) => {
        if (v && currentValue.value === 3) {
            await loadRecordList();
        }
    }
);
const didTapContinue = () => {
    rewardShow.value = true;
};
const luckProgress = computed(() => {
    if (!productDetail?.value.luckyMax) {
        return "";
    }
    const luckProgress =
        (productDetail?.value.luckyVal / productDetail?.value.luckyMax) * 100;
    return `width:${luckProgress}%`;
});
onMounted(async () => {
    await getBarrageList();
    await loadData();
});

onShareAppMessage(() => {
    return {
        title: "这个箱子快出货了，速来！",
        imageUrl: productDetail.value.image,
        path: `/subPackages/product/detail/index?pid=${productDetail.value.id}`,
    };
});
onShareTimeline(() => {
    return {
        title: "这个箱子快出货了，速来！",
        imageUrl: productDetail.value.image,
        path: `/subPackages/product/detail/index?pid=${productDetail.value.id}`,
    };
});
</script>
<style lang="scss" scoped>
.cards {
    position: relative;

    &-cardBg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    &-mains {
        position: relative;
        width: 100%;
        @include flex-x-center();
        transform: translateY(420rpx);

        &-awardBg {
            position: relative;
            width: 294rpx;
            height: 388rpx;
            @include flex-xy-center(column);
            animation: floatAnimation 2s ease-in-out infinite;

            &-imgs {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }

            &-prize {
                position: relative;
                width: 190rpx;
                height: calc(190rpx / 300 * 420);
            }
        }
    }

    &-box {
        position: fixed;
        bottom: calc(267rpx + env(safe-area-inset-bottom));
        left: 50%;
        transform: translateX(-50%);
        width: 432rpx;
        height: 56rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 4rpx 0rpx 0rpx #DA9007;
        border-radius: 28rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        text {
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            font-size: 36rpx;
            color: #E69401;
        }
    }

    &-img {
        position: absolute;
        top: 32rpx;
        right: 46rpx;
        width: 93rpx;
        height: 92rpx;

    }
}

@keyframes floatAnimation {
    0% {
        transform: translateY(0);
        /* 初始位置：不偏移 */
    }

    50% {
        transform: translateY(-20px);
        /* 50%时间点：向上偏移20像素 */
    }

    100% {
        transform: translateY(0);
        /* 结束位置：不偏移 */
    }
}
</style>
