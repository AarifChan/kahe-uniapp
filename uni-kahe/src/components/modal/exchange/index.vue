<template>
  <tn-popup
    v-model="vShow"
    open-direction="bottom"
    @close="emits('update:show', false)"
  >
    <view
      class="mt-8 relative px-16 w-715 box-border flex flex-col items-center justify-between h-711 bg-[#f3f6fe] rounded-6"
    >
      <image
        class="absolute right-38 top-0 w-114 h-54"
        src="/static/kahe-202510/images/close.png"
        @tap.stop="emits('update:show', false)"
      />
      <view class="mt-24 ml-24 w-full flex">
        <image class="w-178 h-178" :src="goods.image" />
        <view class="ml-28 flex flex-col justify-center">
          <text
            class="text-40 font-normal text-black w-400 theme-font text-flow-ellipsis-multiple"
            >{{ goods.title }}</text
          >
          <view class="mt-36 flex flex-row items-center">
            <text class="text-26 font-normal text-[#1a385b]">需支付</text>
            <text
              class="text-40 font-normal text-[#4b71ff] leading-36 theme-font"
              >{{ goods.price }}</text
            >
            <text class="text-26 font-normal text-[#1a385b]"
              >{{ isTicket ? "无门槛抵扣券" : "点券" }}
            </text>
          </view>
        </view>
      </view>
      <view style="flex: 1"></view>
      <view
        class="box-border w-full flex flex-row items-center justify-between bg-white shadow-[0_0_6rpx_0_#d4dee9] rounded-6 py-10 px-18"
        style="transform: translateY(-50rpx); height: calc(150rpx - 20rpx)"
      >
        <view class="flex flex-col">
          <text class="text-26 font-normal text-black">商品兑换声明</text>
          <text
            class="text-18 font-normal w-360 text-black text-flow-ellipsis-multiple"
            >注：商品兑换，需消耗相应{{
              isTicket ? "无门槛抵扣券" : "点券"
            }}，一经兑换无法撤回</text
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
      <agreement
        v-model:checked="agree"
        style="transform: translateY(-30rpx)"
        @did-tap-protocol="didTapProtocol"
      />
      <view
        class="relative w-270 h-65 flex items-center justify-center"
        style="margin-bottom: 20rpx"
        @tap.stop="didTapConfirm"
      >
        <image
          class="w-full h-full absolute left-0 top-0"
          src="/static/kahe-202510/images/reward-btn1.png"
        />
        <text
          class="relative text-30 text-white theme-font text-stroke-main"
          >确定兑换</text
        >
      </view>
    </view>
  </tn-popup>
  <common-modal
    v-model:show="modalShow"
    :title="modalTitle"
    :content="modalContent"
  />
</template>

<script lang="ts" setup>
import type { UIProductPayModel } from "@/model";
import { type PropType, ref, watch } from "vue";
import CommonModal from "@/components/modal/index.vue";
import Agreement from "@/components/agreement/index.vue";
import { useModal } from "@/composables/modal";
import { ShowToast } from "@/utils";
const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  goods: {
    default: {} as UIProductPayModel,
    type: Object as PropType<UIProductPayModel>,
  },
  isCollect: {
    default: false,
    type: Boolean,
  },
  isTicket: {
    default: false,
    type: Boolean,
  },
});
const vShow = ref(false);
watch(
  () => props.show,
  (value) => {
    vShow.value = value;
  }
);
const agree = ref(false);
const emits = defineEmits(["update:show", "didTapSmash"]);
const didTapProtocol = () => {
  modalShow.value = true;
  showModalType(1);
};

const didTapConfirm = () => {
  if (!agree.value) {
    ShowToast("请阅读并允许协议");
    return;
  }
  emits("didTapSmash", props.goods.id);
};
</script>

<style lang="scss" scoped></style>
