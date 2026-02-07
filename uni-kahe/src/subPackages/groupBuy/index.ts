import {
  getGroupBuyCardListRequest,
  getGroupBuyDetailRecordRequest,
  getGroupBuyDetailRequest,
  getGroupBuyListRequest,
  getMineGroupBuyCardListRequest,
} from "@/api";
import { computed, ref } from "vue";
import {
  GroupBuyCard,
  GroupBuyDetail,
  GroupBuyItem,
  GroupBuyLog,
  GroupBuyRecord,
} from "@/model";
import { ShowToast } from "@/utils";

export function useGroupBuy() {
  const groupBuyDetail = ref({} as GroupBuyDetail);

  const itemList = ref([] as GroupBuyItem[]);

  const cardList = ref<GroupBuyCard[]>([]);

  const recordList = ref<GroupBuyRecord[]>([]);

  const mindCardList = ref([] as GroupBuyLog[]);

  const isMine = ref(false);

  const queryParams = ref({
    hot: 0,
    sort: null,
    page: 1,
    limit: 10,
    keyword: "",
  });

  const totalPage = ref(0);

  const currentSid = ref(0);

  const total = ref(0);

  const logLevel = ref<number | null>(null);

  const uid = ref<number | null>(null);

  const detailBanner = computed(() => {
    if (!groupBuyDetail.value.banner) {
      return [];
    } else {
      return groupBuyDetail.value.banner.split(",");
    }
  });

  const getGroupBuyDetail = async (id: number) => {
    const resp = await getGroupBuyDetailRequest(id);
    if (resp.code === 200) {
      groupBuyDetail.value = resp.data;
    }
  };

  const getGroupBuyDetailRecord = async (id: number) => {
    const resp = await getGroupBuyDetailRecordRequest({
      pid: id,
      page: queryParams.value.page,
      limit: queryParams.value.limit,
    });
    if (resp.code === 200) {
      recordList.value = resp.data.content;
    }
  };

  const navToListPage = (id: number) => {
    uni.navigateTo({
      url: `/subPackages/groupBuy/list/index?id=${id}`,
    });
  };

  const navToMinePage = (id: number) => {
    uni.navigateTo({
      url: `/subPackages/groupBuy/mine/index?id=${id}`,
    });
  };

  const navToSubmitPage = (id: number) => {
    uni.navigateTo({
      url: `/subPackages/groupBuy/submit/index?id=${id}`,
    });
  };

  const showInGroupImage = () => {
    if (groupBuyDetail.value?.qrCode) {
      uni.previewImage({
        urls: [groupBuyDetail.value?.qrCode],
        current: groupBuyDetail.value?.qrCode,
      });
    }
  };

  const getGroupBuyList = async () => {
    const resp = await getGroupBuyListRequest(queryParams.value);
    if (resp.code === 200) {
      itemList.value = resp.data.content;
    }
  };

  const getGroupBuyMineLog = async () => {
    const params = {
      pid: currentSid.value,
      page: queryParams.value.page,
      limit: queryParams.value.limit,
      uid: uid.value,
      level: logLevel.value,
      status: isMine.value ? null : 1,
      keyword: queryParams.value.keyword,
    };
    const resp = await getMineGroupBuyCardListRequest(params);
    if (resp.code === 200) {
      const list =
        queryParams.value.page === 1
          ? new Array<GroupBuyLog>()
          : mindCardList.value;
      // resp.data.content.forEach((item) => {
      //   list.push(item);
      // });
      mindCardList.value = resp.data.content;
      total.value = resp.data.totalElements;
      totalPage.value = Math.ceil(
        resp.data.totalElements / queryParams.value.limit
      );
    } else {
      cardList.value = [];
      totalPage.value = 0;
    }
  };

  const getGroupBuyCardList = async () => {
    const params = {
      sid: currentSid.value,
      page: queryParams.value.page,
      limit: queryParams.value.limit,
      keyword: queryParams.value.keyword,
    };
    const resp = await getGroupBuyCardListRequest(params);
    if (resp.code === 200) {
      cardList.value = resp.data.content;
      total.value = resp.data.totalElements;
      totalPage.value = Math.ceil(
        resp.data.totalElements / queryParams.value.limit
      );
    } else {
      cardList.value = [];
      totalPage.value = 0;
    }
  };

  const changePage = async (isUp: boolean) => {
    if (isUp && queryParams.value.page === 1) {
      ShowToast("已经是第一页");
      return;
    }
    if (!isUp && queryParams.value.page === totalPage.value) {
      ShowToast("已经是最后一页");
      return;
    }
    isUp ? (queryParams.value.page -= 1) : (queryParams.value.page += 1);

    isMine.value ? await getGroupBuyMineLog() : await getGroupBuyCardList();
  };

  const stripHTMLTags = (html: string) => {
    return html?.replace(/<[^>]*>/g, "") ?? "";
  };

  const handleScrollToLower = async () => {
    if (total.value > queryParams.value.page * queryParams.value.limit) {
      queryParams.value.page++;
      await getGroupBuyMineLog();
    }
  };

  return {
    logLevel,
    uid,
    detailBanner,
    isMine,
    stripHTMLTags,
    changePage,
    recordList,
    totalPage,
    cardList,
    itemList,
    getGroupBuyMineLog,
    showInGroupImage,
    mindCardList,
    queryParams,
    currentSid,
    getGroupBuyList,
    getGroupBuyCardList,
    getGroupBuyDetail,
    getGroupBuyDetailRecord,
    groupBuyDetail,
    navToListPage,
    navToSubmitPage,
    navToMinePage,
    handleScrollToLower,
  };
}
