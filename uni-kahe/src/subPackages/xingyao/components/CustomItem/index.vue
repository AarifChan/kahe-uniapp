<template>
  <view class="item relative w-full flex justify-center items-center">
    <view
      class="item-list relative flex items-center"
      v-for="(item, index) in itemList"
      :key="`item-${index}`"
    >
      <view class="box relative w-103 h-103 flex items-center justify-center flex-col">
        <image src="/static/kahe-202510/shine/item.png" mode="scaleToFill" class="box-bg absolute w-full h-full" />
        <view class="box-text relative theme-font text-26 font-normal text-black">{{ item.text }}</view>
        <view class="box-text relative theme-font text-26 font-normal text-black">{{ item.content }}</view>
      </view>
      <image
        class="arrow w-66 h-53 mx-22"
        v-if="index !== 2"
        mode="scaleToFill"
        src="/static/kahe-202510/shine/arrow.png"
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
</style>
