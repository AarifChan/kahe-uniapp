import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

import store from "@/store";
import {
  completeRechargeRequest,
  createRechargePlanRequest,
  getCouponListRequest,
  getRechargePlanRequest,
  loginByMobile,
  loginByPassword,
  loginByWxApp,
  loginRequest,
  logoutRequest,
  orderCancelRequest,
  orderInfoRequest,
  orderSubmitRequest,
  receiveVipRequest,
  userInfoRequest,
  vipLevelListRequest,
} from "@/api/";
import {
  GetStorageSync,
  RemoveStorageSync,
  SetStorageSync,
} from "@/utils/storage";
import { showLoading, ShowToast } from "@/utils/Toast";
import type {
  CouponRequestParams,
  FavoriteModel,
  LoginRequestParams,
  OrderSubmitParams,
  OrderWechatMpPayParams,
  OrderWechatPayParams,
  PageParams,
  RechargeModel,
  UICouponModel,
  UIDayVIPItem,
  UserInfo,
  VipsLevelModel,
} from "@/model/";
import { formatPrice } from "@/utils/tools/util";
import { parseTime } from "@/utils/tools";
import { AppModule } from "@/store/modules/app";
import type { LoginParams } from "@/components/login/types";
import { currentEnv } from "@/utils";
import { eventBus } from "@/utils/event";
import { pollPaymentStatus } from "@/utils/pay";

export async function checkOrderInfo(orderId: string) {
  // let timer: number;

  // eslint-disable-next-line no-async-promise-executor,promise/param-names
  return new Promise(async (resolve, _) => {
    let isSucceed = false;
    for (let i = 0; i < 6; i++) {
      const resp = await checkInfoRequest(orderId);
      if (resp) {
        resolve(true);
        isSucceed = true;
        break;
      }
    }
    if (!isSucceed) {
      resolve(false);
    }
  });
}

async function checkInfoRequest(orderId: string) {
  // eslint-disable-next-line no-async-promise-executor,promise/param-names
  return new Promise(async (resolve, _) => {
    setTimeout(async () => {
      const res = await orderInfoRequest(orderId);
      if (res.code === 200) {
        if (res.data.payed) {
          resolve(true);
          return;
        }
      }
      resolve(false);
    }, 5000);
  });
}

@Module({
  dynamic: true,
  store,
  name: "user",
})
class User extends VuexModule {
  token = GetStorageSync("token") || null;

  loginStatus = true;

  code = "";

  userInfo: UserInfo = <UserInfo>{};

  vipLevelsModel: VipsLevelModel[] = Array<VipsLevelModel>();

  receivedVipShow = false;

  couponList: UICouponModel[] = Array<UICouponModel>();

  vipDayList: UIDayVIPItem[] = Array<UIDayVIPItem>();

  rechargeList: RechargeModel[] = Array<RechargeModel>();

  favoriteList: FavoriteModel[] = Array<FavoriteModel>();

  isRegister = false;

  @Action
  async prepareReady() {
    this.preLogin();
  }

  @Action
  getCode() {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: "weixin",
      success: (result) => {
        this.context.commit("UPDATE_LOGIN_CODE", result.code);
        // console.log('code:', self.code);
      },
      fail: (err) => {
        console.log(err);
      },
    });
    // #endif
  }

  @Action
  preLogin() {
    if (this.token) {
      UserModule.getUserInfo();
      return;
    }
    // #ifdef MP-WEIXIN
    uni.login({
      provider: "weixin",
      success: async (result) => {
        const code = result.code;
        console.log("code:", code);
        const logRes = await loginRequest({
          code: code,
          plat: import.meta.env.VITE_APP_PLATFORM || "wx_ma_3",
        });
        if (logRes.code === 200) {
          this.context.commit("UPDATE_TOKEN", logRes.data.token);
          const resp = await userInfoRequest();
          this.context.commit("UPDATE_LOGIN_STATUS", true);
          if (resp.code === 200 && resp.data.phone && resp.data.phone !== "") {
            this.context.commit("UPDATE_USERINFO", resp.data);
            this.context.commit("UPDATE_LOGIN_STATUS", true);
            eventBus.emit("didLogin", true);
            this.getUserInfo();
          } else {
            console.log("用户未注册1");
            eventBus.emit("needLogin", true);
            this.context.commit("UPDATE_TOKEN", null);
            this.context.commit("UPDATE_LOGIN_STATUS", false);
          }
        } else {
          console.log("用户未注册2");
          eventBus.emit("needLogin", true);
          this.context.commit("UPDATE_TOKEN", null);
          this.context.commit("UPDATE_LOGIN_STATUS", false);
        }
      },
      fail: (err) => {
        console.log(err);
        eventBus.emit("needLogin", true);
        this.context.commit("UPDATE_TOKEN", null);
        this.context.commit("UPDATE_LOGIN_STATUS", false);
      },
    });
    // #endif
  }

  @Action
  async logout(isShow = true) {
    this.context.commit("UPDATE_LOGIN_STATUS", false);

    if (isShow) {
      // AppModule.showLoginModal();
      uni.navigateTo({
        url: "/pages/login/index",
      });
    } else {
      uni.navigateBack();
      await logoutRequest();
      this.context.commit("UPDATE_TOKEN", undefined);
      this.context.commit("UPDATE_LOGIN_STATUS", false);
    }
  }

  @Action
  async handlePhoneLogin(params: LoginParams) {
    const loginParams = {
      code: this.code,
      phoneIv: params.iv,
      phoneEncryptedData: params.encryptedData,
      plat: import.meta.env.VITE_APP_PLATFORM || "wx_ma_3",
    } as LoginRequestParams;

    const resp = await loginByWxApp(loginParams);

    if (resp.code === 200) {
      this.context.commit("UPDATE_TOKEN", resp.data.token);
      this.context.commit("UPDATE_LOGIN_STATUS", true);
      await this.getUserInfo();
      return null;
    } else {
      this.getCode();
      return resp.msg;
    }
  }

  @Action
  async handleLoginByPhone(params: {
    phone: string;
    password: string;
    type: number;
  }) {
    const type = params.type;
    const logRes =
      type === 0 ? await loginByMobile(params) : await loginByPassword(params);
    if (logRes.code === 200) {
      this.context.commit("UPDATE_TOKEN", logRes.data.token);
      this.context.commit("UPDATE_LOGIN_STATUS", true);
      return false;
    } else {
      this.getCode();
      return logRes.msg;
    }
  }

  /**
   * APP 端微信一键登录（用 code 换 token）
   * - 由页面侧先调用 uni.login(provider:'weixin') 拿到 code
   */
  @Action
  async handleAppWechatLogin(params: { code: string }) {
    const logRes = await loginByWxApp({
      code: params.code,
      plat: "wx_app",
    } as LoginRequestParams);

    if (logRes.code === 200) {
      this.context.commit("UPDATE_TOKEN", logRes.data.token);
      this.context.commit("UPDATE_LOGIN_STATUS", true);
      await this.getUserInfo();
      return null;
    } else {
      return logRes.msg;
    }
  }

  @Action
  async login() {
    showLoading("正在登陆");
    // eslint-disable-next-line promise/param-names
    return new Promise((resolve, _) => {
      uni.getUserProfile({
        provider: "weixin",
        desc: "用于完善会员资料",
        success: async (res) => {
          const code = this.code;
          if (code) {
            const logRes = await loginRequest({
              code: code,
              iv: res.iv,
              encryptedData: res.encryptedData,
              plat: import.meta.env.VITE_APP_PLATFORM || "wx_ma_3",
            });
            if (logRes.code === 200) {
              this.context.commit("UPDATE_TOKEN", logRes.data.token);
              this.context.commit("UPDATE_LOGIN_STATUS", true);
              await this.getUserInfo();
              resolve(null);
            } else {
              this.getCode();
              resolve(logRes.msg);
            }
          } else {
            this.getCode();
            resolve("Code is null:" + this.code);
          }
        },
        fail: async (_) => {
          this.getCode();
          resolve("登陆失败");
        },
      });
    });
  }

  @Action
  checkLogin() {
    if (this.loginStatus) {
      return true;
    }
    uni.navigateTo({
      url: "/pages/login/index",
    });
    return false;
  }

  @Action
  async getUserInfo() {
    try {
      const resp = await userInfoRequest();
      console.log("userInfo:", resp.code, resp.data);
      if (resp?.code === 200) {
        this.context.commit("UPDATE_USERINFO", resp.data);
        this.context.commit("UPDATE_LOGIN_STATUS", true);
        await this.getFavorite();
        if (resp.data.receivedVip !== 1) {
          await this.getVipReceived();
        }
      } else {
        this.context.commit("UPDATE_LOGIN_STATUS", false);
        // this.prepareReady();
      }
    } catch (e) {
      console.log("getUserInfo:err", e);
    }
  }

  @Action
  async getVipReceived() {
    const vipRes = await receiveVipRequest();
    if (vipRes.code === 200) {
      const list = Array<UIDayVIPItem>();

      for (const item of vipRes.data) {
        const type = item.id === 3 ? 1 : item.id > 10000 ? 2 : 3; // 1: 碎片 2: 手办 3: 优惠券

        let image = "";

        if (item.id === 1) {
          image = "https://jms.85gui7.com/kahe-202510/images/vip-item1.png";
        } else if (item.id >= 1000 && item.id < 10000) {
          image = "https://jms.85gui7.com/swcw/common/coupon.jpg";
        } else if (item.id === 2) {
          image = "https://jms.85gui7.com/kahe-202510/images/vip-item3.png";
        } else if (item.id === 6) {
          image = "https://jms.85gui7.com/swcw/common/integral.jpg";
        } else if (item.id >= 10000) {
          image = item.logo;
        }

        list.push({
          type: type,
          name: item.name,
          num: item.num,
          id: item.id,
          image: image,
        });
      }
      this.context.commit("UPDATE_DAY_VIP_LIST", list);
      this.context.commit("UPDATE_RECEIVED_VIP_SHOW", true);
    }
  }

  @Action
  addFavorite(item: FavoriteModel) {
    // let list: FavoriteModel[] = []
    const index = this.favoriteList.findIndex((n) => n.id === item.id);

    if (index !== -1) {
      // 这里要删除
      this.favoriteList.splice(index, 1);
      ShowToast("移除收藏");
    } else {
      this.favoriteList.unshift(item);
      ShowToast("收藏成功");
    }

    this.context.commit("UPDATE_FAVORITE_LIST", this.favoriteList);
  }

  @Action
  async getFavorite() {
    const data = uni.getStorageSync("favorite");
    if (data) {
      const items = JSON.parse(data);
      if (items && items.length > 0) {
        this.context.commit("UPDATE_FAVORITE_LIST", items);
      }
    }
  }

  @Action
  async getVipLevelList(
    params: PageParams = {
      page: 1,
      limit: 1000,
    }
  ) {
    const resp = await vipLevelListRequest(params);
    if (resp.code === 200) {
      this.context.commit("UPDATE_VIP_LEVEL_MODEL", resp.data.content);
      return resp.data.totalElements;
    } else {
      return 0;
    }
  }

  @Action
  async getCouponList(params: CouponRequestParams) {
    const resp = await getCouponListRequest(params);
    if (resp.code === 200) {
      const list: UICouponModel[] =
        params.page === 1 ? Array<UICouponModel>() : this.couponList;
      for (const item of resp.data.content) {
        const startTime = parseTime(item.createTime, "{y}.{m}.{d}") ?? "";
        list.push({
          title: item.title,
          id: item.id,
          type: item.type,
          useMinPrice: formatPrice(item.useMinPrice),
          price: formatPrice(item.couponPrice),
          time: startTime + "-" + item.endTime,
          status: item.status,
        });
      }
      this.context.commit("UPDATE_COUPON_LIST", list);
      return Math.ceil(resp.data.totalElements / params.limit);
    } else {
      return 0;
    }
  }

  @Action
  async handleWxPay(orderId: string, pid = 0) {
    // eslint-disable-next-line no-async-promise-executor,promise/param-names
    return new Promise(async (resolve, _) => {
      let payType = "";
      // #ifdef MP-WEIXIN
      payType = import.meta.env.VITE_APP_PLATFORM || "wx_ma_3";
      // #endif

      // #ifdef H5
      payType = AppModule.payType === 1 ? "wx_h5" : "ali_h5";

      if (currentEnv() === "h5-weixin" || currentEnv() === "mp-weixin") {
        resolve("请在别的浏览器尝试");
        return;
      }

      // #endif

      // #ifdef APP
      console.log("[APP Pay] handleWxPay start, orderId:", orderId, "pid:", pid);
      console.log("[APP Pay] payType:", payType);
      payType = AppModule.payType === 1 ? "wx_app" : "ali_app";

      // #endif

      const params = {
        from: "routine",
        orderId: orderId,
        payType: payType,
      } as OrderSubmitParams;
      if (payType === "ali_h5") {
        let aliReturnUrl = window.location.href;
        if (pid) {
          aliReturnUrl += "&pid=" + pid;
        }
        params.aliReturnUrl = aliReturnUrl + `&orderId=${orderId}`;
      }

      // #ifdef APP
      console.log("[APP Pay] orderSubmit params:", JSON.stringify(params));
      // #endif

      const orderResp = await orderSubmitRequest(params);

      // #ifdef APP
      console.log("[APP Pay] orderSubmit response:", JSON.stringify(orderResp));
      // #endif

      if (orderResp.code !== 200) {
        await orderCancelRequest(orderId);
        console.log("[APP Pay] alipay orderCancelRequest orderString:", orderResp.msg);
        resolve(orderResp.msg + "error~");
        ShowToast(orderResp.msg);
        return;
      }
      if (payType === "ali_app") {
        const orderString = orderResp.data.jsConfig?.orderString ?? "";

        // #ifdef APP
        console.log(`[APP Pay] alipay orderString:${orderString}`);
        // #endif

        console.log("String Length:", orderString.length);
        uni.requestPayment({
          provider: "alipay",
          orderInfo: orderString,
          success: async (result) => {
            console.log("[APP Pay] alipay success:", JSON.stringify(result));
            ShowToast("支付成功");

            resolve(null);
          },
          fail: async (err: any) => {
            console.log("[APP Pay] alipay fail:", JSON.stringify(err));
            await orderCancelRequest(orderId);
            resolve("取消支付" + JSON.stringify(err));
          },
        });
      } else if (payType === "ali_h5") {
        const url = orderResp.data.jsConfig.url;
        if (url) {
          window.location.href = url;
        } else {
          resolve("支付出错，请联系客服");
        }
      } else {
        const payParams = orderResp.data.jsConfig as OrderWechatPayParams;

        // #ifdef APP
        console.log("[APP Pay] wx payParams:", JSON.stringify(payParams));
        // #endif

        let orderInfo = {};
        if (payType === "wx_app") {
          orderInfo = {
            appid: payParams.appid, // 应用ID（AppID）
            partnerid: payParams.partnerid, // 商户号（PartnerID）
            prepayid: payParams.prepayid, // 预支付交易会话ID
            package: payParams.package, // 固定值
            noncestr: payParams.noncestr, // 随机字符串
            timestamp: payParams.timestamp, // 时间戳（单位：秒）
            sign: payParams.sign, // 签名，这里用的 MD5 签名
          };

          // #ifdef APP
          console.log("[APP Pay] wx_app orderInfo:", JSON.stringify(orderInfo));
          // #endif

          uni.requestPayment({
            provider: "wxpay",
            orderInfo: JSON.stringify(orderInfo),
            success: async (result) => {
              console.log("[APP Pay] wxpay success:", JSON.stringify(result));
              ShowToast("支付成功");
              pollPaymentStatus(orderId, 5000, 10)
                .then((res) => {
                  resolve(res === "success" ? null : "订单查询失败");
                })
                .catch((err) => {
                  resolve("订单查询失败");
                });
            },
            fail: async (err: any) => {
              console.log("[APP Pay] wxpay fail:", JSON.stringify(err));
              await orderCancelRequest(orderId);
              resolve("取消支付");
            },
          });
        } else {
          const payParams = orderResp.data.jsConfig as OrderWechatMpPayParams;

          // #ifdef APP
          console.log("[APP Pay] wx_mp payParams:", JSON.stringify(payParams));
          // #endif

          uni.requestPayment({
            provider: "wxpay",
            nonceStr: payParams.nonceStr,
            package: payParams.package,
            paySign: payParams.paySign,
            signType: payParams.signType,
            timeStamp: payParams.timeStamp,
            orderInfo: orderId,
            success: async (result) => {
              console.log("[APP Pay] wxpay mp success:", JSON.stringify(result));
              pollPaymentStatus(orderId, 5000, 10)
                .then((res) => {
                  resolve(res === "success" ? null : "订单查询失败");
                })
                .catch((err) => {
                  resolve("订单查询失败");
                });
            },
            fail: async (_) => {
              console.log("[APP Pay] wxpay mp fail");
              await orderCancelRequest(orderId);
              resolve("取消支付");
            },
          });
        }
      }
    });
  }

  @Action
  async getRechargeList() {
    const resp = await getRechargePlanRequest();

    if (resp.code === 200) {
      this.context.commit("UPDATE_RECHARGE_LIST", resp.data);
    } else {
      this.context.commit("UPDATE_RECHARGE_LIST", []);
    }
  }

  @Action
  async rechargePlanAction(rechargeId: number) {
    const resp = await createRechargePlanRequest(rechargeId);
    if (resp.code === 200) {
      const orderId = resp.data.orderId;
      const wxRes = await UserModule.handleWxPay(orderId);
      console.log("wxRes:", wxRes);
      if (wxRes) {
        return wxRes + "";
      } else {
        await this.completeRechargeAction(orderId);
        return null;
      }
    } else {
      return resp.msg;
    }
  }

  @Action
  async completeRechargeAction(orderId: string) {
    const resp = await completeRechargeRequest(orderId);
    if (resp.code === 200) {
      await this.getUserInfo();
      return null;
    } else {
      return resp.msg;
    }
  }

  @Mutation
  UPDATE_RECHARGE_LIST(list: RechargeModel[]) {
    this.rechargeList = list;
  }

  @Mutation
  UPDATE_LOGIN_STATUS(status: boolean) {
    this.loginStatus = status;
    if (!status) {
      this.userInfo = <UserInfo>{};
      RemoveStorageSync("token");
      this.token = null;
    }
  }

  @Mutation
  UPDATE_LOGIN_CODE(code: string) {
    this.code = code;
  }

  @Mutation
  UPDATE_TOKEN(token: string) {
    this.token = token;
    SetStorageSync("token", token);
  }

  @Mutation
  UPDATE_USERINFO(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  @Mutation
  UPDATE_VIP_LEVEL_MODEL(model: VipsLevelModel[]) {
    this.vipLevelsModel = model;
  }

  @Mutation
  UPDATE_RECEIVED_VIP_SHOW(show: boolean) {
    this.receivedVipShow = show;
  }

  @Mutation
  UPDATE_COUPON_LIST(list: UICouponModel[]) {
    this.couponList = list;
  }

  @Mutation
  UPDATE_DAY_VIP_LIST(list: UIDayVIPItem[]) {
    this.vipDayList = list;
  }

  @Mutation
  UPDATE_FAVORITE_LIST(list: FavoriteModel[]) {
    this.favoriteList = list;
    const items = JSON.stringify(list);
    uni.setStorageSync("favorite", items);
  }
}

export const UserModule = getModule(User);
