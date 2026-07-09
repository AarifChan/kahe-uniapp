<template>
  <view class="w-300 h-420" :style="{ animation: isAnimating ? 'turnCardAnimate 1.5s' : '' }">
    <view
      class="relative w-full h-full bg-no-repeat bg-[length:100%_100%]"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <image v-if="isOpen" class="absolute left-60 top-86 w-176 h-246 rounded-4" :src="item.image" />

      <image v-if="isOpen" class="absolute left-58 top-82 w-180 h-258" :src="cardInfoImage" />
      <image v-if="!isOpen" class="absolute left-58 top-82 w-180 h-258" :src="cardCoverImage" />
      <view v-if="isOpen" class="absolute left-28 top-64 w-60 h-60">
        <view class="relative w-full h-full flex flex-row items-center justify-center">
          <image
            class="w-full h-full"
            :src="levelBgImage"
          />
          <image
            class="absolute -left-20 -top-10 w-100 h-80"
            style="transform: scale(0.6)"
            :src="getLevelImageByLevel(item?.level)"
            mode="widthFix"
          />
        </view>
      </view>
      <view v-if="isOpen" class="absolute left-58 top-292 w-168 flex flex-col">
        <text
          class="mt-8 text-20 font-normal text-black leading-20 w-full h-40 text-center theme-font text-flow-ellipsis-multiple"
          >{{ item.title }}</text
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type PropType,
  reactive,
  toRefs,
} from "vue";

import type { LotteryModel } from "@/components/lottery/index.vue";
import { getLevelName, getLevelNum } from "@/utils/tools/image";
import { useEnum } from "@/composables/enum";
const { getLevelImageByLevel } = useEnum();
export default defineComponent({
  name: "LotteryCard",
  props: {
    level: {
      default: 1,
      type: Number,
    },
    item: Object as PropType<LotteryModel>,
    isAnimating: {
      default: false,
      type: Boolean,
    },
    isOpen: {
      default: false,
      type: Boolean,
    },
  },
  emits: [],
  setup(props, _) {
    const dataMap = reactive({
      bgImage: computed(() => {
        return props.item
          ? "/static/cyd/lottery/card-lottery" +
              getLevelNum(props.item?.level) +
              ".png"
          : "";
      }),
      cardInfoImage: "/static/cyd/lottery/card-bg.png",
      cardCoverImage: "/static/kahe-202510/lottery/card-cover.png",
      levelBgImage: computed(() => {
        return props.item
          ? "/static/yqoh/lottery/level-bg-" +
              getLevelNum(props.item?.level) +
              ".png"
          : "";
      }),
      levelImage: computed(() => {
        return props.item
          ? "/static/yqoh/level/" +
              getLevelName(props.item?.level) +
              ".png"
          : "";
      }),
    });

    return {
      ...toRefs(dataMap),
      getLevelImageByLevel,
    };
  },
});
</script>

<style lang="scss" scoped></style>

<style lang="scss">
@keyframes turnCardAnimate {
  0% {
    transform: perspective(150px) rotateY(180deg);
  }
}
</style>
