<template>
  <view class="relative w-full flex flex-row items-center justify-center">
    <image class="w-704 h-208" src="/static/kaju/mine/my-order.png" />
    <view
      class="absolute left-0 top-60 w-full flex justify-around items-center px-80 pt-20"
    >
      <view
        class="flex flex-col items-center"
        v-for="(item, index) in ordersList"
        :key="index"
        @tap.stop="clickOrdersTap(index)"
      >
        <image class="w-60 h-60" :src="item.image" />
        <text class="mt-10 text-24 text-black font-normal">{{
          item.name
        }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const emits = defineEmits(["clickOrdersTap"]);
const ordersList = ref([
  {
    image: "/static/kaju/mine/order1.png",
    name: "待处理",
  },
  {
    image: "/static/kaju/mine/order2.png",
    name: "已发货",
  },
  {
    image: "/static/kaju/mine/order3.png",
    name: "购买明细",
  },
]);
const clickOrdersTap = (index: number) => {
  emits("clickOrdersTap", index);
};
</script>
