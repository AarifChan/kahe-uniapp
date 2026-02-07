import { get, post } from "@/utils/request";
import type { ListObject, PageParams } from "@/model";
import type {
  RedBagListItem,
  RedBagDetailModel,
} from "@/composables/redBag/model";

export const getMineRedBagRequest = async (params: PageParams) => {
  return await get<ListObject<RedBagListItem>>("activity/redbag/list", params);
};

export const getRedBagDetailRequest = async (id: number) => {
  return await get<RedBagDetailModel>("activity/redbag/detail", {
    id,
  });
};

export const receiveRedBagRequest = async (params: any) => {
  return await post("activity/redbag/receive", params);
};

export const shareRedBagRequest = async (id: number) => {
  return await post("activity/redbag/share", {
    id,
  });
};
