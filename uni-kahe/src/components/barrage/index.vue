<template>
  <view class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-230 h-42">
    <view
      class="barrage relative w-230 h-42 flex items-center border-2 border-[#bdde67] bg-[#cff7ba] rounded-12 mb-10"
      v-for="(item, index) in list"
      :key="index"
      @tap.stop="emits('tapLampAction', item)"
    >
      <view class="flex items-center w-full h-full">
        <img class="w-38 h-38 object-cover rounded-full box-border ml-5" :src="item.avatar" alt="" />
        <view
          v-if="item.userName.length > 0"
          class="ml-10 w-60 text-18 text-[#87b66e] text-ellipsis"
          >{{ item.userName }}</view
        >
        <view class="flex-1 text-18 text-[#87b66e] text-ellipsis">{{ item.content }}</view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { UIBarrageModel } from "@/model";
import type { PropType } from "vue";
const emits = defineEmits(["tapLampAction"]);
defineProps({
  list: {
    type: Array as PropType<UIBarrageModel[]>,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped></style>
