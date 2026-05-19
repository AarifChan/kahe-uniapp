import { ref } from "vue";
import type { UIIconItem } from "@/model";
export function userCards() {
  const cardShow = ref(false);
  const itemList = ref([
    {
      text: "/static/kahe-202510/product/rule-text.png",
      value: 1,
      image: "/static/kahe-202510/product/rule.png",
    },
    {
      text: "/static/kahe-202510/product/prob-text.png",
      value: 2,
      image: "/static/kahe-202510/product/prob.png",
    },
    {
      text: "/static/kahe-202510/product/record-text.png",
      value: 3,
      image: "/static/kahe-202510/product/record.png",
    },
  ] as UIIconItem[]);
  const currentValue = ref(1);
  const tapItem = (item: any) => {
    currentValue.value = item.value;
    cardShow.value = true;
    console.log("cardShow:", item);
  };
  const changeTitle = ref(["", "规则", "中赏概率", "中赏记录"]) as any;
  return {
    currentValue,
    changeTitle,
    cardShow,
    tapItem,
    itemList,
  };
}
