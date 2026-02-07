import { getMerchantListRequest } from "@/api";
import { ref } from "vue";
import type { MerchantInfoModel } from "@/model";
import { ShowToast } from "@/utils";

export const getLevelName = (level: number) => {
  switch (level) {
    case 4:
      return "黄金商家";
    case 3:
      return "皇冠商家";
    case 2:
      return "钻石商家";
    case 1:
      return "新晋商家";
    default:
      return "";
  }
};

export const getTagBg = (tag: number) => {
  if (!tag) {
    return "";
  }
  return `https://jms.85gui7.com/kahe-202510/ka-he/merchant/bg${tag}.png`;
};

export const getTagBgColor = (tag: number) => {
  switch (tag) {
    case 1:
      return "#72AAFF";
    case 2:
      return "#C272FF";
    case 3:
      return "#FF7276";
    case 4:
      return "#FFBF4F";
    default:
      return "#72AAFF";
  }
};

export const getTagIcon = (tag: number) => {
  if (!tag) {
    return "";
  }
  return `https://jms.85gui7.com/kahe-202510/merchant/tag-level${tag}.png`;
};

export function useMerchant() {
  const params = ref({
    page: 1,
    limit: 10,
    box: 1,
    key: "",
  });

  const totalElements = ref(0);

  const currentTab = ref(0);

  const merchantCateList = ref([
    {
      title: "卡牌",
      value: 1,
    },
    {
      title: "潮玩",
      value: 2,
    },
    {
      title: "谷子",
      value: 3,
    },
  ]);

  const didClickTab = async () => {
    params.value.page = 1;
    await getMerchantList();
  };

  const merchantList = ref([] as MerchantInfoModel[]);

  const getMerchantList = async () => {
    const tmpParams = Object.assign(params.value, {
      cate: merchantCateList.value[currentTab.value].value,
    });
    const resp = await getMerchantListRequest(tmpParams);
    if (resp.code === 200) {
      console.log(resp.data);
      const tmpList = resp.data.content ?? [];
      merchantList.value =
        params.value.page === 1 ? tmpList : [...merchantList.value, ...tmpList];
      totalElements.value = resp.data.totalElements;
    } else {
      totalElements.value = 0;
      ShowToast(resp.msg);
    }
  };

  const didClickMerchant = (model: MerchantInfoModel) => {
    if (!model) {
      ShowToast("暂无商家信息");
      return;
    }
    const merchantId = model.id;
    uni.navigateTo({
      url: "/subPackages/merchant/index?merchantId=" + merchantId,
    });
  };

  const didTapSearch = async (content: string) => {
    params.value.key = content;
    params.value.page = 1;
    await getMerchantList();
  };

  const handleMallScrollToLower = () => {
    if (totalElements.value > params.value.page * params.value.limit) {
      params.value.page++;
      getMerchantList();
    }
  };

  return {
    didClickTab,
    currentTab,
    merchantCateList,
    getMerchantList,
    merchantList,
    didTapSearch,
    didClickMerchant,
    handleMallScrollToLower,
  };
}
