<template>
  <view class="lamp" v-if="list && list.length">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="ma1"
      :class="item.action ? `anmt1 ${item.class}` : ''"
      :style="['animation-duration:' + animationTime + 's']"
      @tap.stop="emits('tapLampAction', item)"
    >
      <view class="ma1-content">
        <image
          class="ma1-content-bg"
          src="https://jms.85gui7.com/kahe-202510/ka-he/integral/infinite-bg.png"
        />
        <view class="ma1-content-title theme-font">欧皇来袭</view>
        <view class="ma1-content-info">
          <view class="userName text-flow-ellipsis-single">{{
            item.userName
          }}</view>
          <view class="title">获得</view>
          <image class="level" :src="getLevelImageByLevel(item.level)"></image>
          <view class="info text-flow-ellipsis-single">{{
            item.goodsName
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue";
import { type PropType } from "vue";
import { type UIBarrageModel } from "@/model";
import { useEnum } from "@/composables/enum";
const emits = defineEmits(["tapLampAction"]);
const { getLevelImageByLevel } = useEnum();
interface BarrageUIType extends UIBarrageModel {
  class: string;
  action: boolean;
}

defineProps({
  backGround: {
    type: String,
    default: "",
  },
  border: {
    type: Number,
    default: 4,
  },
  list: {
    type: Array as PropType<BarrageUIType[]>,
    default: () => [],
  },
});

const play = (list: UIBarrageModel[], num: number) => {
  if (list.length) {
    actionMa(list as BarrageUIType[], num);
  }
};
let timer: any = null;
const animationTime = 8;
const actionMa = (list: BarrageUIType[], num: number) => {
  let second = 0;
  if (num === 1) {
    second = 3;
  } else {
    second = 5;
  }
  let actionMa1Index = 0;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    const index = actionMa1Index % list.length;
    if (!list[index].action) {
      list[index].action = true;
      list[index].class = "action_" + ((actionMa1Index % num) + 1);
      setTimeout(
        () => {
          list[index].action = false;
        },
        animationTime * 1000 - 100
      );
      setTimeout(
        () => {
          actionMa1Index++;
          if (actionMa1Index === num * list.length) {
            actionMa1Index = 0;
          }
        },
        (second * 1000) / num
      );
    }
  }, 300);
};
defineExpose({
  play,
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style lang="scss" scoped>
.lamp {
  position: relative;
  width: 100%;
  height: 46rpx;
}
.ma1 {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(120%);
  width: 707rpx;
  height: 73rpx;
  display: flex;
  align-items: center;
  pointer-events: all;

  &-content {
    position: relative;
    width: 698rpx;
    height: 46rpx;

    &-bg {
      width: 698rpx;
      height: 46rpx;
    }
    &-title {
      position: absolute;
      left: 48rpx;
      top: 0;
      line-height: 46rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #ffffff;
      @include text-stroke-color(#87320c);
    }
    &-info {
      position: absolute;
      left: 169rpx;
      top: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      &-title {
        font-weight: 400;
        font-size: 34rpx;
        color: #ffffff;
        line-height: 46rpx;
      }
      .avatar {
        margin-left: 16rpx;
        width: 50rpx;
        height: 50rpx;
        object-fit: cover;
        border-radius: 50%;
        box-sizing: border-box;
      }
      .userName {
        max-width: 80rpx;
        font-size: 24rpx;
        color: white;
        font-weight: normal;
        line-height: 24rpx;
      }
      .title {
        font-size: 24rpx;
        color: white;
        font-weight: normal;
        line-height: 24rpx;
      }
      .level {
        width: 96rpx;
        height: 68rpx;
      }
      .info {
        flex: 1;

        font-size: 12px;
        font-weight: 500;
        color: white;
        line-height: 13px;
        word-wrap: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
      }
    }
  }
}

.ma1 {
  &.action_1 {
    top: 0;
  }
  &.action_2 {
    top: 135rpx;
  }
  &.action_3 {
    top: 240rpx;
  }
  &.action_4 {
    top: 340rpx;
  }
}

.anmt1 {
  animation: move1 linear;
  -webkit-animation: move1 linear;
}

@keyframes move1 {
  from {
    transform: translateX(170%);
  }

  to {
    transform: translateX(-170%);
  }
}

@-webkit-keyframes move1 {
  from {
    transform: translateX(170%);
  }

  to {
    transform: translateX(-170%);
  }
}
</style>
