<script setup lang="ts">
import type { PropType } from 'vue'
import type { UIBarrageModel } from '@/model'
import { ref, watch } from 'vue'
import Lamp from '../lamp/index.vue'

const props = defineProps({
  lampList: {
    type: Array as PropType<UIBarrageModel[]>,
    default: () => [],
  },
})
const emits = defineEmits(['didChange', 'tapLampAction'])
const isLeft = ref(true)
function handleClick(left: boolean) {
  isLeft.value = left
  emits('didChange', isLeft.value)
}
function tapLampAction(item: UIBarrageModel) {
  emits('tapLampAction', item)
}
const lampRef = ref()
watch(
  () => props.lampList,
  () => {
    lampRef.value?.play(props.lampList, 1)
  },
)
</script>

<template>
  <view class="lamp">
    <Lamp
      ref="lampRef"
      back-ground="rgba(128, 128, 128, 0.6)"
      :border="0"
      :list="lampList"
      @tap-lamp-action="tapLampAction"
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
