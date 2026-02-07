<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="modal-detail">
      <image
        class="modal-detail-bg"
        src="https://jms.85gui7.com/kahe-202510/common/detail-bg.png"
      />
      <view class="modal-detail-content">
        <view class="modal-detail-content-center">
          <image
            v-if="item.image"
            class="modal-detail-content-center-img"
            :src="item?.image"
            mode="heightFix"
          />
          <image
            v-else
            class="modal-detail-content-center-img"
            :src="item?.goods?.image"
            mode="heightFix"
          />
        </view>
        <view class="modal-detail-content-info">
          <text
            class="modal-detail-content-info-title theme-font"
            v-if="item?.title"
            >{{ item.title }}</text
          >
          <text class="modal-detail-content-info-title theme-font" v-else>{{
            item?.goods?.name
          }}</text>
          <view class="modal-detail-content-info-row">
            <view class="modal-detail-content-info-row-item">
              <text
                class="modal-detail-content-info-row-item-title theme-font"
                v-if="item?.salePrice"
                >参考价：</text
              >
              <text
                class="modal-detail-content-info-row-item-value price-font"
                v-if="item?.salePrice"
                >{{ item?.salePrice }}</text
              >
              <text class="modal-detail-content-info-row-item-value" v-else>{{
                item?.goods?.salePrice
              }}</text>
            </view>
            <view class="modal-detail-content-info-row-item">
              <text
                class="modal-detail-content-info-row-item-title theme-font"
                v-if="item?.salePrice"
                >入库编码：</text
              >
              <text
                class="modal-detail-content-info-row-item-value price-font"
                v-if="item?.salePrice"
                >KH{{ item?.price }}</text
              >
              <text
                class="modal-detail-content-info-row-item-value price-font"
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
.modal-detail {
  position: relative;
  width: 634rpx;
  height: 850rpx;
  &-bg {
    width: 634rpx;
    height: 850rpx;
  }

  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-center {
      margin-top: 200rpx;
      width: 400rpx;
      height: 400rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-img {
        width: 100%;
        height: 383rpx;
      }
    }
    &-info {
      margin-top: 60rpx;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-title {
        font-weight: 400;
        font-size: 50rpx;
        color: #000000;
        text-align: center;
      }
      &-row {
        gap: 16rpx;
        //width: 300rpx;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        &-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          &-title {
            font-weight: 400;
            font-size: 30rpx;
            color: #000000;
            line-height: 30rpx;
          }
          &-value {
            font-weight: 400;
            font-size: 30rpx;
            line-height: 30rpx;
            color: #000000;
          }
        }
      }
    }
  }
}
</style>
