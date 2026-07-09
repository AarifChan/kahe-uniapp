<template>
  <view class="relative w-full aspect-ratio-[788/379]">
    <image class="w-full aspect-ratio-[788/379]" src="/static/kahe-202510/ka-he/machine/top-bg.png" />
    <image
      v-if="types"
      class="absolute left-1/2 -top-20 -translate-x-1/2 h-360 w-340"
      src="/static/kahe-202510/images/infinite-girl.gif"
    />
    <image v-else class="absolute left-1/2 -top-20 -translate-x-1/2 h-360 w-340" src="/static/kahe-202510/images/card-girl.gif" />
    <view class="absolute top-181 left-40 w-436 h-104">
      <image class="w-full h-full" src="/static/kahe-202510/ka-he/machine/card-item-bg.png" />
      <view class="absolute left-6 top-0 font-normal text-18 text-black">vip客服-可可</view>
      <view v-if="types" class="absolute left-32 top-36 mr-8 text-20 text-white">
        主人，请选择心仪的抽卡机，海量卡牌任您挑选。
      </view>
      <view v-else class="absolute left-32 top-36 mr-8 text-20 text-white">
        主人，请选择心仪的抽卡机，海量卡牌任您挑选。
      </view>
    </view>
    <view class="absolute top-142 right-48 w-242 h-154 flex justify-center overflow-hidden">
      <Barrage :list="goods" />
    </view>
  </view>
</template>
<script setup lang="ts">
import Barrage from "@/components/barrage/index.vue";
import type { UIBarrageModel } from "@/model";
import type { PropType } from "vue";
defineProps({
  goods: {
    type: Array as PropType<UIBarrageModel[]>,
    default: () => [],
  },
  types: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" scoped></style>
