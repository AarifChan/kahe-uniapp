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
  settleChallenge,
  ChallengeOrderGate,
  LogListObject,
  homeChallenge,
  BarrageItem,
} from "./api";
import type { UIProductPayModel } from "@/model";
import { hideLoading, showLoading, ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";

export function useChallenge() {
  const dataList = ref<ChallengeBox[]>([]);

  const barrageList = ref<BarrageItem[]>([]);

  const detail = ref<ChallengeDetail | null>(null);

  const rewardList = ref<ChallengeGoodsItem[]>([]);

  const payItem = ref({} as UIProductPayModel);

  const logsList = ref<LogListObject[]>([]);

  const currentSign = ref<ChallengeOrderGate | null>(null);

  const showPay = ref(false);

  const showSettle = ref(false);

  const showResult = ref(false);

  const isOver = ref(false);

  const trapList = ref<number[]>([]);

  const logParams = ref({
    page: 1,
    pageSize: 10,
    gate: -1,
  });

  const hasMore = ref(true);

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

  const getHomeData = async () => {
    const res = await homeChallenge();
    if (res.code === 200) {
      barrageList.value = res.data.barrageList || [];
      dataList.value = res.data.boxList?.content || [];
    }
  };

  const getChallengeDetail = async (id: number) => {
    const data = await getDetail(id);
    if (data.code === 200) {
      detail.value = data.data;

      rewardList.value = [...detail.value.box.rewards].reverse();
      currentSign.value = data.data?.current ?? null;
    } else {
      detail.value = null;
      rewardList.value = [];
    }
  };

  const getLogRecord = async (isAppend = false) => {
    const boxId = detail.value?.box.id;
    if (!boxId) {
      return;
    }
    if (!isAppend) {
      logParams.value.page = 1;
      hasMore.value = true;
    }
    const data = await getLog({
      bid: boxId,
      page: logParams.value.page,
      limit: logParams.value.pageSize,
      gate: logParams.value.gate === -1 ? undefined : logParams.value.gate,
    });
    if (data.code === 200) {
      const list = data.data.content ?? [];
      if (isAppend) {
        logsList.value.push(...list);
      } else {
        logsList.value = list;
      }
      hasMore.value = list.length >= logParams.value.pageSize;
      if (hasMore.value) {
        logParams.value.page++;
      }
    } else {
      if (!isAppend) {
        logsList.value = [];
      }
      hasMore.value = false;
    }
    console.log("log:", data);
  };
  const handlePlayItem = async (index: number) => {
    const boxId = currentSign.value?.id;

    if (!boxId) {
      return;
    }
    const res = await playChallenge({
      id: boxId,
      pos: index,
    });
    if (res.code === 200) {
      currentSign.value = res.data;
      if (res.data.status === 3 || res.data.status === 2) {
        isOver.value = true;
      }
      if (res.data.status === 3) {
        currentSign.value = {
          ...currentSign.value,
          gate: 0,
        };
      }
    } else {
      isOver.value = true;
      ShowToast(res.msg);
    }
  };

  const handleSettleChallenge = async () => {
    if (isOver.value) {
      showSettle.value = false;
      showResult.value = true;
      return;
    }
    const boxId = currentSign.value?.id;
    if (!boxId) {
      showSettle.value = false;
      return;
    }
    const res = await settleChallenge(boxId);
    if (res.code === 200) {
      showSettle.value = false;
      isOver.value = true;
      showResult.value = true;
    } else {
      ShowToast(res.msg);
    }
  };

  const handleSubmitChallenge = async () => {
    if (detail.value?.current) {
      currentSign.value = detail.value.current;
      showSettle.value = true;
      return;
    }
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
    } else {
      ShowToast(res.msg);
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
    currentSign.value = res.data;
    isOver.value = false;
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
        showPay.value = false;
        showSettle.value = true;
      }
    } else {
      ShowToast(res.msg);
    }
  };

  return {
    isOver,
    trapList,
    showResult,
    showPay,
    dataList,
    barrageList,
    rewardList,
    detail,
    payItem,
    logsList,
    currentSign,
    logParams,
    hasMore,
    showSettle,
    handleSettleChallenge,
    handlePlayItem,
    handlePayChallenge,
    getDataList,
    getHomeData,
    getLogRecord,
    handleSubmitChallenge,
    getChallengeDetail,
  };
}
export const getLevelImage = (index: number) => {
  return `https://jms.85gui7.com/tags/level${index}.png`;
};
