<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="relative w-[720rpx] h-[734rpx] box-border">
      <!-- 背景图 -->
      <image
        class="w-full h-full"
        src="https://jms.85gui7.com/kahe-202510/ka-he/common/smash-bg.png"
        mode="aspectFill"
      />

      <!-- 内容区域 -->
      <view
        class="absolute left-[30rpx] top-0 w-[calc(100%-60rpx)] h-full flex flex-col"
      >
        <!-- 顶部统计 -->
        <view class="mt-[98rpx] flex flex-row items-center justify-start">
          <text class="text-[32rpx] font-400 text-black">退货</text>
          <text class="text-[32rpx] font-400 text-[#4b71ff] ml-[8rpx]">{{
            total
          }}</text>
          <text class="text-[32rpx] font-400 text-black ml-[8rpx]"
            >件商品，预计获得</text
          >
          <text class="text-[32rpx] font-400 text-[#4b71ff] ml-[8rpx]">{{
            totalPrice.toFixed(2)
          }}</text>
          <text class="text-[32rpx] font-400 text-black ml-[8rpx]">点券</text>
        </view>

        <!-- 商品列表 -->
        <scroll-view
          class="mt-[18rpx] w-full h-[260rpx] relative"
          :enable-flex="true"
          :scroll-y="true"
          scroll-with-animation
        >
          <view class="grid grid-cols-3 gap-[24rpx]">
            <view
              v-for="(item, index) in recycleGoods"
              :key="'recycleGoods' + index"
              class="w-full flex flex-row items-center"
            >
              <text
                class="text-[24rpx] w-full font-400 text-[#4b71ff] ml-[8rpx]"
                >{{ item.name }}X{{ item.num }}</text
              >
            </view>
          </view>
        </scroll-view>

        <!-- 声明区域 -->
        <view
          class="box-border w-full bg-white rounded-[6rpx] px-[18rpx] py-[24rpx] flex flex-row items-center justify-between mt-auto mb-[180rpx]"
          style="box-shadow: 0rpx 0rpx 5rpx 0rpx #d4dee9"
        >
          <view class="flex flex-col">
            <text class="text-[26rpx] font-400 text-black">赏品退货声明</text>
            <text class="text-[18rpx] font-400 text-black w-[360rpx] mt-[4rpx]"
              >注：退货不可逆转。</text
            >
            <text class="text-[22rpx] font-400 text-[#ba0000] mt-[4rpx]"
              >未成年人请在监护人陪同下操作</text
            >
          </view>
          <image
            class="w-[120rpx] h-[130rpx]"
            src="https://jms.85gui7.com/kahe/product/18age.png"
            mode="aspectFit"
          />
        </view>

        <!-- 协议和按钮 -->
        <view
          class="absolute bottom-[60rpx] left-0 w-full flex flex-col items-center"
        >
          <agreement v-model:checked="agree" />
          <view
            class="w-[146rpx] h-[56rpx] leading-[56rpx] text-center mt-[28rpx] bg-[#53d6ac] text-white text-[36rpx] rounded-[8rpx] font-theme"
            style="box-shadow: 0rpx 4rpx 0rpx 0rpx #43a17f"
            @tap.stop="didTapConfirm"
          >
            确 定
          </view>
        </view>
      </view>

      <!-- 关闭按钮 -->
      <image
        class="absolute right-0 top-0 w-[74rpx] h-[74rpx]"
        src="https://jms.85gui7.com/kahe-202510/ka-he/common/close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import Agreement from "@/components/agreement/index.vue";
import type { SubmitGoodsModel } from "@/model";
import { type PropType, computed, ref, watch } from "vue";
import { ShowToast } from "@/utils";
import { getLevelImage } from "@/subPackages/challenge";

const props = defineProps({
  show: {
    default: true,
    type: Boolean,
  },
  recycleGoods: {
    default: [] as SubmitGoodsModel[],
    type: Array as PropType<SubmitGoodsModel[]>,
  },
});

const vShow = ref(false);

watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);

const didTapConfirm = () => {
  if (!agree.value) {
    ShowToast("请阅读并允许协议");
    return;
  }
  emits("didTapSmash");
};

const agree = ref(false);

const total = computed(() => {
  let total = 0;
  props.recycleGoods.forEach((item) => {
    total += item.num;
  });
  return total;
});

const totalPrice = computed(() => {
  let price = 0;
  props.recycleGoods.forEach((item) => {
    price += item.price * item.num;
  });
  return price;
});

const emits = defineEmits(["update:show", "didTapSmash"]);
</script>

<style scoped></style>
