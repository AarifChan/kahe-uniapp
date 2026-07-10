<template>
  <view class="groupBuyResult relative w-full h-screen bg-[#000000]">
    <view
      class="groupBuyResult-content absolute left-0 top-0 w-full flex flex-col box-border"
      :style="{ height: 'calc(100vh - env(safe-area-inset-bottom) - 24rpx)' }"
    >
      <view
        class="groupBuyResult-content-top relative w-full p-32 box-border flex flex-col"
      >
        <image
          class="groupBuyResult-content-top-live w-full aspect-ratio-[708/84]"
          src="/static/kahe-202510/groupBuy/result-bg.png"
          @tap.stop="showLiveAddress"
        />
        <view
          class="groupBuyResult-content-top-tab mt-30 flex flex-row justify-center"
        >
          <view
            class="groupBuyResult-content-top-tab-item theme-font font-normal text-30 text-[#868686] w-[239rpx] h-[50rpx] leading-[50rpx] text-center border-2 border-[#868686] rounded-10 mx-40"
            :class="current === 1 ? 'text-[#ffd3a2] bg-gradient-[linear-gradient(180deg,#764925,#764925)] border-[#af7f55]' : ''"
            @tap.stop="didClickTab(1)"
            >其他卡片</view
          >
          <view
            class="groupBuyResult-content-top-tab-item theme-font font-normal text-30 text-[#868686] w-[239rpx] h-[50rpx] leading-[50rpx] text-center border-2 border-[#868686] rounded-10 mx-40"
            :class="current === 2 ? 'text-[#ffd3a2] bg-gradient-[linear-gradient(180deg,#764925,#764925)] border-[#af7f55]' : ''"
            @tap.stop="didClickTab(2)"
            >精美卡片</view
          >
        </view>
      </view>
      <scroll-view
        class="groupBuyResult-content-list relative w-full px-32 box-border"
        :style="{ height: 'calc(100vh - 204rpx - env(safe-area-inset-bottom))' }"
        scroll-y
        @scrolltolower="handleScrollToLower"
      >
        <view
          class="groupBuyResult-content-list-item relative w-full p-18 box-border flex flex-row items-center justify-between bg-[#ffffff] rounded-10 mb-24"
          v-for="(item, index) in mindCardList"
          :key="'recordList' + index"
        >
          <view class="groupBuyResult-content-list-item-left flex flex-col">
            <view
              class="groupBuyResult-content-list-item-left-top relative w-full flex flex-row items-center justify-between"
            >
              <view
                class="groupBuyResult-content-list-item-left-top-left flex flex-row items-center"
              >
                <image
                  class="groupBuyResult-content-list-item-left-top-left-avatar w-84 h-84 rounded-[42rpx]"
                  :src="item.user.avatar"
                />
                <view
                  class="groupBuyResult-content-list-item-left-top-left-title font-normal text-24 text-[#616161] ml-12"
                  >{{ item.user.nickname }}</view
                >
              </view>
              <view
                class="groupBuyResult-content-list-item-left-top-right font-normal text-24 text-[#616161]"
                >{{ item.updateTime }}</view
              >
            </view>
            <view class="groupBuyResult-content-list-item-left-bottom mt-24">
              <view
                class="groupBuyResult-content-list-item-left-bottom-title font-normal text-26 text-[#000000]"
                >#{{ item.number }} {{ item.name }}</view
              >
            </view>
          </view>
          <image
            class="groupBuyResult-content-list-item-right h-132 w-132"
            :src="item.image"
            mode="heightFix"
          />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getPageOptions } from "@/utils/tools";
import { useGroupBuy } from "@/subPackages/groupBuy";

const current = ref(1);

const {
  mindCardList,
  currentSid,
  getGroupBuyMineLog,
  logLevel,
  handleScrollToLower,
  queryParams,
  getGroupBuyDetail,
  groupBuyDetail,
} = useGroupBuy();

const didClickTab = (index: number) => {
  current.value = index;
  logLevel.value = index;
  queryParams.value.page = 1;
  getGroupBuyMineLog();
};
const showLiveAddress = () => {
  uni.previewImage({
    current: groupBuyDetail.value.liveAddress,
    urls: [groupBuyDetail.value.liveAddress],
  });
};

onMounted(() => {
  const id = getPageOptions().id;
  if (id) {
    currentSid.value = id;
    logLevel.value = current.value;
    getGroupBuyDetail(Number(id));
    getGroupBuyMineLog();
  }
});
</script>

<style lang="scss" scoped></style>
