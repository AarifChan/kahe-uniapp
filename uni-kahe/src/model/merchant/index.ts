import type { ProductBoxModel, UIMineBoxModel } from "@/model";

export interface MerchantModel {
  cate: number;
  icon: string;
  id: number;
  name: string;
  tag: number;
  qrCode: string;
}

export interface MerchantInfoModel {
  box: ProductBoxModel[];
  cate: number;
  desc: string;
  icon: string;
  id: number;
  logo: string;
  name: string;
  sort: number;
  tag: number;
  qrCode: string;
}

export interface MerchantBoxModel {
  box: UIMineBoxModel[];
  cate: number;
  desc: string;
  icon: string;
  id: number;
  logo: string;
  name: string;
  sort: number;
  tag: number;
  qrCode: string;
  isExpand: boolean;
}
