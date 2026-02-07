import { computed, ref } from "vue";
import {
  getUserMerchantRequest,
  userGoodsBoxRequest,
  userGoodsChestBox,
  userGoodsDeleteRequest,
  userGoodsDeliverListRequest,
  userGoodsDeliverRequest,
  userGoodsDeliverSubmitRequest,
  userGoodsListRequest,
  userGoodsLockRequest,
  userGoodsRecycleConfirmRequest,
  userGoodsRecycleListRequest,
  userGoodsUnlockRequest,
  userOpenGoodsChestBoxRequest,
} from "@/api";
import type {
  AddressModel,
  BoxGoodsSubmitParams,
  BoxGoodsSubmitResponse,
  BoxPageParams,
  GoodsBrief,
  MerchantBoxModel,
  PageParams,
  SubmitGoodsModel,
  UIChestModel,
  UIMineBoxModel,
  UIMineBoxRecordModel,
  UIMineChestModel,
  UIMineProductBoxModel,
  UIOpenListModel,
  UIProductOpenBoxModel,
  UserChestOpenGoodsModel,
  UserDeliverSubmitParams,
  UserGoodsModel,
  UserGoodsQueryParams,
} from "@/model";
import { parseTime } from "@/utils/tools/util";
import { hideLoading, showLoading, ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";
import { useEnum } from "../enum/index";

import { eventBus } from "@/utils/event";
import { getLevelFullImagePath } from "@/utils/tools/image";
import { AppModule } from "@/store/modules/app";

const { getLevelImage, levelTypeBg, getLevelImageByLevel } = useEnum();
export function useBox() {
  /// 箱子
  const boxList = ref([] as UIMineBoxModel[]);

  const recordList = ref([] as UIMineBoxRecordModel[]);

  const goodsList = ref([] as UserGoodsModel[]);

  const currentBox = ref({} as UserGoodsModel);

  const loading = ref(false);

  const detailShow = ref(false);

  const numSelectModal = ref(false);

  const smashShow = ref(false);

  const shipmentShow = ref(false);

  const total = ref(0);

  const currentTab = ref(0);

  const currentTabValue = ref(0);

  const boxId = ref(0);
  // 弹窗类型
  const payType = ref(0);
  // 弹窗
  const payShow = ref(false);
  // 提交物品获得的数据
  const currentSubmit = ref({} as BoxGoodsSubmitResponse);

  const submitParams = ref({} as BoxGoodsSubmitParams);
  // 发货退货返回的数据
  const smashList = ref([] as SubmitGoodsModel[]);

  const address = ref({} as AddressModel);
  const selectShow = ref(false);
  const chestsModel = ref({} as UIMineChestModel);
  const chestsList = ref([] as UIChestModel[]);
  const crushShow = ref(false);

  const mineMerchantList = ref([] as MerchantBoxModel[]);
  const merchantTotal = ref(0);
  const params = ref({
    page: 1,
    limit: 10,
  });
  const boxParams = ref({
    box_id: null,
    page: 1,
    limit: 50,
  });
  const resetPageParams = () => {
    params.value = {
      page: 1,
      limit: 50,
    };
  };

  const currentExpand = ref(-1);
  // 获取宝箱
  const chestsParams = ref({
    page: 1,
    limit: 100,
  });
  const loadData = async (index = 0) => {
    loading.value = true;
    switch (index) {
      case 0:
        await loadListData();
        break;
      case 1:
        await loadRecordData();
        break;
      case 2:
        await loadRecycleData();
        break;
      case 3:
        await loadChestDate();
        break;
      default:
        break;
    }
    loading.value = false;
  };

  /* 用户已粉碎列表 */
  const loadRecycleData = async () => {
    const resp = await userGoodsRecycleListRequest(params.value);
    if (resp.code === 200) {
      const tmp =
        params.value.page === 1
          ? Array<UIMineBoxRecordModel>()
          : (recordList.value as UIMineBoxRecordModel[]);
      for (const item of resp.data.content) {
        const list = Array<UIMineProductBoxModel>();
        for (const goods of item.goods) {
          const num =
            item.userGoods.filter((n) => n.gid === goods.id)[0].num ?? 0;
          list.push({
            name: goods.name,
            num: num,
            image: goods.image,
            level: goods.level,
            levelImage: getLevelImage(goods.level),
            id: goods.id,
            selected: false,
            gainTime: parseTime(goods.createTime, "{y}.{m}.{d}") ?? "",
            price: goods.price,
          });
        }
        tmp.push({
          orderId: item.orderId,
          totalPrice: item.money,
          recordType: 2,
          list: list,
        });
      }
      recordList.value = tmp;
      total.value = resp.data.totalElements;
    } else {
      recordList.value = [];
      total.value = 0;
    }
  };
  /* 物品已发货列表 */
  const loadRecordData = async () => {
    const resp = await userGoodsDeliverListRequest(params.value);
    if (resp.code === 200) {
      const tmp =
        params.value.page === 1
          ? Array<UIMineBoxRecordModel>()
          : (recordList.value as UIMineBoxRecordModel[]);
      for (const item of resp.data.content) {
        const list = Array<UIMineProductBoxModel>();
        for (const goods of item.goods) {
          const num =
            item.userGoods.filter((n) => n.gid === goods.id)[0].num ?? 0;
          list.push({
            name: goods.name,
            image: goods.image,
            num: num,
            level: goods.level,
            levelImage: getLevelImage(goods.level),
            id: goods.id,
            selected: false,
            gainTime: parseTime(goods.createTime, "{y}.{m}.{d}") ?? "",
            price: goods.price,
          });
        }
        tmp.push({
          orderId: item.orderId,
          deliveryId: item.deliveryId,
          deliverySn: item.deliverySn,
          recordType: 1,
          list: list,
        });
      }
      recordList.value = tmp;
      total.value = resp.data.totalElements;
    } else {
      total.value = 0;
      recordList.value = [];
    }
  };

  const loadMerchantBoxList = async (mid: number) => {
    const tParams = {
      ...params.value,
      mid,
    };
    return await loadMineGoodsList(tParams);
  };

  const loadMineGoodsList = async (pageParams: BoxPageParams) => {
    const res = await userGoodsBoxRequest(pageParams);
    if (res.code === 200) {
      // const tmp = pageParams.page === 1 ? Array<UIMineBoxModel>() : (boxList.value as UIMineBoxModel[])
      const tmp = [];
      for (const item of res.data.content) {
        if (item.num === 0) {
          continue;
        }
        tmp.push({
          logo: item.logo ?? "https://jms.85gui7.com/show/default-box.jpg",
          boxId: item.id,
          num: item.num,
          title: item.title ?? "储物袋",
          gainTime: item.updateTime,
          selected: false,
        });
      }
      // boxList.value = tmp
      total.value = res.data.totalElements;
      return tmp;
    } else {
      total.value = 0;
      return [];
    }
  };
  /* 获取我的箱子 */
  const loadListData = async () => {
    const pageParams = {
      page: params.value.page,
      limit: params.value.limit,
    };
    showLoading();
    await loadMerchantList(pageParams);
    hideLoading();
  };

  const loadMerchantList = async (params: PageParams) => {
    const resp = await getUserMerchantRequest(params);

    if (resp.code === 200) {
      const list = resp.data.content;
      mineMerchantList.value =
        params.page === 1 ? list : [...mineMerchantList.value, ...list];
      merchantTotal.value = resp.data.totalElements;
      console.log("loadMerchantList", mineMerchantList.value);
    }
  };

  const handleExpandMerchant = async (index: number) => {
    if (index === currentExpand.value) {
      currentExpand.value = -1;
      return;
    }
    disSelectAll();
    currentExpand.value = index;
    const merchant = mineMerchantList.value[index];
    mineMerchantList.value[index].box = await loadMerchantBoxList(merchant.id);
  };

  const selectAllNum = computed(() => {
    let num = 0;
    if (currentExpand.value === -1) {
      return num;
    }
    mineMerchantList.value[currentExpand.value].box.forEach((item) => {
      if (item.selected) {
        num += item.num;
      }
    });

    return num;
  });
  // 全选
  const isSelectAll = ref(false);

  const disSelectAll = () => {
    isSelectAll.value = false;
    mineMerchantList.value.forEach((merchant) => {
      merchant.box?.forEach((item) => {
        item.selected = false;
      });
    });
  };

  const selectAllHandel = () => {
    isSelectAll.value = !isSelectAll.value;
    mineMerchantList.value[currentExpand.value].box?.forEach((item) => {
      item.selected = isSelectAll.value;
    });

    boxList.value.forEach((item) => (item.selected = isSelectAll.value));
  };
  // 封装处理selected的函数
  const getSelectBoxBriefs = (list: UIMineBoxModel[]) => {
    const briefs: GoodsBrief[] = [];
    list
      .filter((item) => item.selected)
      .forEach((item) => {
        briefs.push({
          boxId: item.boxId,
        });
      });
    return briefs;
  };

  // 退货
  const goodsRecycleHandle = async () => {
    payType.value = 3;
    if (selectAllNum.value === 0) {
      return ShowToast("请选择", 1500);
    }
    const boxList = [] as UIMineBoxModel[];
    mineMerchantList.value[currentExpand.value].box?.forEach((item) => {
      if (item.selected) {
        boxList.push(item);
      }
    });

    const briefs = getSelectBoxBriefs(boxList);
    const params = {
      briefs: briefs,
      type: 1,
    };
    submitParams.value = params;
    showLoading();
    const res = await userGoodsRecycleConfirmRequest(params);
    hideLoading();
    if (res.code !== 200) {
      ShowToast(res.msg);
    }
    if (res.code === 200) {
      const list: SubmitGoodsModel[] = JSON.parse(res.data.detail);
      smashList.value = list.map((item) => {
        return Object.assign(
          {
            ...item,
          },
          {
            levelImage: getLevelImageByLevel(item.level),
          }
        );
      });
      currentSubmit.value = res.data;
      smashShow.value = true;
    }
  };
  // 发货
  const sendGoodsHandle = async () => {
    payType.value = 4;
    if (selectAllNum.value === 0) {
      return ShowToast("请选择", 1500);
    }
    const boxList = [] as UIMineBoxModel[];
    mineMerchantList.value[currentExpand.value].box?.forEach((item) => {
      if (item.selected) {
        boxList.push(item);
      }
    });

    const briefs = getSelectBoxBriefs(boxList);
    const params = {
      briefs: briefs,
      type: 1,
    };
    submitParams.value = params;
    showLoading();
    const resp = await userGoodsDeliverSubmitRequest(params);
    hideLoading();
    if (resp.code === 200) {
      const list: SubmitGoodsModel[] = JSON.parse(resp.data.detail);
      smashList.value = list.map((item) => {
        return Object.assign(
          {
            ...item,
          },
          {
            levelImage: getLevelImageByLevel(item.level),
          }
        );
      });
      currentSubmit.value = resp.data as any;
      shipmentShow.value = true;
    } else {
      ShowToast(resp.msg);
    }
  };
  const chooseAddress = () => {
    uni.navigateTo({
      url: `/subPackages/mine/address/index?needSelect=${true}`,
    });
  };
  // 确定
  const didTapPay = async () => {
    const orderId = currentSubmit.value.orderId;
    if (payType.value === 3) {
      const resp = await userGoodsDeleteRequest({
        orderId,
      });
      if (resp.code === 200) {
        await ShowToast("操作成功", 1500);
        resetPageParams();
        await loadListData();
        await getBoxGoodsList(boxId.value);
      } else {
        await ShowToast(resp.msg, 1500);
      }
      payShow.value = false;
      smashShow.value = false;
    } else {
      const addressId = address.value.id;
      if (!addressId || !orderId) {
        ShowToast("请选择发货地址");
        return false;
      }
      const resp = await userGoodsDeliverRequest({
        addressId: addressId,
        orderId: orderId,
      });
      if (resp.code === 200) {
        if (!resp.data.status) {
          showLoading("正在支付");
          const resp = await UserModule.handleWxPay(orderId);
          hideLoading();
          if (resp) {
            ShowToast(resp + "");
            return false;
          }
        }
        await ShowToast("发货成功", 1500);
        resetPageParams();
        await loadListData();
        await getBoxGoodsList(boxId.value);
      } else {
        ShowToast(resp.msg, 1500);
      }
      shipmentShow.value = false;
    }
  };

  const clickBoxItem = (item: UIMineBoxModel) => {
    uni.navigateTo({
      url: `/subPackages/box/index?boxId=${item.boxId}&title=${item.title}&num=${item.num}`,
    });
  };
  const currentIndex = ref(AppModule.boxTabIndex);
  const handleScrollToLower = async () => {
    if (currentIndex.value === 0) {
      if (total.value > params.value.page * params.value.limit) {
        params.value.page++;
        await loadData(0);
      }
    } else if (currentIndex.value === 1) {
      if (total.value > params.value.page * params.value.limit) {
        params.value.page++;
        await loadData(1);
      }
    } else if (currentIndex.value === 2) {
      if (total.value > params.value.page * params.value.limit) {
        params.value.page++;
        await loadData(2);
      }
    }
  };
  // 获取我的物品
  const getBoxGoodsList = async (bId: number) => {
    boxId.value = bId;
    const query: UserGoodsQueryParams = {
      page: boxParams.value.page,
      limit: boxParams.value.limit,
      box_id: bId,
    };
    const resp = await userGoodsListRequest(query);
    const {
      code,
      data: { content, totalElements },
    } = resp;
    if (code === 200) {
      goodsList.value = content.sort(
        (n1, n2) => n2.goods.level - n1.goods.level
      );

      total.value = totalElements;
    } else {
      goodsList.value = [];
      total.value = 0;
      params.value.page = 1;
    }
  };
  const clickItem = (item: UserGoodsModel) => {
    currentBox.value = item;
    detailShow.value = true;
  };
  const handleLockItem = async (item: UserGoodsModel) => {
    if (item.status === 0) {
      // 未锁定，锁定
      const resp = await userGoodsLockRequest([item.id]);
      if (resp.code === 200) {
        await ShowToast("已锁定");
        item.status = 1;
      } else {
        await ShowToast(resp.msg);
      }
    } else {
      const resp = await userGoodsUnlockRequest([item.id]);
      if (resp.code === 200) {
        await ShowToast("已解锁");
        item.status = 0;
      } else {
        await ShowToast(resp.msg);
      }
    }
    await getBoxGoodsList(boxId.value);
  };
  // 锁定物品
  const handleUnLockGoods = async () => {
    const unlockNum = selectList.value.filter(
      (item) => item.status === 0
    ).length;
    if (unlockNum === 0) {
      await ShowToast("当前物品不可操作");
      return;
    }
    const ids = selectList.value.map((item) => item.id);
    const resp = await userGoodsLockRequest(ids);
    const { code } = resp;
    if (code === 200) {
      await ShowToast("操作成功");
    } else {
      await ShowToast(resp.msg);
    }
    await getBoxGoodsList(boxId.value);
  };

  // 物品详情页
  const selectList = computed(() =>
    goodsList.value.filter((item) => (item.selectNum ?? 0) > 0)
  );

  // 退货
  const detailRecycleHandle = async () => {
    const unlockNum = selectList.value.filter(
      (item) => item.status === 0
    ).length;
    if (unlockNum === 0) {
      await ShowToast("当前物品不可操作");
      return;
    }
    const briefs = selectList.value
      .filter((item) => item.status === 0)
      .map((item) => {
        return {
          id: item.id,
          boxId: boxId.value,
          num: item.selectNum,
        } as GoodsBrief;
      });
    const params: BoxGoodsSubmitParams = {
      briefs: briefs,
      type: 2,
    };
    const resp = await userGoodsRecycleConfirmRequest(params);
    if (resp.code === 200) {
      const goodsList: SubmitGoodsModel[] = JSON.parse(
        resp.data.detail
      ) as SubmitGoodsModel[];
      smashList.value = goodsList.map((item) => {
        return Object.assign(
          {
            ...item,
          },
          {
            levelImage: getLevelImageByLevel(item.level),
          }
        );
      });
      currentSubmit.value = resp.data;
      smashShow.value = true;
      payType.value = 3;
      payShow.value = true;
    } else {
      ShowToast(resp.msg);
    }
  };
  // 发货
  const goodsDeliverHandle = async () => {
    const unlockNum = selectList.value.filter(
      (item) => item.status === 0
    ).length;
    if (unlockNum === 0) {
      await ShowToast("当前物品不可操作");
      return;
    }
    const briefs = selectList.value
      .filter((item) => item.status === 0)
      .map((item) => {
        return {
          id: item.id,
          boxId: boxId.value,
          num: item.selectNum,
        } as GoodsBrief;
      });
    const params: UserDeliverSubmitParams = {
      briefs: briefs,
      type: 2,
    };
    submitParams.value = params;
    const resp = await userGoodsDeliverSubmitRequest(params);

    if (resp.code === 200) {
      smashList.value = JSON.parse(resp.data.detail) as SubmitGoodsModel[];
      currentSubmit.value = resp.data as any;
      payType.value = 4;
      shipmentShow.value = true;
    } else {
      ShowToast(resp.msg);
    }
  };

  const handle = async (index: number) => {
    // const selectItems = goodsList.value.filter((n) => n.selectNum > 0)
    switch (index) {
      case 0:
        handleSelectAll();
        break;
      case 1:
        // 退货
        // await goodsRecycleHandle()
        await detailRecycleHandle();
        break;
      case 2:
        // 发货
        await goodsDeliverHandle();
        break;
      case 3:
        // 锁定物品
        await handleUnLockGoods();
        break;
      default:
        break;
    }
  };
  // 宝箱
  const selectItem = (item: UIMineChestModel) => {
    chestsModel.value = item;
    uni.navigateTo({
      url: `/subPackages/box/chest/index?&item=${JSON.stringify(item)}`,
    });
  };
  const openChestAction = (item: UIMineChestModel) => {
    selectShow.value = true;
    chestsModel.value = item;
  };
  const drawShow = ref(false);
  // 开箱展示
  const openRewordList = ref([] as UIOpenListModel[]);
  //   粉碎物品
  const crushList = ref([] as UIMineProductBoxModel[]);
  const didTapConfirm = async (num: number) => {
    const params = {
      id: chestsModel.value.cid,
      num,
    };
    showLoading("正在加载中");
    const resp = await userOpenGoodsChestBoxRequest(params);
    hideLoading();
    if (resp.code === 200) {
      const info = JSON.parse(resp.data.sourceEx) as UserChestOpenGoodsModel[];
      const chestList: UIProductOpenBoxModel[] = Array<UIProductOpenBoxModel>();
      const smashList: UIMineProductBoxModel[] = Array<UIMineProductBoxModel>();
      for (const item of resp.data.goods) {
        const t = info.find((n) => n.id === item.id);
        chestList.push({
          isHide: false,
          id: item.id,
          name: item.name,
          level: item.level,
          levelImage: getLevelFullImagePath(item.level),
          image: item.image,
          num: t?.num ?? 0,
          uGIds: [],
          isLucky: false,
          uGId: 0,
          levelBg: levelTypeBg(item.level),
        });
        smashList.push({
          id: item.id,
          name: item.name,
          level: item.level,
          levelImage: getLevelFullImagePath(item.level),
          image: item.image,
          num: t?.num ?? 0,
          price: item.price,
          gainTime: parseTime(item.createTime, "{y}.{m}.{d}") ?? "",
          selected: true,
        });
      }
      openRewordList.value = chestList.sort((n1, n2) => n2.level - n1.level);
      crushList.value = smashList;
      await loadChestDate();
      chestsModel.value.num = chestsModel.value.num - num;
      drawShow.value = true;
    } else {
      return ShowToast(resp.msg);
    }
  };
  const submitRes = ref({} as BoxGoodsSubmitResponse);
  // 粉碎展示
  const reItemGoods = ref([] as SubmitGoodsModel[]);
  const crushAction = async () => {
    drawShow.value = false;
    crushShow.value = true;
    const briefs = crushList.value.map((item) => {
      return {
        gid: item.id,
        num: item.num,
      };
    });
    const params = {
      briefs,
      type: 3,
    };
    showLoading("正在加载中");
    const res = await userGoodsRecycleConfirmRequest(params);
    hideLoading();
    if (res.code === 200) {
      const goodsList: SubmitGoodsModel[] = JSON.parse(
        res.data.detail
      ) as SubmitGoodsModel[];
      reItemGoods.value = goodsList.map((item) => {
        return Object.assign(
          {
            ...item,
          },
          {
            levelImage: getLevelImage(item.level),
          }
        );
      });
      submitRes.value = res.data;
    } else {
      crushShow.value = false;
      return ShowToast(res.msg);
    }
  };
  // 确定粉碎
  const crushDidTap = async () => {
    const orderId = submitRes.value.orderId;
    const resp = await userGoodsDeleteRequest({
      orderId,
    });
    if (resp.code === 200) {
      ShowToast("操作成功", 1500);
      crushShow.value = false;
    } else {
      return ShowToast(resp.msg);
    }
  };
  //   获取宝箱数据
  const loadChestDate = async () => {
    const res = await userGoodsChestBox(chestsParams.value);
    if (res.code === 200) {
      chestsList.value = res.data.content
        .filter((n) => n.num > 0)
        .map((item) => {
          const goods = item.goods.sort((a, b) => b.level - a.level);
          return {
            title: item.chest?.title,
            logo: item.chest?.logo,
            num: item.num,
            boxId: item.id,
            cid: item.cid,
            gainTime: item.createTime,
            status: item.status,
            goods,
          };
        });
    } else {
      chestsList.value = [];
    }
  };
  // 背包底部
  const handleTapItem = async (index: number) => {
    switch (index) {
      // 全选
      case 0:
        selectAllHandel();
        break;
      case 1:
        // 退货
        await goodsRecycleHandle();
        break;
      case 2:
        // 发货
        // await goodsDeliverHandle()
        await sendGoodsHandle();
        break;
      default:
        break;
    }
  };
  const didSelectBox = (item: UIMineBoxModel) => {
    item.selected = !item.selected;
    const selectedAllList = boxList.value.map((item) => {
      return {
        boxId: item.boxId,
        logo: item.logo,
        num: item.num,
        title: item.title,
        gainTime: item.gainTime,
        selected: item.selected,
      };
    });
    isSelectAll.value = selectedAllList.every((item) => item.selected);
  };
  const handleSelectItem = (item: UserGoodsModel) => {
    if (item.selectNum > 0) {
      item.selectNum = 0;
      return;
    }
    numSelectModal.value = true;
    currentBox.value = item;
  };

  const handleSelectAll = () => {
    let total = 0;
    goodsList.value
      .filter((item) => Number(item.status) === 0)
      .forEach((item) => {
        total = total + item.num;
      });
    if (total === 0) {
      ShowToast("当前无可选物品");
      return;
    }
    if (selectAll.value) {
      goodsList.value.forEach((item) => {
        item.selectNum = 0;
      });
    } else {
      goodsList.value
        .filter((item) => Number(item.status) === 0)
        .forEach((item) => {
          item.selectNum = item.num;
        });
    }
  };

  const handleSmashGoods = async () => {
    // 选中并且未上锁的
    const selectGoods = goodsList.value.filter(
      (item) => item.status === 0 && item.selectNum > 0
    );

    if (selectGoods.length === 0) {
      await ShowToast("当前物品不可操作");
      return;
    }
    const briefs = selectGoods.map((item) => {
      return {
        id: item.id,
        boxId: boxId.value,
        num: item.selectNum,
      } as GoodsBrief;
    });
    const params: BoxGoodsSubmitParams = {
      briefs: briefs,
      type: 2,
    };
    const msg = await submitBoxListInfo(params);
    if (!msg) {
      payType.value = 3;
    } else {
      payShow.value = true;
      await ShowToast(msg);
    }
  };

  const submitBoxListInfo = async (params: BoxGoodsSubmitParams) => {
    const resp = await userGoodsRecycleConfirmRequest(params);
    if (resp.code === 200) {
      currentSubmit.value = resp.data;
      return null;
    } else {
      return resp.msg;
    }
  };

  const selectAll = computed(() => {
    let total = 0;
    let select = 0;
    goodsList.value
      .filter((item) => Number(item.status) === 0)
      .forEach((item) => {
        total = total + (item.num ?? 0);
        select = select + (item.selectNum ?? 0);
      });
    return (
      goodsList.value.length > 0 && selectNum.value !== 0 && select === total
    );
  });

  const selectNum = computed(() => {
    let total = 0;
    goodsList.value.forEach((item) => {
      total = total + (item.selectNum ?? 0);
    });
    return total;
  });

  eventBus.on("didSelectAddress", async (addressItem: any) => {
    const resp = await userGoodsDeliverSubmitRequest({
      addressId: addressItem.id,
      briefs: submitParams.value.briefs,
      type: submitParams.value.type,
    });
    if (resp.code === 200) {
      const goodsList: SubmitGoodsModel[] = JSON.parse(
        resp.data.detail
      ) as SubmitGoodsModel[];
      currentSubmit.value = resp.data as any;
      address.value = addressItem;
      address.value.price = Number(resp.data.payPrice);
      console.log("SubmitGoodsModel:", goodsList, address);
    }
  });

  return {
    currentTabValue,
    currentIndex,
    crushDidTap,
    reItemGoods,
    crushAction,
    crushList,
    crushShow,
    drawShow,
    openRewordList,
    openChestAction,
    didTapConfirm,
    chestsModel,
    selectShow,
    chestsList,
    loadChestDate,
    selectItem,
    chooseAddress,
    payType,
    didTapPay,
    recordList,
    smashList,
    payShow,
    isSelectAll,
    handleTapItem,
    selectNum,
    shipmentShow,
    goodsList,
    clickBoxItem,
    handleSelectItem,
    didSelectBox,
    currentTab,
    boxList,
    total,
    numSelectModal,
    params,
    loadData,
    getBoxGoodsList,
    smashShow,
    handleScrollToLower,
    loading,
    currentBox,
    detailShow,
    clickItem,
    handleLockItem,
    handle,
    address,
    mineMerchantList,
    loadMerchantBoxList,
    handleExpandMerchant,
    currentExpand,
  };
}
