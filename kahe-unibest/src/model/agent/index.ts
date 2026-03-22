import type { User } from "@/model/user";
import type { ListObject } from "@/model/base";
export interface AgentUserModel {
  /**
   * 代理用户
   */
  agent: number;
  /**
   * 添加时间
   */
  createTime: string;
  /**
   * 获得金额
   */
  getAmount: number;
  /**
   * 获得金额(每日)
   */
  getAmountDay: number;
  /**
   * 获得激萌币
   */
  getCoin: number;
  /**
   * 获得激萌币(每日)
   */
  getCoinDay: number;
  /**
   * 贡献金额
   */
  putAmount: number;
  /**
   * 贡献金额(每日)
   */
  putAmountDay: number;
  /**
   * 贡献激萌币
   */
  putCoin: number;
  /**
   * 贡献激萌币(每日)
   */
  putCoinDay: number;
  /**
   * 贡献激萌币(自己)
   */
  putCoinUser: number;
  /**
   * 贡献激萌币自己(每日)
   */
  putCoinUserDay: number;
  /**
   * 用户
   */
  uid: number;
  /**
   * 更新时间
   */
  upStringTime: string;
  /**
   * 用户信息
   */
  user: User;
  /**
   * 徒弟数量
   */
  userNum: number;
}

export interface AgentCfg {
  agent_user_rate: string;
  agent_agent_rate: string;
  amount: number;
  user_rate: number;
  agent_rate: number;
  user_coin: number;
  agent_coin: number;
}

export interface AgentIndexModel {
  /**
   * cfg
   */
  cfg?: AgentCfg;

  /**
   * user
   */
  user?: AgentUserModel;

  /**
   * invite
   */
  agent?: AgentUserModel;

  /**
   * list
   */
  list?: ListObject<AgentUserModel>;
}
