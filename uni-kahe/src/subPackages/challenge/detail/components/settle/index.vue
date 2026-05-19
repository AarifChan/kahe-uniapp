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

const emits = defineEmits([
  "update:show",
  "didTapFinish",
  "didTapItem",
  "tapItemDetail",
]);

const tapFinish = () => {
  emits("didTapFinish");
};

// 处理 box 点击事件
const handleBoxTap = (index: number) => {
  const map = props.currentSign?.map;
  const status = map?.[index] ?? 0;
  // 1=已打开且有奖励，-1=陷阱，0=未打开
  // 已经开过的 box 不做任何操作
  if (status === 1 || status === -1) {
    return;
  }
  emits("didTapItem", index);
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

// 必须数值相加：若接口把 gate/trap 当字符串返回，`+` 会变成拼接字符串，
// Vue 会对字符串做 v-for 逐字符渲染，表现为数量/索引错乱或图片异常。
const totalGate = computed(() => {
  const gate = Number(props.detail?.box?.gate ?? 0);
  const trap = Number(props.detail?.box?.trap ?? 0);
  return (
    (Number.isFinite(gate) ? gate : 0) + (Number.isFinite(trap) ? trap : 0)
  );
});

// 状态由 level/play 接口返回的 map 字段控制
// map 数组下标为关卡索引(0开始)，值为：1=奖励，-1=陷阱，0=未打开
const getBoxImage = (index: number) => {
  const map = props.currentSign?.map;
  const status = map?.[index] ?? 0;
  // 1=已打开且有奖励，-1=陷阱，0=未打开
  if (status === 1) {
    return "/static/kahe-202510/challenge/box-state3.png";
  }
  if (status === -1 || props.isOver) {
    return "/static/kahe-202510/challenge/box-state2.png";
  }
  return "/static/kahe-202510/challenge/box-state1.png";
};

const getRewardImageStyle = (image?: string) => {
  return {
    backgroundImage: image ? `url(${image})` : "none",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
};

/** 模板内勿写 url(&quot;https://...)，miniprogram-ci 编译 WXML 会报 unexpected `/` */
const playTopBgStyle = {
  backgroundImage:
    "url(/static/kahe-202510/challenge/play-top-bg.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
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
        <view class="relative w-728 h-441 p-16" :style="playTopBgStyle">
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
                :id="index"
                class="inline-block mr-16"
                @tap.stop="emits('tapItemDetail', item)"
              >
                <view
                  class="w-180 h-250 rounded-16 overflow-hidden border-10 border-[#FCD570] relative"
                  :style="{
                    borderColor:
                      (currentSign?.gate ?? 0) === index
                        ? `#FF7A51`
                        : `#FCD570`,
                  }"
                >
                  <view class="relative w-170 h-170">
                    <view
                      class="absolute left-12 top-12 w-146 h-146 rounded-12"
                      :style="getRewardImageStyle(item?.goodsDto?.image)"
                    />
                  </view>

                  <view
                    class="h-70 flex-center bg-[#FCD570] w-full"
                    :style="{
                      backgroundColor:
                        (currentSign?.gate ?? 0) === index
                          ? `#FF7A51`
                          : `#FCD570`,
                    }"
                  >
                    <text
                      class="text-26 font-other text-[#8B4513] line-height-60"
                      :style="{
                        color:
                          (currentSign?.gate ?? 0) === index
                            ? `#FFFFFF`
                            : `#8B4513`,
                      }"
                    >
                      {{ index === 0 ? "参与赏品" : `第${index}关商品` }}
                    </text>
                  </view>

                  <image
                    class="absolute top-0 left-4 w-71 h-50 z-20"
                    :src="getLevelImage(index)"
                    mode="aspectFit"
                  />

                  <view class="reward-card-quality">
                    <text class="reward-card-quality-text">
                      {{ getTitleByQuality(item?.goodsDto?.quality) }}
                    </text>
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view
            class="flex flex-row items-center mt-16"
            v-if="currentState === 3"
          >
            <image
              class="w-185 h-100"
              mode="aspectFit"
              src="/static/kahe-202510/challenge/910102c7bd8d979da34af93bf927179d.gif"
              style="transform: scale(0.8)"
            />
            <view class="flex flex-col text-24 text-[#FF1300]">
              <text>糟糕!你不小心触碰到顽皮雷弹! 其余</text>
              <text>也现身了，您只能带走参与赏品!</text>
            </view>
          </view>
          <view class="flex flex-row items-center mt-16 px-16" v-else>
            <image
              v-if="hasStarted"
              class="w-185 h-150"
              mode="aspectFit"
              src="/static/kahe-202510/challenge/ce10ec36134c784cff4d2578137286b4.gif"
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
            :key="`${index}-${props.currentSign?.map?.[index] ?? 0}`"
            :id="String(index)"
            class="flex items-center justify-center"
            @tap.stop="handleBoxTap(index)"
          >
            <image
              class="w-140 h-178"
              style="width: 140rpx; height: 178rpx"
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
        style="width: 348rpx; height: 107rpx"
        src="/static/kahe-202510/challenge/exit-btn.png"
        @tap.stop="tapFinish"
      />
    </view>
  </tn-popup>
</template>

<style scoped lang="scss">
.reward-card-quality {
  position: absolute;
  right: 4rpx;
  bottom: 64rpx;
  width: 96rpx;
  height: 42rpx;
  background-image: url("/static/kahe-202510/ka-he/common/num_bg.png");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.reward-card-quality-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  color: #222222;
}
</style>
