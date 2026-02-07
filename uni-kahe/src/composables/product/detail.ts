import {
  orderCancelRequest,
  productDeliverRequest,
  productDetailRequest,
  productOrderRequest,
  productPurchaseRequest,
  productPurchaseSubmitRequest,
  productRecordRequest,
  productSwapBoxRequest,
  userGoodsDeleteRequest,
  userGoodsRecycleConfirmRequest,
} from "@/api";
import type {
  BoxGoodsSubmitParams,
  BoxGoodsSubmitResponse,
  GoodsBrief,
  OpenRedBagModel,
  ProductDetailParams,
  ProductPurchaseSubmitParams,
  SubmitGoodsModel,
  UICouponModel,
  UIDemonKing,
  UIProductBoxModel,
  UIProductBoxRangeType,
  UIProductDetailLevelGroup,
  UIProductDetailLevelGroupItem,
  UIProductDetailLevelList,
  UIProductDetailModel,
  UIProductOpenBoxModel,
  UIProductPayModel,
  UIProductPriceCard,
  UIProductRecordModel,
  UIProductSwapItemModel,
  UIProductSwapLevelItem,
  UIProductSwapModel,
  UserGoodsModel,
} from "@/model";
import { hideLoading, showLoading, ShowToast } from "@/utils";
import {
  getLevelCNName,
  getLevelFullImagePath,
  getLevelName,
  limitLevelName,
} from "@/utils/tools/image";
import {
  formatNumToString,
  formatPrice,
  getPageOptions,
  getPassTime,
  parseTime,
  shuffle,
  useSortFun,
} from "@/utils/tools";
import type { LotteryModel } from "@/components/lottery/index.vue";
import { UserModule, checkOrderInfo } from "@/store/modules/user";
import { useEnum } from "../enum/index";
import { computed, onMounted, onUnmounted, ref, type Ref, watch } from "vue";
import { eventBus } from "@/utils/event";

const {
  getLevelImage,
  levelTypeBg,
  getNormalLevelNameByLevel,
  getLevelImageByLevel,
} = useEnum();
const checkIsSpecByLevel = (level: number) => {
  switch (level) {
    case 502:
    case 401:
    case 302:
    case 501:
    case 402:
    case 301:
    case 202:
    case 201:
    case 203:
    case 204:
    case 205:
      return true;
    default:
      return false;
  }
};

export function useProductDetail() {
  /// 是否无限赏
  const isInfinite = ref(true);
  /// 是否开启选号模式
  const isSelectNum = ref(false);
  const currentBox = ref({} as UserGoodsModel);
  /// 箱子物品等级
  const levelList = ref([] as UIProductDetailLevelList[]);
  /// 箱子物品
  const goodsList = ref([] as UIProductBoxModel[]);
  /// 抽卡次数
  const cardsList = ref([] as UIProductPriceCard[]);

  // 卡牌效果
  const lotteryList = ref([] as LotteryModel[]);
  /// 箱子详情
  const productDetail = ref({} as UIProductDetailModel);

  const swapModalShow = ref(false);

  const payShow = ref(false);

  const lotteryShow = ref(false);

  /**
   * 开赏结果
   */
  const rewardShow = ref(false);

  const openShow = ref(false);

  const smashShow = ref(false);

  const currentTab = ref(0);
  const detailShow = ref(false);

  /// 该盲盒的箱子
  const boxList = ref([] as UIProductSwapItemModel[]);
  // 换箱参数
  const boxParams = ref({
    level: -1,
    limit: 50,
    max: 50,
    min: 1,
    page: 1,
    sort: "asc",
    sflag: 2,
    total: 1,
  });

  // 盲盒记录所需参数
  const recordParams = ref({
    level: -1,
    limit: 10,
    page: 1,
    total: 1,
  });
  // 支付数据信息
  const payItem = ref({} as UIProductPayModel);

  /// 退货订单
  const smashItem = ref({} as BoxGoodsSubmitResponse);

  const recordList = ref([] as UIProductRecordModel[]);

  const orderList = ref([] as UIProductRecordModel[]);

  const boxRangeList = ref([] as UIProductBoxRangeType[]);

  const originList = ref([] as UIProductOpenBoxModel[]);

  const rewardList = ref([] as UIProductOpenBoxModel[]);
  // 退货数据
  const recycleGoods = ref([] as SubmitGoodsModel[]);

  const rewardTicket = ref(0);

  const rewardRedBag = ref([] as OpenRedBagModel[]);

  const skipLottery = ref(false);

  const luckProgress = computed(() => {
    /// 无限赏的进度
    const luckProgress = productDetail?.value.luckProgress * 100;

    /// 普通赏的进度
    // const pros = (props.product.num / props.product.total) * 100
    // console.log('progress:', pros, props.product.num, props.product.total)
    return `width:${luckProgress}%`;
  });

  const normalProgress = computed(() => {
    const proogress =
      (productDetail.value?.num / (productDetail.value.total ?? 1)) * 100;
    return `width:${proogress}%`;
  });
  const handleCancelCurrentOrder = async () => {
    const orderId = payItem.value.id;
    if (orderId) {
      await orderCancelRequest(orderId);
    }
  };

  const showOpenBoxResult = async () => {
    if (isInfinite.value && !skipLottery.value) {
      await showLottery();
    } else {
      if (productDetail.value.type === 4) {
        openShow.value = true;
      } else {
        rewardShow.value = true;
      }
    }
    await reloadCurrentPage();
  };

  const scrollToLower = async () => {
    if (
      currentTab.value === 1 &&
      recordParams.value.page < recordParams.value.total
    ) {
      recordParams.value.page++;
      await loadRecordList();
    } else if (recordParams.value.page < recordParams.value.total) {
      recordParams.value.page++;
      await loadRecordList();
    }
  };

  const showLottery = async () => {
    const tempList = originList.value.sort((n1, n2) => n2.level - n1.level);
    const list = shuffle(tempList).map((item) => {
      return {
        image: item.image,
        title: item.name,
        level: item.level,
        rawLevel: item.level,
        levelImage: item.levelImage,
      } as LotteryModel;
    });
    if (list.length <= 10) {
      lotteryList.value = list;
      lotteryShow.value = true;
    } else {
      rewardShow.value = true;
    }
  };

  const handleSmashGoods = async () => {
    const orderId = smashItem.value.orderId;
    const resp = await userGoodsDeleteRequest({
      orderId,
    });
    if (resp.code === 200) {
      await ShowToast("操作成功", 1500);
      smashShow.value = false;
    } else {
      await ShowToast(resp.msg, 1500);
    }
  };

  /// 点击一键退货
  const didTapSmashRightNow = async () => {
    const briefs = rewardList.value
      .filter((n) => n.level !== 0)
      .map((item) => {
        return {
          boxId: productDetail.value.boxId,
          gid: item.id,
          num: item.num,
        } as GoodsBrief;
      });
    const params: BoxGoodsSubmitParams = {
      briefs,
      type: 3,
    };
    showLoading();
    const res = await userGoodsRecycleConfirmRequest(params);
    hideLoading();
    if (res.code !== 200) {
      await ShowToast(res.msg);
    }
    smashItem.value = res.data;
    if (res.code === 200) {
      const list: SubmitGoodsModel[] = JSON.parse(res.data.detail);
      recycleGoods.value = list.map((item) => {
        return Object.assign(
          {
            ...item,
          },
          {
            levelImage: getLevelImageByLevel(item.level),
          }
        );
      });
      rewardShow.value = false;
      smashShow.value = true;
    }
  };

  const levelGroupList = computed(() => {
    const groupList: UIProductDetailLevelGroup[] = [];
    levelList.value.forEach((item) => {
      const tempGroup =
        goodsList.value.filter((n) => item.level === n.level) ?? [];
      groupList.push({
        levelName: limitLevelName(item.level),
        prob: item.prob,
        level: item.level,
        items: tempGroup.map((val) => {
          return {
            salePrice: val.salePrice,
            goodDesc: val.goodDesc,
            title: val.title,
            image: val.image,
            name: val.title,
            prob: val.prob,
            levelName: limitLevelName(val.level),
            level: val.level,
            price: val.price,
            isDemon: val.isDemon,
          } as unknown as UIProductDetailLevelGroupItem;
        }),
      });
    });
    return groupList;
  });
  const currentSubmit: Ref<ProductPurchaseSubmitParams> = ref(
    {} as ProductPurchaseSubmitParams
  );

  /// 点击购买
  const didTapPurchaseNum = async (
    item: ProductPurchaseSubmitParams,
    coupon?: UICouponModel
  ) => {
    const res = await productPurchaseSubmitRequest({
      couponId: coupon?.id,
      id: productDetail.value.id,
      num: item.num,
      selNum: item.selNum,
    });
    currentSubmit.value = item;
    const { data, code } = res;
    if (code === 200) {
      payItem.value = {
        usedIntegral: data.usedIntegral,
        id: data.orderId,
        num: item.num,
        image: productDetail.value.image,
        title: productDetail.value.title,
        totalPrice: data.totalPrice,
        payPrice: data.payPrice,
        price: formatPrice(productDetail.value.price),
        usedPrice:
          Number(data.usedMoney) +
          Number(data.usedCoin) +
          Number(data.usedIntegral),
        usedMoney: data.usedMoney,
        usedCoin: data.usedCoin,
        fromMall: false,
        coupon: coupon,
      };
      payShow.value = true;
    } else {
      await ShowToast(res.msg);
    }
  };

  const handleOpenResult = async (orderId: string) => {
    // playAudio()
    const deliverRes = await productDeliverRequest(orderId);
    if (deliverRes.code === 200) {
      payShow.value = false;
      await ShowToast("支付成功");
      // 支付完成需要展示
      let list: UIProductOpenBoxModel[] = Array<UIProductOpenBoxModel>();
      for (const item of deliverRes.data.goods) {
        const isLucky =
          productDetail.value.demonKing.gid.filter(
            (n) => n === item.goodsDto.id
          ).length > 0;
        list.push({
          id: item.goodsDto.id,
          name: item.goodsDto.name,
          level: item.goodsDto.level,
          levelImage: getLevelImage(item.goodsDto.level),
          levelBg: levelTypeBg(item.level),
          image: item.goodsDto.image,
          isLucky: isLucky,
          num: 1,
          uGIds: [],
          uGId: item.ugid,
          isHide: false,
        });
      }
      const originOpenList = [...list];
      for (const item of deliverRes.data.attachGoods ?? []) {
        const isLucky =
          productDetail.value.demonKing.gid.filter(
            (n) => n === item.goodsDto.id
          ).length > 0;
        list.push({
          id: item.goodsDto.id,
          name: item.goodsDto.name,
          level: item.goodsDto.level,
          levelImage: getLevelImage(item.goodsDto.level),
          levelBg: levelTypeBg(item.level),
          image: item.goodsDto.image,
          isLucky: isLucky,
          num: 1,
          uGIds: [],
          uGId: item.ugid,
          isHide: true,
        });
      }
      for (const item of deliverRes.data.chest) {
        list.push({
          id: item.chestDto.id,
          name: item.chestDto.title,
          level: 0,
          levelImage: "https://jms.85gui7.com/jos/common/mibao.png",
          image: item.chestDto.logo,
          isLucky: false,
          num: 1,
          uGIds: [],
          uGId: item.id,
          isHide: false,
          levelBg: levelTypeBg(item.chestDto.goods.level),
        });
      }
      const obj: { [key: number]: number[] } = {};
      list = list.reduce<UIProductOpenBoxModel[]>((item, next) => {
        if (!obj[next.id]) {
          item.push(next);
          obj[next.id] = [next.uGId!];
        } else {
          obj[next.id].push(next.uGId!);
        }
        return item;
      }, []);
      const redBagList = deliverRes.data.redbag ?? [];
      list.forEach((item) => {
        item.num = obj[item.id].length;
        item.uGIds = obj[item.id];
        item.hasRedBag = redBagList.filter((n) => n.gid === item.id).length > 0;
      });
      list.sort(
        (n1: UIProductOpenBoxModel, n2: UIProductOpenBoxModel) =>
          n2.level - n1.level
      );
      rewardTicket.value = deliverRes.data.ticket;
      rewardList.value = list;
      rewardRedBag.value = redBagList;
      originList.value = originOpenList;

      await showOpenBoxResult();
    }
  };
  const playAudio = () => {
    const audio = uni.createInnerAudioContext();
    audio.src = "https://jms.85gui7.com/tycw-mp/resources/play.mp3";
    audio.play();
  };

  const didTapChangeBoxRange = async (params: any) => {
    boxParams.value.min = params.min;
    boxParams.value.max = params.max;
    console.log("didTapChangeBoxRange:", params);
    await loadBoxList();
  };

  const didTapPay = async (orderId: string) => {
    const resp = await productPurchaseRequest(orderId);
    if (resp.code === 200) {
      if (resp.data.status === 1) {
        await handleOpenResult(orderId);
      } else {
        showLoading("正在支付");
        const wxRes = await UserModule.handleWxPay(
          orderId,
          productDetail.value.pid
        );
        hideLoading();
        if (!wxRes) {
          await handleOpenResult(orderId);
        } else {
          await ShowToast(wxRes ?? "支付失败", 1500);
        }
      }
    } else {
      // 退货
      const resp = await userGoodsDeleteRequest({
        orderId,
      });
      if (resp.code === 200) {
        await ShowToast("操作成功", 1500);
        payShow.value = false;
      } else {
        await ShowToast(resp.msg, 1500);
      }
    }
  };
  // 优惠卷
  const didTapCoupon = () => {
    uni.navigateTo({
      url: `/subPackages/mine/coupon/index?needSelect=${true}`,
    });
  };
  const loadProductDetail = async (params: ProductDetailParams) => {
    showLoading();
    const res = await productDetailRequest(params);
    hideLoading();
    const { code, data } = res;
    if (code === 200) {
      // 详情等级排序
      let levelArray = [] as Array<UIProductDetailLevelList>;
      // 详情页的盲盒数据
      let boxList = [] as Array<UIProductBoxModel>;
      const demonGid = data.product.demonKingDto?.gid ?? [];
      const allGoodsList = [
        ...data.product.goods,
        ...data.product.specGoods,
        ...(data.product.strandGoods ?? []),
      ];
      for (const item of allGoodsList) {
        // 概率
        const prob = item.prob ? item.prob * 100 : 0;
        levelArray.push({
          level: item.goodsDto.level,
          levelImgPath: getLevelFullImagePath(item.goodsDto.level),
          prob: prob.toFixed(4),
          levelName: getLevelCNName(item.goodsDto.level).toLocaleUpperCase(),
          name: item.goodsDto.name,
          image: item.goodsDto.image,
          list: [],
          price: item.goodsDto.price + "",
        });
      }
      for (const item of data.product.goods ?? []) {
        const prob = item.prob ? item.prob * 100 : 0;

        boxList.push({
          id: item.goodsDto.id,
          title: item.goodsDto.name,
          price: item.goodsDto?.price,
          prob: prob.toFixed(4),
          level: item.goodsDto.level,
          levelImage: getLevelImage(item.goodsDto.level),
          image: item.goodsDto.image,
          last: item.num ?? item.weight,
          quality: item.goodsDto.quality,
          total: item.total ?? item.weight,
          isSpec: false,
          isSellOut: item.num === 0,
          goodDesc: item.goodsDto?.goodDesc,
          salePrice: data.product.price,
          isDemon: demonGid.filter((n) => n === item.goodsDto.id).length > 0,
        });
      }
      for (const item of data.product.specGoods ?? []) {
        const prob = item.prob ? item.prob * 100 : 0;

        boxList.push({
          id: item.goodsDto.id,
          title: item.goodsDto.name,
          price: item.goodsDto.price,
          prob: prob.toFixed(4),
          level: item.goodsDto.level,
          levelImage: getLevelImage(item.goodsDto.level),
          image: item.goodsDto.image,
          quality: item.goodsDto.quality,
          last: item.num ?? 0,
          total: item.total ?? 0,
          isSpec: true,
          isSellOut: item.num === 0,
          goodDesc: item.goodsDto?.goodDesc,
          salePrice: data.product.price,
          isDemon: demonGid.filter((n) => n === item.goodsDto.id).length > 0,
        });
      }
      for (const item of data.product.destinedConfig ?? []) {
        boxList.push({
          id: item.goodsDto.id,
          title: item.goodsDto.name,
          price: item.goodsDto.price,
          prob: item.prob,
          level: item.goodsDto.level,
          levelImage: getLevelImage(item.goodsDto.level),
          image: item.goodsDto.image,
          quality: item.goodsDto.quality,
          last: item.weight ?? 0,
          total: item.weight ?? 0,
          isSpec: false,
          isStrand: false,
          weight: item.weight,
          num: item.num,
          isSky: true,
          isSellOut: item.num === 0,
          goodDesc: item.goodsDto?.goodDesc,
          salePrice: data.product.price,
          isDemon: demonGid.filter((n) => n === item.goodsDto.id).length > 0,
        });
      }
      for (const item of data.product.strandGoods ?? []) {
        const prob = item.prob ? item.prob * 100 : 0;
        boxList.push({
          id: item.goodsDto.id,
          title: item.goodsDto.name,
          price: item.goodsDto.price,
          prob: prob.toFixed(4),
          level: item.goodsDto.level,
          levelImage: getLevelImage(item.goodsDto.level),
          image: item.goodsDto.image,
          last: item.weight ?? 0,
          total: item.weight ?? 0,
          quality: item.goodsDto.quality,
          isSpec: false,
          isStrand: true,
          isSellOut: false,
          goodDesc: item.goodsDto?.goodDesc,
          salePrice: data.product.price,
          isDemon: demonGid.filter((n) => n === item.goodsDto.id).length > 0,
        });
      }
      // 隐藏奖励
      const attachList = [] as Array<UIProductBoxModel>;
      for (const item of data.product.attachGoods ?? []) {
        attachList.push({
          id: item.id,
          title: "隐藏奖励",
          price: 0,
          prob: "每抽概率附赠",
          level: 999,
          levelImage: "",
          image: "https://jms.85gui7.com/kahe-202510/tags/hide-show-img.jpg",
          last: item.num ?? 0,
          total: item.total ?? 0,
          isSpec: false,
          isSellOut: item.num === 0,
          isHide: true,
        });
        break;
      }
      // 奖品累加处理
      const obj: { [key: number]: UIProductDetailLevelList } = {};
      levelArray = levelArray.reduce<UIProductDetailLevelList[]>(
        (item, next) => {
          if (!obj[next.level]) {
            item.push(next);
            next.list.push({
              name: next.name,
              image: next.image,
            });
            obj[next.level] = next;
          } else {
            obj[next.level].prob = (
              Number(obj[next.level].prob) + Number(next.prob)
            ).toFixed(4);
            obj[next.level].list.push({
              name: next.name,
              image: next.image,
            });
          }
          return item;
        },
        []
      );
      levelArray = levelArray.sort((n1, n2) => n2.level - n1.level);
      levelList.value = levelArray;
      boxList = useSortFun(boxList);
      goodsList.value = [...attachList, ...boxList];
      // 魔王物品:
      // const coinType = data.product.payType === 8 ? '积分' : '水晶'
      const coinType = "积分";
      const king: UIDemonKing = {
        exist: data.product.demonKingDto?.user != null,
        nickname: data.product.demonKingDto?.user?.nickname,
        coin: data.product.demonKingDto?.amount + "" + (coinType ?? ""),
        avatar: data.product.demonKingDto?.user?.avatar ?? "",
        time: getPassTime(data.product.demonKingDto?.time ?? 0),
        gid: data.product.demonKingDto?.gid ?? [],
        goods: data.product.demonKingDto
          ? goodsList.value.filter(
              (n) => n.id === data.product.demonKingDto?.gid[0]
            )[0]
          : null,
      };
      let luckyList: UIProductBoxModel[] = [];
      if (data.product.luckyLevel) {
        luckyList = goodsList.value.filter(
          (n) => n.level >= data.product.luckyLevel
        );
      }
      const attachGoodsList: UIProductBoxModel[] = [];
      if (data.product.attachGoods && data.product.attachGoods.length > 0) {
        data.product.attachGoods.forEach((item) => {
          const prob = item.prob ? item.prob * 100 : 0;
          attachGoodsList.push({
            id: item.goodsDto.id,
            title: item.goodsDto.name,
            price: item.goodsDto.price,
            prob: prob.toFixed(4),
            level: item.goodsDto.level,
            levelImage: getLevelImage(item.goodsDto.level),
            image: item.goodsDto.image,
            last: item.num ?? 0,
            total: item.total ?? 0,
            isSpec: true,
            isSellOut: item.num === 0,
            goodDesc: item.goodsDto?.goodDesc,
            salePrice: item.goodsDto?.salePrice,
            isDemon: demonGid.filter((n) => n === item.goodsDto.id).length > 0,
          });
        });
      }
      // 接口返回的所有数据
      const detail: UIProductDetailModel = {
        // 是否开启拼团
        isCombination: data.product.isCombination,
        // type 类型(1: 无限 0: 普通)
        isDemon: data.product.type === 1,
        isKindMode: data.product.demonKingDto?.gid.length !== 0,
        demonKing: king,
        settleStatus: data.product.settleStatus,
        settleTime: data.product.settleTime,
        merchant: data.box.merchant,
        attachList: attachGoodsList,
        luckyList: luckyList,
        levelList: levelArray,
        title: data.box.title,
        image: data.box.logo,
        num: data.product.num,
        type: data.product.type,
        price: data.box.price,
        total: data.product.total,
        bagBoxTime: data.product.bagBoxTime,
        queueLockTime: data.product.queueLockTime,
        current: data.product.boxSeqNo,
        id: data.product.id,
        lastSeq: data.box.lastSeqNo,
        luckyMax: data.product.luckyMax,
        luckyVal: data.product.luckyVal,
        sales: data.product.sales,
        preId: data.product.preid,
        remark: data.box.remark,
        nextId: data.product.nextid,
        pid: data.box.pid,
        boxId: data.product.boxId,
        nextLevel: getNormalLevelNameByLevel(data.product.luckyLevel),
        another: data.product.luckyMax - data.product.luckyVal,
        luckProgress: data.product.luckyVal / data.product.luckyMax,
        nextLevelValue: data.product.luckyLevel,
        catId: data.box.cateId,
        winNum: data.product.winNum,
      };
      // 接口返回的所有数据
      productDetail.value = detail;
      // 判断是不是无限盒子
      isInfinite.value = detail.isDemon;
      isSelectNum.value = data.product.selectNum === 1;
      // cards
      let cardsArray = [] as Array<UIProductPriceCard>;
      const last = data.product.total - data.product.sales;
      for (const item of data.product.onceTimes) {
        cardsArray.push({
          num: item,
          price:
            item === -1
              ? ""
              : Number(Number(item) * Number(data.product.price)).toFixed(2),
          last: last,
          formatNum: formatNumToString(item),
        });
      }
      cardsArray = cardsArray.reverse();
      cardsList.value = cardsArray;
    } else {
      ShowToast(res.msg);
    }
  };

  onMounted(() => {
    //@ts-ignore
    eventBus.on("didSelectCoupon", async (item: UICouponModel) => {
      console.log("didSelectCoupon:", item);
      await didTapPurchaseNum(currentSubmit.value, item);
    });
  });
  onUnmounted(() => {
    eventBus.off("didSelectCoupon");
  });

  // 获取箱子列表
  const loadBoxList = async () => {
    let params = {
      boxid: productDetail.value.boxId,
      limit: boxParams.value.limit,
      max: boxParams.value.max,
      min: boxParams.value.min,
      page: 1,
      sflag: boxParams.value.sflag,
      sort: boxParams.value.sort,
    };
    if (boxParams.value.level !== -1) {
      params = Object.assign({
        ...params,
        level: boxParams.value.level,
      });
    }
    const BoxRequest = await productSwapBoxRequest(params);
    if (BoxRequest.code === 200) {
      const total = productDetail.value.lastSeq;
      const rangeList = [] as UIProductBoxRangeType[];
      const swapBoxList = [] as UIProductSwapItemModel[];
      if (total) {
        const count = Math.ceil(total / 50);
        for (let i = 0; i < count; i++) {
          rangeList.push({
            title: `${i * 50 + 1}-${(i + 1) * 50}`,
            page: i + 1,
          } as UIProductBoxRangeType);
        }
      }
      if (rangeList.length === 0) {
        rangeList.push({
          title: "1-50",
          page: 1,
        });
      }
      for (const item of BoxRequest.data.content) {
        const tmp: UIProductSwapItemModel = <UIProductSwapItemModel>{};
        tmp.num = item.num;
        tmp.total = item.total;
        tmp.id = item.id;
        tmp.boxSeqNo = item.boxSeqNo;
        tmp.isCurrent = item.boxSeqNo === productDetail.value.current;
        const levelList: number[] = [];
        for (const tmpElement of item.goods) {
          levelList.push(tmpElement.level);
        }
        let result: number[] = [];
        levelList.forEach((levelItem) => {
          if (result.indexOf(levelItem) === -1) {
            result.push(levelItem);
          }
        });
        result = result.sort((n1, n2) => n2 - n1);
        const map: UIProductSwapLevelItem[] = Array<UIProductSwapLevelItem>();
        result.forEach((level) => {
          let num = 0;
          let total = 0;
          item.goods.forEach((goods) => {
            if (goods.level === level) {
              num = num + goods.num;
              total = total + goods.total;
            }
          });
          map.push({
            title: getNormalLevelNameByLevel(level),
            num: num,
            total: total,
          });
        });
        tmp.list = map;
        swapBoxList.push(tmp);
      }
      const model: UIProductSwapModel = {
        boxRange: rangeList,
        boxList: swapBoxList,
      };
      boxRangeList.value = model.boxRange;
      boxList.value = model.boxList;
    }
    recordParams.value.page = 1;
    await loadRecordList();
  };
  const clickItem = (item: UserGoodsModel) => {
    detailShow.value = true;
    currentBox.value = item;
  };

  const currentTabDidChange = async (index: number) => {
    currentTab.value = index;
    await reloadCurrentPage();
  };

  const sortList = computed(() => {
    const levelList = [] as Array<any>;
    levelList.push({
      name: "全部",
      value: -1,
    });
    if (productDetail.value && productDetail.value.levelList) {
      productDetail.value.levelList.forEach((item) => {
        levelList.push({
          name: item.levelName,
          value: item.level,
        });
      });
    }
    return levelList;
  });
  const sortTabAction = async (i: any) => {
    recordParams.value.level = i.value;
    recordParams.value.page = 1;
    await loadRecordList();
  };

  const loadOrderList = async () => {
    const param = {
      pid: productDetail.value.id,
      limit: recordParams.value.limit,
      page: recordParams.value.page,
    };
    const res = await productOrderRequest(param);
    console.log("ProductOrder:", res.data);
    const { data, code } = res;
    if (code === 200) {
      const list =
        param.page === 1 ? ([] as UIProductRecordModel[]) : recordList.value;
      // const isLucky = productDetail.value.type === 1;
      for (const item of data.content) {
        list.push({
          nickName: item.user.nickname,
          title: productDetail.value.title,
          avatar: item.user.avatar,
          goodsImage: productDetail.value.image,
          num: item.num,
          // level: ,
          // levelImage: getLevelImage(item.goodsLevel),
          // isFree: item.isFree === 1,
          time: parseTime(item.createTime, "{m}/{d} {h}:{i}") ?? "",
          // isLucky: isLucky,
          vip: item.user.vip,
          // sales:
          //     productDetail.value.type === 2 || productDetail.value.type === 4
          //         ? item.extra.selectNum
          //         : item.sales,
          // isHide: isHide,
          // isSpec: checkIsSpecByLevel(item.goodsLevel),
        });
      }
      orderList.value = list;
      recordParams.value.total = Math.ceil(data.totalElements / param.limit);
    } else {
      recordParams.value.total = 0;
    }
  };
  // 获取盲盒记录
  const loadRecordList = async () => {
    showLoading();
    const param = {
      pid: productDetail.value.id,
      level: recordParams.value.level,
      limit: recordParams.value.limit,
      page: recordParams.value.page,
    };
    const res = await productRecordRequest(param);
    hideLoading();
    const { data, code } = res;
    if (code === 200) {
      const list =
        param.page === 1 ? ([] as UIProductRecordModel[]) : recordList.value;
      const isLucky = productDetail.value.type === 1;
      for (const item of data.content) {
        const isHide = isLucky ? item.extra.is_attach : false;
        list.push({
          id: item.id,
          nickName: item.nickname,
          title: item.goodsName,
          avatar: item.avatar,
          goodsImage: item.goodsImage,
          level: item.goodsLevel,
          levelImage: getLevelImage(item.goodsLevel),
          isFree: item.isFree === 1,
          time: parseTime(item.createTime, "{m}/{d} {h}:{i}") ?? "",
          isLucky: isLucky,
          vip: item.vip,
          sales:
            productDetail.value.type === 2 || productDetail.value.type === 4
              ? item.extra.selectNum
              : item.sales,
          isHide: isHide,
          isSpec: checkIsSpecByLevel(item.goodsLevel),
        });
      }
      recordList.value = list;
      recordParams.value.total = Math.ceil(data.totalElements / param.limit);
    } else {
      recordParams.value.total = 0;
    }
  };
  watch(
    () => swapModalShow.value,
    async (value) => {
      if (value) {
        await loadBoxList();
      }
    }
  );

  const reloadCurrentPage = async () => {
    await loadProductDetail({
      pid: productDetail.value.id,
    });
    if (currentTab.value === 1) {
      await loadRecordList();
    }
    if (currentTab.value === 2) {
      await loadOrderList();
    }
  };

  const didSelectBox = async (pid: number) => {
    productDetail.value.id = pid;
    await reloadCurrentPage();
  };
  eventBus.on("didLogin", async (_: any) => {
    await loadData();
  });

  const loadData = async () => {
    const ops = getPageOptions();
    const boxid = ops.boxid;
    const pid = ops.pid;
    const orderId = ops.orderId;
    if (productDetail.value.pid) {
      await loadProductDetail({
        pid: productDetail.value.pid,
      });
    } else if (boxid) {
      await loadProductDetail({
        boxid,
      });
    } else if (pid) {
      await loadProductDetail({
        pid,
      });
    }
    if (productDetail.value.title) {
      await uni.setNavigationBarTitle({
        title: productDetail.value.title,
      });
    }

    const already = uni.getStorageSync(orderId);
    if (orderId && !already) {
      showLoading("查询支付结果");
      const resp = await checkOrderInfo(orderId);
      hideLoading();
      if (resp) {
        await handleOpenResult(orderId);
        uni.setStorageSync(orderId, true);
      }
    }
  };

  const didClickContinue = async () => {
    if (currentSubmit.value) {
      rewardShow.value = false;
      await didTapPurchaseNum(currentSubmit.value);
    }
  };

  const didClickChangeBox = async (isLeft: boolean) => {
    let pid;
    if (isLeft) {
      pid = productDetail.value.preId;
    } else {
      pid = productDetail.value.nextId;
    }
    if (!pid) {
      await ShowToast("没有更多箱子了");
      return;
    }
    productDetail.value.id = pid;

    await reloadCurrentPage();
  };

  return {
    openShow,
    didClickContinue,
    didTapChangeBoxRange,
    loadBoxList,
    boxParams,
    currentBox,
    detailShow,
    clickItem,
    didTapCoupon,
    sortTabAction,
    luckProgress,
    normalProgress,
    sortList,
    isSelectNum,
    lotteryList,
    loadData,
    didClickChangeBox,
    loadProductDetail,
    levelGroupList,
    isInfinite,
    rewardShow,
    boxRangeList,
    levelList,
    productDetail,
    goodsList,
    cardsList,
    boxList,
    orderList,
    recordList,
    swapModalShow,
    payShow,
    payItem,
    reloadCurrentPage,
    didTapPay,
    lotteryShow,
    currentTab,
    rewardList,
    smashShow,
    recycleGoods,
    didTapSmashRightNow,
    currentTabDidChange,
    didTapPurchaseNum,
    loadRecordList,
    handleCancelCurrentOrder,
    didSelectBox,
    handleSmashGoods,
    scrollToLower,
    skipLottery,
    rewardRedBag,
  };
}
