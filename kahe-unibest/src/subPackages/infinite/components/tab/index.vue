<script setup lang="ts">
import { type PropType, ref, watch } from "vue";
import Lamp from "../lamp/index.vue";
import type { UIBarrageModel } from "@/model";

const emits = defineEmits(["didChange", "tapLampAction"]);
const isLeft = ref(true);
const handleClick = (left: boolean) => {
  isLeft.value = left;
  emits("didChange", isLeft.value);
};
const tapLampAction = (item: UIBarrageModel) => {
  emits("tapLampAction", item);
};
const props = defineProps({
  lampList: {
    type: Array as PropType<UIBarrageModel[]>,
    default: () => [],
  },
});
const lampRef = ref();
watch(
  () => props.lampList,
  () => {
    lampRef.value?.play(props.lampList, 1);
  }
);
</script>

<template>
  <view class="lamp">
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
.lamp {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
