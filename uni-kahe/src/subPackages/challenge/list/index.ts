import { ref } from "vue";
import { type ChallengeGoodsItem, getList } from "./api";

export function useChallenge() {
  const dataList = ref<ChallengeGoodsItem[]>([]);

  const getDataList = () => {
    getList({}).then((data) => {
      console.log("data:", data.data.content);
      if (data.code === 200) {
        dataList.value = data.data.content;
      } else {
        dataList.value = [];
      }
    });
  };
  return {
    dataList,
    getDataList,
  };
}
