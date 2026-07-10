<template>
  <tn-popup
    v-model="vShow"
    open-direction="center"
    bg-color="transparent"
    @close="emits('update:show', false)"
  >
    <view class="relative w-720 h-734 box-border">
      <image
        class="relative w-full h-full"
        src="/static/kahe-202510/ka-he/common/smash-bg.png"
      />
      <view
        class="absolute left-30 top-0 w-[calc(100%-60rpx)] h-full flex flex-col"
      >
        <view class="mt-98 flex flex-row items-center justify-start">
          <text class="text-32 font-normal text-black">退货</text>
          <text class="text-32 font-normal text-[#4b71ff]">{{ total }}</text>
          <text class="text-32 font-normal text-black">件商品，预计获得</text>
          <text class="text-32 font-normal text-[#4b71ff]">{{
            totalPrice.toFixed(2)
          }}</text>
          <text class="text-32 font-normal text-black">无门槛券</text>
        </view>
        <scroll-view
          class="mt-18 relative w-full h-260"
          :enable-flex="true"
          :scroll-y="true"
          scroll-with-animation
        >
          <view
            class="w-full flex flex-row items-center"
            style="display: grid; grid-template-columns: repeat(auto-fill, minmax(30%, 1fr)); gap: 24rpx;"
          >
            <view
              class="w-full flex flex-row items-center"
              v-for="(item, index) in recycleGoods"
              :key="'recycleGoods' + index"
            >
              <image
                class="w-80 h-80"
                mode="heightFix"
                :src="getLevelImageByLevel(item.level)"
              />
              <text class="text-38 font-normal text-[#4b71ff]"
              >
                X{{ item.num }}</text
              >
            </view>
          </view>
        </scroll-view>
        <view
          class="box-border w-full h-[calc(150rpx-20rpx)] bg-white shadow-[0_0_5rpx_0_#d4dee9] rounded-6 py-24 px-18 flex flex-row items-center justify-between"
        >
          <view class="flex flex-col">
            <text class="text-26 font-normal text-black">赏品退货声明</text>
            <text
              class="text-18 font-normal w-360 text-black text-ellipsis-2"
              >注：退货不可逆转。</text
            >
            <text class="text-22 font-normal text-[#ba0000]"
              >未成年人请在监护人陪同下操作</text
            >
          </view>
          <image
            class="w-120 h-130"
            src="/static/kahe/product/18age.png"
          />
        </view>
        <view
          style="
            margin-top: 8px;
            height: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
        >
          <agreement v-model:checked="agree" />
          <view
            class="w-146 h-56 leading-56 text-center mt-28 bg-[#53d6ac] shadow-[0_4rpx_0_0_#43a17f] rounded-8 mb-64 text-36 text-white theme-font"
            @tap.stop="didTapConfirm"
          >
            确 定
          </view>
        </view>
      </view>

      <image
        class="absolute right-0 top-0 w-74 h-74"
        src="/static/kahe-202510/ka-he/common/close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </tn-popup>
</template>

<script lang="ts" setup>
import Agreement from "@/components/agreement/index.vue";
import CustomButton from "@/components/custom/button/index.vue";
import type { SubmitGoodsModel } from "@/model";
import { type PropType, computed, ref, watch } from "vue";
import { ShowToast } from "@/utils";
import { useEnum } from "@/composables/enum";
const { getLevelImageByLevel } = useEnum();
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

<style lang="scss" scoped></style>
