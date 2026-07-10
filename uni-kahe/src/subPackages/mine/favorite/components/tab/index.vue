<template>
  <view class="favoriteTab relative p-32">
    <view class="favoriteTab-list relative flex flex-row items-center justify-start">
      <view
        class="favoriteTab-list-item relative h-50 mr-43"
        v-for="(item, index) in list"
        :key="index"
        @tap.stop="clickItem(index)"
      >
        <view class="favoriteTab-list-item-content relative w-full">
          <!-- <view
            class="favoriteTab-list-item-content-select theme-font"
          /> -->
          <image
            src="/static/kahe-202510/ka-he/home/round.png"
            class="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 object-cover"
            v-if="current === index"
          />
          <text
            class="favoriteTab-list-item-content-title theme-font leading-50 h-full font-normal text-30 text-center text-[#8a8a8a]"
            :class="
              current === index
                ? 'favoriteTab-list-item-content-title-select'
                : ''
            "
            :style="current === index ? { color: '#fd9d08', '-webkit-text-stroke': '2rpx #000000' } : {}"
            >{{ item.title }}</text
          >
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

<style lang="scss" scoped>
</style>
