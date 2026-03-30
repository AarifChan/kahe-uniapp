<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view
      class="relative w-598rpx h-910rpx"
      style="
        background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/result.png&quot;);
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
      "
    >
      <view class="pt-200rpx px-36 flex flex-col relative">
        <text class="text-outline text-24rpx tn-text-center"
          >你不小心被顽皮雷弹击晕，只能带走参与赏品!</text
        >
        <view class="w-full h-480"></view>
        <view class="w-full p-64 flex flex-row justify-center justify-between">
          <view
            class="w-160 h-60 font-other font-bold text-center color-[#445D3C] font-24"
            style="
              background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/btn-style2.png&quot;);
              background-size: 100% 100%;
              background-position: center;
              background-repeat: no-repeat;
              line-height: 60rpx;
            "
            >再次挑战</view
          >
          <view
            class="w-160 h-60 font-other font-bold text-center color-[#5C3729] font-24"
            style="
              background-image: url(&quot;https://jms.85gui7.com/kahe-202510/challenge/btn-style1.png&quot;);
              background-size: 100% 100%;
              background-position: center;
              background-repeat: no-repeat;
              line-height: 60rpx;
            "
            >退货</view
          >
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
});
const vShow = ref(props.show);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const emits = defineEmits(["update:show"]);
</script>

<style lang="scss" scoped></style>
