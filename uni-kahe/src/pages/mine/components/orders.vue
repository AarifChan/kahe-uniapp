<template>
  <view class="orders">
    <view class="orders-min_orders">
      <image
        class="orders-min_orders-bg"
        src="https://jms.85gui7.com/kahe-202510/ka-he/mine/flowerBg.png"
      />
      <text class="orders-min_orders-title other-font">我的订单</text>
    </view>
    <view class="orders-ordersList">
      <view
        class="orders-ordersList-list"
        v-for="(item, index) in ordersList"
        :key="index"
        @tap.stop="clickOrdersTap(index)"
      >
        <image class="orders-ordersList-list-img" :src="item.image" />
        <text class="orders-ordersList-list-text">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const emits = defineEmits(["clickOrdersTap"]);
const ordersList = ref([
  {
    image: "https://jms.85gui7.com/kahe-202510/mine/row-item1.png",
    name: "待处理",
  },
  {
    image: "https://jms.85gui7.com/kahe-202510/mine/row-item2.png",
    name: "已发货",
  },
  // {
  //   image: "https://jms.85gui7.com/kahe-202510/mine/row-item3.png",
  //   name: "宝箱",
  // },
  {
    image: "https://jms.85gui7.com/kahe-202510/mine/row-item3.png",
    name: "购买明细",
  },
]);
const clickOrdersTap = (index: number) => {
  emits("clickOrdersTap", index);
};
</script>

<style lang="scss" scoped>
.orders {
  box-sizing: border-box;
  position: relative;
  border-radius: 30rpx;
  margin: 50rpx 32rpx 50rpx 32rpx;
  padding: 18rpx 0 25rpx 0;
  background: #ffffff;
  box-shadow: 4rpx 4rpx 5rpx 0 rgba(0, 0, 0, 0.13);
  border: 2px solid #cda374;

  &-min_orders {
    position: absolute;
    left: -30rpx;
    top: -20rpx;
    width: 316rpx;
    height: 73rpx;

    &-bg {
      width: 100%;
      height: 100%;
    }

    &-title {
      position: absolute;
      left: 40%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-weight: 400;
      font-size: 30rpx;
      color: #fbffaf;
      @include text-stroke(3rpx, #ff7b57);
    }
  }

  &-ordersList {
    margin-top: 60rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &-list {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-img {
        height: 65rpx;
        width: 65rpx;
      }

      &-text {
        margin-top: 10rpx;
        font-weight: normal;
        font-size: 24rpx;
        color: #000000;
      }
    }
  }
}
</style>
