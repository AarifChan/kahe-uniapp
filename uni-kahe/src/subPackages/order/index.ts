import { ref } from "vue";
import { getPayedBlindBoxOrder, orderDetailRequest } from "./api";
import { OrderDetailInfo, ProductOrderModel } from "./model";
import { ShowToast } from "@/utils";

export function usePayedOrder() {
  const params = ref({
    page: 1,
    limit: 10,
  });

  const total = ref(0);

  const dataList = ref<ProductOrderModel[]>([]);

  const orderDetail = ref<OrderDetailInfo | undefined>(undefined);

  const getOrderDetail = async (orderId: string) => {
    const resp = await orderDetailRequest(orderId);

    if (resp.code === 200) {
      console.log("getOrderDetail:", resp);
      orderDetail.value = resp.data;
    }
  };

  const getPayedOrderList = async () => {
    const resp = await getPayedBlindBoxOrder(params.value);
    console.log("getPayedOrderList:", resp);
    if (resp.code === 200) {
      let tmpList = resp.data.content;

      dataList.value =
        params.value.page === 1 ? tmpList : [...dataList.value, ...tmpList];
      total.value = resp.data.totalElements;
    } else {
      dataList.value = [];
      total.value = 0;
    }
  };

  const didClickItem = (item: ProductOrderModel) => {
    uni.navigateTo({
      url: `/subPackages/order/detail?orderId=${item.orderId}`,
    });
  };

  const handleScrollToLower = async () => {
    if (total.value > params.value.page * params.value.limit) {
      params.value.page++;
      getPayedOrderList();
    } else {
      ShowToast("没有更多");
    }
  };

  return {
    params,
    dataList,
    orderDetail,
    didClickItem,
    getOrderDetail,
    handleScrollToLower,
    getPayedOrderList,
  };
}
