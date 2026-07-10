<template>
  <view class="password relative w-full h-screen flex flex-col">
    <image
      class="password-bg w-full h-full"
      src="/static/kahe-202510/new-login/bg.png"
    />
    <view class="password-content absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center">
      <view class="password-content-top flex flex-row items-center justify-center w-screen mb-80">
        <text class="password-content-top-title theme-font text-center text-[#83e3ff] font-normal text-72" :style="{ textShadow: '-1px -1px 0 #2b2b2b, 1px -1px 0 #2b2b2b, -1px 1px 0 #2b2b2b, 1px 1px 0 #2b2b2b' }">修改密码</text>
        <image
          class="password-content-top-subTitle w-97 h-66 mb-60"
          src="/static/kahe-202510/new-login/item.png"
        />
      </view>

      <view class="password-content-form w-560 mb-10 flex flex-col items-center">
        <!-- 手机号输入 -->
        <view class="password-content-form-field w-full h-78 px-22 bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center mb-18 box-border">
          <input
            v-model="formData.phone"
            class="password-content-form-input flex-1 h-78 leading-78 text-28 text-black"
            type="number"
            :disabled="isPhoneReadonly"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>

        <!-- 验证码输入 -->
        <view class="password-content-form-field sms w-full h-78 px-22 bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center justify-between mb-18 box-border">
          <input
            v-model="formData.code"
            class="password-content-form-input flex-1 h-78 leading-78 text-28 text-black"
            type="number"
            maxlength="6"
            placeholder="请输入验证码"
          />
          <view
            class="password-content-form-smsBtn ml-16 py-10 px-16 text-24 text-[#1a5fb6] border-1 border-[#1a5fb6] rounded-12 bg-[rgba(255,255,255,0.9)] whitespace-nowrap flex items-center justify-center min-w-140"
            :class="{ 'opacity-60': maxTime > 0 }"
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
        <view class="password-content-form-field w-full h-78 px-22 bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center mb-18 box-border">
          <input
            v-model="formData.password"
            class="password-content-form-input flex-1 h-78 leading-78 text-28 text-black"
            :password="!showPassword"
            placeholder="请输入新密码"
          />
          <view class="password-content-form-eye p-10 flex items-center justify-center" @tap.stop="showPassword = !showPassword">
            <text class="password-content-form-eye-icon text-32">{{ showPassword ? '👁' : '👁️‍🗨️' }}</text>
          </view>
        </view>

        <!-- 确认密码输入 -->
        <view class="password-content-form-field w-full h-78 px-22 bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center mb-18 box-border">
          <input
            v-model="formData.again"
            class="password-content-form-input flex-1 h-78 leading-78 text-28 text-black"
            :password="!showAgainPassword"
            placeholder="请再次输入新密码"
          />
          <view class="password-content-form-eye p-10 flex items-center justify-center" @tap.stop="showAgainPassword = !showAgainPassword">
            <text class="password-content-form-eye-icon text-32">{{ showAgainPassword ? '👁' : '👁️‍🗨️' }}</text>
          </view>
        </view>
      </view>

      <view class="password-content-login relative mt-40 w-494 h-67" @tap.stop="handleConfirm">
        <image
          class="password-content-login-img w-full h-full"
          src="/static/kahe-202510/login/login-btn-bg.png"
        />
        <text class="password-content-login-text absolute left-0 top-0 w-full leading-67 text-center text-27 text-white">确定修改</text>
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
    ShowToast("验证码已发送");
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

<style lang="scss" scoped>
</style>
