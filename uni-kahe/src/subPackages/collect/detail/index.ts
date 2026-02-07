import {
  CollectDetailObject,
  getCollectDetailRequest,
  purchaseCollectProduct,
} from "@/api/collect";
import { computed, ref } from "vue";
import type { UserGoodsModel } from "@/model";
import { userGoodsListRequest } from "@/api";
import { ShowToast } from "@/utils";
import { UserModule } from "@/store/modules/user";
export type UserGoodsSelectModel = UserGoodsModel & { selected: boolean };

export function useCollectDetail() {
  const collectDetail = ref<CollectDetailObject | null>(null);

  const goodsList = ref<UserGoodsSelectModel[]>([]);

  const isFinished = ref(false);

  const otherUid = ref<null | number>(null);

  const alertShow = ref(false);

  const showSelectNum = ref(false);

  const selectNum = ref(0);

  const maxNum = ref(1);

  const collectProgress = computed(() => {
    if (!collectDetail.value || !collectDetail.value.product.price) {
      isFinished.value = false;
      return 0;
    }
    let total = 0;
    goodsList.value
      .filter((item) => item.selected)
      .forEach((item) => {
        total += item.goods.price * item.num;
      });

    const progress = divideAndTruncate(
      total,
      collectDetail.value?.product.price
    );
    maxNum.value = Math.min(
      Math.floor(progress),
      collectDetail.value.product.total - collectDetail.value.product.sales
    );
    selectNum.value = Math.min(
      Math.floor(progress),
      collectDetail.value.product.total - collectDetail.value.product.sales
    );

    if (progress >= 1) {
      isFinished.value = true;
      return 1;
    } else {
      isFinished.value = false;
      return progress;
    }
  });

  const goodsParams = ref<{
    level: null | number;
    page: number;
    limit: number;
  }>({
    level: null,
    page: 1,
    limit: 10,
  });
  const total = ref(0);

  const getCollectDetail = async (id: number, uid: number | null = null) => {
    otherUid.value = uid;
    const resp = await getCollectDetailRequest({
      pid: id,
      obj: uid,
    });
    if (resp.code === 200) {
      collectDetail.value = resp.data;
    }
    console.log(`getCollectDetail:id:${id} uid:${uid}`, resp);
  };

  const getGoodsList = async () => {
    const resp = await userGoodsListRequest(goodsParams.value);
    if (resp.code === 200) {
      const goods =
        goodsParams.value.page === 1
          ? Array<UserGoodsSelectModel>()
          : goodsList.value;

      resp.data.content
        .filter((item) => item.goods?.type !== 1)
        .forEach((item) => {
          goods.push({
            ...item,
            selected: false,
          });
        });
      goodsList.value = goods;
      total.value = resp.data.totalElements;
    }
  };

  const handleScrollToLower = async () => {
    if (total.value > goodsParams.value.page * goodsParams.value.limit) {
      goodsParams.value.page++;
      await getGoodsList();
    }
  };

  const handleCollect = () => {
    if (collectProgress.value !== 1) {
      return;
    }
    if (
      (collectDetail.value?.product.total ?? 0) >
      (collectDetail.value?.product.sales ?? 0)
    ) {
      showSelectNum.value = true;
    } else {
      ShowToast("集赏已结束");
    }
  };

  const handlePayCollect = async () => {
    const goods = goodsList.value
      .filter((item) => item.selected)
      .map((item) => {
        return {
          boxId: item.boxId,
          gid: item.gid,
          id: item.id,
          num: item.num,
          merchantId: item.merchantId,
        };
      });
    if (goods.length === 0) {
      ShowToast("请选择");
      return;
    }
    const pid = collectDetail.value?.product.id;
    const uid = otherUid.value ? otherUid.value : null;
    if (!pid) {
      ShowToast("PID 出错啦");
      return;
    }

    const params = {
      goods,
      pid,
      obj: uid,
      cate: 1,
      num: selectNum.value,
    };
    const resp = await purchaseCollectProduct(params);
    if (resp.code === 200) {
      await getCollectDetail(pid, uid);
      await getGoodsList();
      alertShow.value = false;
      ShowToast("操作成功");
    } else {
      ShowToast(resp.msg);
    }
  };
  const didTapConfirm = async (num: number) => {
    selectNum.value = num;
    alertShow.value = true;
  };

  return {
    maxNum,
    selectNum,
    showSelectNum,
    alertShow,
    otherUid,
    collectProgress,
    goodsList,
    collectDetail,
    goodsParams,
    didTapConfirm,
    handleCollect,
    getCollectDetail,
    getGoodsList,
    handlePayCollect,
    handleScrollToLower,
  };
}

function divideAndTruncate(a: number, b: number): number {
  const result = a / b;
  const factor = Math.pow(10, 4); // 10^4 = 10000
  return Math.floor(result * factor) / factor; // 截断小数部分
}
