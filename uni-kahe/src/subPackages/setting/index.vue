<template>
  <view class="setting">
    <image
      class="setting-bg"
      src="https://jms.85gui7.com/kahe-202510/images/mine-bg.png"
    />
    <view class="setting-content">
      <view class="setting-content-row">
        <TnListItem
          bottom-border
          right-icon="right"
          @click="handleResetPassword"
        >
          修改密码
        </TnListItem>
        <TnListItem right-icon="right" @click="handleWriteOff">
          注销账号
        </TnListItem>
      </view>

      <view class="setting-content-row">
        <TnListItem bottom-border @click="handleLogout">
          <template #default>
            <view style="width: 100%; color: #3a3a3a; text-align: center"
              >退出登录</view
            >
          </template>
        </TnListItem>
      </view>
    </view>
    <TnModal ref="modalRef" />
  </view>
</template>

<script lang="ts" setup>
import TnModal from "@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue";
import type { TnModalInstance } from "@tuniao/tnui-vue3-uniapp/components/modal";
import { ref } from "vue";
import TnListItem from "@tuniao/tnui-vue3-uniapp/components/list/src/list-item.vue";
import { UserModule } from "@/store/modules/user";
import { writeOffRequest } from "@/api";
import { ShowToast } from "@/utils";
const modalRef = ref<TnModalInstance>();

const handleResetPassword = () => {
  uni.navigateTo({
    url: "/subPackages/setting/password/index",
  });
};

const handleLogout = () => {
  modalRef.value?.showModal({
    title: "提示",
    content: "确定退出当前账号？",
    showCancel: true,
    cancelStyle: {
      color: "#999999",
    },
    confirmStyle: {
      color: "#95C3F7",
    },
    confirm: () => {
      UserModule.logout(false);
    },
  });
};

const handleWriteOff = () => {
  modalRef.value?.showModal({
    title: "注意",
    content: "确认注销账号后不可恢复",
    showCancel: true,
    cancelStyle: {
      color: "#999999",
    },
    confirmStyle: {
      color: "red",
    },
    confirmText: "注销",
    confirm: () => {
      handleWriteOffRequest();
    },
  });
};

const handleWriteOffRequest = async () => {
  const resp = await writeOffRequest();
  if (resp.code === 200) {
    await ShowToast("注销成功");
    UserModule.logout();
    setTimeout(() => {
      uni.redirectTo({
        url: "/pages/welcome/index",
      });
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.setting {
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
    padding: 16px;

    &-row {
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }
  }
}
</style>
