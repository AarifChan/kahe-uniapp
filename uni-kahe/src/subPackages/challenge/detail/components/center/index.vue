<script setup lang="ts">
import { PropType } from "vue";
import { ChallengeDetail } from "@/subPackages/challenge/api";
defineProps({
  detail: {
    default: {} as ChallengeDetail,
    type: Object as PropType<ChallengeDetail>,
  },
});
</script>

<template>
  <view
    class="mx-auto mt-24 relative w-702rpx h-123rpx"
    style="
      background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/usage-bg.png&quot;);
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <view class="relative flex items-center p-24 ml-120rpx">
      <view class="flex-1">
        <text class="text-20 font-bold text-[#000] block">
          本场共<text class="color-[#FF0000]"
            >{{ detail?.box.gate + detail?.box.trap }}枚精灵球</text
          >，有<text class="color-[#FF0000]"
            >{{ detail?.box.trap }}枚是顽皮雷弹</text
          >冒充！！
        </text>
        <text class="text-20 text-[#000] block">
          开启精灵球出现
          <image
            class="w-52 h-31"
            src="https://jms.85gui7.com/kahe-202510/challenge/pika-item.png"
            mode="aspectFit"
          />
          则可继续或领取赏退出。
        </text>
        <text class="text-20 text-[#000] block">
          若出现霹雳电球则直接结束获得参与赏。
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
