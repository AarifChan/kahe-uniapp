import { ref } from "vue";
import {
  ChallengeBox,
  getList,
  getDetail,
  getLog,
  playChallenge,
  submitChallenge,
  ChallengeDetail,
  ChallengeGoodsItem,
  signChallenge,
} from "./api";
import type { UIProductPayModel } from "@/model";
import { hideLoading, showLoading, ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";

export function useChallenge() {
  const dataList = ref<ChallengeBox[]>([]);

  const detail = ref<ChallengeDetail | null>(null);

  const rewardList = ref<ChallengeGoodsItem[]>([]);
  const payItem = ref({} as UIProductPayModel);

  const showPay = ref(false);

  const showSettle = ref(true);

  const logParams = ref({
    page: 1,
    pageSize: 10,
  });

  const getDataList = () => {
    getList({}).then((data) => {
      console.log("data:", data.data.content);
      if (data.code === 200) {
        dataList.value = data.data.content;
      } else {
        dataList.value = [];
      }
    });
  };

  const getChallengeDetail = async (id: number) => {
    const data = await getDetail(id);
    if (data.code === 200) {
      detail.value = data.data;
      rewardList.value = detail.value.box.rewards.reverse();
    } else {
      detail.value = null;
      rewardList.value = [];
    }
  };

  const getLogRecord = async () => {
    const boxId = detail.value?.box.id;
    if (!boxId) {
      return;
    }
    const data = await getLog({
      bid: boxId,
      page: logParams.value.page,
      limit: logParams.value.pageSize,
    });
    console.log("log:", data);
  };

  const handleSubmitChallenge = async () => {
    const boxId = detail.value?.box.id;
    if (!boxId) {
      return;
    }
    const res = await submitChallenge(boxId);
    if (res.code === 200) {
      const data = res.data;
      payItem.value = {
        usedIntegral: data.usedIntegral,
        id: data.orderId,
        num: 1,
        image: detail.value?.box?.logo ?? "",
        title: detail.value?.box?.name ?? "",
        totalPrice: data.totalPrice,
        payPrice: data.payPrice,
        isIntegral: detail.value?.box?.payType === 8,
        price: `${detail.value?.box?.price}`,
        usedPrice:
          Number(data.usedMoney) +
          Number(data.usedCoin) +
          Number(data.usedIntegral),
        usedMoney: data.usedMoney,
        usedCoin: data.usedCoin,
        fromMall: false,
        orderId: data.orderId,
      };
      showPay.value = true;
    }
  };

  const handlePayChallenge = async () => {
    const orderId = payItem.value.orderId;
    if (!orderId) {
      return;
    }
    const res = await signChallenge({
      orderId: orderId,
    });
    if (res.code === 200) {
      if (res.data.status === 0) {
        showLoading("正在支付");
        const wxRes = await UserModule.handleWxPay(orderId);
        hideLoading();
        if (!wxRes) {
          console.log("支付成功");
          showSettle.value = true;
        } else {
          await ShowToast(wxRes ?? "支付失败", 1500);
        }
      } else {
        showPay.value = true;
        showSettle.value = true;
      }
    } else {
      ShowToast(res.msg);
    }
  };

  const getLevelImage = (index: number) => {
    return `https://jms.85gui7.com/tags/level${index}.png`;
  };

  return {
    showPay,
    getLevelImage,
    dataList,
    rewardList,
    detail,
    payItem,
    showSettle,
    handlePayChallenge,
    getDataList,
    getLogRecord,
    handleSubmitChallenge,
    getChallengeDetail,
  };
}
