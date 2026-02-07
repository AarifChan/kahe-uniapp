export interface PetConfig {
  pets: PetModel[];
  eggs: PetEggsModel[];
}

export interface TaskModel {
  score: number;
  status: number;
  tid: number;
  total: number;
  type: number;
  uid: number;
}

export interface PetModel {
  createTime: string;
  icon: string;
  id: number;
  level: number;
  mark: string;
  name: string;
  para: number[];
  pid: number;
  updateTime: string;
  status: number;
  skill: string;
  dispatchLevel: number;
  dispatchRewards: { id: string; logo: string; name: string; num: number };
  dispatchTime: string;
}
export interface PetEggsModel {
  createTime: string;
  icon: string;
  id: number;
  name: string;
  pets: { id: number; weight: number }[];
  updateTime: number;
}

export interface MinePetEggsModel {
  createTime: string;
  eid: number;
  id: number;
  num: number;
  total: number;
  uid: number;
  updateTime: string;
}

export interface MinePetModel {
  id: number;
  level: number;
  pid: number;
  status: number;
  uid: number;
  dispatchLevel: number;
  dispatchRewards: { id: string; logo: string; name: string; num: number };
  dispatchTime: string;
}
