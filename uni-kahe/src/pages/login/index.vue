<template>
  <view class="pageLogin">
    <image
      class="pageLogin-bg"
      src="https://jms.85gui7.com/kahe-202510/new-login/bg.png"
    />
    <view class="pageLogin-content">
      <view class="pageLogin-content-top">
        <view class="pageLogin-content-top-title theme-font">欢迎登录</view>
        <image
          class="pageLogin-content-top-subTitle"
          src="https://jms.85gui7.com/kahe-202510/new-login/item.png"
        />
      </view>

      <view class="pageLogin-content-actions">
        <!-- #ifdef MP-WEIXIN -->
        <button
          v-if="checked"
          class="pageLogin-content-actions-btn"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >
          <image
            class="pageLogin-content-actions-btn-img"
            src="https://jms.85gui7.com/kahe-202510/new-login/btn1.png"
          />
          <view class="pageLogin-content-actions-btn-title"
            >手机号授权登录</view
          >
        </button>
        <button
          v-else
          class="pageLogin-content-actions-btn"
          @tap.stop="handleAgreement"
        >
          <image
            class="pageLogin-content-actions-btn-img"
            src="https://jms.85gui7.com/kahe-202510/new-login/btn1.png"
          />
          <view class="pageLogin-content-actions-btn-title"
            >手机号授权登录</view
          >
        </button>
        <!-- #endif -->

        <!-- #ifdef H5 || APP-PLUS -->
        <view class="pageLogin-content-actions-form">
          <view class="pageLogin-content-actions-form-field">
            <input
              v-model="form.phone"
              class="pageLogin-content-actions-form-input"
              type="number"
              maxlength="11"
              placeholder="请输入手机号"
            />
          </view>

          <view
            v-if="loginMode === 'password'"
            class="pageLogin-content-actions-form-field"
          >
            <input
              v-model="form.password"
              class="pageLogin-content-actions-form-input"
              password
              placeholder="请输入密码"
            />
          </view>

          <view v-else class="pageLogin-content-actions-form-field sms">
            <input
              v-model="form.smsCode"
              class="pageLogin-content-actions-form-input"
              type="number"
              maxlength="6"
              placeholder="请输入验证码"
            />
            <view
              class="pageLogin-content-actions-form-smsBtn"
              :class="{ disabled: smsSending || smsCountdown > 0 }"
              @tap.stop="handleSendSms"
            >
              {{ smsCountdown > 0 ? `${smsCountdown}s` : "获取验证码" }}
            </view>
          </view>
          <view class="pageLogin-content-actions-form-switchRow">
            <view
              class="pageLogin-content-actions-form-switchRow-left"
              @tap.stop="toggleLoginMode"
            >
              {{ loginMode === "password" ? "验证码登录" : "密码登录" }}
            </view>
            <view
              class="pageLogin-content-actions-form-switchRow-right"
              @tap.stop="handleForgotPassword"
            >
              忘记密码
            </view>
          </view>

          <button
            class="pageLogin-content-actions-btn"
            @tap.stop="handleSubmit"
          >
            <image
              class="pageLogin-content-actions-btn-img"
              src="https://jms.85gui7.com/kahe-202510/new-login/btn1.png"
            />
            <view class="pageLogin-content-actions-btn-title">登录</view>
          </button>

          <!-- #ifdef APP-PLUS -->
          <button
            class="pageLogin-content-actions-btn wx"
            @tap.stop="handleWechatOneClick"
          >
            <image
              class="pageLogin-content-actions-btn-img"
              src="https://jms.85gui7.com/kahe-202510/new-login/btn2.png"
            />
            <view
              class="pageLogin-content-actions-btn-title"
              style="color: black"
              >微信一键登录</view
            >
          </button>
          <!-- #endif -->
        </view>
        <!-- #endif -->

        <button class="pageLogin-content-actions-btn" @tap.stop="handleUnLogin">
          <image
            class="pageLogin-content-actions-btn-img"
            src="https://jms.85gui7.com/kahe-202510/new-login/btn2.png"
          />
          <view class="pageLogin-content-actions-btn-title" style="color: black"
            >暂不登录</view
          >
        </button>
      </view>
      <view class="pageLogin-content-bottom">
        <view class="check" @tap.stop="checked = !checked">
          <view class="pageLogin-content-bottom-check">
            <view
              class="pageLogin-content-bottom-check-value"
              :style="{ background: checked ? '#4a8edb' : 'transparent' }"
            />
          </view>
        </view>
        <view class="pageLogin-content-bottom-tips">
          我已阅读并同意<text
            class="other"
            @tap.stop="showModalType(ModalType.UserProtocol)"
            >《用户协议》</text
          >与<text
            class="other"
            @tap.stop="showModalType(ModalType.UserProtocol)"
            >《隐私政策》</text
          >
        </view>
      </view>
    </view>

    <common-modal
      v-model:show="modalShow"
      :title="modalTitle"
      :content="modalContent"
    />
  </view>
</template>

<script lang="ts" setup>
import CommonModal from "@/components/modal/index.vue";

import { ModalType, useModal } from "@/composables/modal";
import { onBeforeUnmount, ref } from "vue";
import { ShowToast } from "@/utils";
import { onShow } from "@dcloudio/uni-app";

import { UserModule } from "@/store/modules/user";
import { eventBus } from "@/utils/event";
import type { LoginParams } from "@/components/login/types";
import { getSmsCodeRequest } from "@/api";

const { modalShow, modalTitle, modalContent, showModalType } = useModal();
const checked = ref(false);

onShow(() => {
  // #ifdef MP-WEIXIN

  UserModule.getCode();
  // #endif
});

type LoginMode = "password" | "sms";
const loginMode = ref<LoginMode>("password"); // APP/H5 默认密码登录
const form = ref({
  phone: "",
  password: "",
  smsCode: "",
});

const smsCountdown = ref(0);
const smsSending = ref(false);
let smsTimer: number | undefined;

const switchMode = (mode: LoginMode) => {
  loginMode.value = mode;
  // 切换时清理输入，避免错用
  form.value.password = "";
  form.value.smsCode = "";
};

const toggleLoginMode = () => {
  switchMode(loginMode.value === "password" ? "sms" : "password");
};

const handleForgotPassword = () => {
  uni.navigateTo({
    url: "/subPackages/setting/password/index?from=login",
  });
};

const startSmsCountdown = (seconds = 60) => {
  smsCountdown.value = seconds;
  if (smsTimer) clearInterval(smsTimer);
  smsTimer = setInterval(() => {
    smsCountdown.value -= 1;
    if (smsCountdown.value <= 0) {
      smsCountdown.value = 0;
      if (smsTimer) clearInterval(smsTimer);
      smsTimer = undefined;
    }
  }, 1000) as unknown as number;
};

onBeforeUnmount(() => {
  if (smsTimer) clearInterval(smsTimer);
});

const handleUnLogin = () => {
  uni.navigateBack();
};

const validateAgreement = () => {
  if (!checked.value) {
    handleAgreement();
    return false;
  }
  return true;
};

const validatePhone = (phone: string) => {
  if (!phone || phone.length !== 11) {
    ShowToast("请输入正确的手机号");
    return false;
  }
  return true;
};

const handleSendSms = async () => {
  if (!validateAgreement()) return;
  const phone = form.value.phone.trim();
  if (!validatePhone(phone)) return;
  if (smsSending.value || smsCountdown.value > 0) return;

  smsSending.value = true;
  try {
    const resp = await getSmsCodeRequest({
      phone,
      type: "login",
    });
    if (resp.code === 200) {
      ShowToast("验证码已发送");
      startSmsCountdown(60);
    } else {
      ShowToast(resp.msg ?? "发送失败");
    }
  } finally {
    smsSending.value = false;
  }
};

const handleSubmit = async () => {
  if (!validateAgreement()) return;
  const phone = form.value.phone.trim();
  if (!validatePhone(phone)) return;

  const isSms = loginMode.value === "sms";
  const credential = isSms ? form.value.smsCode.trim() : form.value.password;
  if (!credential) {
    ShowToast(isSms ? "请输入验证码" : "请输入密码");
    return;
  }

  const err = await UserModule.handleLoginByPhone({
    phone,
    password: credential,
    type: isSms ? 0 : 1,
  });

  if (err) {
    ShowToast(err + "");
  } else {
    eventBus.emit("didLogin", true);
    uni.navigateBack({
      complete() {
        ShowToast("登陆成功", 2000);
      },
    });
  }
};

// #ifdef APP-PLUS
const handleWechatOneClick = async () => {
  if (!validateAgreement()) return;

  plus.oauth.getServices(
    (services) => {
      const weixinService = services.find((s) => s.id === "weixin");
      if (weixinService) {
        // 1. 必须先清除之前的授权缓存，强制触发微信拉起
        weixinService.logout(
          async () => {
            // 2. 调用 authorize 接口专门请求 code
            weixinService.authorize(
              async (event) => {
                // 这里的 event.code 就是你需要的授权 code
                const code = event.code;
                console.log("获取到的微信 code:", code);
                const err = await UserModule.handleAppWechatLogin({ code });
                if (err) {
                  ShowToast(err + "");
                } else {
                  eventBus.emit("didLogin", true);
                  uni.navigateBack({
                    complete() {
                      ShowToast("登陆成功", 2000);
                    },
                  });
                }
              },
              (error) => {
                console.error("授权失败:", error);
              }
            );
          },
          (error) => {
            console.error("清除缓存失败:", error);
          }
        );
      }
    },
    (error) => {
      console.error("获取服务列表失败:", error);
    }
  );

  // uni.login({
  //   provider: "weixin",
  //   success: async (result) => {
  //     const res = result as any;
  //     const code = res.authResult.code;
  //
  //     if (!code) {
  //       ShowToast(`微信登录失败:${JSON.stringify(res)}`);
  //       return;
  //     }
  //
  //   },
  //   fail: () => {
  //     ShowToast("微信登录失败");
  //   },
  // });
};
// #endif

const getPhoneNumber = (e: any) => {
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
  handleLogin(params);
};
const handleLogin = async (params: LoginParams) => {
  const resp = await UserModule.handlePhoneLogin(params);

  if (resp) {
    UserModule.getCode();
    await ShowToast(resp + "", 2000);
  } else {
    eventBus.emit("didLogin", true);
    setTimeout(() => {}, 1000);
    uni.navigateBack({
      complete(result) {
        ShowToast("登陆成功", 2000);
      },
    });
  }
};

const handleAgreement = () => {
  ShowToast("请阅读并同意《用户协议》与《隐私政策》");
};
</script>

<style lang="scss" scoped>
.pageLogin {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  &-bg {
    width: 100%;
    height: 100%;
  }
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100vw;
      &-title {
        text-align: center;
        color: #83e3ff;
        font-weight: 400;
        font-size: 82rpx;
        @include text-stroke-color(#2b2b2b);
      }
      &-subTitle {
        width: 97rpx;
        height: 66rpx;
        margin-bottom: 80rpx;
      }
    }

    &-actions {
      //position: absolute;
      //bottom: calc(env(safe-area-inset-bottom) + 300rpx);
      //left: 0;
      margin-top: 120rpx;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-form {
        width: 560rpx;
        margin-bottom: 10rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        &-switchRow {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24rpx;

          &-left {
            font-size: 26rpx;
            color: #1a5fb6;
            padding: 6rpx 0;
          }

          &-right {
            font-size: 26rpx;
            color: #666;
            padding: 6rpx 0;
          }
        }

        &-field {
          width: 100%;
          height: 78rpx;
          padding: 0 22rpx;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 16rpx;
          display: flex;
          align-items: center;
          margin-bottom: 18rpx;
        }
        &-field.sms {
          justify-content: space-between;
        }
        &-input {
          flex: 1;
          height: 78rpx;
          line-height: 78rpx;
          font-size: 28rpx;
          color: #000;
        }
        &-smsBtn {
          margin-left: 16rpx;
          padding: 10rpx 16rpx;
          font-size: 24rpx;
          color: #1a5fb6;
          border: 1rpx solid #1a5fb6;
          border-radius: 12rpx;
          background: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
        }
        &-smsBtn.disabled {
          opacity: 0.6;
        }
      }
      &-btn {
        position: relative;
        margin: 10rpx 0;
        width: 494rpx;
        height: 67rpx;
        padding: 0;
        border: none;
        background-color: transparent;
        &-img {
          width: 100%;
          height: 100%;
        }
        &-title {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          line-height: 67rpx;
          text-align: center;
          font-size: 27rpx;
          color: #ffffff;
        }
      }
      &-btn::after {
        padding: 0;
        border: none;
        background-color: transparent;
      }
    }

    &-bottom {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: center;
      &-check {
        position: relative;
        margin: 0 12rpx;
        padding: 2rpx;
        border: 1rpx solid #999999;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        //aspect-ratio: 1;
        &-value {
          width: 26rpx;
          height: 26rpx;
          border-radius: 26rpx;
          background-color: #4a8edb;
        }
      }
      &-tips {
        font-size: 24rpx;
        color: #000000;
        line-height: 58rpx;
      }
    }
  }
}
.other {
  color: #52a6ff;
}
.check {
  padding: 16rpx;
}
</style>
