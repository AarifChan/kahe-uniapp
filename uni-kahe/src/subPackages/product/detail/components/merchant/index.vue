<template>
  <view class="merchantCard">
    <view class="left">
      <view class="avatar">
        <image class="avatar-img" :src="product.merchant?.icon" />
      </view>
      <view class="info">
        <view class="info-name">{{ product.merchant?.name }}</view>
        <view class="info-tips" v-if="product.type === 4"
          >【满开福袋，售罄后揭晓结果】</view
        ><view v-else>本次福袋支付后立即显示结果</view>
      </view>
    </view>
    <view
      class="right-btn theme-font"
      @tap.stop="didClickMerchant(product.merchant)"
      >进店看看</view
    >
  </view>
</template>

<script setup lang="ts">
import type { UIProductDetailModel } from "@/model";
import { PropType } from "vue";
import { useMerchant } from "@/pages/merchant/index";
const { didClickMerchant } = useMerchant();
defineProps({
  product: {
    default: {} as UIProductDetailModel,
    type: Object as PropType<UIProductDetailModel>,
  },
});
</script>

<style scoped lang="scss">
.merchantCard {
  margin: 32rpx;
  position: relative;
  width: calc(100% - 64rpx);
  padding: 16rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fffbef;
  box-shadow: 0rpx 3rpx 7rpx 0rpx #d9be86;
  border-radius: 10rpx;
}
.left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar {
  width: 131rpx;
  height: 131rpx;
  background: #ffffff;
  box-shadow: 0rpx 3rpx 7rpx 0rpx #d4d4d4;
  border-radius: 50%;
  padding: 8rpx;
  &-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.info {
  margin-left: 12rpx;
  display: flex;
  flex-direction: column;
  &-name {
    font-weight: 400;
    font-size: 30rpx;
    color: #000000;
  }
  &-tips {
    margin-top: 24rpx;
    font-weight: 400;
    font-size: 24rpx;
    color: #4e4e4e;
  }
}
.right-btn {
  width: 146rpx;
  height: 56rpx;
  background: #53d6ac;
  box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f;
  border-radius: 8rpx;
  text-align: center;
  line-height: 56rpx;
  font-weight: 400;
  font-size: 30rpx;
  color: #ffffff;
}
</style>
