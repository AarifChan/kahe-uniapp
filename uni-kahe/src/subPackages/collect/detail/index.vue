<template>
  <view class="collectDetail relative w-full h-screen bg-[#6ec0fb]">
    <image
      class="collectDetail-bg w-full aspect-ratio-[750/1344]"
      src="/static/kahe-202510/collect/detail-bg.png"
    />
    <scroll-view
      class="collectDetail-content absolute left-0 top-0 w-full h-[calc(100vh-env(safe-area-inset-bottom))]"
      scroll-y
      @scrolltolower="handleScrollToLower"
    >
      <view class="collectDetail-content-top flex flex-col w-full">
        <view
          class="collectDetail-content-top-item mt-24 ml-24 flex flex-row items-center"
          @tap.stop="navToHome"
        >
          <image
            class="collectDetail-content-top-item-icon w-32 h-30"
            src="/static/kahe-202510/collect/item1.png"
          />
          <view
            class="collectDetail-content-top-item-title ml-4 font-normal text-20 text-white leading-16 text-stroke-main"
            >首页</view
          >
        </view>
        <view class="collectDetail-content-top-info mt-31 w-full flex flex-col items-center">
          <image
            class="collectDetail-content-top-info-logo w-408 h-408"
            mode="heightFix"
            :src="collectDetail?.product.logo"
            :style="{ animation: 'floatAnimation 2s ease-in-out infinite' }"
          />
          <view class="collectDetail-content-top-info-title mt-46 font-normal text-30 text-white"
            >{{ collectDetail?.product.name }}</view
          >
          <view
            class="collectDetail-content-top-info-subTitle mt-15 font-normal text-24 text-white"
            >{{ collectDetail?.product.sales }}人集成，余{{
              collectDetail?.product.total ??
              0 - (collectDetail?.product.sales ?? 0)
            }}件｜参考价：{{ collectDetail?.product.price }}</view
          >
          <view
            class="collectDetail-content-top-info-progress mt-31 flex flex-row items-center"
          >
            <image
              class="collectDetail-content-top-info-progress-title w-117 h-30"
              src="/static/kahe-202510/collect/title.png"
            />
            <view
              class="collectDetail-content-top-info-progress-bar mx-10 relative w-520 h-17 bg-[rgba(7,7,7,0.19)] rounded-9 overflow-hidden"
            >
              <view
                class="collectDetail-content-top-info-progress-bar-value absolute left-0 top-0 w-full h-full bg-gradient-[linear-gradient(90deg,#ffd8a8,#fea34f)]"
                :style="progressStyle"
              />
            </view>
            <view
              class="collectDetail-content-top-info-progress-subTitle font-normal text-24 text-white"
              >{{ progress }}</view
            >
          </view>
        </view>
      </view>
      <view class="collectDetail-content-bottom mt-20 relative w-full">
        <view
          class="collectDetail-content-bottom-top relative w-full aspect-ratio-[687/100]"
        >
          <image
            class="collectDetail-content-bottom-top-bg w-full h-full"
            src="/static/kahe-202510/collect/decorate.png"
          />
          <view
            class="collectDetail-content-bottom-top-info absolute left-0 top-0 w-full h-full flex flex-row items-center justify-center"
          >
            <image
              class="collectDetail-content-bottom-top-info-label absolute left-198 top-20 w-85 h-52"
              src="/static/kahe-202510/collect/label1.png"
            />
            <image
              class="collectDetail-content-bottom-top-info-avatar w-44 h-44 rounded-22 mr-8 text-ellipsis"
              :src="collectDetail?.user.avatar"
            />
            <view
              class="collectDetail-content-bottom-top-info-name font-normal text-26 w-120 text-white text-center mb-4"
              >{{ collectDetail?.user.nickname }}</view
            >
          </view>
        </view>
        <view
          class="collectDetail-content-bottom-tips -mt-16 w-full font-normal text-22 text-[#362e80] text-center"
          >一次性达100%进度才能完成集赏</view
        >
        <tab @did-change="handleTabChange" />
        <view
          class="collectDetail-content-bottom-list relative box-border w-full px-30 pb-100 grid"
          :style="{
            gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 32px) / 3), 1fr))',
            gap: '16px',
          }"
        >
          <goods
            v-for="(item, index) in goodsList"
            :key="'goodsList' + index"
            :item="item"
            @did-select="goodsList[index].selected = !item.selected"
          />
        </view>
      </view>
    </scroll-view>
    <view
      class="collectDetail-bottom fixed left-32 w-[calc(100%-64rpx)] flex flex-row items-center justify-center z-10"
      :style="{ bottom: 'calc(env(safe-area-inset-bottom) + 24rpx)' }"
    >
      <view
        class="collectDetail-bottom-item bg-transparent w-310 h-74 p-0 m-0 border-none"
        @tap.stop="handleCollect"
      >
        <image
          class="collectDetail-bottom-item-img w-full h-full"
          :src="`/static/kahe-202510/collect/finish-${collectProgress === 1 ? 'enable' : 'disable'}.png`"
        />
      </view>
      <!--      <button openType="share" class="collectDetail-bottom-item bg-transparent w-310 h-74 p-0 m-0 border-none">-->
      <!--        <image-->
      <!--          class="collectDetail-bottom-item-img w-full h-full"-->
      <!--          src="/static/kahe-202510/collect/invite-btn.png"-->
      <!--        />-->
      <!--      </button>-->
    </view>
    <!--        <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
    <alert v-model:show="alertShow" @confirm="handlePayCollect" />
    <select-modal
      v-model:show="showSelectNum"
      v-model:num="selectNum"
      :max="maxNum"
      @did-tap-confirm="didTapConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import Tab from "../components/tab.vue";
import Goods from "../components/collectGoods.vue";

import { getPageOptions } from "@/utils/tools";
import { useCollectDetail } from "./index";
import { computed, onMounted } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
// import Login from '@/components/login/index.vue'
import Alert from "../components/alert/index.vue";
import SelectModal from "../components/select/index.vue";
import { useLogin } from "@/composables/login";
import { eventBus } from "@/utils/event";
const {
  didTapConfirm,
  showSelectNum,
  selectNum,
  maxNum,
  alertShow,
  collectProgress,
  getCollectDetail,
  collectDetail,
  getGoodsList,
  goodsParams,
  goodsList,
  handleScrollToLower,
  handleCollect,
  handlePayCollect,
} = useCollectDetail();
const { loginShow, handleLogin } = useLogin();

eventBus.on("didLogin", (_) => {
  loadData();
});
onMounted(() => {
  loadData();
});

const loadData = () => {
  loadDetail();
  getGoodsList();
};

const navToHome = () => {
  console.log("navToHome");
  uni.redirectTo({
    url: "/subPackages/collect/index",
  });
};

const handleTabChange = (item: { title: string; value: number }) => {
  goodsParams.value.level = item.value;
  goodsParams.value.page = 1;
  getGoodsList();
};

const loadDetail = async () => {
  const pid = getPageOptions().id;
  const uid = getPageOptions().uid;
  await UserModule.getUserInfo();
  if (Number(uid) !== Number(UserModule.userInfo.uid)) {
    getCollectDetail(pid, uid);
  } else {
    getCollectDetail(pid);
  }
};

const progress = computed(() => {
  return `${(collectProgress.value * 100).toFixed(2)}%`;
});

const progressStyle = computed(() => {
  return {
    width: `${collectProgress.value * 100}%`,
  };
});

onShareAppMessage(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: "朋友！助我一臂之力！",
    imageUrl: collectDetail.value?.product.logo,
    path: `/subPackages/collect/detail/index?id=${collectDetail.value?.product.id}&uid=${userId}`,
  };
});
onShareTimeline(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: "朋友！助我一臂之力！",
    imageUrl: collectDetail.value?.product.logo,
    path: `/subPackages/collect/detail/index?id=${collectDetail.value?.product.id}&uid=${userId}`,
  };
});
</script>

<style lang="scss" scoped>
</style>
