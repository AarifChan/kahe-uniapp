import { onMounted, ref } from "vue";
import {
  type GiftListModel,
  getDiscountList,
  purchaseDiscountItem,
} from "@/api/gift";
import { ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
export function useDiscount() {
  const list = ref([] as GiftListModel[]);

  const params = ref({
    page: 1,
    limit: 10,
  });
  const total = ref(0);
  const getList = async () => {
    const resp = await getDiscountList(params.value);
    console.log(resp);
    if (resp.code === 200) {
      list.value = resp.data.content;
      total.value = resp.data.totalElements;
    }
  };

  const scrollToLower = async () => {
    if (total.value > params.value.page * params.value.limit) {
      params.value.page++;
      await getList();
    }
  };
  const didClickItem = async (item: GiftListModel) => {
    const resp = await purchaseDiscountItem(item.id);
    if (resp.code === 200) {
      await UserModule.handleWxPay(resp.data.orderId);
    } else {
      ShowToast(resp.msg);
    }
  };

  const needPayAgain = (item: GiftListModel) => {
    if (!item.expireTime) {
      return false;
    }
    const expireDate = new Date(item.expireTime);
    const nowDate = new Date();
    return expireDate.getTime() > nowDate.getTime();
  };

  const lastDay = (endTime: string | undefined) => {
    if (!endTime) {
      return 0;
    }
    const tmp = Number(
      (dayjs(endTime).valueOf() - dayjs().valueOf()) / 1000 / 3600 / 24
    );
    return tmp > 0 ? tmp : 0;
  };

  onMounted(async () => {
    await getList();
  });

  return {
    list,
    lastDay,
    scrollToLower,
    didClickItem,
    needPayAgain,
  };
}
