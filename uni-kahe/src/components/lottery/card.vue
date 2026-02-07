<template>
  <view class="lotteryCard" :class="[isAnimating ? 'turnCard' : '']">
    <!--    <view class="lotteryCard-card" v-if="!isOpen">-->
    <!--      <image class="lotteryCard-card-bg" :src="cardCoverImage"></image>-->
    <!--    </view>-->
    <view
      class="lotteryCard-card"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <image v-if="isOpen" class="lotteryCard-card-img" :src="item.image" />

      <image v-if="isOpen" class="lotteryCard-card-bg" :src="cardInfoImage" />
      <image v-if="!isOpen" class="lotteryCard-card-bg" :src="cardCoverImage" />
      <view v-if="isOpen" class="lotteryCard-card-level">
        <view class="lotteryCard-card-level-content">
          <image
            class="lotteryCard-card-level-content-bg"
            :src="levelBgImage"
          />
          <image
            class="lotteryCard-card-level-content-item"
            :src="getLevelImageByLevel(item?.level)"
            mode="widthFix"
          />
        </view>
      </view>
      <view v-if="isOpen" class="lotteryCard-card-info">
        <text
          class="lotteryCard-card-info-title theme-font text-flow-ellipsis-multiple"
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
          ? "https://jms.85gui7.com/cyd/lottery/card-lottery" +
              getLevelNum(props.item?.level) +
              ".png"
          : "";
      }),
      cardInfoImage: "https://jms.85gui7.com/cyd/lottery/card-bg.png",
      cardCoverImage: "https://jms.85gui7.com/kahe-202510/lottery/card-cover.png",
      levelBgImage: computed(() => {
        return props.item
          ? "https://jms.85gui7.com/yqoh/lottery/level-bg-" +
              getLevelNum(props.item?.level) +
              ".png"
          : "";
      }),
      levelImage: computed(() => {
        return props.item
          ? "https://jms.85gui7.com/yqoh/level/" +
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

<style lang="scss" scoped>
.turnCard {
  animation: turnCardAnimate 1.5s;
}

@keyframes turnCardAnimate {
  0% {
    transform: perspective(150px) rotateY(180deg);
  }
}

.lotteryCard {
  width: 300rpx;
  height: 420rpx;

  &-card {
    position: relative;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &-lottery {
      position: absolute;
      left: -20rpx;
      top: 0;
      width: 274rpx;
      height: 410rpx;
    }

    &-bg {
      position: absolute;
      left: 58rpx;
      top: 82rpx;
      width: 180rpx;
      height: 258rpx;
    }

    &-img {
      position: absolute;
      left: 60rpx;
      top: 86rpx;
      width: 176rpx;
      height: 246rpx;
      border-radius: 4rpx;
    }

    &-level {
      position: absolute;
      left: 28rpx;
      top: 64rpx;
      width: 60rpx;
      height: 60rpx;
      &-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &-bg {
          width: 100%;
          height: 100%;
        }
        &-item {
          position: absolute;
          left: -20rpx;
          top: -10rpx;
          width: 100rpx;
          height: 80rpx;
          scale: 60%;
        }
      }
    }

    &-info {
      position: absolute;
      left: 58rpx;
      top: 292rpx;
      width: 168rpx;
      //height: 60rpx;
      display: flex;
      flex-direction: column;

      &-title {
        margin-top: 8rpx;
        font-size: 20rpx;
        font-weight: 400;
        color: #000000;
        line-height: 20rpx;
        width: 100%;
        height: 40rpx;
        text-align: center;
      }

      &-subTitle {
        margin-top: 2rpx;
        font-size: 8rpx;
        font-weight: 400;
        color: #000000;
        line-height: 10rpx;
        width: 100%;
        height: 20rpx;
      }
    }
  }
}
</style>
