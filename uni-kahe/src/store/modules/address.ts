import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

import store from "@/store";
import {
  addressDetailRequest,
  queryAddressListRequest,
  updateAddressRequest,
  queryCityListRequest,
} from "@/api/";
import type { PageParams, AddressModel, UICityItemModel } from "@/model/";
import { ShowToast } from "@/utils/Toast";

@Module({
  dynamic: true,
  store,
  name: "address",
})
class Address extends VuexModule {
  addressList: AddressModel[] = Array<AddressModel>();

  currentAddress: AddressModel = <AddressModel>{};

  cityList: UICityItemModel[] = Array<UICityItemModel>();

  @Action
  changeCurrentAddress(item: AddressModel) {
    this.context.commit("UPDATE_CURRENT_ADDRESS", item);
  }

  @Action
  async getAddressList() {
    const params: PageParams = {
      page: 1,
      limit: 10,
    };
    const resp = await queryAddressListRequest(params);
    if (resp.code === 200) {
      for (const item of resp.data) {
        if (item.isDefault) {
          this.changeCurrentAddress(item);
        }
      }

      this.context.commit("UPDATE_ADDRESS_LIST", resp.data);
    }
  }

  @Action
  async addAddress(params: AddressModel) {
    const res = await updateAddressRequest(params);
    if (res.code == 200) {
      await this.getAddressList();
      await ShowToast("添加成功", 2000);
      return true;
    } else {
      await ShowToast(res.msg, 2000);
      return false;
    }
  }

  @Action
  async getAddressDetail(id: string) {
    const resp = await addressDetailRequest(id);
    if (resp.code === 200) {
      return resp.data;
    } else {
      return <AddressModel>{};
    }
  }

  // items: [{
  //     text: "一年级",
  //     value: "1-0",
  //     children: [
  //         {
  //             text: "1.1班",
  //             value: "1-1"
  //         },
  //         {
  //             text: "1.2班",
  //             value: "1-2"
  //         }
  //     ]
  // },
  //     {
  //         text: "二年级",
  //         value: "2-0"
  //     },
  //     {
  //         text: "三年级",
  //         value: "3-0"
  //     }],
  @Action
  async fetchCityList() {
    const resp = await queryCityListRequest();
    if (resp.code === 200) {
      const list = Array<UICityItemModel>();
      for (const item of resp.data) {
        const tmp = Array<UICityItemModel>();
        for (const item1 of item.c) {
          const tmp2 = Array<UICityItemModel>();
          for (const item2 of item1.c) {
            tmp2.push({
              text: item2.n,
              value: item2.v,
            });
          }
          tmp.push({
            text: item1.n,
            value: item1.v,
            children: tmp2,
          });
        }
        list.push({
          text: item.n,
          value: item.v,
          children: tmp,
        });
      }
      this.context.commit("UPDATE_CITY_LIST", list);
    }
  }

  @Mutation
  UPDATE_ADDRESS_LIST(list: AddressModel[]) {
    this.addressList = list;
  }

  @Mutation
  UPDATE_CURRENT_ADDRESS(address: AddressModel) {
    this.currentAddress = address;
  }

  @Mutation
  UPDATE_CITY_LIST(list: UICityItemModel[]) {
    this.cityList = list;
  }
}

export const AddressModule = getModule(Address);
