export interface PageParams {
  limit: number;
  page: number;
}

export interface PetPageParams extends PageParams {
  level?: number;
  status?: number;
}

export interface BoxPageParams extends PageParams {
  mid: number;
}

export interface MerchantParams extends PageParams {
  box?: number;
  cate?: number;
  key?: string;
}

export interface ListObject<T> {
  param: any;
  page: number;
  content: T[];
  totalElements: number;
}

export interface PageModel {
  page: number;
  limit: number;
  total: number;
}

/* 应用配置（/app/config） */
export interface AppConfigModel {
  cardBenefitsGroupImg: string; // 卡友福利群图片
  clientAuditVersion: string; // 客户端审核版本
  complaintChannelImg: string; // 投诉渠道图片
  merchantComplaintImg: string; // 商家投诉图片
}
