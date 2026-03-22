<template>
  <view v-if="show" class="loginModal">
    <view class="login">
      <image class="login-bg" src="https://jms.85gui7.com/kahe-202510/login/login-bg.png" />
      <view class="login-content">
        <view class="login-content-title" />
        <image
          class="login-content-title"
          src="https://jms.85gui7.com/kahe-202510/login/login-title1.png"
        />
        <login-item
          v-for="(item, index) in items"
          :key="index + 'item'"
          :item="item"
        />
        // #ifdef MP-WEIXIN
        <view
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          "
        >
          <custom-button
            style="margin-top: 20px"
            :buttonType="2"
            @tap.stop="emits('update:show', false)"
          >
          </custom-button>
          <custom-button
            style="margin-top: 20px"
            :buttonType="1"
            @did-get-phone-params="handleGetPhoneParams"
          >
          </custom-button>
        </view>

        // #endif // #ifdef H5 || APP-PLUS
        <custom-button
          style="margin-top: 20px"
          @tap.stop="handleLogin"
          :buttonType="0"
        >
          <image
            class="login-content-title-img"
            src="https://jms.85gui7.com/kahe-202510/login/login-btn-title.png"
          />
        </custom-button>
        // #endif
      </view>
      <image
        class="login-close"
        src="https://jms.85gui7.com/kahe-202510/login/close.png"
        @tap.stop="emits('update:show', false)"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import CustomButton from "./components/button.vue";
import LoginItem from "./components/items.vue";
import type { LoginParams } from "./types";
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
});

const vShow = ref(props.show);
// console.log('vvvvShow:', vShow.value)
// onMounted(() => {
//
// })
watch(
  () => props.show,
  (value) => {
    console.log("loginVShow:", value);
    vShow.value = value;
  }
);

const code = ref(undefined as string | undefined);

const emits = defineEmits(["update:show", "didTapLogin"]);

const handleGetPhoneParams = (params: {
  iv: string;
  encryptedData: string;
  code: string;
}) => {
  emits("didTapLogin", {
    ...params,
    code: code.value,
  } as LoginParams);
};
const handleLogin = async () => {
  emits("didTapLogin", {
    code: code.value,
  });
};
const items = ref([
  {
    title: "进群见面礼",
    subTitle: "¥20.00元优惠券",
    icon: "https://jms.85gui7.com/kahe-202510/login/login-item1.png",
  },
  {
    title: "卡票免费领",
    subTitle: "可换心仪卡牌",
    icon: "https://jms.85gui7.com/kahe-202510/login/login-item2.png",
  },
  {
    title: "各品类福袋",
    subTitle: "总有喜欢的",
    icon: "https://jms.85gui7.com/kahe-202510/login/login-item3.png",
  },
  {
    title: "卡牌可集换",
    subTitle: "收藏党福音",
    icon: "https://jms.85gui7.com/kahe-202510/login/login-item4.png",
  },
]);
</script>

<style lang="scss" scoped>
.loginModal {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  &-bg {
    width: 750rpx;
    height: 1144rpx;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 260rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-title {
      width: 373rpx;
      height: 69rpx;
      margin-bottom: 20rpx;
      &-img {
        position: absolute;

        width: 137rpx;
        height: 34rpx;
      }
    }
  }
  &-close {
    width: 54rpx;
    height: 54rpx;
  }
}
</style>
