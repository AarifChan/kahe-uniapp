<template>
  <view>
    <button class="custom-btn relative w-199 h-114 p-0 m-0 bg-transparent border-none" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="buttonType === 1"
    >
      <image class="custom-btn-bg w-full h-full" src="/static/kahe-202510/login/btn1.png" /> <!-- 缺失图片: btn1.png -->
      <!--      <view class="custom-btn-title theme-font">{{ title }}</view>-->
      <!--      <view class="custom-btn-other">-->
      <!--        <slot />-->
      <!--      </view>-->
    </button>
    <view class="custom-btn relative w-199 h-114" v-else>
      <image class="custom-btn-bg w-full h-full" src="/static/kahe-202510/login/btn2.png" /> <!-- 缺失图片: btn2.png -->
      <!--            <view class="custom-btn-title theme-font">{{ title }}</view>-->
      <!--      <view class="custom-btn-other">-->
      <!--        <slot />-->
      <!--      </view>-->
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ShowToast } from "@/utils";

enum LoginButtonType {
  normal = 0,
  phone = 1,
}

defineProps({
  title: {
    type: String,
    default: "",
  },
  buttonType: {
    default: 0,
    type: Number,
  },
});

const emits = defineEmits(["didGetPhoneParams"]);

const getPhoneNumber = (e: {
  detail: { encryptedData: string; iv: string; code: string; errMsg?: string };
}) => {
  const detail = e.detail;
  console.log("detail", detail);
  if (!detail.encryptedData || !detail.iv) {
    ShowToast("登录失败");
    return;
  }
  const params = {
    code: detail.code,
    encryptedData: detail.encryptedData,
    iv: detail.iv,
  };
  emits("didGetPhoneParams", params);
};
</script>

<style lang="scss" scoped></style>
