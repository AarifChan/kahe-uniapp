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
