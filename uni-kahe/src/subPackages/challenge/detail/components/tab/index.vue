<template>
  <view
    class="relative mx-20 my-16 w-723rpx h-707rpx pb-30"
    :style="{
      backgroundImage: `url(${
        currentIndex === 0
          ? 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab1-bg.png'
          : 'https://jms.85gui7.com/kahe-202510/ka-he/product/tab2-bg.png'
      })`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <!-- 背景 -->
    <!--    <view class="absolute top-0 left-0 w-full h-full" />-->

    <!-- 赏池 Tab -->
    <view
      class="absolute flex flex-row items-center gap-5"
      style="left: 46rpx; top: 20rpx"
      @tap.stop="tabDidChange(0)"
    >
      <view v-if="currentIndex === 0" class="w-7 h-30 bg-[#fe7a4e] rounded-4" />
      <text
        class="font-theme text-36"
        :class="currentIndex === 0 ? 'opacity-100' : 'opacity-60'"
        >赏池</text
      >
    </view>

    <!-- 记录 Tab -->
    <view
      class="absolute flex flex-row items-center gap-5"
      style="left: 192rpx; top: 20rpx"
      @tap.stop="tabDidChange(1)"
    >
      <view v-if="currentIndex === 1" class="w-7 h-30 bg-[#fe7a4e] rounded-4" />
      <text
        class="font-theme text-36"
        :class="currentIndex === 0 ? 'opacity-60' : 'opacity-100'"
        >记录</text
      >
    </view>

    <!-- 商家信息 -->
    <view
      class="absolute flex flex-row items-center"
      style="top: 16rpx; right: 40rpx"
      @tap.stop="didClickMerchant(detail.box?.merchant)"
    >
      <image
        class="w-52 h-52 rounded-full border-2 border-white z-1"
        :src="detail?.box?.merchant?.icon"
      />
      <view
        class="-ml-24rpx h-36 px-16 rounded-18 flex items-center"
        style="background: rgba(255, 255, 255, 0.56)"
      >
        <text class="pl-16rpx font-theme text-22 text-black">{{
          detail?.box?.merchant?.name
        }}</text>
      </view>
    </view>

    <!-- 赏池内容区域 -->
    <scroll-view
      v-if="currentIndex === 0"
      scroll-y
      class="absolute left-20 top-120 w-full"
      :style="{
        width: 'calc(100% - 40rpx)',
        height: '578rpx',
      }"
      @scrolltolower="emits('scrollToLower')"
    >
      <slot name="goods" />
    </scroll-view>

    <!-- 记录内容区域 -->
    <scroll-view
      v-else
      scroll-y
      class="absolute left-20 top-120 flex flex-col"
      :style="{
        width: 'calc(100% - 40rpx)',
        height: '578rpx',
      }"
      @scrolltolower="emits('scrollToLower')"
    >
      <slot name="record" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { type UIProductDetailModel } from "@/model";
import { PropType } from "vue";
import { useMerchant } from "@/pages/merchant";
import { ChallengeDetail } from "@/subPackages/challenge/api";

const { didClickMerchant } = useMerchant();

const props = defineProps({
  currentIndex: {
    default: 0,
    type: Number,
  },
  detail: {
    default: {} as ChallengeDetail,
    type: Object as PropType<ChallengeDetail>,
  },
});

const emits = defineEmits([
  "update:currentIndex",
  "didClickButton",
  "scrollToLower",
  "tabDidChange",
]);

const tabDidChange = (index: number) => {
  emits("update:currentIndex", index);
  emits("tabDidChange", index);
  console.log("tabDidChange", index);
};
</script>

<style scoped>
/* 字体类 */
.font-theme {
  font-family: "YouSheBiaoTiHei", sans-serif;
}
</style>
