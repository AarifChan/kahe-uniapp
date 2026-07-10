<template>
  <scroll-view
    class="merchantInfo relative w-full h-screen bg-gradient-[linear-gradient(180deg,#fee5c4,#fff6ea)]"
    :scroll-y="true"
    @scrolltolower="handleScrollToLower"
  >
    <image class="merchantInfo-top relative w-750 h-642" :src="detail.logo" />
    <!--        <view class="merchantInfo-contact" @tap.stop="handleClickQrCode"-->
    <!--            ><image-->
    <!--                class="merchantInfo-contact-img"-->
    <!--                src="/static/kahe-202510/merchant/contact.png"-->
    <!--            />联系商家</view-->
    <!--        >-->
    <!-- #ifdef MP-WEIXIN -->
    <button class="merchantInfo-share merchantInfo-share-btn absolute right-0 top-156 flex flex-row items-center px-8 py-2 rounded-l-22 bg-[rgba(0,0,0,0.5)] text-white text-24 leading-40 border-0" open-type="share">
      <image
        class="merchantInfo-contact-img w-24 h-24"
        src="/static/share.png"
      />分享商家
    </button>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <view class="merchantInfo-share absolute right-0 top-156 flex flex-row items-center px-8 py-2 rounded-l-22 bg-[rgba(0,0,0,0.5)] text-white text-24 leading-40 border-2 border-white" @tap.stop="handleClickShare">
      <image
        class="merchantInfo-contact-img w-24 h-24"
        src="/static/share.png"
      />分享商家
    </view>
    <!-- #endif -->
    <view class="merchantInfo-complain absolute right-0 top-218 flex flex-row items-center px-8 py-2 rounded-l-22 bg-[rgba(0,0,0,0.5)] text-white text-24 leading-40 border-2 border-white" @tap.stop="handleClickComplain">
      <image
        class="merchantInfo-contact-img w-24 h-24"
        src="/static/kahe-202510/merchant/complaint.png"
      />投诉商家
    </view>
    <view class="merchantInfo-content absolute top-314 left-0 w-750" style="height: calc(100vh - 314rpx)">
      <view class="welfare relative w-full">
        <img
          src="/static/kahe-202510/ka-he/merchant/card-bg.png"
          alt=""
          class="welfare-bg absolute w-full h-full inset-0"
        />
        <view class="merchantInfo-content-top relative px-34 pt-32 box-border flex flex-row">
          <image class="merchantInfo-content-top-avatar relative w-140 h-140 bg-white shadow-[0rpx_2rpx_0rpx_0rpx_rgba(0,0,0,0.71)] rounded-full" :src="detail.icon" />
          <view class="merchantInfo-content-top-info relative ml-68 flex flex-col">
            <view class="flex flex-row">
              <view
                class="merchantInfo-content-top-info-title theme-font text-ellipsis font-normal text-36 text-[#621b08] leading-36"
                >{{ detail?.name }}</view
              >
            </view>
            <view
              class="merchantInfo-content-top-info-bar relative mt-24 mb-12 ml-12 w-115 h-27 rounded-14 bg-[#ff7276]"
              :style="{
                backgroundColor: getTagBgColor(detail?.tag),
              }"
            >
              <image
                class="merchantInfo-content-top-info-bar-tag absolute -left-22 top-1/2 -translate-y-1/2 w-44 h-35"
                :src="getTagIcon(detail.tag)"
              />
              <text class="merchantInfo-content-top-info-bar-title absolute left-26 top-0 font-normal text-20 text-white leading-27">{{
                getLevelName(detail.tag)
              }}</text>
            </view>
            <view
              class="merchantInfo-content-top-info-desc w-460 font-normal text-24 text-[#ff730d] leading-36 text-ellipsis-2"
              >{{ detail?.desc }}
            </view>
          </view>
          <view
            class="merchantInfo-content-top-inGroup theme-font absolute top-60 right-20 text-center leading-44 text-black text-26"
            @tap.stop="handleClickQrCode"
          >
            <image
              src="/static/kahe-202510/ka-he/merchant/btn.png"
              class="imgBg relative w-193 h-73"
            />
            <text class="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-[40%] font-normal text-24 text-[#582610] leading-28 other-font">进群豪礼</text>
          </view>
        </view>
        <cards @did-click-item="handleClickItem" />
      </view>
      <!--      <view class="merchantInfo-content-score" @tap.stop="didClickScore">-->
      <!--        <image-->
      <!--          class="merchantInfo-content-score-img"-->
      <!--          src="/static/kahe-202510/home-upgrade/score-item-new.png"-->
      <!--        />-->
      <!--      </view>-->

      <view class="bottom mt-8 rounded-t-20 border-t-2 border-[#9d7a47]">
        <tab
          v-model:current="current"
          :list="merchantTabList"
          :search="true"
          @did-click="didClickTab(merchantTabList[current].value)"
        />
        <view class="merchantInfo-content-padding box-border py-8 px-30 grid gap-10" style="grid-template-columns: repeat(auto-fill, minmax(calc((100% - 10px) / 2), 1fr))">
          <view
            v-for="(item, index) in goodsList"
            :key="index"
            @tap.stop="goodsTapClick(item)"
          >
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
import { shareWeixinMiniProgramCard } from "@/composables/share";
import { ShowToast } from "@/utils";
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
  const image = "/static/kahe-202510/ka-he/common/qrcode.png";
  uni.previewImage({
    current: image,
    urls: [image],
  });
};

const handleClickShare = () => {
  const id = detail.value?.id;
  if (!id) {
    ShowToast("商家信息异常，暂无法分享");
    return;
  }
  shareWeixinMiniProgramCard({
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl:
      detail.value.icon ||
      detail.value.logo ||
      "/static/kahe-202510/jikaquan/jikaquan-share.jpg",
    path: `/subPackages/merchant/index?merchantId=${id}`,
  });
};

onShareAppMessage(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
    imageUrl: detail.value.icon,
    path: "/subPackages/merchant/index?merchantId=" + detail.value.id,
  };
});
onShareTimeline(() => {
  return {
    title: `${UserModule.userInfo?.nickname ?? ""}邀请你来抽取各种稀有卡牌！`,
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

<style lang="scss" scoped></style>
