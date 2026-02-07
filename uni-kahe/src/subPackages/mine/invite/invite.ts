import { getAgent, getUserBrief, postAgentBind } from "@/api";
import { onMounted, ref } from "vue";
import type { AgentIndexModel, User } from "@/model";
import { ShowToast } from "@/utils";
import { getPageOptions } from "@/utils/tools";
import { eventBus } from "@/utils/event";

export function useInvite() {
  const agentInfo = ref({} as AgentIndexModel);

  const placeholderStyle = ref(
    "font-weight: 400;color: #7C7C7C;font-size: 16px;"
  );

  const agentUid = ref("");

  const bindModalShow = ref(false);

  const bindAgentInfo = ref({} as User);
  const getAgentInfo = async () => {
    const resp = await getAgent(20);
    if (resp.code === 200) {
      console.log("agentInfo:", resp.data);
      agentInfo.value = resp.data;
    }
  };

  const getBindAgentInfo = async () => {
    const uid = agentUid.value;
    const resp = await getUserBrief(uid);
    console.log("getBindAgentInfo:", resp);
    if (resp.code === 200) {
      bindAgentInfo.value = resp.data;
      bindModalShow.value = true;
    }
  };

  /// 绑定盟主
  const didTapConfirm = async () => {
    const agentId = Number(agentUid.value);
    if (!agentId) {
      ShowToast("ID不能为空");
      return;
    }
    const result = await postAgentBind(agentId);
    if (result.code === 200) {
      await ShowToast("绑定成功", 1000);
      bindModalShow.value = false;
      agentUid.value = "";
      await loadAgentInfo();
    } else {
      await ShowToast(result.msg ?? "绑定失败", 1000);
    }
  };

  const loadAgentInfo = async () => {
    await getAgentInfo();
  };

  const handleGetBindInfo = async () => {
    const ops = getPageOptions();
    const agentId = ops.agent;

    if (agentId) {
      agentUid.value = agentId;
      await getBindAgentInfo();
    }
  };
  eventBus.on("didLogin", async (_: any) => {
    await handleGetBindInfo();
    await loadAgentInfo();
  });

  onMounted(async () => {
    await handleGetBindInfo();
    await loadAgentInfo();
  });

  return {
    getAgentInfo,
    getBindAgentInfo,
    agentInfo,
    agentUid,
    placeholderStyle,
    bindModalShow,
    didTapConfirm,
    bindAgentInfo,
  };
}
