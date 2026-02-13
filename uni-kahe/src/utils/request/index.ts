// / <reference path = "../typings/methods.ts"> />
import "../typings/methods";
import { RequestConfig } from "@/config";
import { showLoading } from "../index";

import { ShowToast } from "@/utils/Toast";
import { bulidURL } from "@/utils/tools/url";
import { UserModule } from "@/store/modules/user";

import { eventBus } from "@/utils/event";
import { isObject, removeNullFields } from "@/utils/tools";
const createKey = (path: string, data: any) => `${JSON.stringify(data)}${path}`;

const requestList: Map<string, UniApp.RequestTask> = new Map();

const loadingBox: null | (() => null) = null;

const RequestMethod: RequestFunc.request = (
  { methodType = "GET", data = {}, url = "" },
  {
    baseUrl = RequestConfig.baseUrl,
    header = {},
    loading = false,
    dataType = "json",
    urlAppend = true,
  } = {}
) => {
  if (loading && loadingBox === null) {
    // loadingBox = showLoading()
  }
  return new Promise((resolve, _) => {
    const requestKey = createKey(url, data);
    if (isObject(data)) {
      data = removeNullFields(data);
    }

    if (urlAppend) {
      url = bulidURL(url, data);
    }
    if (UserModule.token) {
      header = {
        Authorization: " Bearer " + UserModule.token,
      };
    }
    header["content-type"] = "application/json;charset=UTF-8";
    header["Content-type"] = "application/json;charset=UTF-8";
    header.Accept = "*/*";

    uni.request({
      url: `${baseUrl}/${url}`,
      // @ts-ignore
      data: data,
      header: header,
      method: methodType,
      timeout: 3000,
      dataType: dataType,
      success: (res) => {
        // console.log("response:", res)
        // console.log("request succeed:", res.data)
        const obj = res.data as any;
        const code = obj.status as number;

        if (code === 401 && methodType === "POST") {
          eventBus.emit("needLogin", true);
          UserModule.logout();
        }
        resolve({
          code: code,
          data: obj.data,
          msg: obj.msg,
        });
      },
      fail: (err) => {
        console.error("request err", err);
        ShowToast(err.errMsg);
        resolve({
          code: 404,
          data: (err.errMsg + "") as any,
          msg: "error",
        });
      },
      complete: () => {
        // requestList.delete(requestKey)
        // if (loadingBox !== null && requestList.size === 0){
        //     loadingBox = loadingBox()
        // }
      },
    });
    // requestList.get(requestKey)?.abort()
    // requestList.set(requestKey, requestClose)
  });
};

/* get 请求 */
export const get = <R = AnyObject, T = AnyObject>(
  url: string,
  data?: T,
  config?: RequestFunc.RequestConfig
) =>
  RequestMethod<R, T>(
    {
      methodType: "GET",
      url: url,
      data,
    },
    config
  );

export const post = <R = AnyObject, T = AnyObject>(
  url: string,
  data?: T,
  config?: RequestFunc.RequestConfig
) =>
  RequestMethod<R, T>(
    {
      methodType: "POST",
      url: url,
      data,
    },
    config
  );
