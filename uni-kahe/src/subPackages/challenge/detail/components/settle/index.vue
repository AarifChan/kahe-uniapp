<script setup lang="ts">
import { ref, watch } from "vue";
import { PropType } from "vue";
import { ChallengeDetail } from "@/subPackages/challenge/api";
import { getTitleByQuality } from "@/utils";
import { useChallenge } from "../../../index";
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
  }
);

const emits = defineEmits(["update:show"]);
</script>

<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="bg-transparent flex flex-col items-center">
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
        <view class="relative mt-24">
          <scroll-view scroll-x enable-flex class="whitespace-nowrap px-20">
            <view
              v-for="(item, index) in detail?.box.rewards"
              :key="index"
              class="inline-block mr-16"
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
      </view>
      <!-- TODO: 根据detail?.box.gate 的数量显示图片   -->
      <view>
        <image
          class="w-140 h-178"
          src="https://jms.85gui7.com/kahe-202510/challenge/box-state1.png"
          mode="aspectFit"
        />
      </view>
      <image
        class="w-348 h-107"
        mode="aspectFill"
        src="https://jms.85gui7.com/kahe-202510/challenge/exit-btn.png"
      />
    </view>
  </tn-popup>
</template>

<style scoped lang="scss"></style>
