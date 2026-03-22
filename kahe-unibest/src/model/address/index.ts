export interface AddressModel {
  city: string;
  cityId: number;
  detail: string;
  district: string;
  id?: number;
  isDefault: number;
  latitude: string;
  longitude: string;
  phone: string;
  postCode: number;
  province: string;
  realName: string;
  uid?: number;
  price?: number;
  address?: string;
  name?: string;
}

export interface NetworkProvinceModel {
  c: NetworkCityModel[];
  n: string;
  v: number;
}

export interface NetworkCityModel {
  c: NetworkAreaModel[];
  n: string;
  v: number;
}

export interface NetworkAreaModel {
  n: string;
  v: number;
}

export interface CityItemModel {
  name: string;
  list?: CityItemModel[];
  id: number;
}

export interface UICityItemModel {
  text: string;
  value: number;
  children?: UICityItemModel[];
}
