<template>
  <tn-popup
    v-model="vShow"
    :overlay-opacity="0.88"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="open relative w-[calc(750rpx-140rpx)]">
      <view class="open-content relative w-full flex flex-col items-center">
        <view
          class="open-content-title theme-font mt-120 w-full text-center font-normal text-50 leading-36 bg-gradient-[linear-gradient(180deg,#ffa56a,#f46a64)]"
          style="
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          "
          >购买成功，等待公布结果</view
        >
        <!--        <view class="open-content-subTitle">已成功购买{{ num }}张商品卡</view>-->
        <image
          class="open-content-img mt-60 w-249 h-224"
          src="/static/kahe-202510/ka-he/product/all-open.png"
        />
        <view class="open-content-title1 theme-font mt-43 font-normal text-34 text-white leading-36"
          >距最晚公布结果</view
        >
        <view class="open-content-time mt-25 flex flex-row items-center">
          <view
            class="open-content-time-value px-4 h-47 bg-[rgba(255,255,255,0.5)] rounded-4 text-center leading-47 font-normal text-34 text-white"
            >{{ day }}</view
          >
          <view class="open-content-time-title font-normal text-26 text-white leading-36">天</view>
          <view
            class="open-content-time-value px-4 h-47 bg-[rgba(255,255,255,0.5)] rounded-4 text-center leading-47 font-normal text-34 text-white"
            >{{ hour }}</view
          >
          <view class="open-content-time-title font-normal text-26 text-white leading-36">时</view>
          <view
            class="open-content-time-value px-4 h-47 bg-[rgba(255,255,255,0.5)] rounded-4 text-center leading-47 font-normal text-34 text-white"
            >{{ minute }}</view
          >
          <view class="open-content-time-title font-normal text-26 text-white leading-36">分</view>
          <view
            class="open-content-time-value px-4 h-47 bg-[rgba(255,255,255,0.5)] rounded-4 text-center leading-47 font-normal text-34 text-white"
            >{{ second }}</view
          >
          <view class="open-content-time-title font-normal text-26 text-white leading-36">秒</view>
        </view>
        <view class="open-content-row1 mt-16 relative w-full flex flex-row items-center">
          <image
            class="icon w-23 h-23"
            src="/static/kahe-202510/ka-he/product/open-info.png"
          />
          <view
            class="open-content-row1-title font-normal text-20 text-white leading-36"
            >若提前售完，将立即公布结果；若未能售完，将对所有订单退款</view
          >
        </view>
        <view
          class="open-content-title2 theme-font mt-23 font-normal text-24 text-[#ffcd55] leading-36"
          >积分将在揭晓结果后获得，可在积分专区兑好礼！</view
        >
        <button
          class="btn relative w-603 h-87 mt-24 p-0 m-0 border-none bg-transparent"
          open-type="share"
          plain
          style="border: none; background: transparent"
        >
          <image
            class="btn-img w-full h-full"
            src="/static/kahe-202510/ka-he/product/open-btn.png"
          />
          <view
            class="btn-title theme-font absolute left-0 top-0 w-full text-center font-normal leading-87 text-40 text-white"
            >分享并加速开奖</view
          >
        </button>
        <view
          class="open-content-title3 mt-34 font-normal text-26 text-white leading-36"
          @tap.stop="emits('update:show', false)"
          >继续购买</view
        >
      </view>
      <image
        class="open-decorate1 absolute left-16 top-32 w-80 h-133"
        src="/static/kahe-202510/ka-he/product/open2.png"
      />
      <image
        class="open-decorate2 absolute right-16 top-140 w-45 h-65"
        src="/static/kahe-202510/ka-he/product/open1.png"
      />
      <image
        class="open-close absolute right-0 top-0 w-54 h-54"
        src="/static/kahe-202510/ka-he/product/open-close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import { type PropType, ref, watch } from "vue";
import type { UIProductDetailModel } from "@/model";
import { useTimeCount } from "@/composables/countTime";
const { startTimeRemain, hour, day, second, minute, isTimeout } =
  useTimeCount();
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  num: {
    default: 1,
    type: Number,
  },
});

const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
    startTimeRemain(props.product.settleTime);
  }
);

const emits = defineEmits(["update:show"]);
</script>

<style lang="scss" scoped>
</style>
