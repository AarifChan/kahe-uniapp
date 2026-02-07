import {
  getWelfareDetail,
  getWelfareHelp,
  getWelfareIndex,
  getWelfareListRequest,
  getWelfareUser,
  getWelfareUserlog,
  postWelfarePrize,
} from "@/api/welfare";
import { ShowToast, hideLoading, showLoading, ShowModal } from "@/utils";
import { onMounted, ref } from "vue";
import {
  WareDetailGoods,
  WelfareDetList,
  WelfareDetailInfo,
  WelfareUserModel,
  WelfareListItem,
} from "@/model/welfare";
import type {
  MerchantModel,
  UIWelareRewardListItem,
  UIWelfareList,
  UIWelfareUserList,
  UIWelfareUserlog,
} from "@/model";

import { getPageOptions, parseTime } from "@/utils/tools";

export function useWelfare() {
  const aid = ref(0);
  const total = ref(0);
  const rewardTotal = ref(0);
  const pageParams = ref({
    page: 1,
    limit: 100,
  });

  const tabList = ref([
    { value: 1, title: "本店抽选" },
    { value: 0, title: "全部抽选" },
    { value: 2, title: "历史抽选" },
  ]);

  const inputModal = ref(false);

  const current = ref(0);
  const merchantId = ref(0);
  const dataList = ref([] as UIWelfareList[]);
  const welfareList = ref([] as UIWelfareList[]);
  const smokeList = ref([] as UIWelfareList[]);
  const getWelfareList = async () => {
    const params = {
      merchantId:
        merchantId.value !== undefined &&
        tabList.value[current.value].value === 1
          ? merchantId.value
          : null,
      status: tabList.value[current.value].value !== 2 ? 1 : 2,
      page: pageParams.value.page,
      limit: pageParams.value.limit,
    };
    const res = await getWelfareListRequest(params);
    if (res.code === 200) {
      const list = res.data.content.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image: item.logo,
          merchant: item.merchant,
          endTime: new Date(item.endTime).getTime(),
          startTime: item.startTime,
          status: item.status,
          goods: item.goods,
        } as UIWelfareList;
      });
      dataList.value =
        pageParams.value.page === 1 ? list : [...dataList.value, ...list];
      total.value = res.data.totalElements;
    } else {
      dataList.value = [];
      total.value = 0;
    }
  };
  const tapWelfareAction = (item: any) => {
    uni.navigateTo({
      url: `/subPackages/product/welfare-detail/index?aid=${item.id}`,
    });
  };
  const timeFinish = ref("");
  const timeOut = ref(0);
  const welfareDetails = ref({} as WelfareDetailInfo);
  const userDetail = ref({} as WelfareUserModel);
  const welfareDetailsGoods = ref([] as WareDetailGoods[]);
  // 获取福利页详情
  const getWelfareDetailList = async () => {
    showLoading();
    const resp = await getWelfareDetail(aid.value);
    hideLoading();
    if (resp.code === 200) {
      welfareDetails.value = resp.data.info;
      userDetail.value = resp.data?.user;
      timeOut.value = new Date(resp.data?.info?.endTime).getTime();
      timeFinish.value =
        parseTime(resp.data?.info?.endTime, "{m}-{d} {h}:{i}:{s}") ?? "";
      welfareDetailsGoods.value = resp.data.info.goods;
    }
  };
  // 参与抽奖
  const tapPrizeAction = async () => {
    if (welfareDetails.value.mode === 0) {
      handlePriceAction({ id: aid.value });
    } else if (welfareDetails.value.mode === 1) {
      inputModal.value = true;
    }
  };

  const tapPasswordPriceAction = async (password: string) => {
    await handlePriceAction({ id: aid.value, pwd: password });
    inputModal.value = false;
  };

  const handlePriceAction = async (params: any) => {
    const resp = await postWelfarePrize(params);
    if (resp.code === 200) {
      await getWelfareDetailList();
      await getWelfareUserList();
      await ShowToast("获得抽奖码，邀请好友可获得更多抽奖码");
    } else {
      ShowModal("温馨提示", resp.msg);
    }
  };

  const codeList = ref([] as UIWelfareUserlog[]);
  // 所有用户列表
  const userList = ref([] as UIWelfareUserList[]);
  const getWelfareUserList = async () => {
    const params = {
      page: pageParams.value.page,
      aid: aid.value,
      limit: pageParams.value.limit,
      type: 0,
    };
    showLoading();
    const resp = await getWelfareUser(params);
    hideLoading();
    if (resp.code === 200) {
      userList.value = resp.data.content?.map((item: any) => {
        return {
          code: item.code,
          user: item.user,
          num: Object.keys(item.code).length,
        };
      }) as UIWelfareUserList[];
    }
    total.value = resp.data.totalElements;
  };
  // 中奖用户
  const rewardList = ref([] as UIWelareRewardListItem[]);
  const getWelfareReward = async (aid: number) => {
    const params = {
      page: pageParams.value.page,
      aid,
      limit: pageParams.value.limit,
      type: 1,
    };
    showLoading();
    const resp = await getWelfareUser(params);
    hideLoading();
    if (resp.code === 200) {
      if (resp.data.content) {
        rewardList.value = resp.data.content;
      }
      rewardTotal.value = resp.data.totalElements;
    }
  };
  // 用户记录
  const getWelfareUserLog = async (
    aid: number,
    status: number,
    hid?: number | string,
    uid?: number | string
  ) => {
    const params = {
      aid,
      hid,
      limit: pageParams.value.limit,
      page: pageParams.value.page,
      status,
      uid,
    };
    showLoading();
    const resp = await getWelfareUserlog(params);
    hideLoading();
    if (resp.code === 200) {
      const list = [] as UIWelfareUserlog[];
      for (const item of resp.data.content) {
        list.push({
          id: item.id,
          status: item.status,
          welfareDto: item.welfareDto,
          time: parseTime(item.welfareDto.createTime, "{m}/{d} {h}:{i}") ?? "",
        });
      }
      codeList.value = list;
    }
  };
  const handleHelpWare = async (obj: number, aid: number) => {
    const resp = await getWelfareHelp({
      obj,
      aid,
    });
    if (resp.code === 200) {
      await ShowToast("助力成功");
      await getWelfareDetailList();
    } else {
      await ShowToast(resp.msg);
    }
  };

  const handleScrollToLower = async () => {
    if (total.value > pageParams.value.page * pageParams.value.limit) {
      pageParams.value.page++;
      getWelfareList();
    }
  };
  const reloadData = async (index: number) => {
    getWelfareList();
  };

  return {
    handleScrollToLower,
    rewardTotal,
    total,
    timeFinish,
    dataList,
    userDetail,
    getWelfareUserLog,
    reloadData,
    codeList,
    timeOut,
    rewardList,
    getWelfareReward,
    handleHelpWare,
    userList,
    getWelfareUserList,
    tapPrizeAction,
    welfareDetails,
    welfareDetailsGoods,
    getWelfareDetailList,
    aid,
    tabList,
    current,
    tapWelfareAction,
    smokeList,
    welfareList,
    getWelfareList,
    merchantId,
    tapPasswordPriceAction,
    inputModal,
  };
}
