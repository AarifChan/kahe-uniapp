<template>
  <view
    class="general-top relative flex justify-center items-center"
    :style="{ margin: '0 auto 18rpx auto', width: '738rpx', height: '311rpx' }"
  >
    <image
      class="general-top-img absolute w-full h-full top-0 left-0"
      src="/static/kahe-202510/ka-he/product/product-top.png"
    />
    <view
      class="general-top-btn absolute right-16 top-28 flex flex-row items-center gap-16"
    >
      <view
        class="style1 text-28 text-center py-4 px-6 rounded-10 mr-16 text-[#237927] theme-font"
        @tap.stop="tapShowModel(0)"
        >发货须知</view
      >
      <view
        class="style2 text-28 text-center py-4 px-6 rounded-10 mr-16 text-[#85733a] theme-font"
        @tap.stop="tapShowModel(1)"
        >购买说明</view
      >
      <view
        class="general-top-btn-item style3 text-28 text-center py-4 px-6 rounded-10 mr-16 text-[#237927] theme-font"
        @tap.stop="tapShowModel(2)"
        >品相定义</view
      >
    </view>
    <view
      class="general-top-content absolute top-104 left-32 flex flex-row items-center h-175"
      :style="{ width: 'calc(100% - 64rpx)' }"
    >
      <image
        class="general-top-content-img aspect-square w-175 h-175"
        :src="product.image"
      />
      <view class="general-top-content-info relative flex flex-col ml-26 mt-22">
        <view
          class="general-top-content-info-title font-400 text-30 text-black theme-font"
          >{{ product.title }}</view
        >
        <view class="flex flex-row items-baseline mt-25">
          <text
            class="general-top-content-info-tag font-normal text-30 text-black"
            v-if="product.payType !== 8"
            >￥</text
          >
          <view
            class="general-top-content-info-center font-normal text-50 text-black theme-font"
            >{{ product.price }}</view
          >
          <text
            class="general-top-content-info-tag font-normal text-30 text-black"
            v-if="product.payType === 8"
            >积分</text
          >
        </view>
        <view class="flex flex-row items-center gap-16">
          <view
            class="general-top-content-info-num text-20 text-black"
            v-if="choose"
            >商品余量:{{ product.num }}/{{ product.total }}
          </view>
          <view
            class="general-top-content-info-people relative w-299 h-16 bg-[#c2beb0] rounded-8 overflow-hidden"
            :style="{ width: choose ? '268rpx' : '299rpx' }"
          >
            <view
              class="general-top-content-info-people-bg absolute left-0 top-0 max-w-full h-full bg-[#ff6161] rounded-8"
              :style="widthStyle"
            />
          </view>
        </view>
      </view>
    </view>
    <view
      class="general-top-reload absolute right-54 bottom-42 w-140 h-50 bg-[#5ad7af] shadow-[0_4rpx_0_0_#43a17f] rounded-20 flex flex-row items-center justify-center gap-13"
      @tap.stop="emits('didTapChange')"
      v-if="!choose"
    >
      <image
        class="general-top-reload-icon w-36 h-38"
        src="/static/kahe-202510/ka-he/product/reload-icon.png"
      />
      <text
        class="general-top-reload-text font-400 text-24 text-white theme-font"
        >换一套</text
      >
    </view>
    <image
      class="absolute left-0 top-0 ml-59 w-115 h-63"
      src="/static/kaju/common/logo.png"
    />
  </view>
</template>
<script setup lang="ts">
import type { UIProductDetailModel } from "@/model";
import { type PropType, computed } from "vue";

const emits = defineEmits(["tapShowModel", "didTapReload", "didTapChange"]);
const props = defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
  choose: {
    default: false,
    type: Boolean,
  },
});
const widthStyle = computed(() => {
  return `width:${(props.product.num / props.product.total) * 100}%`;
});
const tapShowModel = (value: number) => {
  emits("tapShowModel", value);
};
</script>
<style lang="scss" scoped></style>
