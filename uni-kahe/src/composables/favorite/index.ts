import {
  checkIsFavoriteRequest,
  addFavoriteRequest,
  cancelFavoriteRequest,
  getFavoriteRequest,
  FavoriteItemModel,
} from "@/api";
import type { FavoriteModel } from "@/api/favorite";
import { ref } from "vue";
import { ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";

export function useFavorite() {
  const isFavorite = ref(false);
  const current = ref(0);
  const total = ref(0);
  const tabList = [
    {
      title: "一番赏",
      value: 1,
    },
    {
      title: "无限赏",
      value: 3,
    },

    {
      title: "对决",
      value: 4,
    },

    {
      title: "福袋",
      value: 2,
    },
    {
      title: "满开",
      value: 11,
    },
    {
      title: "其他",
      value: 12,
    },
  ];
  const dataList = ref<FavoriteModel[]>([]);
  const params = ref({
    page: 1,
    limit: 10,
    type: 1,
    subType: 1,
  });
  const checkIsFavorite = async (pId: number) => {
    if (!UserModule.loginStatus) {
      return;
    }
    const resp = await checkIsFavoriteRequest({
      productId: pId,
      type: 1,
    });
    if (resp.code === 200) {
      isFavorite.value = resp.data;
    }

    console.log("checkIsFavoriteRequest:", resp);
  };

  const getFavoriteList = async () => {
    const resp = await getFavoriteRequest({
      ...params.value,
      subType: tabList[current.value].value,
    });

    if (resp.code === 200) {
      let tmp = resp.data.content.map((item: FavoriteItemModel) => {
        let model = JSON.parse(item.detail) as FavoriteModel;
        model.productId = item.productId;
        return model;
      });
      dataList.value =
        params.value.page === 1 ? tmp : [...dataList.value, ...tmp];
      total.value = resp.data.totalElements;
      console.log("getFavoriteList:", dataList.value);
    }
  };

  const handleFavoriteAction = async (pId: number) => {
    let params = {
      productId: pId,
      type: 1,
    };
    if (!isFavorite.value) {
      const resp = await addFavoriteRequest(params);
      if (resp.code === 200) {
        ShowToast("收藏成功");
      } else {
        ShowToast(resp.msg ?? "收藏失败");
      }
    } else {
      const resp = await cancelFavoriteRequest(params);
      if (resp.code === 200) {
        ShowToast("移除成功");
      } else {
        ShowToast(resp.msg ?? "移除失败");
      }
    }
  };

  const cancelFavorite = async (pId: number) => {
    let params = {
      productId: pId,
      type: 1,
    };
    const resp = await cancelFavoriteRequest(params);
    if (resp.code === 200) {
      ShowToast("移除成功");
      dataList.value = dataList.value.filter((n) => n.productId !== pId);
    } else {
      ShowToast(resp.msg ?? "移除失败");
    }
  };

  const handleScrollToLower = async () => {
    if (params.value.page * params.value.limit < total.value) {
      params.value.page += 1;
      getFavoriteList();
    }
  };

  const handleClickItem = (item: FavoriteModel) => {
    // productId
    uni.navigateTo({
      url: `/subPackages/product/detail/index?pid=${item.productId}`,
    });
  };

  return {
    current,
    tabList,
    dataList,
    handleClickItem,
    getFavoriteList,
    cancelFavorite,
    handleFavoriteAction,
    isFavorite,
    checkIsFavorite,
    handleScrollToLower,
  };
}
