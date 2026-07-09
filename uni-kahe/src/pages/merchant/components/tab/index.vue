<template>
  <view class="relative w-full">
    <view
      class="relative flex flex-row w-full items-center justify-center gap-60"
    >
      <view
        class="relative w-170 h-110"
        v-for="(item, index) in tabList"
        :key="index"
        @tap.stop="clickItem(index)"
      >
        <image
          class="relative w-full h-full"
          :src="current === index ? item.selectIcon : item.normalIcon"
        />
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

const tabList = [
  {
    value: 1,
    title: "卡牌",
    normalIcon: "/static/kaju/merchant/tab-item4.png",
    selectIcon: "/static/kaju/merchant/tab-item1.png",
  },
  {
    value: 2,
    title: "潮玩",
    normalIcon: "/static/kaju/merchant/tab-item5.png",
    selectIcon: "/static/kaju/merchant/tab-item2.png",
  },
  {
    value: 3,
    title: "谷子",
    normalIcon: "/static/kaju/merchant/tab-item6.png",
    selectIcon: "/static/kaju/merchant/tab-item3.png",
  },
];

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
