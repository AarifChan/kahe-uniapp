<template>
  <view class="homeTab relative">
    <scroll-view class="homeTab-list relative w-full whitespace-nowrap" :enable-flex="true" :scroll-x="true" scroll-with-animation
    >
      <view class="homeTab-content flex flex-row w-full whitespace-nowrap py-32 px-16 pt-32 pb-16">
        <view
          class="homeTab-list-item inline-block relative mr-0 w-140 h-52"
          v-for="(item, index) in list"
          :key="index"
          @tap.stop="clickItem(index)"
        >
          <view class="homeTab-list-item inline-block relative mr-0 w-140 h-52">
            <image
              v-if="current === index"
              src="/static/kaju/common/select-tab.png"
              class="tab-indicator absolute left-0 top-0 w-140 h-52"
            />
            <text class="tab-text alibaba-font absolute left-0 top-0 font-normal text-24 text-white leading-52 w-140 h-52 flex flex-col items-center text-outline-2 text-outline-[#151714]">{{ item.title }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
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
