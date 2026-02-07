import type { PetModel, EggsModel, TaskModel } from "./model/index";
import { ref } from "vue";
import {
  getMinePetListRequest,
  getMinePetEggsRequest,
  consumeEggsRequest,
  loadPetRequest,
  unloadPetRequest,
  abandonPetRequest,
  mergePetRequest,
  getPetTaskRequest,
  startPetDispatchRequest,
  endPetDispatchRequest,
} from "@/api/pet/";
import PetModule from "@/store/modules/pet";
import { ShowToast } from "@/utils";
import { eventBus } from "@/utils/event";
export function usePet() {
  const minePetList = ref([] as PetModel[]);

  const mineEggsList = ref([] as EggsModel[]);

  const currentEgg = ref<null | EggsModel>(null);

  const currentPet = ref<null | PetModel>(null);

  const dispatchPet = ref<null | PetModel>(null);

  const resultPet = ref<null | PetModel>(null);

  const taskList = ref([] as TaskModel[]);

  const leftSelectPet = ref<null | PetModel>(null);

  const rightSelectPet = ref<null | PetModel>(null);

  const params = ref({
    page: 1,
    limit: 100,
    status: 0,
  });

  const resultModal = ref(false);

  const total = ref(0);

  const onlinePetList = ref([] as PetModel[]);

  const getOnlinePetList = async () => {
    const resp = await getMinePetListRequest({
      page: 1,
      limit: 10,
      status: 1,
    });
    if (resp.code === 200) {
      onlinePetList.value = resp.data.content.map((item) => {
        const key = item.pid + ":" + item.level;
        const tmpPet = PetModule.petCfgDict.get(key);
        return {
          id: item.id,
          icon: tmpPet?.icon,
          name: tmpPet?.name,
          pid: item.pid,
          level: item.level,
        } as PetModel;
      });
    }
  };

  const getDispatchPetList = async () => {
    const resp = await getMinePetListRequest({
      page: 1,
      limit: 10,
      status: 2,
    });
    if (resp.code === 200) {
      const list = resp.data.content.map((item) => {
        const key = item.pid + ":" + item.level;
        const tmpPet = PetModule.petCfgDict.get(key);
        return {
          id: item.id,
          icon: tmpPet?.icon,
          name: tmpPet?.name,
          pid: item.pid,
          level: item.level,
          dispatchTime: item.dispatchTime,
          dispatchRewards: item.dispatchRewards,
          dispatchLevel: item.dispatchLevel,
        } as PetModel;
      });
      if (list.length > 0) {
        dispatchPet.value = list[0];
      } else {
        dispatchPet.value = null;
      }
    } else {
      dispatchPet.value = null;
    }
  };

  const getPetTask = async () => {
    const resp = await getPetTaskRequest();
    if (resp.code === 200) {
      taskList.value = resp.data;
    }
  };

  const getPetPageData = async () => {
    await getMinePetList();
    await getOnlinePetList();
    await getPetTask();
  };

  const getMinePetList = async () => {
    const resp = await getMinePetListRequest(params.value);

    if (resp.code === 200) {
      const list = resp.data.content
        .map((item) => {
          const key = item.pid + ":" + item.level;
          const tmpPet = PetModule.petCfgDict.get(key);
          return {
            id: item.id,
            icon: tmpPet?.icon,
            name: tmpPet?.name,
            pid: item.pid,
            level: item.level,
          } as PetModel;
        })
        .filter((n) => n.status !== 1 && n.status !== 2);
      if (params.value.page === 1) {
        minePetList.value = list;
      } else {
        minePetList.value = [...minePetList.value, ...list];
      }
      total.value = resp.data.totalElements;
    } else {
      minePetList.value = [];
      total.value = 0;
    }
  };

  const getMineEggsList = async () => {
    const resp = await getMinePetEggsRequest(params.value);

    if (resp.code === 200) {
      const list: EggsModel[] = [];
      resp.data.content.forEach((item) => {
        const egg = PetModule.eggsCfgDict.get(item.eid);
        if (egg) {
          const eggModel = {
            name: egg.name,
            icon: egg.icon,
            id: egg.id,
            number: item.num,
            total: item.total,
          };
          list.push(eggModel);
        }
      });
      if (params.value.page === 1) {
        mineEggsList.value = list;
      } else {
        mineEggsList.value = [...mineEggsList.value, ...list];
      }

      console.log("eggsList:", list);
    }
  };

  const handleOnlinePet = async () => {
    const id = currentPet.value?.id ?? null;
    if (id) {
      const resp = await loadPetRequest({
        id,
      });
      if (resp.code === 200) {
        await ShowToast("操作成功");
        eventBus.emit("minePetUpdate");
      } else {
        await ShowToast(resp.msg);
      }
    } else {
      await ShowToast("请选择");
    }
  };

  const handleAboundPet = async () => {
    const id = currentPet.value?.id ?? null;
    if (id) {
      const resp = await abandonPetRequest({
        id,
      });
      if (resp.code === 200) {
        await ShowToast("操作成功");
        eventBus.emit("minePetUpdate");
      } else {
        await ShowToast(resp.msg);
      }
    } else {
      await ShowToast("请选择");
    }
  };

  const handleOfflinePet = async (id: number) => {
    if (id) {
      const resp = await unloadPetRequest({
        id,
      });
      if (resp.code === 200) {
        await ShowToast("操作成功");
        eventBus.emit("minePetUpdate");
      } else {
        await ShowToast(resp.msg);
      }
    } else {
      await ShowToast("请选择");
    }
  };

  const handleClickEgg = async () => {
    if (!currentEgg.value) {
      ShowToast("请选择");
    }
    const params = {
      eid: currentEgg.value?.id,
      num: 1,
    };
    const resp = await consumeEggsRequest(params);
    if (resp.code === 200) {
      const list = resp.data.pets.map((item) => {
        const key = item.pid + ":" + item.level;
        const tmpPet = PetModule.petCfgDict.get(key);
        return {
          id: item.id,
          icon: tmpPet?.icon,
          name: tmpPet?.name,
          pid: item.pid,
          level: item.level,
        } as PetModel;
      });
      if (list.length > 0) {
        resultPet.value = list[0];
        resultModal.value = true;
        console.log("result:", resultPet);
      }
      await getMineEggsList();
      eventBus.emit("minePetUpdate");
    }
  };

  const handleExplorePet = async () => {
    const id = currentPet.value?.id ?? null;
    if (id) {
      const resp = await startPetDispatchRequest({
        id,
      });
      if (resp.code === 200) {
        await ShowToast("操作成功");
        await getMinePetList();
        await getDispatchPetList();
        eventBus.emit("minePetUpdate");
      }
    } else {
      ShowToast("请选择");
    }
  };

  const cancelExplorePet = async () => {
    const dId = dispatchPet.value?.id ?? null;
    if (dId) {
      const resp = await endPetDispatchRequest({
        id: dId,
      });
      if (resp.code === 200) {
        await ShowToast("操作成功");
        await getMinePetList();
        await getDispatchPetList();
        eventBus.emit("minePetUpdate");
      } else {
        ShowToast(resp.msg);
      }
    } else {
      ShowToast("当前没有宠物在探险");
    }
  };
  const handleMinePetScrollToLower = async () => {
    if (total.value > minePetList.value.length) {
      params.value.page++;
      await getMinePetList();
    }
  };
  const handlePetFilter = async (op: object) => {
    params.value = Object.assign(params.value, op);
    params.value.page = 1;
    await getMinePetList();
  };

  const handleMerge = async () => {
    const params = {
      id: leftSelectPet.value?.id,
      id2: rightSelectPet.value?.id,
    };
    const resp = await mergePetRequest(params);
    if (resp.code === 200) {
      const item = resp.data;
      const key = item.pid + ":" + item.level;
      const tmpPet = PetModule.petCfgDict.get(key);
      resultPet.value = {
        id: item.id,
        icon: tmpPet?.icon,
        name: tmpPet?.name,
        pid: item.pid,
        level: item.level,
      } as PetModel;
      resultModal.value = true;
      leftSelectPet.value = rightSelectPet.value = null;
      await getMinePetList();
      eventBus.emit("minePetUpdate");
    } else {
      ShowToast(resp.msg);
    }
  };

  return {
    leftSelectPet,
    rightSelectPet,
    getPetPageData,
    handleMerge,
    getPetTask,
    getMinePetList,
    getMineEggsList,
    handleClickEgg,
    handlePetFilter,
    handleOnlinePet,
    cancelExplorePet,
    handleOfflinePet,
    handleAboundPet,
    handleExplorePet,
    getDispatchPetList,
    dispatchPet,
    onlinePetList,
    handleMinePetScrollToLower,
    resultPet,
    minePetList,
    mineEggsList,
    currentEgg,
    taskList,
    currentPet,
    resultModal,
  };
}
