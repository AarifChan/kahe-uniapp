<template>
  <view>
    <button
      class="custom-btn"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
      v-if="buttonType === 1"
    >
      <image class="custom-btn-bg" src="https://jms.85gui7.com/kahe-202510/login/btn1.png" />
      <!--      <view class="custom-btn-title theme-font">{{ title }}</view>-->
      <!--      <view class="custom-btn-other">-->
      <!--        <slot />-->
      <!--      </view>-->
    </button>
    <view class="custom-btn" v-else>
      <image class="custom-btn-bg" src="https://jms.85gui7.com/kahe-202510/login/btn2.png" />
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

<style lang="scss" scoped>
.custom-btn {
  position: relative;
  width: 199rpx;
  height: 114rpx;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-other {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60rpx;
    text-align: center;
    height: 60rpx;
    font-size: 18px;
    color: white;
  }
}
.custom-btn,
.custom-btn::after {
  padding: 0;
  margin: 0;
  background-color: transparent;
}
</style>
