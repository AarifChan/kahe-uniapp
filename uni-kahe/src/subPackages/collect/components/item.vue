<template>
  <view class="collect-item-root relative w-full box-border h-236 rounded-10">
    <image
      class="collect-bg w-full h-full"
      src="/static/kahe-202510/collect/item-bg.png"
    />
    <view
      class="collect-item absolute left-0 top-0 p-16 box-border w-full h-full flex flex-col"
    >
      <view class="collect-item-top relative flex flex-row items-center">
        <view class="collect-item-top-line w-2 h-19 bg-[#0070bf]" />
        <view
          class="collect-item-top-label ml-2 font-normal text-20 text-[#0070bf] leading-30"
          >{{ isTimeout ? "已结束" : "进行中" }}</view
        >
        <view
          v-if="!isTimeout"
          class="collect-item-top-time ml-8 font-normal text-16 text-[#0070bf] leading-30"
          >结束时间：{{ item.expireTime }}</view
        >
      </view>
      <view
        class="collect-item-content relative w-full flex flex-row items-center"
      >
        <image
          class="collect-item-content-logo w-164 h-164 bg-[rgba(210,220,245,0.8)] rounded-10 border-3 border-[#8bb8ea]"
          :src="item.logo"
        />
        <view
          class="collect-item-content-info relative w-[calc(100%-196rpx)] ml-18 flex flex-col justify-center"
        >
          <view
            class="collect-item-content-info-title font-normal text-26 text-[#000000] leading-30 text-ellipsis-2"
            >{{ item.name }}</view
          >
          <view class="collect-item-content-info-subTitle flex flex-row">
            <view
              class="bg-[rgba(255,255,255,0.48)] rounded-4 py-2 px-8 font-normal text-20 text-[#000000] flex flex-row"
              style="width: max-content"
            >
              <view style="color: #000000">余</view>
              <view style="color: #0070bf">{{ item.total - item.sales }}</view>
            </view>
            <view
              class="bg-[rgba(255,255,255,0.48)] rounded-4 py-2 px-8 ml-8 font-normal text-20 text-[#000000] flex flex-row"
              style="width: max-content"
            >
              <view style="color: #0070bf">{{ item.price }}</view>
              <!--              <view style="color: #000000">点券</view>-->
            </view>
          </view>
          <view
            class="collect-item-content-info-progress mt-4 flex flex-row items-center"
          >
            <view
              class="collect-item-content-info-progress-title font-normal text-20 text-[#0070bf] leading-30"
              >进度：</view
            >
            <view
              class="collect-item-content-info-progress-bar relative w-282 h-17 bg-[rgba(7,7,7,0.19)] rounded-9 overflow-hidden"
            >
              <view
                class="collect-item-content-info-progress-bar-value absolute left-0 top-0 w-full h-full bg-gradient-[linear-gradient(90deg,#ffd8a8,#fea34f)]"
                :style="progressStyle"
              />
            </view>
          </view>
          <view
            v-if="!isTimeout"
            class="collect-item-content-info-btn absolute bottom-48 right-0 w-111 h-41"
            @tap.stop="emits('didExchangeItem', item)"
          >
            <image
              class="collect-item-content-info-btn-bg w-full h-full"
              src="/static/kahe-202510/collect/btn1.png"
            />
            <view
              class="collect-item-content-info-btn-title absolute left-0 top-0 w-full leading-41 text-center font-normal text-22 text-white text-shadow-[-1px_-1px_0_#b94905,1px_-1px_0_#b94905,-1px_1px_0_#b94905,1px_1px_0_#b94905] theme-font"
              >去兑换</view
            >
          </view>
          <view
            v-if="!isTimeout"
            class="collect-item-content-info-btn absolute -bottom-8 right-0 w-111 h-41"
            @tap.stop="emits('didClickItem', item)"
          >
            <image
              class="collect-item-content-info-btn-bg w-full h-full"
              src="/static/kahe-202510/collect/btn4.png"
            />
            <view
              class="collect-item-content-info-btn-title absolute left-0 top-0 w-full leading-41 text-center font-normal text-22 text-white text-shadow-[-1px_-1px_0_#b94905,1px_-1px_0_#b94905,-1px_1px_0_#b94905,1px_1px_0_#b94905] theme-font"
              >去集赏</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import { CollectListObject } from "@/api/collect";
import dayjs from "dayjs";

const props = defineProps({
  item: {
    default: {} as CollectListObject,
    type: Object as PropType<CollectListObject>,
  },
});

const isTimeout = computed(() => {
  const now: Date = new Date();
  const timeDifference =
    dayjs(props.item.expireTime).valueOf() - Number(now.getTime());
  return timeDifference <= 0;
});

function divideAndTruncate(a: number, b: number): number {
  const result = a / b;
  const factor = Math.pow(10, 4); // 10^4 = 10000
  return Math.floor(result * factor) / factor; // 截断小数部分
}
const progressStyle = computed(() => {
  if (!props.item || !props.item.total) {
    return {
      width: 0,
    };
  }
  const a = props.item.total - props.item.sales;
  const b = props.item.total;
  const progress = divideAndTruncate(a, b) * 100;
  return {
    width: `${Number(progress)}%`,
  };
});
const emits = defineEmits(["didClickItem", "didExchangeItem"]);
</script>

<style lang="scss" scoped></style>
