<template>
  <view class="activityTab relative w-full flex flex-row items-center justify-evenly">
    <view
      class="activityTab-item relative w-231 h-77"
      v-for="(item, index) in tabList"
      :key="'id' + index"
      :id="'id' + index"
      @tap.stop="didClick(index)"
    >
      <image
        class="activityTab-item-img w-full h-full"
        :src="
          index === current
            ? '/static/kahe-202510/ka-he/welfare/btn-selected.png'
            : '/static/kahe-202510/ka-he/welfare/btn-normal.png'
        "
      />
      <text
        class="activityTab-item-title theme-font absolute left-0 bottom-20 w-full text-center font-normal text-30 text-white"
        :style="{ textShadow: '-1px -1px 0 #bc6953, 1px -1px 0 #bc6953, -1px 1px 0 #bc6953, 1px 1px 0 #bc6953' }"
      >{{ item.title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
export interface TabItem {
  title: string;
  value: number;
}
const props = defineProps({
  current: {
    default: 0,
    type: Number,
  },
  tabList: {
    default: [],
    type: Array as PropType<TabItem[]>,
  },
});

const current = ref(0);
const didClick = (index: number) => {
  current.value = index;
  emits("update:current", index);
  emits("didClick", index);
};

const emits = defineEmits(["update:current", "didClick"]);
</script>

<style lang="scss" scoped>
</style>
