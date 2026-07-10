<template>
  <view class="relative mx-32">
    <view class="relative flex flex-row items-center justify-between">
      <view
        class="relative flex flex-col items-center justify-center"
        v-for="(item, index) in list"
        :key="index"
        @tap.stop="clickItem(index)"
      >
        <image class="w-93 h-93" :src="item.icon" />
        <view class="w-93 text-center mt-12 text-20 text-[#763a1c] text-ellipsis">{{
          item.title
        }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface ItemType {
  title: string;
  value: number;
  icon: string;
}

defineProps({
  current: {
    default: 0,
    type: Number,
  },
  list: {
    default: [] as ItemType[],
    type: Array as PropType<ItemType[]>,
  },
  search: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(["update:current", "didClick"]);

const clickItem = (index: number) => {
  emits("update:current", index);
  emits("didClick", index);
};
</script>

<style lang="scss" scoped></style>
