import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import type {
  EggsModel,
  PetEggsModel,
  PetModel,
} from "@/composables/pet/model";
import { getMinePetListRequest, getPetConfigRequest } from "@/api/pet";
import { ref } from "vue";
@Module({
  dynamic: true,
  store,
  name: "pet",
})
class Pet extends VuexModule {
  petCfgDict = new Map<string, PetModel>();

  eggsCfgDict = new Map<number, PetEggsModel>();

  petList = [] as PetModel[];

  @Action
  async getConfig() {
    const configRes = await getPetConfigRequest();
    if (configRes.code === 200) {
      const petDict: Map<string, PetModel> = new Map();
      const eggsDict: Map<number, PetEggsModel> = new Map<
        number,
        PetEggsModel
      >();

      configRes.data.eggs.forEach((item) => {
        eggsDict.set(item.id, item);
      });
      configRes.data.pets.forEach((item) => {
        const key = item.pid + ":" + item.level;
        petDict.set(key, item);
      });
      const pList = configRes.data.pets.sort((n1, n2) => n2.level - n1.level);
      this.context.commit("UPDATE_PET_CFG_DICT", petDict);
      this.context.commit("UPDATE_PET_EGGS_DICT", eggsDict);
      this.context.commit("UPDATE_PET_LIST", pList);
    }
  }

  @Mutation
  UPDATE_PET_LIST(list: PetModel[]) {
    this.petList = list;
  }

  @Mutation
  UPDATE_PET_CFG_DICT(map: Map<string, PetModel>) {
    this.petCfgDict = map;
  }

  @Mutation
  UPDATE_PET_EGGS_DICT(map: Map<number, PetEggsModel>) {
    this.eggsCfgDict = map;
  }
}

export default getModule(Pet);
