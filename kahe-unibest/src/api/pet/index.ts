import type {
  ListObject,
  MinePetEggsModel,
  MinePetModel,
  PageParams,
  PetConfig,
  PetPageParams,
  TaskModel,
} from '@/model'
import { get, post } from '@/utils/request'

/* 获取我的宠物列表 */
export async function getMinePetListRequest(params: PetPageParams) {
  return await get<ListObject<MinePetModel>>('pet', params)
}

/* 获取我的宠物蛋列表 */
export async function getMinePetEggsRequest(params: PageParams) {
  return await get<ListObject<MinePetEggsModel>>('pet/eggs', params)
}

/* 遗弃宠物 */
export async function abandonPetRequest(params: any) {
  return await post('pet/abandon', params)
}

/* 上阵宠物 */
export async function loadPetRequest(params: any) {
  return await post('pet/load', params)
}

/* 获取任务列表 */
export async function getPetTaskRequest() {
  return await get<TaskModel[]>('pet/task', {})
}

/* 下阵宠物 */
export async function unloadPetRequest(params: any) {
  return await post('pet/unload', params)
}

/* 融合宠物 */
export async function mergePetRequest(params: any) {
  return await post<{ id: number, level: number, pid: number }>(
    'pet/compose',
    params,
  )
}

/* 宠物蛋孵化 */
export async function consumeEggsRequest(params: any) {
  return await post<PetConfig>('pet/eggs', params)
}

/* 获取宠物配置 */
export async function getPetConfigRequest() {
  return await get<PetConfig>('pet/config', {})
}

/* 宠物开始派遣 */
export async function startPetDispatchRequest(data: any) {
  return await post('pet/dispatch/start', data, {
    urlAppend: false,
  })
}

/* 宠物结束派遣 */
export async function endPetDispatchRequest(data: any) {
  return await post('pet/dispatch/end', data)
}
