<template>
  <view class="realName w-full box-border h-screen bg-main-bg p-32">
    <!-- 已认证 -->
    <view
      v-if="isAuthed"
      class="realName-authed w-full px-32 py-60 box-border rounded-30 border-2 border-white flex flex-col items-center"
      :style="{
        background: 'rgba(255, 255, 255, 0.41)',
        boxShadow: '0 0 11rpx 3rpx #ffffff',
      }"
    >
      <view class="text-36 font-bold text-black">已完成实名认证</view>
      <view class="mt-32 text-30 text-[#888888]"
        >真实姓名：{{ maskedRealName }}</view
      >
    </view>

    <!-- 未认证 -->
    <block v-else>
      <view
        class="realName-form w-full px-32 box-border rounded-30 border-2 border-white"
        :style="{
          background: 'rgba(255, 255, 255, 0.41)',
          boxShadow: '0 0 11rpx 3rpx #ffffff',
        }"
      >
        <TnForm>
          <TnFormItem
            class="realName-input relative w-full py-12 px-24 rounded-4 mb-18"
            label-position="left"
            label-width="140"
            label="真实姓名"
            :border="false"
          >
            <view class="relative w-full h-70 flex flex-row items-center">
              <TnInput
                v-model="form.realName"
                placeholder="请输入真实姓名"
                :border="false"
              />
            </view>
          </TnFormItem>
          <TnFormItem
            class="realName-input relative w-full py-12 px-24 rounded-4 mb-18"
            label-position="left"
            label-width="140"
            label="身份证号"
            :border="false"
          >
            <view class="relative w-full h-70 flex flex-row items-center">
              <TnInput
                v-model="form.idCard"
                placeholder="请输入身份证号"
                :maxlength="18"
                :border="false"
              />
            </view>
          </TnFormItem>
        </TnForm>
      </view>

      <view class="realName-tips mt-32 px-16 text-26 text-[#888888] leading-40">
        温馨提示：根据相关法律法规要求，支付前需完成实名认证。您的身份证信息仅用于实名认证，平台将严格保密。
      </view>

      <view style="margin-top: 200rpx">
        <custom-button title="提交认证" size="big" @tap.stop="handleSubmit" />
      </view>
    </block>
  </view>
</template>

<script lang="ts" setup>
import TnForm from "@tuniao/tnui-vue3-uniapp/components/form/src/form.vue";
import TnFormItem from "@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue";
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue";
import CustomButton from "@/components/custom/button/index.vue";
import { computed, reactive, ref } from "vue";
import { UserModule } from "@/store/modules/user";
import { realNameAuthRequest } from "@/api";
import { ShowToast } from "@/utils";

const form = reactive({
  realName: "",
  idCard: "",
});

const submitting = ref(false);

const isAuthed = computed(() => UserModule.userInfo?.authStatus === 1);

const maskedRealName = computed(() => {
  const name = UserModule.userInfo?.realName || "";
  if (!name) return "";
  return name[0] + "*".repeat(Math.max(name.length - 1, 1));
});

const handleSubmit = async () => {
  if (submitting.value) return;
  const realName = form.realName.trim();
  const idCard = form.idCard.trim();
  if (realName.length < 2) {
    ShowToast("请输入真实姓名");
    return;
  }
  if (!/^\d{17}[\dXx]$/.test(idCard)) {
    ShowToast("请输入正确的身份证号");
    return;
  }
  submitting.value = true;
  try {
    const resp = await realNameAuthRequest({ realName, idCard });
    if (resp.code === 200) {
      ShowToast("认证成功");
      await UserModule.getUserInfo();
      setTimeout(() => {
        uni.navigateBack();
      }, 800);
    } else {
      ShowToast(resp.msg || "认证失败，请稍后重试");
    }
  } finally {
    submitting.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
