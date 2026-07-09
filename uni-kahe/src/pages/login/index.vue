<template>
  <view class="relative w-full h-screen flex flex-col">
    <image class="w-full h-full" src="/static/kahe-202510/new-login/bg.png" />
    <view class="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center">
      <view class="flex flex-row items-center justify-center w-screen">
        <view class="text-center text-[#83e3ff] font-normal text-82" style="text-shadow: 0 0 2rpx #2b2b2b, 0 0 2rpx #2b2b2b, 0 0 2rpx #2b2b2b, 0 0 2rpx #2b2b2b;"
          >欢迎登录</view
        >
        <image
          class="w-97 h-66 mb-80"
          src="/static/kahe-202510/new-login/item.png"
        />
      </view>

      <view class="mt-120 w-full flex flex-col items-center justify-center">
        <!-- #ifdef MP-WEIXIN -->
        <button
          v-if="checked"
          class="login-btn relative my-10 w-494 h-68 p-0 border-none rounded-34 bg-transparent"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >
          <image
            class="w-full h-full"
            src="/static/kahe-202510/new-login/btn1.png"
          />
          <view class="absolute left-0 top-0 w-full leading-67 text-center text-27 text-white"
            >手机号授权登录</view
          >
        </button>
        <button
          v-else
          class="login-btn relative my-10 w-494 h-68 p-0 border-none rounded-34 bg-transparent"
          @tap.stop="handleAgreement"
        >
          <image
            class="w-full h-full"
            src="/static/kahe-202510/new-login/btn1.png"
          />
          <view class="absolute left-0 top-0 w-full leading-67 text-center text-27 text-white"
            >手机号授权登录</view
          >
        </button>
        <!-- #endif -->

        <!-- #ifdef H5 || APP-PLUS -->
        <view class="w-560 mb-10 flex flex-col items-center"
        >
          <view class="w-full h-78 px-22 box-border bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center mb-18"
          >
            <input
              v-model="form.phone"
              class="flex-1 h-78 leading-78 text-28 text-black"
              type="number"
              maxlength="11"
              placeholder="请输入手机号"
            />
          </view>

          <view
            v-if="loginMode === 'password'"
            class="w-full h-78 px-22 box-border bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center mb-18"
          >
            <input
              v-model="form.password"
              class="flex-1 h-78 leading-78 text-28 text-black"
              password
              placeholder="请输入密码"
            />
          </view>

          <view v-else class="w-full h-78 px-22 box-border bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center justify-between mb-18"
          >
            <input
              v-model="form.smsCode"
              class="flex-1 h-78 leading-78 text-28 text-black"
              type="number"
              maxlength="6"
              placeholder="请输入验证码"
            />
            <view
              class="ml-16 py-10 px-16 text-24 text-[#1a5fb6] border border-[#1a5fb6] rounded-12 bg-[rgba(255,255,255,0.9)] whitespace-nowrap"
              :class="{ 'opacity-60': smsSending || smsCountdown > 0 }"
              @tap.stop="handleSendSms"
            >
              {{ smsCountdown > 0 ? `${smsCountdown}s` : "获取验证码" }}
            </view>
          </view>
          <view class="w-full flex flex-row items-center justify-between mb-24"
          >
            <view
              class="text-26 text-[#1a5fb6] py-6 px-0"
              @tap.stop="toggleLoginMode"
            >
              {{ loginMode === "password" ? "验证码登录" : "密码登录" }}
            </view>
            <view
              class="text-26 text-[#666666] py-6 px-0"
              @tap.stop="handleForgotPassword"
            >
              忘记密码
            </view>
          </view>

          <button
            class="login-btn relative my-10 w-494 h-68 p-0 border-none rounded-34 bg-transparent"
            @tap.stop="handleSubmit"
          >
            <image
              class="w-full h-full"
              src="/static/kahe-202510/new-login/btn1.png"
            />
            <view class="absolute left-0 top-0 w-full leading-67 text-center text-27 text-white"
              >登录</view
            >
          </button>

          <!-- #ifdef APP-PLUS -->
          <button
            v-if="isWechatInstalled"
            class="login-btn relative my-10 w-494 h-68 p-0 border-none rounded-34 bg-transparent"
            @tap.stop="handleWechatOneClick"
          >
            <image
              class="w-full h-full"
              src="/static/kahe-202510/new-login/btn2.png"
            />
            <view
              class="absolute left-0 top-0 w-full leading-67 text-center text-27"
              style="color: black;"
              >微信一键登录</view
            >
          </button>
          <!-- #endif -->
        </view>
        <!-- #endif -->

        <button
          class="login-btn relative my-10 w-494 h-68 p-0 border-none rounded-34 bg-transparent"
          style="border: 1rpx solid black"
          @tap.stop="handleUnLogin"
        >
          <view class="absolute left-0 top-0 w-full leading-67 text-center text-27" style="color: black;"
            >暂不登录</view
          >
        </button>
      </view>
      <view class="flex flex-row items-center w-full justify-center">
        <view class="p-16" @tap.stop="checked = !checked">
          <view class="relative m-0 mx-12 p-2 border border-[#999999] flex flex-row items-center justify-center rounded-full"
          >
            <view
              class="w-26 h-26 rounded-26"
              :style="{ background: checked ? '#4a8edb' : 'transparent' }"
            />
          </view>
        </view>
        <view class="text-24 text-black leading-58"
        >
          我已阅读并同意<text
            class="text-[#52a6ff]"
            @tap.stop="showModalType(ModalType.UserProtocol)"
            >《用户协议》</text>
          与<text
            class="text-[#52a6ff]"
            @tap.stop="showModalType(ModalType.UserProtocol)"
            >《隐私政策》</text>
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
const isWechatInstalled = ref(false);

onShow(() => {
  // #ifdef MP-WEIXIN
  UserModule.getCode();
  // #endif

  // #ifdef APP-PLUS
  // 检测微信是否安装
  isWechatInstalled.value = plus.runtime.isApplicationExist({
    pname: "com.tencent.mm",
    action: "weixin://",
  });
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
    // 手机号/密码登录本身就有手机号，直接完成
    eventBus.emit("didLogin", true);
    // 设置刷新标记，让来源页面知道登录成功并刷新
    uni.setStorageSync("loginSuccessRefresh", true);
    uni.navigateBack({
      complete() {
        ShowToast("登陆成功", 2000);
      },
    });
  }
};

// #ifdef APP-PLUS
/** 微信登录成功后检查是否需要绑定手机号 */
const handleLoginSuccess = () => {
  const phone = UserModule.userInfo?.phone;
  if (!phone || phone === "") {
    // 未绑定手机号，跳转到绑定页面（使用 redirectTo 替换当前登录页）
    uni.redirectTo({
      url: "/subPackages/setting/bindPhone/index",
    });
  } else {
    // 已有手机号，正常回到上一页
    eventBus.emit("didLogin", true);
    // 设置刷新标记，让来源页面知道登录成功并刷新
    uni.setStorageSync("loginSuccessRefresh", true);
    uni.navigateBack({
      complete() {
        ShowToast("登陆成功", 2000);
      },
    });
  }
};

const handleWechatOneClick = async () => {
  if (!validateAgreement()) return;

  const handleCodeLogin = async (code?: string) => {
    if (!code) {
      ShowToast("未获取到微信授权码");
      return;
    }
    const err = await UserModule.handleAppWechatLogin({ code });
    if (err) {
      ShowToast(err + "");
    } else {
      handleLoginSuccess();
    }
  };

  const fallbackByUniLogin = () => {
    uni.login({
      provider: "weixin",
      success: async (result) => {
        const res = result as any;
        const code = res?.authResult?.code || res?.code;
        await handleCodeLogin(code);
      },
      fail: (err) => {
        console.error("uni.login weixin fail:", err);
        ShowToast("无法拉起微信，请检查微信安装/签名配置");
      },
    });
  };

  plus.oauth.getServices(
    (services) => {
      const weixinService = services.find((s) => s.id === "weixin");
      if (!weixinService) {
        // OAuth 服务未注册时，回退到 uni.login，避免“点击无反应”
        fallbackByUniLogin();
        return;
      }
      weixinService.authorize(
        async (event: any) => {
          const code = event?.code;
          console.log("获取到的微信 code:", code);
          await handleCodeLogin(code);
        },
        (error) => {
          console.error("plus.oauth authorize fail:", error);
          fallbackByUniLogin();
        }
      );
    },
    (error) => {
      console.error("plus.oauth.getServices fail:", error);
      fallbackByUniLogin();
    }
  );
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
    // 设置刷新标记，让来源页面知道登录成功并刷新
    uni.setStorageSync("loginSuccessRefresh", true);
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

<style lang="scss" scoped></style>
