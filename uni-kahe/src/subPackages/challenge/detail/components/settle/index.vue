<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { PropType } from "vue";
import { ChallengeDetail } from "@/subPackages/challenge/api";
import { getTitleByQuality } from "@/utils";
import { useChallenge } from "../../../index";
const gifKey = ref(0);
const { getLevelImage } = useChallenge();
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  detail: {
    default: {} as ChallengeDetail,
    type: Object as PropType<ChallengeDetail>,
  },
});

const vShow = ref(props.show);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
    if (value) {
      gifKey.value++; // 重新挂载 image，GIF 从头播放
    }
  }
);

const success = ref(false);

const emits = defineEmits(["update:show"]);

const gateList = computed(() => {
  const gate = props.detail?.current?.gate ?? props.detail?.box?.gate ?? 9;
  return new Array(gate).fill(0);
});

const getBoxImage = (index: number) => {
  const map = props.detail?.current?.map;
  const state = map?.[index] ?? 0;
  // 0: 关闭, 1: 皮卡丘, 2: 顽皮弹
  const stateMap: Record<number, string> = {
    0: "https://jms.85gui7.com/kahe-202510/challenge/box-state1.png",
    1: "https://jms.85gui7.com/kahe-202510/challenge/box-state2.png",
    2: "https://jms.85gui7.com/kahe-202510/challenge/box-state3.png",
  };
  return stateMap[state] ?? stateMap[0];
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
      class="bg-transparent flex flex-col items-center justify-between h-[100vh] py-84"
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
                v-for="(item, index) in detail?.box.rewards"
                :key="index"
                class="inline-block mr-16"
                style="transform: scale(0.85)"
              >
                <view
                  class="w-180 h-250 rounded-16 overflow-hidden border-10rpx border-[#FCD570]"
                  :style="{
                    borderColor:
                      (detail?.current?.id ?? 0 === index)
                        ? `#FF7A51`
                        : `#FCD570`,
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
                        (detail?.current?.id ?? 0 === index)
                          ? `#FF7A51`
                          : `#FCD570`,
                    }"
                  >
                    <text
                      class="text-26 font-other text-[#8B4513]"
                      :style="{
                        color:
                          (detail?.current?.id ?? 0 === index)
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
          <view class="flex flex-row" v-if="success">
            <image
              class="w-185 h-100"
              mode="aspectFit"
              :key="gifKey"
              src="https://jms.85gui7.com/kahe-202510/challenge/910102c7bd8d979da34af93bf927179d.gif"
              style="transform: scale(0.85)"
            />
            <view class="flex flex-col text-24 text-[#FF1300]">
              <text>糟糕!你不小心触碰到顽皮雷弹! 其余</text>
              <text>也现身了，您只能带走参与赏品!</text>
            </view>
          </view>
          <view class="flex flex-row" v-else>
            <image
              class="w-185 h-150"
              mode="aspectFit"
              :key="gifKey"
              src="https://jms.85gui7.com/kahe-202510/challenge/ce10ec36134c784cff4d2578137286b4.gif"
              style="transform: scale(0.8)"
            />
            <view class="flex flex-col text-24 text-[#5E4947] items-center">
              <text
                >领赏退出可带走<text class="text-[#FF1300]">1关赏</text
                >，点击任意精灵球可继续。
              </text>
              <text
                >本场有<text class="text-[#FF1300]">3个顽皮雷弹</text
                >，一旦触碰则只能带走参与赏！</text
              >
            </view>
          </view>
        </view>
        <view
          class="w-full mt-72 gap-x-16 gap-y-32"
          :class="
            gateList.length <= 3
              ? 'flex flex-wrap justify-center'
              : 'grid grid-cols-3'
          "
        >
          <view
            v-for="(_, index) in gateList"
            :key="index"
            class="flex items-center justify-center"
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
        class="w-348 h-107"
        mode="aspectFill"
        src="https://jms.85gui7.com/kahe-202510/challenge/exit-btn.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<style scoped lang="scss"></style>
