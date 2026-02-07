import { ref } from "vue";
import { getCouponListRequest, receiveCouponRequest } from "@/api/coupon";
import { CouponModel } from "@/model";
import { ShowToast } from "@/utils";

export function useDailyCoupon() {
  const modalShow = ref(false);
  const isAll = ref(true);
  const dataList = ref([] as CouponModel[]);
  const merchantId = ref<string | undefined>(undefined);
  const total = ref(0);
  const pageParams = ref({
    page: 1,
    limit: 10,
  });

  const getDailyCouponList = async (merchantId: string | undefined) => {
    const params = {
      ...pageParams.value,
      merchantId: merchantId !== undefined ? merchantId : null,
    };
    const resp = await getCouponListRequest(params);
    if (resp.code === 200) {
      dataList.value =
        pageParams.value.page === 1
          ? resp.data.content
          : [...dataList.value, ...resp.data.content];
      total.value = resp.data.totalElements;
    } else {
      dataList.value = [];
      total.value = 0;
    }
  };

  const tabDidChange = () => {
    pageParams.value.page = 1;
    getData();
  };

  const getData = () => {
    if (!isAll.value && merchantId.value) {
      getDailyCouponList(merchantId.value);
    } else {
      getDailyCouponList(undefined);
    }
  };

  const handleScrollToLower = () => {
    if (total.value > pageParams.value.page * pageParams.value.limit) {
      pageParams.value.page++;
      getData();
    }
  };

  const handleClickItem = async (item: CouponModel) => {
    if (item.receiveStatus) {
      return;
    }
    const resp = await receiveCouponRequest({ id: item.id });
    if (resp.code === 200) {
      modalShow.value = true;
      getData();
    } else {
      ShowToast(resp.msg);
    }
  };

  return {
    merchantId,
    getData,
    tabDidChange,
    dataList,
    handleScrollToLower,
    handleClickItem,
    modalShow,
    isAll,
  };
}
