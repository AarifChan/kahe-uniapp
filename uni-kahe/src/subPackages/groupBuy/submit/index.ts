import { computed, onMounted, onUnmounted, ref } from "vue";
import { AddressModel, GroupBuyCard } from "@/model";
import { eventBus } from "@/utils/event";
import { hideLoading, showLoading, ShowToast } from "@/utils";
import {
  deliverGroupBuyDetailRecord,
  purchaseGroupBuyRequest,
  submitGroupBuyRequest,
} from "@/api";
import { UserModule } from "@/store/modules/user";

export function useGroupBuySubmit() {
  const checked = ref(false);

  const selectAddress = ref<AddressModel | null>(null);

  const rewardShow = ref(false);

  const selectNum = ref(1);

  const originPrice = ref(0);

  const payPrice = ref(0);

  const purchaseCardList = ref([] as GroupBuyCard[]);

  const totalPrice = computed(() => {
    const tPrice = Number(selectNum.value) * Number(payPrice.value);
    return tPrice.toFixed(2);
  });

  const discountPrice = computed(() => {
    const dPrice =
      Number(selectNum.value) *
      (Number(originPrice.value) - Number(payPrice.value));
    return dPrice.toFixed(2);
  });

  const priceList = ref([] as { num: number; price: number }[]);

  const didTapSubmit = async (id: number) => {
    if (!checked.value) {
      ShowToast("请阅读并同意规则和须知");
      return;
    }
    if (selectNum.value === 0) {
      ShowToast("数量不能为0");
      return;
    }
    const params = {
      num: selectNum.value,
      id,
    };
    const resp = await submitGroupBuyRequest(params);
    if (resp.code === 200) {
      const pRes = await purchaseGroupBuyRequest(resp.data.orderId);
      if (pRes.data.status === 1) {
        await handleDeliveryCards(resp.data.orderId);
      } else {
        try {
          showLoading("正在支付");
          const wxRes = await UserModule.handleWxPay(resp.data.orderId, id);
          hideLoading();
          if (!wxRes) {
            await handleDeliveryCards(resp.data.orderId);
            eventBus.emit("groupBuyUpdate");
          } else {
            await ShowToast("支付失败", 1500);
          }
        } catch (e) {
          await ShowToast("支付失败", 1500);
        }
      }
    } else {
      ShowToast(resp.msg);
    }
  };

  const handleDeliveryCards = async (orderId: string) => {
    const res = await deliverGroupBuyDetailRecord(orderId);
    if (res.code === 200) {
      purchaseCardList.value = res.data.cardList;
      rewardShow.value = true;
      await ShowToast("支付成功");
    } else {
      ShowToast(res.msg);
    }
  };

  const changeNum = (isUp: boolean, limit: number) => {
    if ((isUp && selectNum.value <= 1) || (!isUp && selectNum.value >= limit)) {
      return;
    }
    isUp ? (selectNum.value -= 1) : (selectNum.value += 1);
    let tmpPrice = originPrice.value;
    const tmpPList = priceList.value.sort((n1, n2) => n2.price - n1.price);
    tmpPList.forEach((item) => {
      if (item.num <= selectNum.value) {
        tmpPrice = item.price;
      }
    });
    payPrice.value = tmpPrice;
  };

  const handleSelectNum = (item: { num: number; price: number }) => {
    selectNum.value = item.num;
    payPrice.value = item.price;
  };

  const navToSelectAddress = () => {
    uni.navigateTo({
      url: `/subPackages/mine/address/index?needSelect=${true}`,
    });
  };

  onMounted(() => {
    eventBus.on("didSelectAddress", (addressItem: AddressModel) => {
      console.log("didSelectAddress:", addressItem);
      selectAddress.value = addressItem;
    });
  });
  onUnmounted(() => {
    eventBus.off("didSelectAddress");
  });

  return {
    purchaseCardList,
    discountPrice,
    originPrice,
    priceList,
    selectNum,
    payPrice,
    totalPrice,
    rewardShow,
    selectAddress,
    checked,
    changeNum,
    didTapSubmit,
    handleSelectNum,
    navToSelectAddress,
  };
}
