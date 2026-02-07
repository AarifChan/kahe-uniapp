import type {
  UIMallListItemModel,
  UIMallCategoryModel,
  UIProductPayModel,
} from "@/model";
import { ref } from "vue";
import {
  CollectListObject,
  mallIndexGoodsList,
  mallIndexRequest,
  mallPurchaseRequest,
} from "@/api";
import { formatPrice } from "@/utils/tools";
import { getMainTagImagePath } from "@/utils/tools/image";
import { ShowToast, showLoading, hideLoading } from "@/utils";

export function useMall() {
  const mallList = ref([] as UIMallListItemModel[]);

  const mallCategory = ref([] as UIMallCategoryModel[]);
  const total = ref(0);
  const payItem = ref({} as UIProductPayModel);
  const payShow = ref(false);
  const mallShow = ref(false);
  const currentItem = ref({} as UIMallListItemModel);

  const listParams = ref({
    page: 1,
    limit: 20,
    cid: 0,
    sort: 0,
    stype: "asc",
    key: "",
  });

  const getMallCategoryData = async () => {
    const resp = await mallIndexRequest();
    if (resp.code === 200) {
      const list = Array<UIMallCategoryModel>();
      for (const item of resp.data.category) {
        list.push({
          image: item.icon,
          name: item.name,
          id: item.id,
        });
      }
      mallCategory.value = list;
    }
  };
  const handleClickCategory = (item: UIMallCategoryModel) => {
    const json = JSON.stringify(item);
    uni.navigateTo({
      url: `/subPackages/product/mall/index?model=${json}`,
    });
  };
  const mallListAction = (item: UIMallListItemModel) => {
    handleClickItem(item);
  };
  const handleClickItem = (item: UIMallListItemModel | CollectListObject) => {
    currentItem.value = item;
    const goods: UIProductPayModel = {
      usedIntegral: "",
      id: item.id,
      num: 1,
      image: item.image ?? item.logo,
      title: item.name,
      totalPrice: item.price.toFixed(2),
      price: formatPrice(item.price),
      usedMoney: "",
      usedCoin: "",
      fromMall: true,
    };
    payItem.value = goods;
    mallShow.value = true;
  };

  const getMallList = async () => {
    const params = listParams.value;
    showLoading();
    const resp = await mallIndexGoodsList(params);
    hideLoading();
    if (resp.code === 200) {
      const list =
        params.page === 1 ? Array<UIMallListItemModel>() : mallList.value;
      for (const item of resp.data.content) {
        list.push({
          name: item.goods.name,
          image: item.goods.image,
          id: item.id,
          price: item.price,
          showPrice: formatPrice(item.price),
          mainTagImage: getMainTagImagePath(Number(item.mainTag)),
        });
      }
      mallList.value = list;
      try {
        total.value = Math.ceil(resp.data.totalElements / params.limit);
      } catch (e) {
        total.value = 1;
      }
    } else {
      mallList.value = [];
      await ShowToast(resp.msg);
    }
  };

  const didPurchaseMallItem = async (id: number) => {
    showLoading();
    const resp = await mallPurchaseRequest(id);
    hideLoading();
    if (resp.code === 200) {
      mallShow.value = false;
      return ShowToast("兑换成功");
    } else {
      ShowToast(resp.msg);
    }
  };

  const handleMallScrollToLower = async () => {
    if (total.value > listParams.value.page * listParams.value.limit) {
      listParams.value.page++;
      await getMallList();
    }
  };

  return {
    mallShow,
    mallCategory,
    getMallCategoryData,
    mallListAction,
    mallList,
    listParams,
    getMallList,
    total,
    handleClickCategory,
    handleMallScrollToLower,
    currentItem,
    payShow,
    payItem,
    handleClickItem,
    didPurchaseMallItem,
  };
}
