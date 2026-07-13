<template>
  <scroll-view
    class="relative w-full whitespace-nowrap mx-16"
    :enable-flex="true"
    :scroll-x="true"
    scroll-with-animation
  >
    <image
      v-for="(item, index) in list"
      :key="index"
      @tap.stop="clickItem(index)"
      class="w-183 h-72 mr-8"
      :src="index === current ? item.selectIcon : item.icon"
    />
  </scroll-view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface ItemType {
  title: string;
  value: number;
  icon: string;
  selectIcon: string;
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
