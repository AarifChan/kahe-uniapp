<template>
  <view class="banner">
    <!-- <Lamp
      ref="lampRef"
      backGround="rgba(128, 128, 128, 0.6)"
      :border="0"
      :list="lampList"
      @tapLampAction="tapLampAction"
    /> -->
    <swiper
      class="banner-swiper"
      circular
      :indicator-dots="false"
      :autoplay="true"
      @change="onChange"
    >
      <swiper-item
        v-for="(item, index) in list"
        :key="index"
        class="banner-swiper-item"
        @tap.stop="emits('tapBannerAction', item)"
      >
        <image class="banner-swiper-item-img" :src="item.image" />
      </swiper-item>
    </swiper>
    <!-- 自定义指示器 -->
    <view class="banner-indicator">
      <image
        v-for="(item, index) in list"
        :key="index"
        class="indicator-dot"
        :src="
          current === index
            ? 'https://jms.85gui7.com/kahe-202510/ka-he/home/indicator-active.png'
            : 'https://jms.85gui7.com/kahe-202510/ka-he/home/indicator-normal.png'
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
//         lampRef.value?.play(props.lampList, 3);
//     }
// );
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 316rpx;

  /* 指示器样式 */
  &-indicator {
    position: absolute;
    bottom: 20rpx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12rpx;

    .indicator-dot {
      width: 20rpx;
      height: 20rpx;
    }
  }

  &-swiper {
    position: relative;
    width: 100%;
    height: 100%;

    &-item {
      width: 100%;
      height: 100%;

      &-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
