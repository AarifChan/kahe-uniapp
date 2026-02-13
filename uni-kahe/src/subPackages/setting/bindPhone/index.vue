<template>
  <view class="bind-phone">
    <image
      class="bind-phone-bg"
      src="https://jms.85gui7.com/kahe-202510/new-login/bg.png"
    />
    <view class="bind-phone-content">
      <view class="bind-phone-content-top">
        <text class="bind-phone-content-top-title theme-font">绑定手机号</text>
        <image
          class="bind-phone-content-top-subTitle"
          src="https://jms.85gui7.com/kahe-202510/new-login/item.png"
        />
      </view>

      <view class="bind-phone-content-form">
        <!-- 手机号输入 -->
        <view class="bind-phone-content-form-field">
          <input
            v-model="formData.phone"
            class="bind-phone-content-form-input"
            type="number"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>

        <!-- 验证码输入 -->
        <view class="bind-phone-content-form-field sms">
          <input
            v-model="formData.code"
            class="bind-phone-content-form-input"
            type="number"
            maxlength="6"
            placeholder="请输入验证码"
          />
          <view
            class="bind-phone-content-form-smsBtn"
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
      </view>

      <!-- 绑定按钮 -->
      <view class="bind-phone-content-login" @tap.stop="handleBind">
        <image
          class="bind-phone-content-login-img"
          src="https://jms.85gui7.com/kahe-202510/login/login-btn-bg.png"
        />
        <text class="bind-phone-content-login-text theme-font">确认绑定</text>
      </view>

      <!-- 跳过按钮 -->
      <view class="bind-phone-content-skip" @tap.stop="handleSkip">
        <text class="bind-phone-content-skip-text">跳过</text>
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

<style scoped lang="scss">
.bind-phone {
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

    &-skip {
      margin-top: 40rpx;
      padding: 20rpx 60rpx;

      &-text {
        font-size: 28rpx;
        color: #1a5fb6;
        text-decoration: underline;
      }
    }
  }
}
</style>
