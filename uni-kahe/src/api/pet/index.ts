import { get, post } from "@/utils/request";
import type {
  ListObject,
  MinePetEggsModel,
  MinePetModel,
  PageParams,
  PetConfig,
  PetPageParams,
  TaskModel,
} from "@/model";

/* 获取我的宠物列表 */
export const getMinePetListRequest = async (params: PetPageParams) => {
  return await get<ListObject<MinePetModel>>("pet", params);
};

/* 获取我的宠物蛋列表 */
export const getMinePetEggsRequest = async (params: PageParams) => {
  return await get<ListObject<MinePetEggsModel>>("pet/eggs", params);
};

/* 遗弃宠物 */
export const abandonPetRequest = async (params: any) => {
  return await post("pet/abandon", params);
};

/* 上阵宠物 */
export const loadPetRequest = async (params: any) => {
  return await post("pet/load", params);
};

/* 获取任务列表 */
export const getPetTaskRequest = async () => {
  return await get<TaskModel[]>("pet/task", {});
};

/* 下阵宠物 */
export const unloadPetRequest = async (params: any) => {
  return await post("pet/unload", params);
};

/* 融合宠物 */
export const mergePetRequest = async (params: any) => {
  return await post<{ id: number; level: number; pid: number }>(
    "pet/compose",
    params
  );
};

/* 宠物蛋孵化 */
export const consumeEggsRequest = async (params: any) => {
  return await post<PetConfig>("pet/eggs", params);
};

/* 获取宠物配置 */
export const getPetConfigRequest = async () => {
  return await get<PetConfig>("pet/config", {});
};

/* 宠物开始派遣 */
export const startPetDispatchRequest = async (data: any) => {
  return await post("pet/dispatch/start", data, {
    urlAppend: false,
  });
};

/* 宠物结束派遣 */
export const endPetDispatchRequest = async (data: any) => {
  return await post("pet/dispatch/end", data);
};
