<template>
  <view
    class="relative w-full h-80rpx z-100 pointer-events-none"
    v-if="list && list.length"
  >
    <view
      v-for="(item, index) in list"
      :key="index"
      class="absolute top-0 left-full w-707rpx h-73rpx flex items-center pointer-events-auto"
      :class="item.action ? `anmt1 ${item.class}` : ''"
      :style="['animation-duration:' + animationTime + 's']"
      @tap.stop="emits('tapLampAction', item)"
    >
      <view
        class="relative w-698rpx h-46rpx"
        style="
          background-image: url(&quot;https://jms.85gui7.com/kahe-202510/ka-he/integral/infinite-bg.png&quot;);
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        "
      >
        <view
          class="absolute left-48rpx top-0 line-height-46rpx font-400 text-24rpx text-white font-theme text-outline-2 text-outline-[#87320c]"
          >欧皇来袭</view
        >
        <view
          class="absolute left-169rpx top-0 flex flex-row items-center h-full"
        >
          <view
            class="max-w-120rpx text-24rpx text-white font-normal line-height-24rpx text-flow-ellipsis-single"
            >{{ item.userName }}</view
          >
          <view
            class="text-24rpx text-white font-normal line-height-24rpx ml-8rpx"
            >获得</view
          >
          <image
            class="ml-8rpx"
            :src="getLevelImage(item.gate)"
            mode="aspectFill"
            style="width: 96rpx; height: 68rpx"
          />
          <view
            class="flex-1 text-12px font-500 text-white line-height-13px ml-8rpx text-flow-ellipsis-single truncate"
            >{{ item.goodsName }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onUnmounted, type PropType, watch, ref } from "vue";
import type { BarrageItem } from "../../api";

const emits = defineEmits(["tapLampAction"]);

// 获取等级图片
const getLevelImage = (index: number) => {
  return `https://jms.85gui7.com/tags/level${index}.png`;
};

// 解析 sourceEx JSON
const parseSourceEx = (sourceEx: string) => {
  try {
    return JSON.parse(sourceEx);
  } catch {
    return null;
  }
};

// 扩展 BarrageItem 以支持动画状态
interface BarrageUIType {
  avatar: string;
  userName: string;
  content: string;
  gate: number;
  goodsName: string;
  class: string;
  action: boolean;
}

const props = defineProps({
  barrageList: {
    type: Array as PropType<BarrageItem[]>,
    default: () => [],
  },
});

// 将 BarrageItem 转换为组件需要的格式
const list = ref<BarrageUIType[]>([]);

const convertList = () => {
  list.value = props.barrageList.map((item) => {
    const sourceExData = parseSourceEx(item.sourceEx);
    return {
      avatar: item.avatar,
      userName: item.nickname,
      content: item.context,
      gate: sourceExData?.gate || 1,
      goodsName: sourceExData?.goodsName || "神秘奖励",
      class: "",
      action: false,
    };
  });
};

let timer: any = null;
const animationTime = 8;

const play = (playList: BarrageUIType[], num: number) => {
  if (playList.length) {
    actionMa(playList, num);
  }
};

const actionMa = (playList: BarrageUIType[], num: number) => {
  let second = 0;
  if (num === 1) {
    second = 3;
  } else {
    second = 5;
  }
  let actionMa1Index = 0;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    const index = actionMa1Index % playList.length;
    if (!playList[index].action) {
      playList[index].action = true;
      playList[index].class = "action_" + ((actionMa1Index % num) + 1);
      setTimeout(
        () => {
          playList[index].action = false;
        },
        animationTime * 1000 - 100
      );
      setTimeout(
        () => {
          actionMa1Index++;
          if (actionMa1Index === num * playList.length) {
            actionMa1Index = 0;
          }
        },
        (second * 1000) / num
      );
    }
  }, 300);
};

// 监听 barrageList 变化，转换数据并播放
watch(
  () => props.barrageList,
  () => {
    convertList();
    if (list.value.length > 0) {
      setTimeout(() => {
        play(list.value, 1);
      }, 100);
    }
  },
  { immediate: true }
);

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
.action_1 {
  top: 0;
}
.action_2 {
  top: 135rpx;
}
.action_3 {
  top: 240rpx;
}
.action_4 {
  top: 340rpx;
}

.ma-text {
  @include text-stroke-color(#87320c);
}
.anmt1 {
  animation: move1 linear;
  -webkit-animation: move1 linear;
}

@keyframes move1 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200vw);
  }
}

@-webkit-keyframes move1 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200vw);
  }
}
</style>
