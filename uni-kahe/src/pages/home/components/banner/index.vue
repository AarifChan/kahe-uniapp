<template>
  <view class="banner relative w-full h-316">
    <!-- <Lamp
      ref="lampRef"
      backGround="rgba(128, 128, 128, 0.6)"
      :border="0"
      :list="lampList"
      @tapLampAction="tapLampAction"
    /> -->
    <swiper
      class="banner-swiper relative w-full h-full"
      circular
      :indicator-dots="false"
      :autoplay="true"
      @change="onChange"
    >
      <swiper-item
        v-for="(item, index) in list"
        :key="index"
        class="w-full h-full"
        @tap.stop="emits('tapBannerAction', item)"
      >
        <image class="w-full h-full" :src="item.image" />
      </swiper-item>
    </swiper>
    <!-- 自定义指示器 -->
    <view class="banner-indicator absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-12">
      <image
        v-for="(item, index) in list"
        :key="index"
        class="indicator-dot w-20 h-20"
        :src="
          current === index
            ? '/static/kahe-202510/ka-he/home/indicator-active.png'
            : '/static/kahe-202510/ka-he/home/indicator-normal.png'
        "
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
// 指示器图片

// import Lamp from "@/components/lamp/index.vue";
import type { UIBannerModel, UIBarrageModel } from "@/model";
import { ref, onMounted, watch } from "vue";
import type { PropType } from "vue";
const emits = defineEmits(["tapLampAction", "tapBannerAction"]);
// 当前页
const current = ref(0);
const tapLampAction = (item: any) => {
  emits("tapLampAction", item);
};
const props = defineProps({
  list: {
    type: Array as PropType<UIBannerModel[]>,
    default: () => [],
  },
  lampList: {
    type: Array as PropType<UIBarrageModel[]>,
    default: () => [],
  },
});
const onChange = (e: any) => {
  current.value = e.detail.current;
};
// const lampRef = ref();
// watch(
//     () => props.lampList,
//     () => {
//         lampRef.value?.settle(props.lampList, 3);
//     }
// );
</script>

<style lang="scss" scoped></style>
