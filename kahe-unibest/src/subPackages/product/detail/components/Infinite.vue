<template>
    <view class="infinite">
        <view class="infinite-top">
            <image src="https://jms.85gui7.com/kahe-202510/ka-he/product/infinite-top-bg.png"
                class="infinite-top-img" />
            <view class="infinite-top-btn">
                <view class="infinite-top-btn-item style1 theme-font" @tap.stop="tapShowModel(0)">发货须知</view>
                <view class="infinite-top-btn-item style2 theme-font" @tap.stop="tapShowModel(1)">购买说明</view>
                <view class="infinite-top-btn-item style3 theme-font" @tap.stop="tapShowModel(2)">品相定义</view>
            </view>
            <!--      <view-->
            <!--        class="infinite-top-paymodel1 theme-font"-->
            <!--        @tap.stop="emits('tapShowModel', 0)"-->
            <!--        >发货须知</view-->
            <!--      >-->
            <!--      <view-->
            <!--        class="infinite-top-paymodel theme-font"-->
            <!--        @tap.stop="emits('tapShowModel', 1)"-->
            <!--        >购买说明</view-->
            <!--      >-->
            <image class="infinite-top-logo" src="https://jms.85gui7.com/kahe-202510/ka-he/common/logo.png" />
        </view>
        <view class="infinite-top-swiper">
            <z-swiper v-model="bannerList" :options="options">
                <z-swiper-item :custom-style="slideCustomStyle" v-for="(item, index) in bannerList" :key="index">
                    <view class="imageBox">
                        <image src="https://jms.85gui7.com/kahe-202510/product/card-bg.png" class="imageBg" />
                        <image class="image" :src="item" mode="aspectFill" />
                    </view>
                </z-swiper-item>
            </z-swiper>
        </view>
        <King v-if="product.isKindMode" :product="product" />
        <view class="infinite-center" v-else>
            <view class="boxItem">
                <image src="https://jms.85gui7.com/kahe-202510/ka-he/product/kings-bg.png" class="border-bg" />
                <view class="infinite-center-right" @tap.stop="openChestModal(1)">
                    <image class="infinite-center-right-img"
                        src="https://jms.85gui7.com/kahe-202510/ka-he/product/chest.png" />
                    <view class="infinite-center-right-title theme-font">查看宝箱</view>
                </view>
                <view class="infinite-center-left">
                    <view class="infinite-center-left-title">再抽{{ product.another }}发必出{{ product.nextLevel }}以上<text
                            class="infinite-center-left-title-tips">(若提前出了则幸运值重置)</text></view>
                    <view class="infinite-center-left-progressBg">
                        <view class="infinite-center-left-progressBg-progress" :style="luckProgress"></view>
                    </view>
                </view>

            </view>
        </view>
        <view class="infinite-tips" v-if="product?.attachList?.length > 0" @tap.stop="openChestModal(0)">
            <image class="infinite-tips-bg" src="https://jms.85gui7.com/kahe-202510/ka-he/product/decorate.png" />
            <view class="infinite-tips-title theme-font">隐藏掉落</view>
            <view class="infinite-tips-tips">每次购买均有独立概率触发掉落，存在一次多得的情况</view>
        </view>
        <InGroup @tap.stop="emits('didClickRemark')" :content="product.remark" />
        <CommonTab v-model:current-index="currentIndex" @scroll-to-lower="scrollToLower" @did-click-button=""
            :product="product" @tabDidChange="tabDidChange" @didClickButton="handleClickAction" class="infinite-common">
            <template #goods>
                <in-goods :product="product" v-for="(item, index) in levelGroupList" :key="index" :item="item"
                    @click-detail="clickItem" />
            </template>
            <template #record>
                <view>
                    <all-tab v-if="currentIndex === 1" :sort-list="sortList" @sort-tab-action="sortTabAction" />
                    <record :record-list="recordList" :types="true" :is-infinite="true" :border-heigth="201"
                        :border-width="701" />
                </view>
            </template>
        </CommonTab>
        <cards :cards-array="cardsArray" :is-infinite="true" :queue-lock-time="product.queueLockTime"
            @did-tap-choose="didClickPurchase" />
    </view>
    <chest-modal v-model:show="chestModalShow" :type="chestModalType" :price="product.price" :goods-list="chestList"
        :product="product" />
</template>
<script setup lang="ts">
import Cards from "./bottomCards/index.vue";
import InGoods from "./infiniteGoods/index.vue";
import { ref, watch } from "vue";
import CommonTab from "./CommonTab/index.vue";
import AllTab from "./all/index.vue";
import type { PropType } from "vue";
import {
    ProductDetailButtonType,
    UIProductBoxModel,
    UIProductDetailLevelGroup,
    UIProductDetailLevelList,
    UIProductDetailModel,
    UIProductPriceCard,
    UIProductRecordModel,
} from "@/model";
import Record from "@/subPackages/product/card/components/record.vue";
import InGroup from "./InGroup/index.vue";
import King from "./king/index.vue";
import { useMerchant } from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
import ChestModal from "../components/chestModal/index.vue";

const chestModalShow = ref(false);
const chestModalType = ref(1);
const chestList = ref([] as UIProductBoxModel[]);
const props = defineProps({
    product: {
        default: {} as UIProductDetailModel,
        type: Object as PropType<UIProductDetailModel>,
    },
    goodsList: {
        default: () => [],
        type: Array as PropType<UIProductBoxModel[]>,
    },
    cardsArray: {
        default: () => [],
        type: Array as PropType<UIProductPriceCard[]>,
    },
    levelGroupList: {
        default: () => [] as UIProductDetailLevelGroup[],
        type: Array as PropType<UIProductDetailLevelGroup[]>,
    },
    recordList: {
        type: Array as () => UIProductRecordModel[],
        default: () => [],
    },
    levelList: {
        default: [] as UIProductDetailLevelList[],
        type: Array as PropType<UIProductDetailLevelList[]>,
    },
    sortList: {
        default: () => [],
        type: Array,
    },
    luckProgress: {
        default: "",
        type: String,
    },
});
const tapShowModel = (index: number) => {
    emits("tapShowModel", index);
};

const bannerList = ref([] as any);
const openChestModal = (type: number) => {
    chestModalType.value = type;
    if (type === 1) {
        chestList.value = props.product?.luckyList;
    } else {
        chestList.value = props.product?.attachList;
    }
    chestModalShow.value = true;
};
watch(
    () => props.goodsList,
    (_) => {
        bannerList.value = props.goodsList
            .filter((n) => n.level >= 116)
            .map((n) => n.image);
    }
);

const options = ref({
    effect: "coverflow",
    loop: true,
    slidesPerView: 3,
    loopedSlides: 5,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 60,
        modifier: 5,
        slideShadows: true,
    },
});
const slideCustomStyle = ref({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const currentIndex = ref(0);

const emits = defineEmits([
    "tabDidChange",
    "didClickPurchase",
    "scrollToLower",
    "sortTabAction",
    "clickItem",
    "tapShowModel",
    "didClickButton",
    "didClickRemark",
]);
const clickItem = (item: any) => {
    emits("clickItem", item);
};
const sortTabAction = (i: any) => {
    emits("sortTabAction", i);
};
const tabDidChange = (index: number) => {
    emits("tabDidChange", index);
};
const didClickPurchase = (num: number) => {
    emits("didClickPurchase", {
        num,
    });
};
const handleClickAction = (action: number) => {
    switch (action) {
        case 0:
            emits("didClickButton", ProductDetailButtonType.Save);
            break;
        case 1:
            emits("didClickButton", ProductDetailButtonType.Favorite);
            break;
        case 2:
            emits("didClickButton", ProductDetailButtonType.Reload);
            break;
    }
};
const scrollToLower = () => {
    if (currentIndex.value === 0) {
        return;
    }
    emits("scrollToLower");
};
</script>
<style lang="scss" scoped>
.infinite {
    width: 100%;
    height: calc(100vh - env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    padding-bottom: 20rpx;
    box-sizing: border-box;

    &-common {
        flex: 1;
    }

    &-top {
        width: 750rpx;
        height: 474rpx;
        position: relative;

        &-img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        &-btn {
            position: absolute;
            right: 4rpx;
            top: 18rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            // gap: 8rpx;
            //z-index: 99;

            &-item {
                font-size: 24rpx;
                text-align: center;
                padding: 4rpx 6rpx;
                border-radius: 8rpx;
                margin-right: 13rpx;
                color: #ffffff;
            }

            .style1 {
                background: #7fff85;
                //border-radius: 4rpx;
                border: 2rpx solid #29984b;
                color: #237927;
            }

            .style2 {
                background: #fffa70;
                //border-radius: 4rpx;
                border: 2rpx solid #785e30;
                color: #85733a;
            }

            .style3 {
                background: #7cd2f0;
                //border-radius: 4rpx;
                border: 2rpx solid #785e30;
                color: #237927;
            }
        }

        &-logo {
            position: absolute;
            left: 0;
            top: 0;
            width: 180rpx;
            height: 71rpx;
        }

        &-paymodel {
            position: absolute;
            padding: 8rpx;
            font-size: 28rpx;
            color: #85733a;
            line-height: 25rpx;
            text-align: center;
            border-radius: 4rpx;
            right: 23rpx;
            top: 20rpx;
            background: #fffa70;
            border: 2rpx solid #785e30;
        }

        &-paymodel1 {
            position: absolute;
            padding: 8rpx;
            font-size: 28rpx;
            color: #237927;
            line-height: 25rpx;
            text-align: center;
            right: 163rpx;
            top: 20rpx;
            background: #7fff85;
            border-radius: 4rpx;
            border: 2rpx solid #29984b;
        }

        &-swiper {
            position: absolute;
            left: 80rpx;
            top: 78rpx;
            width: calc(100% - 160rpx);
            height: 220rpx;

            .imageBox {
                position: relative;
                height: calc(151rpx / 300 * 420);
                width: 151rpx;

                //border: 4rpx solid white;
                //border-radius: 8rpx;
                .imageBg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    z-index: 1;
                }

                .image {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    z-index: 2;
                }
            }
        }

        &-style {
            position: absolute;
            top: 16rpx;
            left: 40rpx;
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
                width: 168rpx;
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
    }

    &-king {
        position: relative;
        margin-top: -204rpx;
        width: 713rpx;
        height: 170rpx;

        &-bg {
            width: 713rpx;
            height: 170rpx;
        }

        &-left {
            position: absolute;
            left: 120rpx;
            top: 32rpx;
            width: 120rpx;
            height: 100rpx;

            &-content {
                position: relative;
                width: 100%;
                height: 100%;

                &-decorate {
                    width: 100%;
                    height: 100%;
                }

                &-avatar {
                    position: absolute;
                    left: 30rpx;
                    top: 24rpx;
                    width: 60rpx;
                    height: 60rpx;
                    border-radius: 30rpx;
                }

                &-empty {
                    position: absolute;
                    left: 13rpx;
                    top: -12rpx;
                    width: 94rpx;
                    height: 124rpx;
                }
            }
        }

        &-info {
            position: absolute;
            left: 224rpx;
            top: 42rpx;
            height: 100%;
            margin-left: 50rpx;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            &-title {
                font-weight: 400;
                font-size: 30rpx;
                color: #ffffff;
                line-height: 36rpx;
            }

            &-subTitle {
                font-weight: normal;
                font-size: 24rpx;
                color: #ffffff;
            }
        }
    }

    &-center {
        position: relative;
        margin-top: -124rpx;
        width: 100%;
        // padding: 32rpx 60rpx 32rpx 94rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 10rpx;

        .boxItem {
            position: relative;
            width: 540rpx;
            height: 92rpx;
            display: flex;
            align-items: center;

            .border-bg {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
            }


        }

        &-left {
            position: relative;
            z-index: 1;
            transform: translateX(-30rpx);
            display: flex;
            flex-direction: column;
            align-items: center;

            &-progressBg {
                margin-top: 15rpx;
                position: relative;
                width: 459rpx;
                height: 22rpx;
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 10rpx;

                &-progress {
                    position: absolute;
                    height: 100%;
                    max-width: 100%;
                    left: 0;
                    top: 0;
                    background-color: #FF9A63;
                    border-radius: 10rpx;
                }
            }

            &-title {
                font-size: 18rpx;
                color: #000000;

                &-tips {
                    font-size: 18rpx;
                    color: #000000;
                }
            }

            &-text {
                font-size: 18rpx;
                color: #525252;
            }
        }

        &-right {
            position: relative;
            width: 93rpx;
            height: 66rpx;
            transform: translate(-50rpx);

            &-img {
                width: 100%;
                height: 100%;
            }

            &-title {
                position: absolute;
                left: 50%;
                width: 100rpx;
                bottom: -26rpx;
                transform: translateX(-50%);
                text-align: center;
                font-weight: 400;
                font-size: 26rpx;
                color: #ffffff;
                @include text-stroke-color(#87320c);
            }
        }


    }

    &-tips {
        position: relative;
        padding: 0 0 24rpx 45rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;

        &-bg {
            width: 698rpx;
            height: 45rpx;
        }

        &-title {
            position: absolute;
            top: 0;
            line-height: 45rpx;
            left: 92rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #ffffff;
            @include text-stroke-color(#87320c);
        }

        &-tips {
            position: absolute;
            top: 0;
            left: 208rpx;
            line-height: 45rpx;
            font-weight: normal;
            font-size: 18rpx;
            color: #87320c;
        }

        &-icon {
            width: 41rpx;
            height: 45rpx;
            z-index: 2;
        }

        &-item1 {
            z-index: 1;
            margin-left: -28rpx;
            position: relative;
            width: 143rpx;
            height: 35rpx;

            &-img {
                width: 100%;
                height: 100%;
            }

            &-title {
                position: absolute;
                left: 38rpx;
                top: 0;
                height: 100%;
                line-height: 35rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #ffffff;
                text-shadow:
                    -1px -1px 0 #0c3887,
                    1px -1px 0 #0c3887,
                    -1px 1px 0 #0c3887,
                    1px 1px 0 #0c3887;
            }
        }

        &-item2 {
            margin-left: -17rpx;
            width: calc(100% - 140rpx);
            height: 35rpx;
            background: linear-gradient(90deg, #4422c2, rgba(188, 223, 255, 0.6));
            opacity: 0.7;
            display: flex;
            flex-direction: row;
            align-items: center;

            &-title {
                margin-left: 37rpx;
                font-weight: normal;
                font-size: 18rpx;
                color: #ffffff;
            }

            &-search {
                margin-left: 21rpx;
                width: 28rpx;
                height: 30rpx;
            }
        }
    }

    //&-product {
    //  margin-top: -16rpx;
    //  position: relative;
    //  width: 100%;
    //  &-bg {
    //    width: 750rpx;
    //    height: 454rpx;
    //    background: linear-gradient(
    //      to bottom,
    //      rgba(255, 255, 255, 0.8),
    //      rgba(255, 255, 255, 0)
    //    );
    //    border-radius: 50rpx 50rpx 0 0;
    //  }
    //  &-content {
    //    position: absolute;
    //    left: 0;
    //    top: 0;
    //    width: 100%;
    //  }
    //}

    &-tabList {
        margin-top: 24rpx;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    &-scroll {
        position: relative;
        margin: 20rpx;
        box-sizing: border-box;
        width: calc(100% - 40rpx);
        height: calc(100vh - 578rpx - env(safe-area-inset-bottom) - 142rpx);
        background: #272727;
        box-shadow:
            2rpx 3rpx 3rpx 0 #445084,
            0rpx -4rpx 4rpx 0rpx rgba(0, 0, 0, 0.45),
            0rpx 4rpx 5rpx 0rpx rgba(179, 197, 219, 0.45);
        border-radius: 30rpx;
        border: 13rpx solid #000000;
        overflow: hidden;

        &-list {
            position: relative;
            box-sizing: border-box;
            width: 100%;
            height: 308rpx;
            margin: 0 auto 30rpx;
            border-radius: 24rpx;

            &-titleTo {
                transform: translateY(20rpx);
                position: relative;
                display: flex;
                justify-content: space-evenly;
                width: 100%;
                height: 30rpx;

                &-pro {
                    font-size: 22rpx;
                    color: #000000;
                }

                &-text {
                    font-size: 16rpx;
                    color: #888888;
                }
            }

            &-levelName {
                position: absolute;
                left: 40rpx;
                top: 0;
                font-size: 48rpx;
                color: #ff7f7f;
            }

            &-bg {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }

            &-item {
                margin-top: 40rpx;
                position: relative;
                padding: 0 24rpx;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                width: 696rpx;

                &-goods {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-right: 28rpx;

                    &-img {
                        width: 171.4rpx;
                        height: 171.4rpx;
                    }

                    &-title,
                    &-text {
                        font-size: 20rpx;
                        color: #000000;
                    }

                    &-title {
                        margin-top: 10rpx;
                    }
                }
            }
        }
    }
}

.box-record {
    box-sizing: border-box;
    //padding: 0 20rpx;
    width: calc(100% - 40rpx);
    height: calc(100vh - 578rpx - env(safe-area-inset-bottom) - 212rpx);
    border-radius: 24rpx;
    overflow: hidden;
}
</style>
