<template>
  <view class="bind-phone relative w-full h-screen flex flex-col">
    <image
      class="bind-phone-bg w-full h-full"
      src="/static/kahe-202510/new-login/bg.png"
    />
    <view class="bind-phone-content absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center">
      <view class="bind-phone-content-top flex flex-row items-center justify-center w-screen mb-80">
        <text class="bind-phone-content-top-title theme-font text-center text-[#83e3ff] font-normal text-72" :style="{ textShadow: '-1px -1px 0 #2b2b2b, 1px -1px 0 #2b2b2b, -1px 1px 0 #2b2b2b, 1px 1px 0 #2b2b2b' }">绑定手机号</text>
        <image
          class="bind-phone-content-top-subTitle w-97 h-66 mb-60"
          src="/static/kahe-202510/new-login/item.png"
        />
      </view>

      <view class="bind-phone-content-form w-560 mb-10 flex flex-col items-center">
        <!-- 手机号输入 -->
        <view class="bind-phone-content-form-field w-full h-78 px-22 bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center mb-18 box-border">
          <input
            v-model="formData.phone"
            class="bind-phone-content-form-input flex-1 h-78 leading-78 text-28 text-black"
            type="number"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>

        <!-- 验证码输入 -->
        <view class="bind-phone-content-form-field sms w-full h-78 px-22 bg-[rgba(255,255,255,0.85)] rounded-16 flex items-center justify-between mb-18 box-border">
          <input
            v-model="formData.code"
            class="bind-phone-content-form-input flex-1 h-78 leading-78 text-28 text-black"
            type="number"
            maxlength="6"
            placeholder="请输入验证码"
          />
          <view
            class="bind-phone-content-form-smsBtn ml-16 py-10 px-16 text-24 text-[#1a5fb6] border-1 border-[#1a5fb6] rounded-12 bg-[rgba(255,255,255,0.9)] whitespace-nowrap flex items-center justify-center min-w-140"
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
      </view>

      <!-- 绑定按钮 -->
      <view class="bind-phone-content-login relative mt-40 w-494 h-67" @tap.stop="handleBind">
        <image
          class="bind-phone-content-login-img w-full h-full"
          src="/static/kahe-202510/login/login-btn-bg.png"
        />
        <text class="bind-phone-content-login-text absolute left-0 top-0 w-full leading-67 text-center text-27 text-white">确认绑定</text>
      </view>

      <!-- 跳过按钮 -->
      <view class="bind-phone-content-skip mt-40 py-20 px-60" @tap.stop="handleSkip">
        <text class="bind-phone-content-skip-text text-28 text-[#1a5fb6] underline">跳过</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import TnCountDown from "@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue";
import { ref } from "vue";
import { getSmsCodeRequest, bindMobile } from "@/api";
import { ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";
import { eventBus } from "@/utils/event";

const formData = ref({
  phone: "",
  code: "",
});

const maxTime = ref(0);

/** 发送验证码 */
const getSmsCodeAction = async () => {
  if (maxTime.value > 0) return;

  const phone = formData.value.phone;
  if (!phone || phone.length !== 11) {
    ShowToast("请输入正确的手机号");
    return;
  }

  const resp = await getSmsCodeRequest({
    phone,
    type: "bind",
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

/** 绑定手机号 */
const handleBind = async () => {
  const phone = formData.value.phone.trim();
  const code = formData.value.code.trim();

  if (!phone || phone.length !== 11) {
    ShowToast("请输入正确的手机号");
    return;
  }

  if (!code) {
    ShowToast("请输入验证码");
    return;
  }

  const params = {
    phone: phone,
    captcha: code,
  };

  const resp = await bindMobile(params);
  if (resp.code === 200) {
    await ShowToast("绑定成功");
    // 刷新用户信息，确保 phone 字段已更新
    await UserModule.getUserInfo();
    eventBus.emit("didLogin", true);
    navigateAfterBind();
  } else {
    ShowToast(resp.msg ?? "绑定失败");
  }
};

/** 跳过绑定 */
const handleSkip = () => {
  eventBus.emit("didLogin", true);
  navigateAfterBind();
};

/** 绑定/跳过后统一导航：回到首页 */
const navigateAfterBind = () => {
  // 使用 reLaunch 确保回到首页，清除登录页面栈
  uni.reLaunch({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
</style>
