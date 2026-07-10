<template>
  <view class="all relative flex mt-20 overflow-x-scroll box-border" :style="{ width: 'calc(100% - 50rpx)', padding: '0 25rpx 8rpx 25rpx' }">
    <view
      class="all-tabItem w-110 h-56 mr-8 text-center leading-56 bg-[#e8ad82] rounded-18 flex-shrink-0"
      v-for="(item, index) in sortList"
      :key="index"
      @tap.stop="sortTabAction(item)"
      :class="sortIndex === item.value ? 'active bg-[#ac5a3e]' : ''"
    >
      <text
        class="all-tabItem-text font-400 text-white"
        :class="sortIndex === item.value ? 'textColor' : ''"
        :style="{ opacity: sortIndex === item.value ? 1 : 0.45, fontSize: '13px' }"
        >{{ getNormalLevelNameByLevel(item.value) }}</text
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEnum } from "@/composables/enum";

const { getNormalLevelNameByLevel } = useEnum();
defineProps({
  sortList: {
    type: Array as any,
    default: [],
  },
});
const sortIndex = ref(-1);
const emits = defineEmits(["sortTabAction"]);
const sortTabAction = (i: any) => {
  sortIndex.value = i.value;
  emits("sortTabAction", i);
};
</script>

<style lang="scss" scoped>
</style>
