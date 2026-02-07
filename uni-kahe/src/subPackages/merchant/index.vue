<template>
    <scroll-view class="merchantInfo" :scroll-y="true" @scrolltolower="handleScrollToLower">
        <image class="merchantInfo-top" :src="detail.logo" />
        <!--        <view class="merchantInfo-contact" @tap.stop="handleClickQrCode"-->
        <!--            ><image-->
        <!--                class="merchantInfo-contact-img"-->
        <!--                src="https://jms.85gui7.com/kahe-202510/merchant/contact.png"-->
        <!--            />联系商家</view-->
        <!--        >-->
        <view class="merchantInfo-complain" @tap.stop="handleClickComplain">
            <image class="merchantInfo-contact-img" src="https://jms.85gui7.com/kahe-202510/merchant/complaint.png" />投诉商家
        </view>
        <view class="merchantInfo-content">
            <view class="welfare">
                <img src="https://jms.85gui7.com/kahe-202510/ka-he/merchant/card-bg.png" alt="" class="welfare-bg">
                <view class="merchantInfo-content-top">
                    <image class="merchantInfo-content-top-avatar" :src="detail.icon" />
                    <view class="merchantInfo-content-top-info">
                        <view style="display: flex; flex-direction: row">
                            <view class="merchantInfo-content-top-info-title theme-font text-flow-ellipsis-single">{{
                                detail?.name }}</view>
                        </view>
                        <view class="merchantInfo-content-top-info-bar" :style="{
                            backgroundColor: getTagBgColor(detail?.tag),
                        }">
                            <image class="merchantInfo-content-top-info-bar-tag" :src="getTagIcon(detail.tag)" />
                            <text class="merchantInfo-content-top-info-bar-title">{{
                                getLevelName(detail.tag)
                            }}</text>
                        </view>
                        <view class="merchantInfo-content-top-info-desc text-flow-ellipsis-multiple">{{ detail?.desc }}
                        </view>
                    </view>
                    <view class="merchantInfo-content-top-inGroup theme-font" @tap.stop="handleClickQrCode">
                        <image src='https://jms.85gui7.com/kahe-202510/ka-he/merchant/btn.png' class="imgBg" />
                        <text>进群豪礼</text>
                    </view>
                </view>
                <cards @did-click-item="handleClickItem" />
            </view>
            <!--      <view class="merchantInfo-content-score" @tap.stop="didClickScore">-->
            <!--        <image-->
            <!--          class="merchantInfo-content-score-img"-->
            <!--          src="https://jms.85gui7.com/kahe-202510/home-upgrade/score-item-new.png"-->
            <!--        />-->
            <!--      </view>-->

            <view class="bottom">
                <tab v-model:current="current" :list="merchantTabList" :search="true"
                    @did-click="didClickTab(merchantTabList[current].value)" />
                <view class="merchantInfo-content-padding">
                    <view class="merchantInfo-content-padding-item" v-for="(item, index) in goodsList" :key="index"
                        @tap.stop="goodsTapClick(item)">
                        <goods :item="item" :hide-merchant="true" />
                    </view>
                    <empty :show="goodsList.length === 0" />
                </view>
            </view>
        </view>
        <!--        <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
    </scroll-view>
</template>

<script lang="ts" setup>
import { useMerchantDetail } from ".";
import { onMounted } from "vue";
import {
    getLevelName,
    getTagBgColor,
    getTagIcon,
} from "@/pages/merchant/index";
import Tab from "./components/tab/index.vue";
import { useGoods } from "@/composables/goods";
import Goods from "@/pages/home/components/goods/index.vue";
import Empty from "@/components/empty/index.vue";
import Cards from "./components/cards/index.vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
// import Login from '@/components/login/index.vue'
import { useLogin } from "@/composables/login";
import { AppModule } from "@/store/modules/app";
import { eventBus } from "@/utils/event";
const { loginShow, handleLogin } = useLogin();
const { getMerchantDetail, detail, handleClickItem } = useMerchantDetail();
const {
    merchantId,
    getGoodsList,
    goodsTabList,
    goodsList,
    handleScrollToLower,
    didClickTab,
    current,
    goodsTapClick,
} = useGoods();
onMounted(() => {
    loadData();
});

const loadData = async () => {
    current.value = 1;
    await getMerchantDetail();
    merchantId.value = detail.value.id;
    await getGoodsList(merchantTabList[current.value].value);
};

const didClickScore = () => {
    // AppModule.changeProductTabIndex(3)
    uni.navigateTo({
        url: `/subPackages/infinite/index?merchantId=${detail.value.id}`,
    });
};

eventBus.on("didLogin", (_) => {
    loadData();
});

const handleClickQrCode = () => {
    const qrCode = detail.value.qrCode;
    if (qrCode) {
        uni.previewImage({
            current: qrCode,
            urls: [qrCode],
        });
    }
};

const handleClickComplain = () => {
    const image = "https://jms.85gui7.com/kahe-202510/ka-he/common/qrcode.png";
    uni.previewImage({
        current: image,
        urls: [image],
    });
};

onShareAppMessage(() => {
    return {
        title: `${UserModule.userInfo?.nickname ?? ""
            }邀请你来卡核抽取各种稀有卡牌！`,
        imageUrl: detail.value.icon,
        path: "/subPackages/merchant/index?merchantId=" + detail.value.id,
    };
});
onShareTimeline(() => {
    return {
        title: `${UserModule.userInfo?.nickname ?? ""
            }邀请你来卡核抽取各种稀有卡牌！`,
        imageUrl: detail.value.icon,
        path: "/subPackages/merchant/index?merchantId=" + detail.value.id,
    };
});

const merchantTabList = [
    {
        title: "一番赏",
        value: 1,
    },
    {
        title: "无限赏",
        value: 3,
    },

    {
        title: "对决",
        value: 4,
    },

    {
        title: "福袋",
        value: 2,
    },
    {
        title: "满开",
        value: 11,
    },
    {
        title: "其它",
        value: 12,
    },
];
</script>

<style lang="scss" scoped>
.merchantInfo {
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #fee5c4, #fff6ea);

    &-top {
        position: relative;
        width: 750rpx;
        height: 642rpx;
    }

    &-contact {
        position: absolute;
        right: -4rpx;
        top: 95rpx;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 22rpx 0 0 22rpx;
        border: 2px solid #ffffff;
        font-weight: normal;
        font-size: 24rpx;
        color: #ffffff;
        text-align: center;
        line-height: 40rpx;
        padding: 2rpx 8rpx;

        display: flex;
        flex-direction: row;
        align-items: center;

        &-img {
            width: 24rpx;
            height: 24rpx;
        }
    }

    &-complain,
    &-complain:after,
    &-complain:before {
        position: absolute;
        right: -4rpx;
        top: 218rpx;

        background: rgba(0, 0, 0, 0.5);
        border-radius: 22rpx 0 0 22rpx;
        border: 2px solid #ffffff;
        font-weight: normal;
        font-size: 24rpx;
        color: #ffffff;
        text-align: center;
        line-height: 40rpx;
        padding: 2rpx 8rpx;

        display: flex;
        flex-direction: row;
        align-items: center;

        &-img {
            width: 24rpx;
            height: 24rpx;
        }
    }

    &-content {
        position: absolute;
        top: 314rpx;
        left: 0;
        width: 750rpx;
        height: calc(100vh - 314rpx);

        // background: rgba(255, 255, 255, 0.7);
        // box-shadow: 0rpx 2rpx 5rpx 1rpx #ffffff;
        // border-radius: 30rpx 30rpx 0 0;
        .welfare {
            position: relative;
            width: 100%;

            &-bg {
                position: absolute;
                width: 100%;
                height: 100%;
                inset: 0;
            }
        }

        .bottom {
            margin-top: 8rpx;
            // background: linear-gradient(180deg, #fee5c4, #fff6ea);
            border-radius: 20rpx 20rpx 0rpx 0;
            border-top: 2rpx solid #9D7A47;
        }

        &-top {
            position: relative;
            padding: 32rpx 34rpx 0;
            box-sizing: border-box;

            display: flex;
            flex-direction: row;

            &-avatar {
                position: relative;
                width: 140rpx;
                height: 140rpx;
                background: #ffffff;
                box-shadow: 0rpx 2rpx 0rpx 0rpx rgba(0, 0, 0, 0.71);
                border-radius: 50%;
            }

            &-info {
                position: relative;
                margin-left: 68rpx;
                display: flex;
                flex-direction: column;

                &-title {
                    font-family: YouSheBiaoTiHei;
                    font-weight: 400;
                    font-size: 36rpx;
                    color: #621B08;
                    line-height: 36rpx;
                }

                &-desc {
                    width: 460rpx;
                    font-family: Adobe Heiti Std;
                    font-weight: normal;
                    font-size: 24rpx;
                    color: #FF730D;
                    line-height: 36rpx;
                }

                &-bar {
                    margin-top: 24rpx;
                    margin-left: 12rpx;
                    margin-bottom: 12rpx;
                    position: relative;
                    width: 115rpx;
                    height: 27rpx;
                    background: #ff7276;
                    border-radius: 14rpx;

                    &-tag {
                        position: absolute;
                        left: -22rpx;
                        top: calc((27rpx - 35rpx) / 2);
                        width: 44rpx;
                        height: 35rpx;
                    }

                    &-title {
                        position: absolute;
                        left: 26rpx;
                        top: 0;
                        font-weight: normal;
                        font-size: 20rpx;
                        color: #ffffff;
                        line-height: 27rpx;
                    }
                }
            }

            &-inGroup {
                position: absolute;
                top: 60rpx;
                right: 20rpx;
                text-align: center;
                line-height: 44rpx;
                color: #000000;
                font-size: 26rpx;

                .imgBg {
                    position: relative;
                    width: 193rpx;
                    height: 73rpx;
                }

                text {
                    position: absolute;
                    left: 50%;
                    top: 30%;
                    transform: translate(-50%, -40%);
                    font-family: zihunyuwanti;
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #582610;
                    line-height: 28rpx;
                }
            }
        }

        &-score {
            padding: 0 30rpx;
            box-sizing: border-box;
            width: 100%;

            &-img {
                width: 100%;
                aspect-ratio: 698 / 129;
            }
        }

        &-padding {
            box-sizing: border-box;
            padding: 8rpx 30rpx;
            display: grid;
            grid-template-columns: repeat(auto-fill,
                    minmax(calc((100% - 10px) / 2), 1fr)); // 这里的100px是假设的最小宽度，1fr是灵活的宽度
            grid-gap: 10px; // 这是网格间的间隙，根据需要调整

            &-item {}
        }
    }
}
</style>
