<template>
  <view class="bottom">
    <view
      class="bottom-btn"
      v-for="item in BtnIcon"
      :key="item"
      @tap.stop="tapAward(item)"
    >
      <view class="btn_icon">
        <text>{{ item === "award" ? "领取奖券" : "本期记录" }}</text>
      </view>
      <view class="day">
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
.bottom {
  padding: 0 82rpx;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  &-btn {
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn_icon {
      width: 242rpx;
      height: 85rpx;
      background-image: url("https://jms.85gui7.com/kahe-202510/shine/blue.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;

      text {
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 36rpx;
        color: #000000;
        line-height: 48rpx;
      }
    }

    .day {
      font-family: SimHei;
      font-weight: 400;
      font-size: 26rpx;
      color: #000000;
      @include text-stroke(2rpx, #ffffff);
    }
  }
}
</style>
