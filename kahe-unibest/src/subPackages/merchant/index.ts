import { getPageOptions } from "@/utils/tools";
import { getMerchantInfoRequest } from "@/api";
import { ref } from "vue";
import type { MerchantInfoModel } from "@/model";

export function useMerchantDetail() {
  const detail = ref({} as MerchantInfoModel);

  const loading = ref(false);

  const getMerchantDetail = async () => {
    loading.value = true;
    const merchantId = getPageOptions().merchantId;
    console.log("merchantId:", merchantId);
    if (!merchantId) {
      console.error("merchantId not found");
      return;
    }
    try {
      const resp = await getMerchantInfoRequest(merchantId);
      detail.value = resp.data;
    } catch (e) {
    } finally {
      loading.value = false;
    }
  };

  const handleClickItem = (index: number) => {
    switch (index) {
      case 0:
        uni.navigateTo({
          url: `/subPackages/activity/index?merchantId=${detail.value.id}`,
        });
        break;
      case 1:
        uni.navigateTo({
          url: `/subPackages/infinite/index?merchantId=${detail.value.id}`,
        });
        break;
      case 2:
        uni.navigateTo({
          url: `/subPackages/dailyWelfare/index?merchantId=${detail.value.id}`,
        });
        break;
      default:
        break;
    }
  };

  return {
    getMerchantDetail,
    detail,
    handleClickItem,
  };
}
