<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="modal-detail relative w-634rpx h-850rpx">
      <image
        class="modal-detail-bg w-634rpx h-850rpx"
        src="/static/kahe-202510/common/detail-bg.png"
      />
      <view class="modal-detail-content absolute left-0 top-0 w-full h-full flex flex-col items-center">
        <view class="modal-detail-content-center mt-200rpx w-400rpx h-400rpx flex flex-col items-center justify-center">
          <image
            v-if="item.image"
            class="modal-detail-content-center-img w-full h-383rpx"
            :src="item?.image"
            mode="heightFix"
          />
          <image
            v-else
            class="modal-detail-content-center-img w-full h-383rpx"
            :src="item?.goods?.image"
            mode="heightFix"
          />
        </view>
        <view class="modal-detail-content-info mt-60rpx w-full flex flex-col items-center">
          <text
            class="modal-detail-content-info-title text-50rpx text-black text-center font-normal theme-font"
            v-if="item?.title"
            >{{ item.title }}</text
          >
          <text class="modal-detail-content-info-title text-50rpx text-black text-center font-normal theme-font" v-else>{{
            item?.goods?.name
          }}</text>
          <view class="modal-detail-content-info-row gap-16rpx w-full flex flex-row justify-center items-center">
            <view class="modal-detail-content-info-row-item flex flex-row items-center">
              <text
                class="modal-detail-content-info-row-item-title text-30rpx text-black line-height-30rpx font-normal theme-font"
                v-if="item?.salePrice"
                >参考价：</text
              >
              <text
                class="modal-detail-content-info-row-item-value text-30rpx text-black line-height-30rpx font-normal price-font"
                v-if="item?.salePrice"
                >{{ item?.salePrice }}</text
              >
              <text class="modal-detail-content-info-row-item-value text-30rpx text-black line-height-30rpx font-normal" v-else>{{
                item?.goods?.salePrice
              }}</text>
            </view>
            <view class="modal-detail-content-info-row-item flex flex-row items-center">
              <text
                class="modal-detail-content-info-row-item-title text-30rpx text-black line-height-30rpx font-normal theme-font"
                v-if="item?.salePrice"
                >入库编码：</text
              >
              <text
                class="modal-detail-content-info-row-item-value text-30rpx text-black line-height-30rpx font-normal price-font"
                v-if="item?.salePrice"
                >KH{{ item?.price }}</text
              >
              <text
                class="modal-detail-content-info-row-item-value text-30rpx text-black line-height-30rpx font-normal price-font"
                v-else
                >KH{{ item?.goods?.price }}</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import type { UserGoodsModel } from "@/model";
import { type PropType, ref, watch } from "vue";

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  item: {
    default: {} as UserGoodsModel,
    type: Object as PropType<UserGoodsModel>,
  },
});
const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const emits = defineEmits(["update:show"]);
</script>

<style lang="scss" scoped>
</style>
