<template>
  <view class="relative w-full">
    <view class="relative flex flex-row gap-16 h-62 items-center">
      <view
        class="relative h-full pb-10"
        v-for="(item, index) in list"
        :key="index"
        @tap.stop="clickItem(index)"
      >
        <view
          class="flex justify-center items-center h-full px-20 font-normal text-32 text-black theme-font"
          v-if="current !== index"
          >{{ item.title }}</view
        >
        <view
          class="relative flex justify-center items-center h-full w-115"
          v-else
        >
          <view class="text-40 text-white theme-font text-stroke-2-[#151714]">{{
            item.title
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface ItemType {
  title: string;
  value: number;
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
