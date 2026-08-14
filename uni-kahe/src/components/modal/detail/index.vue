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
          <view class="modal-detail-content-info-range mt-20 w-full flex flex-col items-center px-30 box-border">
            <text class="font-normal text-30 leading-30 text-black theme-font"
              >商品价值范围：¥{{ rangeMin }} – ¥{{ rangeMax }}</text
            >
            <text class="font-normal text-22 leading-30 text-[#909090] text-center mt-10"
              >依据：本套系稀卡/工艺品/藏卡厂端发行定值，不含二级市场价格</text
            >
          </view>
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import type { UserGoodsModel } from "@/model";
import { type PropType, computed, ref, watch } from "vue";

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  item: {
    default: {} as UserGoodsModel,
    type: Object as PropType<UserGoodsModel>,
  },
  // 套系参与价，用于计算商品价值范围；未传时回退到商品售价
  joinPrice: {
    default: 0,
    type: Number,
  },
});
// 价值范围基数 a：优先取套系参与价
const rangeBase = computed(
  () => props.joinPrice || props.item?.salePrice || props.item?.goods?.salePrice || 0
);
const rangeMin = computed(() => parseFloat(rangeBase.value.toFixed(2)));
const rangeMax = computed(() => parseFloat((rangeBase.value * 1.5).toFixed(2)));
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
