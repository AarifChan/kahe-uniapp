<template>
  <view class="setting">
    <image
      class="setting-bg"
      src="https://jms.85gui7.com/kahe-202510/images/mine-bg.png"
    />
    <view class="setting-content">
      <view class="setting-content-row">
        <!-- 未绑定手机号时显示绑定入口 -->
        <SettingCell
          v-if="!hasPhone"
          title="绑定手机号"
          desc="保障账号安全"
          @click="handleBindPhone"
        />
        <!-- 已绑定手机号时显示修改密码 -->
        <SettingCell
          v-else
          title="修改密码"
          @click="handleResetPassword"
        />

        <!-- 未绑定微信时显示绑定入口 -->
        <SettingCell
          v-if="!hasWechat"
          title="绑定微信"
          desc="方便快捷登录"
          @click="handleBindWechat"
        />
        <!-- 已绑定微信时显示状态 -->
        <SettingCell
          v-else
          title="微信绑定"
          desc="已绑定"
          desc-color="#52c41a"
          :show-arrow="false"
          disabled
        />

        <!-- 注销账号 -->
        <SettingCell
          title="注销账号"
          @click="handleWriteOff"
        />
      </view>

      <!-- 退出登录 -->
      <view class="setting-content-row">
        <SettingCell
          title="退出登录"
          :show-arrow="false"
          center
          @click="handleLogout"
        />
      </view>
    </view>
    <TnModal ref="modalRef" />
  </view>
</template>

<script lang="ts" setup>
import TnModal from "@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue";
import type { TnModalInstance } from "@tuniao/tnui-vue3-uniapp/components/modal";
import { ref, computed } from "vue";
import { UserModule } from "@/store/modules/user";
import { writeOffRequest, bindWechatRequest } from "@/api";
import { ShowToast } from "@/utils";
import SettingCell from "@/components/setting-cell/index.vue";

const modalRef = ref<TnModalInstance>();

// 判断是否已绑定手机号
const hasPhone = computed(() => {
  const phone = UserModule.userInfo?.phone;
  return phone && phone.length > 0;
});

// 判断是否已绑定微信
const hasWechat = computed(() => {
  const userType = UserModule.userInfo?.userType;
  return userType === 'wechat' || userType === 'wx_app';
});

// 跳转绑定手机号页面
const handleBindPhone = () => {
  uni.navigateTo({
    url: "/subPackages/setting/bindPhone/index",
  });
};

// 绑定微信
const handleBindWechat = () => {
  console.log('[BindWechat] 开始绑定微信流程');
  // #ifdef APP-PLUS
  plus.oauth.getServices(
    (services) => {
      console.log('[BindWechat] 获取oauth服务成功:', services);
      const weixinService = services.find((s) => s.id === "weixin");
      if (weixinService) {
        console.log('[BindWechat] 找到微信服务:', weixinService);
        weixinService.logout(
          () => {
            console.log('[BindWechat] 清除授权缓存成功');
            weixinService.authorize(
              async (event) => {
                console.log('[BindWechat] 微信授权成功, event:', event);
                const code = event.code;
                console.log('[BindWechat] 获取到的code:', code);
                try {
                  console.log('[BindWechat] 开始调用bindWechatRequest, 参数:', { code, plat: 'wx_app' });
                  const resp = await bindWechatRequest({
                    code: code,
                    plat: 'wx_app'
                  });
                  console.log('[BindWechat] bindWechatRequest返回:', resp);
                  if (resp.code === 200) {
                    ShowToast("微信绑定成功");
                    await UserModule.getUserInfo();
                  } else {
                    console.error('[BindWechat] 绑定失败, 返回:', resp);
                    ShowToast(resp.msg || "绑定失败");
                  }
                } catch (error) {
                  console.error('[BindWechat] bindWechatRequest异常:', error);
                  ShowToast("绑定失败，请重试");
                }
              },
              (error) => {
                console.error('[BindWechat] 微信授权失败:', error);
                ShowToast("微信授权失败");
              }
            );
          },
          (error) => {
            console.error('[BindWechat] 清除授权缓存失败:', error);
            // 即使清除失败也继续尝试授权
            weixinService.authorize(
              async (event) => {
                console.log('[BindWechat] 微信授权成功(清除失败后的fallback), event:', event);
                const code = event.code;
                console.log('[BindWechat] 获取到的code:', code);
                try {
                  const resp = await bindWechatRequest({
                    code: code,
                    plat: 'wx_app'
                  });
                  console.log('[BindWechat] bindWechatRequest返回:', resp);
                  if (resp.code === 200) {
                    ShowToast("微信绑定成功");
                    await UserModule.getUserInfo();
                  } else {
                    console.error('[BindWechat] 绑定失败, 返回:', resp);
                    ShowToast(resp.msg || "绑定失败");
                  }
                } catch (error) {
                  console.error('[BindWechat] bindWechatRequest异常:', error);
                  ShowToast("绑定失败，请重试");
                }
              },
              (error) => {
                console.error('[BindWechat] 微信授权失败(清除失败后的fallback):', error);
                ShowToast("微信授权失败");
              }
            );
          }
        );
      } else {
        console.error('[BindWechat] 未找到微信授权服务, services:', services);
        ShowToast("未找到微信授权服务");
      }
    },
    (error) => {
      console.error('[BindWechat] 获取oauth服务失败:', error);
      ShowToast("获取授权服务失败");
    }
  );
  // #endif

  // #ifndef APP-PLUS
  console.log('[BindWechat] 非APP平台，无法绑定');
  ShowToast("请在APP中进行微信绑定");
  // #endif
};

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
    cancelStyle: { color: "#999999" },
    confirmStyle: { color: "#95C3F7" },
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
    cancelStyle: { color: "#999999" },
    confirmStyle: { color: "red" },
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
      uni.redirectTo({ url: "/pages/welcome/index" });
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
