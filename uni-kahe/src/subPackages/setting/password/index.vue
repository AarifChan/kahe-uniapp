<template>
  <view class="password">
    <image
      class="password-bg"
      src="https://jms.85gui7.com/kahe-202510/new-login/bg.png"
    />
    <view class="password-content">
      <view class="password-content-top">
        <text class="password-content-top-title theme-font">修改密码</text>
        <image
          class="password-content-top-subTitle"
          src="https://jms.85gui7.com/kahe-202510/new-login/item.png"
        />
      </view>

      <view class="password-content-form">
        <!-- 手机号输入 -->
        <view class="password-content-form-field">
          <input
            v-model="formData.phone"
            class="password-content-form-input"
            type="number"
            :disabled="isPhoneReadonly"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>

        <!-- 验证码输入 -->
        <view class="password-content-form-field sms">
          <input
            v-model="formData.code"
            class="password-content-form-input"
            type="number"
            maxlength="6"
            placeholder="请输入验证码"
          />
          <view
            class="password-content-form-smsBtn"
            :class="{ disabled: maxTime > 0 }"
            @tap.stop="getSmsCodeAction"
          >
            <TnCountDown
              v-if="maxTime > 0"
              :time="maxTime"
              separator-mode="cn"
              text-color="#1a5fb6"
              :show-hour="false"
              :show-minute="false"
              :show-second="true"
              @end="maxTime = 0"
            />
            <text v-else>获取验证码</text>
          </view>
        </view>

        <!-- 新密码输入 -->
        <view class="password-content-form-field">
          <input
            v-model="formData.password"
            class="password-content-form-input"
            :password="!showPassword"
            placeholder="请输入新密码"
          />
          <view class="password-content-form-eye" @tap.stop="showPassword = !showPassword">
            <text class="password-content-form-eye-icon">{{ showPassword ? '👁' : '👁️‍🗨️' }}</text>
          </view>
        </view>

        <!-- 确认密码输入 -->
        <view class="password-content-form-field">
          <input
            v-model="formData.again"
            class="password-content-form-input"
            :password="!showAgainPassword"
            placeholder="请再次输入新密码"
          />
          <view class="password-content-form-eye" @tap.stop="showAgainPassword = !showAgainPassword">
            <text class="password-content-form-eye-icon">{{ showAgainPassword ? '👁' : '👁️‍🗨️' }}</text>
          </view>
        </view>
      </view>

      <view class="password-content-login" @tap.stop="handleConfirm">
        <image
          class="password-content-login-img"
          src="https://jms.85gui7.com/kahe-202510/login/login-btn-bg.png"
        />
        <text class="password-content-login-text theme-font">确定修改</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import TnCountDown from "@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue";
import { computed, onMounted, ref, watch } from "vue";
import { getSmsCodeRequest, resetPassword } from "@/api";
import { ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";
import { onLoad } from "@dcloudio/uni-app";

const showPassword = ref(false);
const showAgainPassword = ref(false);
const fromLogin = ref(false);

onLoad((options: any) => {
  fromLogin.value = options?.from === "login";
});

const isPhoneReadonly = computed(() => {
  // 从登录页进入时允许输入手机号；否则（设置页）默认不允许改手机号
  return !fromLogin.value;
});

const formData = ref({
  phone: UserModule.userInfo.phone || "",
  password: "",
  again: "",
  code: "",
});

watch(
  () => UserModule.userInfo,
  (value) => {
    if (!fromLogin.value) {
      formData.value.phone = value.phone || "";
    }
  }
);

onMounted(() => {
  UserModule.getUserInfo();
});

const maxTime = ref(0);

const getSmsCodeAction = async () => {
  if (maxTime.value > 0) return;
  
  const phone = formData.value.phone;
  if (!phone || phone.length !== 11) {
    ShowToast("请输入正确的手机号");
    return;
  }
  
  const resp = await getSmsCodeRequest({
    phone,
    type: "reset_pwd",
  });
  
  if (resp.code === 200) {
    maxTime.value = 120;
    setTimeout(() => {
      maxTime.value = 0;
    }, 60 * 2 * 1000);
  } else {
    ShowToast(resp.msg ?? "发送失败");
  }
};

const handleConfirm = () => {
  // 表单验证
  const phone = formData.value.phone.trim();
  const code = formData.value.code.trim();
  const password = formData.value.password;
  const again = formData.value.again;

  if (!phone || phone.length !== 11) {
    ShowToast("请输入正确的手机号");
    return;
  }

  if (!code) {
    ShowToast("请输入验证码");
    return;
  }

  if (!password) {
    ShowToast("请输入新密码");
    return;
  }

  if (password.length < 6 || password.length > 16) {
    ShowToast("密码长度应在 6 到 16 个字符之间");
    return;
  }

  if (password !== again) {
    ShowToast("两次输入的密码不一致");
    return;
  }

  const params = {
    captcha: code,
    password: password,
    phone: phone,
  };

  resetPassword(params).then(({ msg, code }) => {
    if (code === 200) {
      ShowToast("修改成功");
      setTimeout(() => {
        uni.redirectTo({
          url: "/pages/login/index",
        });
      }, 1000);
    } else {
      ShowToast(msg);
    }
  });
};
</script>

<style scoped lang="scss">
.password {
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
      margin-bottom: 80rpx;

      &-title {
        text-align: center;
        color: #83e3ff;
        font-weight: 400;
        font-size: 72rpx;
        @include text-stroke-color(#2b2b2b);
      }

      &-subTitle {
        width: 97rpx;
        height: 66rpx;
        margin-bottom: 60rpx;
      }
    }

    &-form {
      width: 560rpx;
      margin-bottom: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

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
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 140rpx;
      }

      &-smsBtn.disabled {
        opacity: 0.6;
      }

      &-eye {
        padding: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        &-icon {
          font-size: 32rpx;
        }
      }
    }

    &-login {
      margin-top: 40rpx;
      position: relative;
      width: 494rpx;
      height: 67rpx;

      &-img {
        width: 100%;
        height: 100%;
      }

      &-text {
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
  }
}
</style>
