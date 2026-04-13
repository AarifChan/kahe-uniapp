<script setup lang="ts">
import { PropType } from "vue";
import { ChallengeDetail } from "@/subPackages/challenge/api";
defineProps({
  detail: {
    default: {} as ChallengeDetail,
    type: Object as PropType<ChallengeDetail>,
  },
});
const emits = defineEmits(["didTap"]);

const challengeBottomBtnBgStyle = {
  backgroundImage:
    "url(https://jms.85gui7.com/kahe-202510/challenge/bottom-bg.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
</script>

<template>
  <view class="fixed bottom-0 left-0 right-0 p-24 safe-bottom shadow-lg">
    <view class="flex items-center justify-center" @tap.stop="emits('didTap')">
      <view
        class="flex items-center w-294 h-66 line-height-66"
        :style="challengeBottomBtnBgStyle"
      >
        <!--        <view class="w-120 py-20">-->
        <!--        -->
        <!--        </view>-->
        <text
          class="w-110 text-26rpx font-bold text-[#8B4513] font-other text-center"
          >{{ detail?.box.price }}</text
        >
        <text
          class="text-26rpx w-184 font-bold text-[#912E26] font-other text-center"
          >购票参与</text
        >
        <!--        <view class="w-120 py-20">-->
        <!--        -->
        <!--        </view>-->
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
