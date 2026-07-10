<template>
  <view class="groupBuyDetail relative bg-[#000000] w-full h-screen">
    <scroll-view
      class="groupBuyDetail-content absolute left-0 top-0 w-full pb-32"
      scroll-y
      :style="{ height: 'calc(100% - 144rpx - env(safe-area-inset-bottom))' }"
    >
      <view class="groupBuyDetail-content-icon w-full aspect-ratio-[1/1]">
        <swiper
          class="groupBuyDetail-content-icon-swiper relative w-full h-full"
          circular
          :indicator-dots="true"
          :autoplay="true"
          indicator-active-color="#FF593D"
        >
          <swiper-item
            v-for="(item, index) in detailBanner"
            :key="index"
            class="groupBuyDetail-content-icon-swiper-item w-full h-full"
          >
            <image
              class="groupBuyDetail-content-icon-swiper-item-img w-full h-full"
              :src="item"
            />
          </swiper-item>
        </swiper>
      </view>
      <TopCard :detail="groupBuyDetail" />
      <Remark :detail="groupBuyDetail" @did-click="showModal" />
      <!--      <view class="groupBuyDetail-content-base">-->
      <!--        <image-->
      <!--          class="groupBuyDetail-content-base-img"-->
      <!--          src="/static/kahe-202510/groupBuy/card1.png"-->
      <!--        />-->
      <!--        <view class="groupBuyDetail-content-base-line1">-->
      <!--          <view class="groupBuyDetail-content-base-line1-title">{{-->
      <!--            groupBuyDetail.title-->
      <!--          }}</view>-->
      <!--          &lt;!&ndash;                    <image class="groupBuyDetail-content-base-line1-icon" src="/static/kahe-202510/groupBuy/arrow.png" />&ndash;&gt;-->
      <!--        </view>-->
      <!--        <view class="groupBuyDetail-content-base-time">-->
      <!--          <view class="groupBuyDetail-content-base-time-title">{{-->
      <!--            isOver ? "已经结束" : "距结束还剩"-->
      <!--          }}</view>-->
      <!--          <view v-if="!isOver" class="groupBuyDetail-content-base-time-title">{{-->
      <!--            remainingTime-->
      <!--          }}</view>-->
      <!--        </view>-->
      <!--        <view class="groupBuyDetail-content-base-other">-->
      <!--          <view class="groupBuyDetail-content-base-other-row1">-->
      <!--            <view-->
      <!--              style="display: flex; flex-direction: row; align-items: baseline"-->
      <!--            >-->
      <!--              <view class="groupBuyDetail-content-base-other-row1-price"-->
      <!--                >¥</view-->
      <!--              >-->
      <!--              <view class="groupBuyDetail-content-base-other-row1-title">{{-->
      <!--                groupBuyDetail.price-->
      <!--              }}</view>-->
      <!--            </view>-->

      <!--            <view class="groupBuyDetail-content-base-other-row1-subTitle"-->
      <!--              >编号：{{ groupBuyDetail.sid }}</view-->
      <!--            >-->
      <!--          </view>-->
      <!--          <view-->
      <!--            class="groupBuyDetail-content-base-other-progress"-->
      <!--            style="margin-top: 5rpx"-->
      <!--          >-->
      <!--            <view-->
      <!--              v-if="groupBuyDetail.total > 0"-->
      <!--              class="groupBuyDetail-content-base-other-progress-value"-->
      <!--              :style="{-->
      <!--                width: `${((groupBuyDetail.total - groupBuyDetail.sales) / groupBuyDetail.total) * 100.0}%`,-->
      <!--              }"-->
      <!--            ></view>-->
      <!--          </view>-->
      <!--          <view class="groupBuyDetail-content-base-other-row1">-->
      <!--            <view class="groupBuyDetail-content-base-other-row1-subTitle"-->
      <!--              >开售 {{ groupBuyDetail.openTime }}</view-->
      <!--            >-->
      <!--            <view class="groupBuyDetail-content-base-other-row1-subTitle"-->
      <!--              >余{{ groupBuyDetail.total - groupBuyDetail.sales }}/共{{-->
      <!--                groupBuyDetail.total-->
      <!--              }}</view-->
      <!--            >-->
      <!--          </view>-->
      <!--          <view class="groupBuyDetail-content-base-other-row2">-->
      <!--            <view-->
      <!--              v-for="(item, index) in groupBuyDetail.prices"-->
      <!--              :key="'price' + index"-->
      <!--              class="groupBuyDetail-content-base-other-row2-price"-->
      <!--              >单笔满{{ item.num }}份｜{{ item.price }}/份</view-->
      <!--            >-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <!--      <view class="groupBuyDetail-content-group">-->
      <!--        <view class="groupBuyDetail-content-group-card1">-->
      <!--          <view class="groupBuyDetail-content-group-card1-top">-->
      <!--            <image-->
      <!--              class="groupBuyDetail-content-group-card1-top-left"-->
      <!--              src="/static/kahe-202510/groupBuy/item3.png"-->
      <!--            />-->
      <!--            <view-->
      <!--              class="groupBuyDetail-content-group-card1-top-right SimHei-font"-->
      <!--            >-->
      <!--              {{ groupBuyDetail.title }} 卡密一张-->
      <!--            </view>-->
      <!--          </view>-->
      <!--          <view-->
      <!--            class="groupBuyDetail-content-group-card1-bottom"-->
      <!--            @tap.stop="showModal"-->
      <!--          >-->
      <!--            <view-->
      <!--              class="groupBuyDetail-content-group-card1-bottom-left text-flow-ellipsis-single"-->
      <!--              >{{ stripHTMLTags(groupBuyDetail.remark) }}</view-->
      <!--            >-->
      <!--            <image-->
      <!--              class="groupBuyDetail-content-group-card1-bottom-right"-->
      <!--              src="/static/kahe-202510/groupBuy/arrow-1.png"-->
      <!--            />-->
      <!--          </view>-->
      <!--        </view>-->
      <view
        class="groupBuyDetail-content-group-card2 relative mt-0 mx-auto mb-35 w-730 rounded-20 border-2 border-[#5e432b] bg-[#212121]"
      >
        <view
          class="groupBuyDetail-content-group-card2-top py-24 flex flex-row items-center justify-center"
        >
          <image
            class="groupBuyDetail-content-group-card2-top-img w-330 h-40"
            src="/static/kahe-202510/groupBuy/kami-title.png"
          />
        </view>

        <view
          v-if="recordList.length > 0"
          class="groupBuyDetail-content-group-card2-content relative w-full pt-16 px-32 pb-24 grid box-border"
          :style="{
            gridTemplateColumns:
              'repeat(auto-fill, minmax(calc((100% - 16px) / 2), 1fr))',
            gridGap: '16px',
          }"
        >
          <view
            v-for="(item, index) in recordList"
            :key="'record' + index"
            class="groupBuyDetail-content-group-card2-content-item flex flex-row items-center px-16 justify-between w-full box-border mb-16"
          >
            <view
              class="groupBuyDetail-content-group-card2-content-item-left flex flex-row items-center"
            >
              <image
                class="groupBuyDetail-content-group-card2-content-item-left-avatar w-68 h-68 rounded-34"
                :src="item.user.avatar"
              />
              <view
                class="groupBuyDetail-content-group-card2-content-item-left-info ml-20 flex flex-col"
              >
                <view
                  class="groupBuyDetail-content-group-card2-content-item-left-info-nickName text-flow-ellipsis-single w-100 font-normal text-24 text-[#ffffff] leading-30"
                  >{{ item.user.nickname }}</view
                >
                <view
                  class="groupBuyDetail-content-group-card2-content-item-left-info-title font-normal text-18 text-[#ffffff] leading-20"
                  >{{ getFormatTime(item.createTime) }}</view
                >
              </view>
            </view>
            <view
              class="groupBuyDetail-content-group-card2-content-item-num font-normal text-28 text-[#fcd09d] leading-30"
              >X{{ item.num }}</view
            >
          </view>
        </view>
        <view
          v-else
          class="groupBuyDetail-content-group-card2-empty relative pt-70 px-40 pb-36 leading-50 text-center font-normal text-30 text-[#ffffff]"
          >暂无记录</view
        >
      </view>
      <merchant :merchant="groupBuyDetail.merchant" />
      <!--            </view>-->
      <!--            <view class="groupBuyDetail-content-intro">-->
      <!--                <view class="groupBuyDetail-content-intro-title theme-font">商品介绍</view>-->
      <!--                <view class="groupBuyDetail-content-intro-detail">{{groupBuyDetail.remark}}</view>-->
      <!--            </view>-->
    </scroll-view>
    <view
      class="groupBuyDetail-bottom absolute left-0 bottom-0 w-750 bg-[#000000] box-border"
      :style="{ height: 'calc(144rpx + env(safe-area-inset-bottom))' }"
    >
      <image
        class="groupBuyDetail-bottom-bg w-750 h-144"
        src="/static/kahe-202510/groupBuy/group-bottom-bg.png"
      />
      <view
        class="groupBuyDetail-bottom-line absolute left-0 top-0 w-full p-16 box-border flex flex-row justify-between items-center"
      >
        <view class="groupBuyDetail-bottom-line-left flex flex-row">
          <view
            class="groupBuyDetail-bottom-line-left-item relative mr-26 flex flex-col items-center"
            @tap.stop="navToListPage(groupBuyDetail.sid)"
          >
            <image
              class="groupBuyDetail-bottom-line-left-item-icon w-42 h-42"
              src="/static/kahe-202510/groupBuy/kami-item1.png"
            />
            <view
              class="groupBuyDetail-bottom-line-left-item-title mt-4 font-normal text-24 text-[#ffffff] leading-36"
              >卡密列表</view
            >
          </view>
          <view
            class="groupBuyDetail-bottom-line-left-item relative mr-26 flex flex-col items-center"
            @tap.stop="navToMinePage(groupBuyDetail.id)"
          >
            <image
              class="groupBuyDetail-bottom-line-left-item-icon w-42 h-42"
              src="/static/kahe-202510/groupBuy/kami-item2.png"
            />
            <view
              class="groupBuyDetail-bottom-line-left-item-title mt-4 font-normal text-24 text-[#ffffff] leading-36"
              >我的卡密</view
            >
          </view>
          <view
            class="groupBuyDetail-bottom-line-left-item relative mr-26 flex flex-col items-center"
            @tap.stop="showInGroupImage"
          >
            <view
              class="groupBuyDetail-bottom-line-left-item-tips absolute top-[-50rpx] left-[-20rpx] w-132 h-49 text-center text-24 pt-4 text-[#794627] bg-[url('/static/kahe-202510/groupBuy/bunddle.png')] bg-no-repeat"
              :style="{ backgroundSize: '100% 100%' }"
              >开播通知</view
            >
            <image
              class="groupBuyDetail-bottom-line-left-item-icon w-42 h-42"
              src="/static/kahe-202510/groupBuy/kami-item3.png"
            />
            <view
              class="groupBuyDetail-bottom-line-left-item-title mt-4 font-normal text-24 text-[#ffffff] leading-36"
              >加入群聊</view
            >
          </view>
        </view>
        <view
          class="groupBuyDetail-bottom-line-right relative rounded-[10px] w-207 h-90 bg-gradient-[linear-gradient(90deg,#ffd3a2_0%,#fdf2d8_100%)]"
          @tap.stop="didClickBottom"
        >
          <view
            class="groupBuyDetail-bottom-line-right-title STHupo-font absolute left-0 top-0 w-full leading-90 font-normal text-34 text-[#794627] text-center"
            >{{
              isOver ? "查看详情" : "报名参加"
            }}</view
          >
        </view>
      </view>
    </view>
    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
    <!--    <login v-model:show="loginShow" @did-tap-login="handleLogin" />-->
  </view>
</template>

<script lang="ts" setup>
import { useGroupBuy } from "@/subPackages/groupBuy";
import { ref, computed, onMounted } from "vue";
import { getFormatTime, getPageOptions } from "@/utils/tools";

import CommonModal from "@/components/modal/index.vue";
import { useModal } from "@/composables/modal";
// import Login from "@/components/login/index.vue";
import TopCard from "../components/topInfo/index.vue";
import Remark from "../components/remark/index.vue";
import Merchant from "../components/merchant/index.vue";
import { useLogin } from "@/composables/login";
import { eventBus } from "@/utils/event";
import { onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, remainingTime, isTimeout } = useTimeCount();
const { modalShow, modalTitle, modalContent } = useModal();

const {
  detailBanner,
  recordList,
  groupBuyDetail,
  getGroupBuyDetail,
  getGroupBuyDetailRecord,
  navToListPage,
  navToMinePage,
  navToSubmitPage,
  stripHTMLTags,
  showInGroupImage,
} = useGroupBuy();

const valueId = ref<number>(0);
const { loginShow, handleLogin } = useLogin();
// onShow(() => {
//   loadData();
// });

eventBus.on("groupBuyUpdate", () => {
  loadData();
});

eventBus.on("didLogin", (_) => {
  loadData();
});

onMounted(() => {
  loadData();
});

const isOver = computed(() => {
  const num = groupBuyDetail.value.total - groupBuyDetail.value.sales;
  return num === 0 || isTimeout.value;
});

const didClickBottom = () => {
  const pid = valueId.value;
  if (isOver.value) {
    uni.navigateTo({
      url: `/subPackages/groupBuy/result/index?id=${pid}`,
    });
    return;
  }
  navToSubmitPage(valueId.value);
};

const loadData = async () => {
  const id = getPageOptions().id;
  // console.log('groupBuyId:', id)
  if (id) {
    valueId.value = Number(id);
    await getGroupBuyDetail(valueId.value);
    await getGroupBuyDetailRecord(valueId.value);
    startTimeRemain(groupBuyDetail.value.openTime);
  }
};

const showModal = () => {
  modalTitle.value = "活动说明";
  modalContent.value = groupBuyDetail.value.remark;
  modalShow.value = true;
};
onShareAppMessage(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: groupBuyDetail.value.title,
    imageUrl: groupBuyDetail.value?.logo,
    path: `/subPackages/groupBuy/detail/index?id=${groupBuyDetail.value?.id}&uid=${userId}`,
  };
});
onShareTimeline(() => {
  const userId = UserModule.userInfo.uid;
  return {
    title: groupBuyDetail.value.title,
    imageUrl: groupBuyDetail.value?.logo,
    path: `/subPackages/groupBuy/detail/index?id=${groupBuyDetail.value?.id}&uid=${userId}`,
  };
});
</script>

<style lang="scss" scoped></style>
