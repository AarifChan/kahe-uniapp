<template>
  <view class="bind-phone">
    <image
      class="bind-phone-bg"
      src="https://jms.85gui7.com/kahe-202510/images/mine-bg.png"
    />
    <view class="bind-phone-content">
      <view class="bind-phone-content-header">
        <text class="bind-phone-content-header-title">绑定手机号</text>
        <text class="bind-phone-content-header-desc"
          >为保障账号安全，请绑定您的手机号</text
        >
      </view>

      <view class="bind-phone-content-form">
        <TnForm ref="formRef" :model="formData" :rules="formRules">
          <TnFormItem label="" prop="phone">
            <view class="bind-phone-content-form-item">
              <TnInput
                v-model="formData.phone"
                type="number"
                :maxlength="11"
                placeholder="请输入手机号"
                :border="false"
                height="80"
              />
            </view>
          </TnFormItem>
          <TnFormItem label="" prop="code">
            <view class="bind-phone-content-form-item">
              <TnInput
                v-model="formData.code"
                type="text"
                clearable
                :maxlength="6"
                placeholder="请输入验证码"
                :border="false"
                height="80"
              >
                <template #suffix>
                  <view
                    v-if="maxTime === 0"
                    class="bind-phone-content-form-item-btn"
                    @tap.stop="getSmsCodeAction"
                    >获取验证码</view
                  >
                  <TnCountDown
                    v-else
                    :time="120"
                    separator-mode="cn"
                    text-color="#B6B6B6"
                    :show-hour="false"
                  />
                </template>
              </TnInput>
            </view>
          </TnFormItem>
        </TnForm>
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
import TnFormItem from "@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue";
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue";
import TnForm from "@tuniao/tnui-vue3-uniapp/components/form/src/form.vue";
import TnCountDown from "@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue";
import { computed, ref } from "vue";
import type { FormRules, TnFormInstance } from "@tuniao/tnui-vue3-uniapp";
import { getSmsCodeRequest, bindMobile } from "@/api";
import { ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";
import { eventBus } from "@/utils/event";

const formRef = ref<TnFormInstance>();

const formRules = computed(() => {
  return {
    phone: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
    ],
    code: [
      { required: true, message: "请输入验证码", trigger: "blur" },
      { min: 4, max: 6, message: "请输入正确的验证码", trigger: "blur" },
    ],
  } as FormRules;
});

const formData = ref({
  phone: "",
  code: "",
});

const maxTime = ref(0);

/** 发送验证码 */
const getSmsCodeAction = async () => {
  const phone = formData.value.phone;
  if (!phone || phone.length !== 11) {
    ShowToast("请输入正确的手机号");
    return;
  }
  const resp = await getSmsCodeRequest({
    phone,
    type: "bindMobile",
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
const handleBind = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const params = {
        phone: formData.value.phone,
        captcha: formData.value.code,
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
    }
  });
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

  &-bg {
    width: 100%;
    height: 100vh;
  }

  &-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-header {
      margin-top: 120rpx;
      margin-bottom: 40rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-title {
        font-size: 48rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 16rpx;
      }

      &-desc {
        font-size: 26rpx;
        color: #999;
      }
    }

    &-form {
      width: 100%;
      padding: 30px;

      &-item {
        width: 100%;
        background: #e7e7e7;
        border-radius: 4rpx;

        &-btn {
          text-align: right;
          width: 80px;
          font-size: 13px;
          font-weight: 400;
          color: #3a3939;
        }
      }
    }

    &-login {
      margin-top: 9rpx;
      position: relative;
      width: 634rpx;
      height: 70rpx;

      &-img {
        width: 100%;
        height: 100%;
      }

      &-text {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        line-height: 70rpx;
        text-align: center;
        font-weight: 400;
        font-size: 40rpx;
        color: #ffffff;
        text-shadow: -1px -1px 0 #2356a9, 1px -1px 0 #2356a9, -1px 1px 0 #2356a9,
          1px 1px 0 #2356a9;
      }
    }

    &-skip {
      margin-top: 40rpx;
      padding: 20rpx 60rpx;

      &-text {
        font-size: 28rpx;
        color: #999;
        text-decoration: underline;
      }
    }
  }
}
</style>
