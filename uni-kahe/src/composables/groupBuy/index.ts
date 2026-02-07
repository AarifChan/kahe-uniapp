import { getGroupBuyListRequest } from "@/api";
import { ref } from "vue";
import type { GroupBuyItem } from "@/model";

export function useGroupBuy() {
  const groupBuyList = ref([] as GroupBuyItem[]);

  const queryParams = ref({
    hot: 0,
    page: 1,
    limit: 10,
    key: "",
    sflag: 0,
    sort: "desc",
  });

  const total = ref(0);

  const getGroupBuyListByHot = async () => {
    queryParams.value.hot = 1;
    await getGroupBuyList();
  };

  const getGroupBuyList = async () => {
    const resp = await getGroupBuyListRequest(queryParams.value);
    if (resp.code === 200) {
      const list =
        queryParams.value.page === 1
          ? new Array<GroupBuyItem>()
          : groupBuyList.value;
      resp.data.content.forEach((item) => {
        list.push(item);
      });
      groupBuyList.value = list;
      total.value = resp.data.totalElements;
    } else {
      groupBuyList.value = [];
    }
  };

  const handleChange = async () => {
    // await getGroupBuyList()
  };

  const scrollToLower = () => {
    if (total.value > queryParams.value.page * queryParams.value.limit) {
      queryParams.value.page++;
      getGroupBuyList();
    }
  };

  return {
    queryParams,
    handleChange,
    groupBuyList,
    getGroupBuyList,
    getGroupBuyListByHot,
    scrollToLower,
  };
}
