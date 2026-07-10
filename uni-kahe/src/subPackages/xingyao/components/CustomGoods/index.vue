<template>
  <view class="user-card relative w-full box-border border-2 border-[#972424] py-40 px-20 rounded-12 bg-white mb-15">
    <!--    <view class="num absolute top-8 right-13 SimHei-font text-24 font-normal text-black" v-if="type === 2">#{{ item.id }}</view>-->
    <view class="item w-full flex items-center relative box-border">
      <view class="user-info flex items-center flex-1 min-w-0">
        <image class="avatar w-60 h-60 rounded-full mr-20 flex-shrink-0" :src="item.user?.avatar" mode="aspectFill" />
        <text class="username text-28 text-black truncate">{{ item.user?.nickname }}</text>
      </view>
      <view class="user-time flex-1 text-center text-26 text-[#666666]">
        <view class="date SimHei-font text-24 font-normal text-black" v-if="type === 3">第{{ item.aid }}期</view>
        <text>{{
          item.createTime ? dayjs(item.createTime).format("MM-DD HH:mm:ss") : ""
        }}</text>
      </view>
    </view>
    <template v-if="type === 3">
      <view class="line my-20 w-full h-2 bg-[#dfa5a5]"></view>
      <view class="bottom flex items-center justify-between">
        <view class="bottom-right flex items-center">
          <image class="goods w-43 h-59 mr-23" :src="item.goodsDto?.image" mode="aspectFill" />
          <text>{{ item.goodsDto?.name }}</text>
        </view>
        <view class="left"></view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { inject, PropType, ref } from "vue";
import type { ShingingLog } from "@/subPackages/xingyao/api";
import dayjs from "dayjs";
defineProps({
  item: {
    default: {} as ShingingLog,
    type: Object as PropType<ShingingLog>,
  },
  type: {
    default: 2,
    type: Number,
  },
});
</script>

<style scoped lang="scss">
</style>
