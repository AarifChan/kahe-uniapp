export interface RankUser {
  actid: number;
  createTime: string;
  extra: string;
  id: number;
  rank: number;
  score: number;
  uid: number;
  updateTime: string;
  user: {
    avatar: string;
    nickname: string;
    phone: number;
    uid: number;
    vip: number;
  };
}

export interface RewardConfig {
  end: number;
  img: string;
  start: number;
}
export interface ActivityDto {
  awards: RewardConfig[];
  closeTime: string;
  code: string;
  content: string;
  createTime: string;
  endTime: string;
  id: number;
  logo: string;
  openTime: string;
  showNums: number;
  startTime: string;
  status: number;
  updateTime: string;
}
