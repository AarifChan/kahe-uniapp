import {
  CollectListObject,
  CollectParams,
  getCollectListRequest,
  purchaseCollectProduct,
} from "@/api/collect";
import { ref } from "vue";
import { hideLoading, showLoading, ShowToast } from "@/utils";

export function useCollect() {
  const collectionList = ref<CollectListObject[]>([]);

  const collectionParams = ref<CollectParams>({
    page: 1,
    limit: 10,
    cate: null,
  });
  const total = ref(0);

  const getCollectionList = async () => {
    showLoading();
    const resp = await getCollectListRequest(collectionParams.value);
    if (resp.code === 200) {
      let dataList =
        collectionParams.value.page === 1
          ? Array<CollectListObject>()
          : collectionList.value;
      for (const item of resp.data.content) {
        dataList.push(item);
      }

      collectionList.value = dataList;
      total.value = resp.data.totalElements;
    } else {
      ShowToast(resp.msg);
    }
    hideLoading();
  };
  const handleClickCollectItem = (item: CollectListObject) => {
    uni.navigateTo({
      url: `/subPackages/collect/detail/index?id=${item.id}`,
    });
  };
  const navToRecordPage = () => {
    uni.navigateTo({
      url: "/subPackages/collect/record/index",
    });
  };
  const didTapPurchaseCollectItem = async (id: number) => {
    const params = {
      pid: id,
      cate: 2,
      num: 1,
    };
    const resp = await purchaseCollectProduct(params);
    if (resp.code === 200) {
      getCollectionList();
      ShowToast("兑换成功");
      return true;
    } else {
      ShowToast("兑换失败");
      return false;
    }
  };

  const handleScrollToLower = async () => {
    if (
      total.value >
      collectionParams.value.page * collectionParams.value.limit
    ) {
      collectionParams.value.page++;
      await getCollectionList();
    } else {
      ShowToast("没有更多");
    }
  };

  return {
    handleScrollToLower,
    didTapPurchaseCollectItem,
    handleClickCollectItem,
    collectionParams,
    collectionList,
    getCollectionList,
    navToRecordPage,
  };
}
