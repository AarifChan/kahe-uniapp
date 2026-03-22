import { getCouponListRequest } from "@/api/user";
import type { UICouponModel } from "@/model";
import { formatPrice, parseTime } from "@/utils/tools";
import { ref } from "vue";
export function useCoupon() {
  const couponList = ref([] as UICouponModel[]);

  const pageParams = ref({
    page: 1,
    limit: 10,
    status: 0,
  });
  const total = ref(0);

  const hasValidCoupon = ref(false);
  const getCoupon = async () => {
    const resp = await getCouponListRequest(pageParams.value);
    if (resp.code === 200) {
      const list: UICouponModel[] =
        pageParams.value.page === 1 ? Array<UICouponModel>() : couponList.value;
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
      hasValidCoupon.value = true;
      couponList.value = list;
      total.value = resp.data.totalElements;
    } else {
      hasValidCoupon.value = false;
    }
  };

  return {
    getCoupon,
    hasValidCoupon,
  };
}
