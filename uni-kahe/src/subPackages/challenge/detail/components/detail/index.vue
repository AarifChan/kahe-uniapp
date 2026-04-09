<!--<template>-->
<!--  <tn-popup-->
<!--    v-model="vShow"-->
<!--    open-direction="center"-->
<!--    bg-color="transparent"-->
<!--    @close="emits('update:show', false)"-->
<!--  >-->
<!--    <view class="relative w-634 h-850">-->
<!--      <image-->
<!--        class="w-634 h-850"-->
<!--        src="https://jms.85gui7.com/kahe-202510/common/detail-bg.png"-->
<!--      />-->
<!--      <view class="absolute left-0 top-0 w-full h-full flex-col items-center">-->
<!--        <view class="mt-200 w-400 h-400 flex-center">-->
<!--          <image-->
<!--            class="w-full h-383"-->
<!--            :src="item.goodsDto?.image"-->
<!--            mode="heightFix"-->
<!--          />-->
<!--        </view>-->
<!--        <view class="mt-60 w-full flex-col items-center">-->
<!--          <text class="font-normal text-50 text-black text-center theme-font">{{-->
<!--            item.goodsDto.name-->
<!--          }}</text>-->

<!--          <view class="gap-16 w-full flex justify-center items-center">-->
<!--            <view class="flex items-center">-->
<!--              <text class="font-normal text-30 text-black leading-30 font-theme"-->
<!--                >参考价：</text-->
<!--              >-->
<!--              <text-->
<!--                class="font-normal text-30 leading-30 text-black font-price"-->
<!--                >{{ item?.goodsDto.price }}</text-->
<!--              >-->
<!--            </view>-->
<!--            <view class="flex items-center">-->
<!--              <text class="font-normal text-30 text-black leading-30 font-theme"-->
<!--                >入库编码：</text-->
<!--              >-->
<!--              <text class="font-normal text-30 leading-30 text-black font-price"-->
<!--                >KH{{ item?.price }}</text-->
<!--              >-->
<!--            </view>-->
<!--          </view>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->
<!--  </tn-popup>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { type PropType, ref, watch } from "vue";-->
<!--import { ChallengeGoodsItem } from "@/subPackages/challenge/api";-->

<!--const props = defineProps({-->
<!--  show: {-->
<!--    default: false,-->
<!--    type: Boolean,-->
<!--  },-->
<!--  item: {-->
<!--    default: {} as ChallengeGoodsItem,-->
<!--    type: Object as PropType<ChallengeGoodsItem>,-->
<!--  },-->
<!--});-->
<!--const vShow = ref(false);-->
<!--watch(-->
<!--  () => props.show,-->
<!--  (value) => {-->
<!--    vShow.value = value;-->
<!--  }-->
<!--);-->

<!--const emits = defineEmits(["update:show"]);-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--// 保留 theme-font 和 price-font 的字体定义-->
<!--// 其他样式已迁移到 UnoCSS-->
<!--</style>-->
