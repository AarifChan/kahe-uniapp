<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view
      class="relative w-600 h-700 flex flex-col items-center"
      :style="detailPopupBgStyle"
    >
      <!-- 背景 -->
      <!--      <image-->
      <!--        class="absolute w-[600rpx] h-[700rpx]"-->
      <!--        src="https://jms.85gui7.com/kahe-202510/challenge/goods-detail-bg.png"-->
      <!--        mode="aspectFill"-->
      <!--      />-->

      <!-- 内容 -->
      <view
        class="relative w-full h-full flex flex-col items-center pt-[60rpx] px-[40rpx]"
      >
        <!-- 等级标签 -->

        <!-- 关闭按钮 -->
        <image
          class="absolute top-[20rpx] right-[20rpx] w-[60rpx] h-[60rpx]"
          src="https://jms.85gui7.com/kahe-202510/ka-he/common/close.png"
          @tap.stop="emits('update:show', false)"
        />

        <!-- 商品图片 -->
        <view
          class="w-[300rpx] h-[300rpx] mt-[40rpx] relative rounded-[16rpx] flex items-center justify-center"
        >
          <image
            class="w-[260rpx] h-[260rpx]"
            :src="goods?.goodsDto?.image"
            mode="aspectFit"
          />
          <image
            class="absolute top-0 left-0 w-80 h-56"
            :src="getLevelImage(level)"
            mode="aspectFit"
          />
        </view>

        <!-- 品质标签 -->
        <view
          class="mt-[20rpx] px-[24rpx] py-[8rpx] text-[24rpx] text-[#222]"
          :style="qualityTagBgStyle"
        >
          {{ getTitleByQuality(goods.goodsDto.quality) }}
        </view>

        <!-- 商品名称 -->
        <text
          class="mt-[16rpx] text-[32rpx] font-bold text-[#333] text-center"
          >{{ goods?.goodsDto?.name }}</text
        >

        <!-- 参考价 -->
        <view class="flex flex-row justify-around w-full mt-32">
          <text class="text-[26rpx] text-[#000000] font-theme">
            参考价 ：{{ goods?.goodsDto?.salePrice }}</text
          >
          <text class="text-[26rpx] text-[#000000] font-theme"
            >入库编码： KH{{ goods?.goodsDto?.price }}</text
          >
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import type { ChallengeGoodsItem } from "@/subPackages/challenge/api";
import type { PropType } from "vue";
import { ref, watch } from "vue";
import { getLevelImage } from "@/subPackages/challenge";
import { getTitleByQuality } from "@/utils";

const detailPopupBgStyle = {
  backgroundImage:
    "url(https://jms.85gui7.com/kahe-202510/common/detail-bg.png)",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const qualityTagBgStyle = {
  backgroundImage:
    "url(https://jms.85gui7.com/kahe-202510/ka-he/common/num_bg.png)",
  backgroundSize: "100% 100%",
};

const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  goods: {
    default: null as ChallengeGoodsItem | null,
    type: Object as PropType<ChallengeGoodsItem | null>,
  },
  level: {
    default: 0,
    type: Number,
  },
});

const vShow = ref(false);

watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const emits = defineEmits(["update:show"]);
</script>

<style scoped></style>
