<template>
  <view class="bottom px-82 relative w-full flex justify-between items-center box-border">
    <view
      class="bottom-btn flex flex-col items-center"
      v-for="item in BtnIcon"
      :key="item"
      @tap.stop="tapAward(item)"
    >
      <view class="btn_icon w-242 h-85 bg-[url(/static/kahe-202510/shine/blue.png)] bg-[length:100%_100%] bg-no-repeat flex justify-center items-center">
        <text class="theme-font text-36 font-normal text-black leading-48">{{ item === "award" ? "领取奖券" : "本期记录" }}</text>
      </view>
      <view class="day text-26 font-normal text-black" :style="{ textShadow: '-2rpx -2rpx 0 #ffffff, 2rpx -2rpx 0 #ffffff, -2rpx 2rpx 0 #ffffff, 2rpx 2rpx 0 #ffffff' }">
        {{
          item === "award"
            ? `今日全服剩${(info?.dailyLimit ?? 0) - (info?.todayReceived ?? 0)}张待领取`
            : `已参与${info?.usedNum ?? 0}/${info?.openThreshold ?? 0}`
        }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ShingingInfo } from "@/subPackages/xingyao/api";

enum BtnIcon {
  award = "award",
  record = "record",
}
defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
});
const emit = defineEmits<{
  (e: "tapAward", value: string): void;
}>();
const tapAward = (item: string) => {
  emit("tapAward", item);
};
</script>

<style lang="scss" scoped>
.day {
  font-family: SimHei;
}
</style>
