import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

import store from "@/store";

import { GetStorageSync, SetStorageSync } from "@/utils/storage";
export interface SystemInfoModel {
  statusBarHeight: number;
  topSafeAreaInsets: number;
  bottomSafeAreaInset: number;
  navHeight: number;
}

@Module({
  dynamic: true,
  store,
  name: "app",
})
class App extends VuexModule {
  currentTabIndex = 0;

  scrollToBottom = false;

  productTabIndex = 0;

  boxTabIndex = 0;

  loginModalStatus = false;

  userModalShow = false;

  statusBarHeight = 44;

  navBarHeight = 44;

  payType: number = GetStorageSync("payType") || 0; // 0：支付宝 1：微信

  /**
   * Feature Flags（全局功能开关）
   * - 用于控制某些入口/按钮是否展示
   * - 默认开启，支持本地持久化（便于灰度/临时下线）
   */
  featureSmashRefundEnabled: boolean =
    GetStorageSync("featureSmashRefundEnabled") ?? true;

  @Action
  getSystemInfo() {
    // #ifdef MP-WEIXIN
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect(); // 胶囊按钮信息
    const systemInfo = uni.getSystemInfoSync();
    // const windowWidth = systemInfo.windowWidth;
    const statusBar = systemInfo.statusBarHeight ?? 44;

    const navBarHeight =
      (menuButtonInfo.top - statusBar) * 2 + menuButtonInfo.height;
    console.log(
      "微信小程序导航栏高度:",
      navBarHeight,
      menuButtonInfo,
      systemInfo,
      statusBar
    );
    this.context.commit("UPDATE_STATUS_BAR_HEIGHT", statusBar);
    this.context.commit("UPDATE_NAV_BAR_HEIGHT", navBarHeight);
    // #endif
  }

  @Action
  showLoginModal() {
    this.context.commit("UPDATE_LOGIN_MODAL_STATUS", true);
  }

  @Action
  closeLoginModal() {
    this.context.commit("UPDATE_LOGIN_MODAL_STATUS", false);
  }

  @Action
  showUserModal() {
    this.context.commit("UPDATE_USERINFO_MODAL_STATUS", false);
    setTimeout(() => {
      this.context.commit("UPDATE_USERINFO_MODAL_STATUS", true);
    }, 100);
  }

  @Action
  changeCurrentTabIndex(index: number) {
    this.context.commit("UPDATE_CURRENT_TAB_INDEX", index);
  }

  @Action
  changeProductTabIndex(index: number) {
    this.context.commit("UPDATE_PRODUCT_TAB_INDEX", index);
  }

  @Action
  changeBoxTabIndex(index: number) {
    this.context.commit("UPDATE_box_TAB_INDEX", index);
  }

  @Action
  setFeatureSmashRefundEnabled(enabled: boolean) {
    this.context.commit("UPDATE_FEATURE_SMASH_REFUND_ENABLED", enabled);
  }

  @Mutation
  UPDATE_box_TAB_INDEX(index: number) {
    this.boxTabIndex = index;
  }

  @Mutation
  UPDATE_STATUS_BAR_HEIGHT(height: number) {
    this.statusBarHeight = height;
  }

  @Mutation
  UPDATE_NAV_BAR_HEIGHT(height: number) {
    this.navBarHeight = height;
  }

  @Mutation
  UPDATE_CURRENT_TAB_INDEX(index: number) {
    this.currentTabIndex = index;
  }

  @Mutation
  UPDATE_SCROLL_TO_BOTTOM(status: boolean) {
    this.scrollToBottom = status;
  }

  @Mutation
  UPDATE_PRODUCT_TAB_INDEX(index: number) {
    this.productTabIndex = index;
  }

  @Mutation
  UPDATE_LOGIN_MODAL_STATUS(status: boolean) {
    this.loginModalStatus = status;
  }

  @Mutation
  UPDATE_USERINFO_MODAL_STATUS(status: boolean) {
    this.userModalShow = status;
  }

  @Mutation
  UPDATE_PAY_TYPE(type: number) {
    this.payType = type;
    SetStorageSync("payType", type);
  }

  @Mutation
  UPDATE_FEATURE_SMASH_REFUND_ENABLED(enabled: boolean) {
    this.featureSmashRefundEnabled = enabled;
    SetStorageSync("featureSmashRefundEnabled", enabled);
  }
}

export const AppModule = getModule(App);
