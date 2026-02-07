import { ref, watch } from "vue";
import { UserModule } from "@/store/modules/user";
import { ShowToast } from "@/utils";
import { AppModule } from "@/store/modules/app";
import { eventBus } from "@/utils/event";

export function useLogin() {
  const loginShow = ref(false);
  const showVip = ref(false);
  const infoShow = ref(false);
  const handleLogin = async (params: any) => {
    // #ifdef MP-WEIXIN
    const resp = await UserModule.handlePhoneLogin(params);

    if (resp) {
      await ShowToast(resp + "", 2000);
      loginShow.value = false;
      setTimeout(() => {
        loginShow.value = true;
      }, 300);
    } else {
      await ShowToast("登陆成功", 2000);
      loginShow.value = false;
      eventBus.emit("didLogin", true);
    }
    setTimeout(() => {
      loginShow.value = false;
    }, 1000);
    // #endif

    // #ifndef MP-WEIXIN
    uni.navigateTo({
      url: "/pages/login/index",
    });
    loginShow.value = false;
    // #endif
  };

  eventBus.on("needLogin", async (_: any) => {
    console.log("needLogin->:", UserModule.loginStatus);

    if (!UserModule.loginStatus && !loginShow.value) {
      loginShow.value = true;
    }
  });

  watch(
    () => UserModule.receivedVipShow,
    (value) => {
      showVip.value = value;
    }
  );

  watch(
    () => AppModule.userModalShow,
    (val) => {
      if (val) {
        infoShow.value = true;
      }
    }
  );

  watch(
    () => UserModule.loginStatus,
    (val) => {
      if (val) {
        // loginShow.value = false
        if (
          !UserModule.userInfo.nickname ||
          UserModule.userInfo.nickname === "微信用户" ||
          !UserModule.userInfo.avatar
        ) {
          infoShow.value = true;
        }
      }
    }
  );
  /* 登录弹窗的时候重新获取code */
  watch(
    () => loginShow.value,
    (value) => {
      console.log("loginShow:", value);
      if (value) {
        UserModule.getCode();
      }
    }
  );
  return {
    loginShow,
    handleLogin,
    showVip,
    infoShow,
  };
}
