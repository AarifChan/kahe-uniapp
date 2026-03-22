import type { AgentIndexModel, AgentUserModel } from '@/model/agent'
import type { ListObject } from '@/model/base'
import { get, post } from '@/utils/request'

/* 用户信息 */
export async function getAgentUser() {
  return await get<AgentUserModel>('activity/agent/user')
}

/* 主页信息 */
export async function getAgent(limit: number) {
  return await get<AgentIndexModel>('activity/agent', {
    limit,
  })
}

/* 绑定萌主 */
export async function postAgentBind(uid: number) {
  return await post<AgentUserModel>('activity/agent/bind', {
    uid,
  })
}

/* 代理列表 */
export async function getAgentList(page: number, limit: number) {
  return await get<ListObject<AgentUserModel>>('activity/agent/list', {
    page,
    limit,
  })
}
