<template>
  <view class="relative">
    <scroll-view
      class="relative w-full whitespace-nowrap"
      :enable-flex="true"
      :scroll-x="true"
      scroll-with-animation
    >
      <view class="flex flex-row whitespace-nowrap py-32 px-16 pt-32 pb-16">
        <!-- shrink-0 禁止压缩：w-full + 默认 flex-shrink 会把 tab 项挤压到内容宽度，导致间距失效 -->
        <view
          class="inline-block relative w-140 h-52 shrink-0 mr-0 last:mr-0"
          v-for="(item, index) in list"
          :key="index"
          @tap.stop="clickItem(index)"
        >
          <image
            v-if="current === index"
            src="/static/kaju/common/select-tab.png"
            class="absolute left-0 top-0 w-140 h-52 z-0"
          />
          <!-- flex 布局放在 view 上：iOS 小程序中 text 组件设置 display:flex 会导致文字不绘制；
               translateZ(0) 强制文字层独立合成，修复 iOS 真机上被 image 合成层盖住的问题 -->
          <view
            class="absolute left-0 top-0 w-140 h-52 flex items-center justify-center z-1"
            style="transform: translateZ(0)"
          >
            <text
              class="alibaba-font font-normal text-24 text-white text-outline-2 text-outline-[#151714]"
              >{{ item.title }}</text
            >
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
