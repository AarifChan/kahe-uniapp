<template>
  <view class="item">
    <view
      class="item-list"
      v-for="(item, index) in itemList"
      :key="`item-${index}`"
    >
      <view class="box">
        <image src="https://jms.85gui7.com/kahe-202510/shine/item.png" mode="scaleToFill" class="box-bg" />
        <view class="box-text">{{ item.text }}</view>
        <view class="box-text">{{ item.content }}</view>
      </view>
      <image
        class="arrow"
        v-if="index !== 2"
        mode="scaleToFill"
        src="https://jms.85gui7.com/kahe-202510/shine/arrow.png"
      ></image>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { ShingingInfo } from "@/subPackages/xingyao/api";
defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
});
interface ItemIcon {
  text: string;
  content: string;
}
const itemList = ref<ItemIcon[]>([
  { text: "领取", content: "奖券" },
  { text: "提交", content: "券码" },
  { text: "满人", content: "开奖" },
]);
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-list {
    position: relative;
    display: flex;
    align-items: center;

    .box {
      position: relative;
      width: 103rpx;
      height: 103rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &-bg {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      &-text {
        position: relative;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 26rpx;
        color: #000000;
      }
    }
  }

  .arrow {
    width: 66rpx;
    height: 53rpx;
    margin: 0 22rpx;
  }
}
</style>
