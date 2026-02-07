import { ref } from "vue";
import type {
  BarrageParams,
  ProductBoxModel,
  UIBannerModel,
  UIBarrageModel,
  UIProductModel,
  UIRecommendModel,
} from "@/model";
import {
  getBarrageListRequest,
  homeBlindBoxDataRequest,
  queryProductBoxRequest,
} from "@/api";
import {
  getLevelFullImagePath,
  getMainTagImagePath,
  getSubTagImagePath,
} from "@/utils/tools/image";
import { formatPrice, isValidURL } from "@/utils/tools";
import { AppModule } from "@/store/modules/app";
import item from "@/subPackages/product/welfare-detail/components/item.vue";

const homeTabList = [
  {
    title: "自营",
    value: 999,
  },
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
    title: "其它",
    value: 12,
  },
];

const limitTabList = [
  {
    title: "宝可梦",
    value: 6,
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/machine/cat1.png",
  },
  {
    title: "航海王",
    value: 7,
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/machine/cat2.png",
  },
  {
    title: "洛卡纳",
    value: 8,
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/machine/cat3.png",
  },
  {
    title: "WS黑白双翼",
    value: 9,
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/machine/cat4.png",
  },
  {
    title: "UA",
    value: 10,
    icon: "https://jms.85gui7.com/kahe-202510/ka-he/machine/cat5.png",
  },
];

export const AllCategoryList = [...homeTabList, ...limitTabList];

export function useGoods() {
  const goodsList = ref([] as UIProductModel[]);

  const total = ref(0);

  const current = ref(0);

  const bannerList = ref([] as UIBannerModel[]);

  const barrageList = ref([] as UIBarrageModel[]);

  const recommendList = ref([] as UIRecommendModel[]);

  const merchantId = ref(0);

  const homeList = ref([] as any);
  // 主页数据
  const getHomeList = async () => {
    const res = await homeBlindBoxDataRequest();
    const banner = [] as UIBannerModel[];
    const barrage = [] as UIBarrageModel[];
    const recom = [] as UIRecommendModel[];
    if (res.code === 200) {
      for (const item of res.data.banner ?? []) {
        let state = 1;
        if (isValidURL(item.url) || Number(item.url) === 2) {
          state = 2;
        }
        banner.push({
          title: item.title,
          image: item.pic,
          content: item.url,
          id: item.id,
          state: item.status,
        });
      }
      for (const item of res.data.barrage ?? []) {
        const tmp = JSON.parse(item.sourceEx) as BarrageParams;
        barrage.push({
          avatar: item.avatar,
          content: item.context,
          userName: item.nickname,
          productId: tmp.productId,
          goodsImage: tmp.goodsImage,
          levelPath: getLevelFullImagePath(Number(tmp.goodsLevel)),
        });
      }
      for (const item of res.data.recom ?? []) {
        recom.push({
          title: item.title,
          image: item.pic,
          price: item.box.price,
          productNum: item.box.productNum,
          lastSeqNo: item.box.lastSeqNo,
          id: item.boxId,
        });
      }

      bannerList.value = banner;
      barrageList.value = barrage;
      recommendList.value = recom;
    }
  };
  // 获取无限赏弹幕
  const getBarrageList = async (type: number = 1) => {
    const res = await getBarrageListRequest(type);
    if (res.code === 200) {
      const barrage = [] as UIBarrageModel[];
      for (const item of res.data) {
        const tmp = JSON.parse(item.sourceEx) as BarrageParams;
        barrage.push({
          avatar: item.avatar,
          content: item.context,
          userName: item.nickname,
          productId: tmp.productId,
          goodsImage: tmp.goodsImage,
          levelPath: getLevelFullImagePath(Number(tmp.goodsLevel)),
        });
      }
      barrageList.value = barrage;
    }
  };

  const machineTabList = ref(limitTabList);

  const goodsTabList = ref(homeTabList);

  /* 获取盲盒参数 */
  const goodsParams = ref({
    page: 1,
    limit: 20,
    cid: 1,
    sort: 0,
    stype: "asc",
    key: "",
    goods: 1,
  });

  const didClickMachineTab = async (index: number) => {
    current.value = index;
    goodsParams.value.page = 1;
    await getMachineList();
  };
  const handleHomeTab = async (index: number) => {
    goodsParams.value.cid = goodsTabList.value[index].value;
    goodsParams.value.page = 1;
    goodsParams.value.key = "";
    await getGoodsList(goodsParams.value.cid);
  };

  const didClickTab = async (cid: number) => {
    // goodsParams.value.cid = goodsTabList.value[index].value
    goodsParams.value.page = 1;
    // getGoodsListByCid(cid, merchantId.value)
    await getGoodsList(cid);
  };
  const didClickSearch = async (content: string) => {
    goodsParams.value.key = content;
    goodsParams.value.page = 1;
    await getGoodsList(goodsParams.value.cid);
  };
  // 点击轮播图
  const tapBannerAction = (item: UIBannerModel) => {
    console.log("tapBannerAction:", item);
    if (item.title === "2" || item.title === "1") {
      uni.previewImage({
        current: item.content,
        urls: [item.content],
      });
    } else {
      uni.navigateTo({
        url: `${item.content}&title=${item.title}`,
      });
    }
  };
  // 点击弹幕
  const tapLampAction = (item: UIBarrageModel) => {
    uni.navigateTo({
      url: `/subPackages/product/detail/index?pid=${item.productId}`,
    });
  };
  // 点击推荐
  const tapRecommendItem = (item: UIRecommendModel) => {
    uni.navigateTo({
      url: `/subPackages/product/detail/index?boxid=${item.id}`,
    });
  };

  /* 获取盲盒 */
  const getGoodsList = async (cid: number) => {
    goodsParams.value.cid = cid;
    let params = {
      page: goodsParams.value.page,
      limit: goodsParams.value.limit,
      cid: cid,
      sort: goodsParams.value.sort,
      stype: goodsParams.value.stype,
      key: goodsParams.value.key,
      merchant: 1,
    };
    if (merchantId.value !== 0) {
      params = Object.assign(params, {
        mid: merchantId.value,
      });
    }
    if (params.cid === 999) {
      params = Object.assign(params, {
        cid: null,
        mid: 1,
      });
    }

    const resp = await queryProductBoxRequest(params);
    if (resp.code === 200) {
      const goods =
        params.page === 1 ? Array<UIProductModel>() : goodsList.value;
      for (const item of resp.data.content) {
        goods.push({
          name: item.title,
          image: item.logo,
          mainTagImage: getMainTagImagePath(item.mainTag),
          subTagImage: getSubTagImagePath(item.subTag),
          price: formatPrice(item.price),
          id: item.id,
          isSellout: item.productNum == 0 && item.cateId !== 1,
          productNum: item.productNum,
          lastSeqNo: item.lastSeqNo,
          cateId: item.cateId,
          labels: item.labels,
          merchant: item.merchant,
        });
      }
      goodsList.value = goods;
      total.value = resp.data.totalElements;
    } else {
      total.value = 0;
      goodsList.value = [];
    }
  };
  const machineList = ref([] as ProductBoxModel[]);
  // 获取抽卡机数据
  /// 抽卡机固定cid 为6
  const getMachineList = async () => {
    const params = {
      page: goodsParams.value.page,
      limit: goodsParams.value.limit,
      cid: machineTabList.value[current.value]?.value ?? 6,
      sort: goodsParams.value.sort,
      stype: goodsParams.value.stype,
      key: goodsParams.value.key,
      goods: goodsParams.value.goods,
      box: 1,
    };
    const res = await queryProductBoxRequest(params);
    if (res.code === 200) {
      const list: ProductBoxModel[] = [];
      for (const item of res.data.content) {
        list.push(item);
      }
      machineList.value = list;
      total.value = res.data.totalElements;
    } else {
      total.value = 0;
      machineList.value = [];
    }
  };
  // 点击抽卡机
  const tapCardListItem = (item: ProductBoxModel) => {
    uni.navigateTo({
      url: `/subPackages/product/card/index?boxid=${item.id}&title=${item.title}`,
    });
  };
  const goodsTapClick = (item: UIProductModel) => {
    uni.navigateTo({
      url: `/subPackages/product/detail/index?boxid=${item.id}&title=${item.name}`,
    });
  };
  const handleScrollToLower = async () => {
    if (total.value > goodsParams.value.page * goodsParams.value.limit) {
      goodsParams.value.page++;
      await getGoodsList(goodsParams.value.cid);
    }
  };
  const infiniteScrollToLower = async () => {
    if (total.value > goodsParams.value.page * goodsParams.value.limit) {
      goodsParams.value.page++;
      await getGoodsList(goodsParams.value.cid);
    }
  };
  const machineScroll = async () => {
    if (total.value > goodsParams.value.page * goodsParams.value.limit) {
      goodsParams.value.page++;
      await getGoodsList(goodsParams.value.cid);
    }
  };

  const getGoodsListByCid = async (cid: number, merchantId: number) => {
    let params = {
      page: goodsParams.value.page,
      limit: goodsParams.value.limit,
      cid: cid,
      sort: goodsParams.value.sort,
      stype: goodsParams.value.stype,
      key: goodsParams.value.key,
    };
    if (merchantId) {
      params = Object.assign(params, { merchantId });
    }
    const resp = await queryProductBoxRequest(params);
    if (resp.code === 200) {
      const goods =
        params.page === 1 ? Array<UIProductModel>() : goodsList.value;
      for (const item of resp.data.content) {
        goods.push({
          name: item.title,
          isSellout: false,
          image: item.logo,
          mainTagImage: getMainTagImagePath(item.mainTag),
          subTagImage: getSubTagImagePath(item.subTag),
          price: formatPrice(item.price),
          id: item.id,
          productNum: item.productNum,
          lastSeqNo: item.lastSeqNo,
          cateId: item.cateId,
          labels: item.labels,
        });
      }
      goodsList.value = goods;
      total.value = resp.data.totalElements;
    } else {
      total.value = 0;
      goodsList.value = [];
    }
  };

  return {
    machineScroll,
    infiniteScrollToLower,
    machineList,
    getGoodsListByCid,
    getMachineList,
    tapCardListItem,
    getBarrageList,
    tapLampAction,
    recommendList,
    bannerList,
    barrageList,
    tapRecommendItem,
    tapBannerAction,
    homeList,
    getHomeList,
    goodsTapClick,
    goodsList,
    goodsParams,
    getGoodsList,
    handleHomeTab,
    goodsTabList,
    handleScrollToLower,
    didClickTab,
    current,
    didClickSearch,
    machineTabList,
    didClickMachineTab,
    merchantId,
  };
}
