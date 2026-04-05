<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { PropType } from "vue";
import {
  ChallengeDetail,
  ChallengeOrderGate,
} from "@/subPackages/challenge/api";
import { getTitleByQuality } from "@/utils";
import { getLevelImage } from "../../../index";

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  detail: {
    default: {} as ChallengeDetail,
    type: Object as PropType<ChallengeDetail>,
  },
  currentSign: {
    default: null,
    type: Object as PropType<ChallengeOrderGate | null>,
  },
  isOver: {
    default: false,
    type: Boolean,
  },
});

const vShow = ref(props.show);
watch(
  () => props.show,
  (value) => {
    console.log("vShow:", value);
    if (value != vShow.value) {
      vShow.value = value;
    }
  }
);

const emits = defineEmits(["update:show", "didTapFinish", "didTapItem"]);

const tapFinish = () => {
  emits("didTapFinish");
};

// 计算已获得的奖励数量（map 中值为 1 的数量）
const rewardCount = computed(() => {
  const map = props.currentSign?.map ?? [];
  return map.filter((val) => val === 1).length;
});

const currentState = computed(() => {
  return props.currentSign?.status ?? 0;
});

// 是否已开始游戏（是否有任何已打开的球）
const hasStarted = computed(() => {
  const map = props.currentSign?.map ?? [];
  return map.some((val) => val !== 0);
});

const totalGate = computed(() => {
  return props.detail?.box.gate + props.detail?.box.trap;
});

// 状态由 level/play 接口返回的 map 字段控制
// map 数组下标为关卡索引(0开始)，值为：1=奖励，-1=陷阱，0=未打开
const getBoxImage = (index: number) => {
  const map = props.currentSign?.map;
  const status = map?.[index] ?? 0;
  // 1=已打开且有奖励，-1=陷阱，0=未打开
  if (status === 1) {
    return "https://jms.85gui7.com/kahe-202510/challenge/box-state3.png";
  }
  if (status === -1 || props.isOver) {
    return "https://jms.85gui7.com/kahe-202510/challenge/box-state2.png";
  }
  return "https://jms.85gui7.com/kahe-202510/challenge/box-state1.png";
};
</script>

<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view
      class="bg-transparent flex flex-col items-center justify-between h-[100vh] pt-32 pb-120"
    >
      <view class="flex flex-col items-center w-full">
        <view
          class="relative w-728 h-441 p-16"
          style="
            background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/play-top-bg.png&quot;);
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
          "
        >
          <view class="relative flex items-center justify-between pl-54rpx">
            <view class="flex items-center">
              <text class="text-32rpx text-[#675656] ml-12 font-other"
                >当前奖励</text
              >
            </view>
          </view>

          <!-- 奖品横向滚动区域 -->
          <view class="relative mt-12">
            <scroll-view scroll-x enable-flex class="whitespace-nowrap px-20">
              <view
                v-for="(item, index) in detail?.box?.rewards"
                :key="index"
                class="inline-block mr-16"
                style="transform: scale(0.85)"
              >
                <view
                  class="w-180 h-250 rounded-16 overflow-hidden border-10rpx border-[#FCD570]"
                  :style="{
                    borderColor:
                      (currentSign.gate ?? 0) === index ? `#FF7A51` : `#FCD570`,
                  }"
                >
                  <image
                    class="absolute top-0 lef-4 w-71 h-50 z-10"
                    :src="getLevelImage(index)"
                    mode="aspectFit"
                  />
                  <view class="relative p-12">
                    <image
                      :src="item.goodsDto?.image"
                      class="w-146 h-146 rounded-12"
                      mode="aspectFit"
                    />
                    <view
                      class="absolute right-4 bottom-4 px-12 py-8 text-[#222] text-20rpx"
                      style="
                        background-image: url(&quot;https://jms.85gui7.com/kahe-202510/ka-he/common/num_bg.png&quot;);
                        background-size: 100% 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                      "
                      >{{ getTitleByQuality(item.quality) }}</view
                    >
                  </view>
                  <view
                    class="h-60 flex-center bg-[#FCD570]"
                    :style="{
                      backgroundColor:
                        (currentSign?.gate ?? 0) === index
                          ? `#FF7A51`
                          : `#FCD570`,
                    }"
                  >
                    <text
                      class="text-26 font-other text-[#8B4513]"
                      :style="{
                        color:
                          (currentSign.gate ?? 0) === index
                            ? `#FFFFFF`
                            : `#8B4513`,
                      }"
                    >
                      {{ index === 0 ? "参与赏品" : `第${index}关商品` }}
                    </text>
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view
            class="flex flex-row items-center mt-[-28rpx]"
            v-if="currentState === 3"
          >
            <image
              class="w-185 h-100"
              mode="aspectFit"
              src="https://jms.85gui7.com/kahe-202510/challenge/910102c7bd8d979da34af93bf927179d.gif"
              style="transform: scale(0.8)"
            />
            <view class="flex flex-col text-24 text-[#FF1300]">
              <text>糟糕!你不小心触碰到顽皮雷弹! 其余</text>
              <text>也现身了，您只能带走参与赏品!</text>
            </view>
          </view>
          <view class="flex flex-row items-center mt-[-28rpx] px-16" v-else>
            <image
              v-if="hasStarted"
              class="w-185 h-150"
              mode="aspectFit"
              src="https://jms.85gui7.com/kahe-202510/challenge/ce10ec36134c784cff4d2578137286b4.gif"
              style="transform: scale(0.75)"
            />
            <view class="flex flex-col text-20 text-[#5E4947] items-center">
              <text v-if="currentSign?.gate !== 0"
                >领赏退出可带走<text class="text-[#FF1300]"
                  >{{ rewardCount }}关赏，</text
                ><text>点击任意精灵球可继续。</text>
              </text>
              <text
                >本场有<text class="text-[#FF1300]"
                  >{{ detail?.box?.trap }}个顽皮雷弹</text
                >，一旦触碰则只能带走参与赏！</text
              >
            </view>
          </view>
        </view>
        <view
          class="w-full mt-84"
          :class="
            totalGate <= 3
              ? 'flex flex-wrap justify-center gap-x-80 gap-y-64'
              : 'grid grid-cols-3 gap-x-16 gap-y-32'
          "
        >
          <view
            v-for="(_, index) in totalGate"
            :key="index"
            :id="index"
            class="flex items-center justify-center"
            @tap.stop="emits('didTapItem', index)"
          >
            <image
              class="w-140 h-178"
              :src="getBoxImage(index)"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>

      <image
        v-if="hasStarted"
        class="w-348 h-107"
        mode="aspectFill"
        src="https://jms.85gui7.com/kahe-202510/challenge/exit-btn.png"
        @tap.stop="tapFinish"
      />
    </view>
  </tn-popup>
</template>

<style scoped lang="scss"></style>
