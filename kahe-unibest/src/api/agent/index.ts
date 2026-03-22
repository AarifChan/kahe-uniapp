import { get, post } from "@/utils/request";
import type { AgentIndexModel, AgentUserModel } from "@/model/agent";
import type { ListObject } from "@/model/base";

/* 用户信息 */
export const getAgentUser = async () => {
  return await get<AgentUserModel>("activity/agent/user");
};

/* 主页信息 */
export const getAgent = async (limit: number) => {
  return await get<AgentIndexModel>("activity/agent", {
    limit,
  });
};

/* 绑定萌主 */
export const postAgentBind = async (uid: number) => {
  return await post<AgentUserModel>("activity/agent/bind", {
    uid,
  });
};

/* 代理列表 */
export const getAgentList = async (page: number, limit: number) => {
  return await get<ListObject<AgentUserModel>>("activity/agent/list", {
    page,
    limit,
  });
};
