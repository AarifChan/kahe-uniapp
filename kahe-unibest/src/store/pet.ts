import type { PetEggsModel, PetModel } from '@/composables/pet/model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPetConfigRequest } from '@/api/pet'

export const usePetStore = defineStore('pet', () => {
  const petCfgDict = ref<Map<string, PetModel>>(new Map())
  const eggsCfgDict = ref<Map<number, PetEggsModel>>(new Map())
  const petList = ref<PetModel[]>([])

  const getConfig = async () => {
    const configRes = await getPetConfigRequest()
    if (configRes.code === 200) {
      const petDict = new Map<string, PetModel>()
      const eggsDict = new Map<number, PetEggsModel>()
      ;(configRes.data as any).eggs.forEach((item: PetEggsModel) => {
        eggsDict.set(item.id, item)
      })
      ;(configRes.data as any).pets.forEach((item: PetModel) => {
        const key = `${item.pid}:${item.level}`
        petDict.set(key, item)
      })
      const pList = [...(configRes.data as any).pets].sort(
        (n1: PetModel, n2: PetModel) => n2.level - n1.level,
      )
      petCfgDict.value = petDict
      eggsCfgDict.value = eggsDict
      petList.value = pList
    }
  }

  return {
    petCfgDict,
    eggsCfgDict,
    petList,
    getConfig,
  }
})
