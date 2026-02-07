import {
  getPageInfo,
  getLog,
  ShingingInfo,
  signIn,
  receive,
  ShingingLog,
  getHistory,
} from "./api";
import { ref } from "vue";
import { AddressModel } from "@/model";
export function useShinging() {
  const pageInfo = ref<ShingingInfo | null>(null);

  const currentId = ref<number | null>(null);

  const logList = ref<ShingingLog[]>([]);

  const historyList = ref<ShingingInfo[]>([]);

  const logType = ref(2);

  const params = ref({
    page: 1,
    limit: 10,
  });
  const total = ref(0);

  const getData = async () => {
    getPageInfo()
      .then((res) => {
        pageInfo.value = res.data.info;
        currentId.value = res.data.info.id;
      })
      .catch((_) => {
        pageInfo.value = null;
      });
  };

  const queryHistory = async () => {
    getHistory({
      limit: params.value.limit,
      page: params.value.page,
    }).then((res) => {
      console.log("queryHistory:", res.data);
      if (res.code === 200) {
        historyList.value =
          params.value.page === 1
            ? res.data.content
            : [...historyList.value, ...res.data.content];
      } else {
        historyList.value = [];
      }
    });
  };

  const queryLogList = () => {
    getLog({
      aid: currentId.value,
      limit: params.value.limit,
      status: logType.value,
      page: params.value.page,
    })
      .then((res) => {
        console.log("queryLogList:", res);
        if (res.code === 200) {
          logList.value =
            params.value.page === 1
              ? res.data.content
              : [...logList.value, ...res.data.content];
          total.value = res.data.totalElements;
        } else {
          logList.value = [];
          total.value = 0;
        }
      })
      .catch((_) => {});
  };

  const handleSignIn = async (code: string) => {
    return signIn({
      code: code,
    });
  };

  const handleReceive = async (data: AddressModel) => {
    return receive({
      aid: currentId.value,
      name: data.name,
      phone: data.phone,
      address: data.address,
    });
  };

  const handleScrollToLower = async () => {
    if (total.value > params.value.page * params.value.limit) {
      params.value.page++;
      queryHistory();
    }
  };

  return {
    logType,
    logList,
    pageInfo,
    historyList,
    queryHistory,
    getData,
    handleSignIn,
    handleReceive,
    queryLogList,
    handleScrollToLower,
  };
}
