<script setup lang="ts">
import { type PropType, ref, watch, computed } from "vue";
import Lamp from "@/components/lamp/index.vue";
import type { BarrageItem } from "../../api";

interface LampItem {
  avatar: string;
  userName: string;
  content: string;
  action?: boolean;
  class?: string;
}

const emits = defineEmits(["didChange", "tapLampAction"]);
const isLeft = ref(true);
const handleClick = (left: boolean) => {
  isLeft.value = left;
  emits("didChange", isLeft.value);
};
const tapLampAction = (item: LampItem) => {
  emits("tapLampAction", item);
};
const props = defineProps({
  barrageList: {
    type: Array as PropType<BarrageItem[]>,
    default: () => [],
  },
});

// 将 BarrageItem 转换为 Lamp 组件需要的格式
const lampList = computed<LampItem[]>(() => {
  return props.barrageList.map((item) => ({
    avatar: item.avatar,
    userName: item.nickname,
    content: item.context,
    action: false,
    class: "",
  }));
});

const lampRef = ref();
watch(
  () => props.barrageList,
  () => {
    console.log("barrageList:", props.barrageList);
    lampRef.value?.play(lampList.value, 1);
  },
  { immediate: true }
);
</script>

<template>
  <view class="lamb-container">
    <Lamp
      ref="lampRef"
      backGround="rgba(128, 128, 128, 0.6)"
      :border="0"
      :list="lampList"
      @tapLampAction="tapLampAction"
    />
  </view>
</template>

<style scoped lang="scss">
.lamb-container {
  //position: absolute;
  //top: 0;
  //left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}
</style>
