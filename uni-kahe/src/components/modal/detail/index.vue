<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="modal-detail relative w-634 h-850">
      <image
        class="modal-detail-bg w-634 h-850"
        src="/static/kahe-202510/common/detail-bg.png"
      />
      <view class="modal-detail-content absolute left-0 top-0 w-full h-full flex flex-col items-center">
        <view class="modal-detail-content-center mt-200 w-400 h-400 flex flex-col items-center justify-center">
          <image
            v-if="item.image"
            class="modal-detail-content-center-img w-full h-383"
            :src="item?.image"
            mode="heightFix"
          />
          <image
            v-else
            class="modal-detail-content-center-img w-full h-383"
            :src="item?.goods?.image"
            mode="heightFix"
          />
        </view>
        <view class="modal-detail-content-info mt-60 w-full flex flex-col items-center">
          <text
            class="modal-detail-content-info-title font-normal text-50 text-black text-center theme-font"
            v-if="item?.title"
            >{{ item.title }}</text
          >
          <text class="modal-detail-content-info-title font-normal text-50 text-black text-center theme-font" v-else>{{
            item?.goods?.name
          }}</text>
          <view class="modal-detail-content-info-row gap-16 w-full flex flex-row justify-center items-center">
            <view class="modal-detail-content-info-row-item flex flex-row items-center">
              <text
                class="modal-detail-content-info-row-item-title font-normal text-30 text-black leading-30 theme-font"
                v-if="item?.salePrice"
                >参考价：</text
              >
              <text
                class="modal-detail-content-info-row-item-value font-normal text-30 leading-30 text-black price-font"
                v-if="item?.salePrice"
                >{{ item?.salePrice }}</text
              >
              <text class="modal-detail-content-info-row-item-value font-normal text-30 leading-30 text-black" v-else>{{
                item?.goods?.salePrice
              }}</text>
            </view>
            <view class="modal-detail-content-info-row-item flex flex-row items-center">
              <text
                class="modal-detail-content-info-row-item-title font-normal text-30 text-black leading-30 theme-font"
                v-if="item?.salePrice"
                >入库编码：</text
              >
              <text
                class="modal-detail-content-info-row-item-value font-normal text-30 leading-30 text-black price-font"
                v-if="item?.salePrice"
                >KH{{ item?.price }}</text
              >
              <text
                class="modal-detail-content-info-row-item-value font-normal text-30 leading-30 text-black price-font"
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

<style lang="scss" scoped></style>
