<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="relative w-598rpx h-910rpx" :style="resultPopupBgStyle">
      <view class="pt-200rpx px-36 flex flex-col relative">
        <text class="text-outline text-24rpx tn-text-center">{{
          currentSign?.status === 3
            ? "你不小心被顽皮雷弹击晕，只能带走参与赏品!"
            : "恭喜您成功撤退!顺利带走了以下赏品!"
        }}</text>
        <view
          class="mt-64 w-full h-420 flex flex-col items-center justify-center"
        >
          <view class="relative w-170 h-236"
            ><image
              class="w-170 h-236"
              :src="currentSign?.goods?.goodsDto?.image"
              mode="aspectFit"
            />
            <image
              class="absolute top-0 left-[-20rpx] w-71 h-50 z-10"
              :src="getLevelImage(currentSign?.gate)"
              mode="aspectFit"
            />
          </view>

          <text class="text-26 text-[#4D4643]">{{
            currentSign?.goods?.goodsDto?.name
          }}</text>
        </view>
        <view class="w-full p-64 flex flex-row justify-center justify-between">
          <view
            class="w-160 h-60 font-other font-bold text-center color-[#445D3C] font-24"
            :style="resultBtnAgainStyle"
            @tap.stop="emits('again')"
            >再次挑战</view
          >
          <view
            class="w-160 h-60 font-other font-bold text-center color-[#5C3729] font-24"
            :style="resultBtnShipmentStyle"
            @tap.stop="emits('shipment')"
            >退货</view
          >
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from "vue";
import { ChallengeOrderGate } from "@/subPackages/challenge/api";
import { getLevelImage } from "@/subPackages/challenge";

const resultPopupBgStyle = {
  backgroundImage: "url(/static/kahe-202510/challenge/result.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const resultBtnAgainStyle = {
  backgroundImage:
    "url(/static/kahe-202510/challenge/btn-style2.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  lineHeight: "60rpx",
};

const resultBtnShipmentStyle = {
  backgroundImage:
    "url(/static/kahe-202510/challenge/btn-style1.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  lineHeight: "60rpx",
};

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  currentSign: {
    default: null,
    type: Object as PropType<ChallengeOrderGate | null>,
  },
});
const vShow = ref(props.show);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const emits = defineEmits(["update:show", "again", "shipment"]);
</script>

<style lang="scss" scoped></style>
