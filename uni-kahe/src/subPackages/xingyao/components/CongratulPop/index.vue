<script setup lang="ts">
import TnPopup from "@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue";
import TnForm from "@tuniao/tnui-vue3-uniapp/components/form/src/form.vue";
import TnFormItem from "@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue";
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue";
import type { TnFormInstance } from "@tuniao/tnui-vue3-uniapp";
import { onMounted, onUnmounted, PropType, reactive, ref } from "vue";
import { ShingingInfo } from "@/subPackages/xingyao/api";
import { eventBus } from "@/utils/event";
import { AddressModel } from "@/model";
import { ShowToast } from "@/utils";
const modelValue = defineModel<boolean>();
const choose = ref(false);
const tapChoose = () => {
  choose.value = !choose.value;
};
defineProps({
  info: {
    default: {},
    type: Object as PropType<ShingingInfo>,
  },
});
const selectAddress = ref<AddressModel>({
  phone: "",
  address: "",
  name: "",
});

const formRef = ref<TnFormInstance>();

const navToSelectAddress = () => {
  uni.navigateTo({
    url: `/subPackages/mine/address/index?needSelect=${true}`,
  });
};
const emits = defineEmits(["protocol", "confirm"]);
onMounted(() => {
  eventBus.on("didSelectAddress", (addressItem: AddressModel) => {
    console.log("didSelectAddress:", addressItem);
    selectAddress.value = addressItem;
    selectAddress.value.name = addressItem.realName;
    selectAddress.value.address =
      addressItem.province +
      addressItem.city +
      addressItem.district +
      addressItem.detail;
  });
});
const handleRecieve = () => {
  if (!choose.value) {
    ShowToast("阅读并同意《用户使用协议》");
    return;
  }
  if (
    selectAddress.value.name?.length === 0 ||
    selectAddress.value.phone.length === 0 ||
    selectAddress.value.address?.length === 0
  ) {
    ShowToast("请填写完整的收货地址");
    return;
  }
  emits("confirm", selectAddress.value);
};
onUnmounted(() => {
  eventBus.off("didSelectAddress");
});
// 表单数据
const formData = reactive({
  recipient: "",
  contact: "",
  address: "",
});
</script>

<template>
  <TnPopup
    v-model="modelValue"
    width="100%"
    bg-color="transparent"
    :custom-style="{ overflow: 'visible' }"
  >
    <view class="content py-64 w-screen">
      <view class="pop w-full py-85 px-75 relative h-916 box-border flex flex-col overflow-visible">
        <view class="pop-topIcon absolute -top-45 left-1/2 -translate-x-1/2 w-605 h-100">
          <image
            src="/static/kahe-202510/shine/top-icon.png"
            class="icon_bg relative w-full h-full"
          />
          <text class="icon_title absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-45 text-white font-normal" :style="{ top: '35%', textShadow: '-3rpx -3rpx 0 #ff3333, 3rpx -3rpx 0 #ff3333, -3rpx 3rpx 0 #ff3333, 3rpx 3rpx 0 #ff3333' }">恭喜获得</text>
        </view>
        <image
          src="/static/kahe-202510/shine/pop-bg.png"
          mode="scaleToFill"
          class="pop-bg absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ width: 'calc(100% - 50rpx)', zIndex: -1 }"
        />
        <view class="pop-title text-center font-normal text-26 text-black leading-22 mb-33"
          >今日消费满{{ info?.minScore }}元，即可领取参与码!</view
        >
        <view class="pop-content pt-25 pr-17 pb-17 pl-32 box-border h-503 bg-[rgba(255,255,255,0.5)] rounded-10" :style="{ border: '2px solid #972424' }">
          <view class="top flex justify-between">
            <text class="font-normal text-26 text-black leading-30">选择收货信息</text>
            <image
              src="/static/kahe-202510/shine/right-icon.png"
              mode="scaleToFill"
              class="top-img w-17 h-30"
              @tap.stop="navToSelectAddress"
            />
          </view>
          <TnForm ref="formRef" :model="formData" style="margin: 58rpx 0">
            <TnFormItem label="收件人:">
              <TnInput v-model="selectAddress.name" />
            </TnFormItem>
            <TnFormItem label="联系方式:">
              <TnInput v-model="selectAddress.phone" />
            </TnFormItem>
            <TnFormItem label="收货地址:">
              <TnInput v-model="selectAddress.address" textarea />
            </TnFormItem>
          </TnForm>
          <view class="card-tip text-center font-normal text-26 text-black leading-72" :style="{ fontFamily: 'Adobe Heiti Std' }">参与码为实体卡片，需填写收货信息。</view>
        </view>
        <view class="pop-button mt-35 mx-auto" @click="handleRecieve">
          <view class="btn flex items-center justify-center w-187 h-63 bg-[url(/static/kahe-202510/shine/yellow.png)] bg-[length:100%_100%] bg-no-repeat"> 确定领取 </view>
        </view>
        <view class="pop-bottom mt-44 flex items-center justify-center">
          <view class="rectangle relative w-36 h-36" @tap.stop="tapChoose">
            <image
              src="/static/kahe-202510/shine/normal.png"
              mode="scaleToFill"
              class="select-icon absolute w-full h-full inset-0"
            />
            <image
              src="/static/kahe-202510/shine/selected.png"
              mode="scaleToFill"
              class="icon absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              v-if="choose"
            />
          </view>
          <text @click="emits('protocol')" class="font-normal text-26 text-black leading-72" :style="{ fontFamily: 'Adobe Heiti Std' }">已阅读并同意《用户使用协议》</text>
        </view>
      </view>
    </view>
  </TnPopup>
</template>

<style lang="scss" scoped>
</style>
