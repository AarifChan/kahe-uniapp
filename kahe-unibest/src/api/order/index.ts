import { get, post } from "@/utils/request";
import type {
  OrderInfo,
  OrderSubmitParams,
  OrderSubmitResponse,
} from "@/model/order";

/* 确认订单 */
export const orderSubmitRequest = (params: OrderSubmitParams) => {
  return post<OrderSubmitResponse>("pay/submit", params);
};

/* 支付订单 */
export const orderInfoRequest = (orderId: string) => {
  return get<OrderInfo>("pay/info", {
    orderId,
  });
};

/* 取消订单 */
export const orderCancelRequest = (orderId: string | number) => {
  return post("pay/cancel", {
    orderId,
  });
};

export const orderTestPayRequest = (orderId: string) => {
  return get("pay/pay", {
    orderId,
    secret: "xlGqRYCG1kynBE1Py6vdTUxZjCZJUsVD",
  });
};
