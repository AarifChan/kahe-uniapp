import {
  getMineRedBagRequest,
  getRedBagDetailRequest,
  receiveRedBagRequest,
} from "@/api";
import { computed, ref } from "vue";
import { getPageOptions, getRandomInt } from "@/utils/tools";
import type {
  RedBagDetailModel,
  RedBagListItem,
  RedBagUserModel,
} from "@/composables/redBag/model";
import { UserModule } from "@/store/modules/user";
import { ShowToast } from "@/utils";
import type { User } from "@/model";

export enum RedBagState {
  expired = 0,
  share = 1,
  normal = 2,
  finished = 3,
  received = 4,
}
export function useRedBag() {
  const params = ref({
    page: 1,
    limit: 20,
  });

  const commentList = ref([
    "666，感谢大佬分享！",
    "蹭一下大佬的欧气！",
    "狠狠羡慕住了！",
  ]);

  const currentComment = computed(() => {
    return commentList.value[currentCommentIndex.value];
  });
  const currentCommentIndex = ref(0);

  const userInfo = computed(() => UserModule.userInfo);

  const userList = computed((): RedBagUserModel[] => {
    return (
      detail.value?.log.map((item) => {
        const user = detail.value?.user.filter((n) => item.uid === n.uid)[0];
        return Object.assign(item, user);
      }) ?? []
    );
  });

  const hasReceivedRedBag = computed(() => {
    const uId = userInfo.value.uid;
    if (!detail.value) {
      return false;
    }
    return detail.value?.log.filter((n) => n.uid === uId).length > 0;
  });

  /// 0 可领取，1 可分享，2 已失效，3 已领完
  const redBagState = computed((): RedBagState => {
    const expiration = detail.value?.redbag.expiretime ?? "";
    if (isTimeExceeded(expiration)) {
      return RedBagState.expired;
    }
    if (isMineRedBag.value) {
      return RedBagState.share;
    }
    if (detail.value?.redbag.num === 0) {
      return RedBagState.finished;
    }
    if (hasReceivedRedBag.value) {
      return RedBagState.received;
    }
    return RedBagState.normal;
  });

  const getRedBagStateTips = (state: RedBagState) => {
    switch (state) {
      case RedBagState.expired:
        return "来晚了，下次请早点～";
      case RedBagState.finished:
        return "红包被抢光了，分享获得点券已到账";
      case RedBagState.share:
        return "分享新人，获得额外奖励";
      case RedBagState.received:
        return "分享获得点券已到账";
      case RedBagState.normal:
        return "";
    }
  };

  const redBagOwner = computed((): null | User => {
    const uid = detail.value?.redbag.uid;
    if (!uid) {
      return null;
    }
    return detail.value?.user.filter((n) => uid === n.uid)[0] ?? null;
  });

  const redBagList = ref<RedBagListItem[]>([]);

  const detail = ref<RedBagDetailModel | null>(null);

  const isMineRedBag = computed(() => {
    const uid = detail.value?.redbag.uid;
    return userInfo.value.uid === uid;
  });
  const getMineRedBag = async () => {
    const resp = await getMineRedBagRequest(params.value);
    if (resp.code === 200) {
      redBagList.value = resp.data.content ?? [];
    }
  };

  const handleReceivedRedBag = async () => {
    const redBagId = detail.value?.redbag.id;
    console.log("redBagId:", redBagId);
    if (!redBagId) {
      ShowToast("参数有误");
    }
    const resp = await receiveRedBagRequest({
      id: redBagId,
      comment: currentComment.value,
    });
    if (resp.code === 200) {
      ShowToast("领取成功");
      await getRedBagDetail();
    }
  };

  const getRedBagDetail = async () => {
    const ops = getPageOptions();
    if (!ops.id) {
      return;
    }
    const resp = await getRedBagDetailRequest(ops.id);
    if (resp.code === 200) {
      detail.value = resp.data;
    }
  };
  const didClickRedBagItem = (item: RedBagListItem) => {
    uni.navigateTo({
      url: `/subPackages/box/redBag/index?id=${item.id}`,
    });
  };

  const changeComment = () => {
    const newIndex = getRandomInt(0, commentList.value.length - 1);
    if (newIndex === currentCommentIndex.value) {
      changeComment();
      return;
    }
    currentCommentIndex.value = newIndex;
  };

  function isTimeExceeded(timeString: string): boolean {
    // 将字符串转换为 Date 对象
    const givenTime = new Date(timeString);
    // 获取当前时间
    const currentTime = new Date();

    // 比较两个时间对象
    return givenTime < currentTime;
  }

  return {
    hasReceivedRedBag,
    userList,
    getMineRedBag,
    isMineRedBag,
    currentComment,
    getRedBagDetail,
    detail,
    getRedBagStateTips,
    didClickRedBagItem,
    redBagList,
    handleReceivedRedBag,
    changeComment,
    redBagOwner,
    redBagState,
  };
}
