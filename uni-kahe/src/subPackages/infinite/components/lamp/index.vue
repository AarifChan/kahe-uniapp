<template>
  <view class="lamp relative w-full h-46" v-if="list && list.length">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="ma1 flex items-center absolute top-0 left-0 w-707 h-73"
      :class="item.action ? `anmt1 ${item.class}` : ''"
      :style="{ transform: 'translateX(120%)', animationDuration: animationTime + 's', pointerEvents: 'all' }"
      @tap.stop="emits('tapLampAction', item)"
    >
      <view class="ma1-content relative w-698 h-46">
        <image
          class="ma1-content-bg w-698 h-46"
          src="/static/kahe-202510/ka-he/integral/infinite-bg.png"
        />
        <view
          class="ma1-content-title theme-font absolute left-48 top-0 leading-46 text-24 font-normal text-white"
          :style="{ textShadow: '-1px -1px 0 #87320c, 1px -1px 0 #87320c, -1px 1px 0 #87320c, 1px 1px 0 #87320c' }"
        >欧皇来袭</view>
        <view class="ma1-content-info absolute left-169 top-0 flex flex-row items-center h-full">
          <view class="userName max-w-80 text-24 text-white font-normal leading-24">{{
            item.userName
          }}</view>
          <view class="title text-24 text-white font-normal leading-24">获得</view>
          <image class="level w-96 h-68" :src="getLevelImageByLevel(item.level)"></image>
          <view
            class="info flex-1 text-white font-medium"
            :style="{ fontSize: '12px', lineHeight: '13px', wordWrap: 'break-word', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis' }"
          >{{
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

<style lang="scss">
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

<style lang="scss" scoped>
</style>
