<template>
  <tn-popup
    v-model="vShow"
    open-direction="bottom"
    @close="emits('update:show', false)"
  >
    <view class="mallPay">
      <image
        class="mallPay-close"
        src="https://jms.85gui7.com/kahe-202510/images/close.png"
        @tap.stop="emits('update:show', false)"
      />
      <view class="mallPay-top">
        <image class="mallPay-top-img" :src="goods.image" />
        <view class="mallPay-top-info">
          <text
            class="mallPay-top-info-name theme-font text-flow-ellipsis-multiple"
            >{{ goods.title }}</text
          >
          <view class="mallPay-top-info-sub">
            <text class="mallPay-top-info-sub-title">需支付</text>
            <text class="mallPay-top-info-sub-value theme-font">{{
              goods.price
            }}</text>
            <text class="mallPay-top-info-sub-title">点券</text>
          </view>
        </view>
      </view>
      <view style="flex: 1"></view>
      <view class="mallPay-forbidden" style="transform: translateY(-50rpx)">
        <view class="mallPay-forbidden-side">
          <text class="mallPay-forbidden-side-title">商品兑换声明</text>
          <text
            class="mallPay-forbidden-side-subTitle text-flow-ellipsis-multiple"
            >注：商品兑换，需消耗相应余额，一经兑换无法撤回</text
          >
          <text class="mallPay-forbidden-side-danger"
            >未成年人请在监护人陪同下操作</text
          >
        </view>
        <image
          class="mallPay-forbidden-img"
          src="https://jms.85gui7.com/kahe/product/18age.png"
        />
      </view>
      <agreement
        v-model:checked="agree"
        style="transform: translateY(-30rpx)"
        @did-tap-protocol="didTapProtocol"
      />
      <view
        class="mallPay-button"
        style="margin-bottom: 20rpx"
        @tap.stop="didTapConfirm"
      >
        <image
          class="mallPay-button-img"
          src="https://jms.85gui7.com/kahe-202510/images/reward-btn1.png"
        />
        <text class="mallPay-button-title theme-font text-stroke-main"
          >确定兑换</text
        >
      </view>
    </view>
  </tn-popup>
  <common-modal
    v-model:show="modalShow"
    :title="modalTitle"
    :content="modalContent"
  />
</template>

<script lang="ts" setup>
import type { UIProductPayModel } from "@/model";
import { type PropType, ref, watch } from "vue";
import CommonModal from "@/components/modal/index.vue";
import Agreement from "@/components/agreement/index.vue";
import { useModal } from "@/composables/modal";
import { ShowToast } from "@/utils";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  goods: {
    default: {} as UIProductPayModel,
    type: Object as PropType<UIProductPayModel>,
  },
  isCollect: {
    default: false,
    type: Boolean,
  },
});
const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);
const agree = ref(false);
const emits = defineEmits(["update:show", "didTapSmash"]);
const didTapProtocol = () => {
  modalShow.value = true;
  showModalType(1);
};

const didTapConfirm = () => {
  if (!agree.value) {
    ShowToast("请阅读并允许协议");
    return;
  }
  emits("didTapSmash", props.goods.id);
};
</script>

<style lang="scss" scoped>
.mallPay {
  margin-top: 8rpx;
  position: relative;
  padding: 0 16rpx;
  width: 715rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 711rpx;
  background: #f3f6fe;
  border-radius: 6rpx;
  &-close {
    position: absolute;
    right: 38rpx;
    top: 0;
    width: 114rpx;
    height: 54rpx;
  }
  &-forbidden {
    box-sizing: border-box;
    width: 100%;
    height: calc(150rpx - 20rpx);
    background: #ffffff;
    box-shadow: 0rpx 0rpx 6rpx 0rpx #d4dee9;
    border-radius: 6rpx;
    padding: 10rpx 18rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &-side {
      display: flex;
      flex-direction: column;
      &-title {
        font-size: 26rpx;
        font-weight: 400;
        color: #000000;
      }
      &-subTitle {
        font-size: 18rpx;
        font-weight: 400;
        width: 360rpx;
        color: #000000;
      }
      &-danger {
        font-size: 22rpx;
        font-weight: 400;
        color: #ba0000;
      }
    }
    &-img {
      width: 120rpx;
      height: 130rpx;
    }
  }
  &-top {
    margin-top: 24rpx;
    width: 100%;
    display: flex;
    margin-left: 24rpx;
    &-img {
      width: 178rpx;
      height: 178rpx;
    }
    &-info {
      margin-left: 28rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-name {
        font-size: 40rpx;
        font-weight: 400;
        color: #000000;
        width: 400rpx;
      }
      &-sub {
        margin-top: 36rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        &-title {
          font-size: 26rpx;
          font-weight: 400;
          color: #1a385b;
        }
        &-value {
          font-size: 40rpx;
          font-weight: 400;
          color: #4b71ff;
          line-height: 36rpx;
        }
      }
    }
  }
  &-button {
    position: relative;
    width: 270rpx;
    height: 65rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    &-img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    &-title {
      position: relative;
      font-size: 30rpx;
      color: #ffffff;
    }
  }
}
</style>
