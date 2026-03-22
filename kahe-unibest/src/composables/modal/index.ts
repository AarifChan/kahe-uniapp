import { ref } from "vue";
import { modalContent as ModalContent } from "@/utils/tools/content";

export enum ModalType {
  UserProtocol = 1,
  PurchaseNotification = 2,
  HowToPlay = 3,
  ShipmentNotification = 4,
  Under18 = 7,
  CollectionRule = 8,
  GroupBuyRule = 9,
  SingeRule = 10,
}
export function useModal() {
  const modalShow = ref(false);

  const modalTitle = ref("");

  const modalContent = ref("");

  const showModalType = (type: ModalType) => {
    switch (type) {
      case ModalType.UserProtocol:
        modalTitle.value = "用户协议";
        break;
      case ModalType.PurchaseNotification:
        modalTitle.value = "购买须知";
        break;
      case ModalType.HowToPlay:
        modalTitle.value = "玩法说明";
        break;
      case ModalType.ShipmentNotification:
        modalTitle.value = "发货须知";
        break;
      case ModalType.Under18:
        modalTitle.value = "未成年申诉";
        break;
      case ModalType.CollectionRule:
        modalTitle.value = "集赏行动购买须知";
        break;
      case ModalType.GroupBuyRule:
        modalTitle.value = "拼团购买须知";
        break;
      case ModalType.SingeRule:
        modalTitle.value = "规则";
    }
    modalContent.value = ModalContent(type);
    modalShow.value = true;
  };

  return {
    modalShow,
    modalTitle,
    modalContent,
    showModalType,
  };
}
