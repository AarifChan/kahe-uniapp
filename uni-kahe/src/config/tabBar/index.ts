import { type TabBarItem } from "@/model";

export const tabBarItems: TabBarItem[] = [
  {
    text: "首页",
    title: "首页",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kaju/tabbar/icon1-normal.png",
    iconSelected: "/static/kaju/tabbar/icon1-active.png",
  },
  {
    text: "商家",
    title: "商家",
    selectPath: "/pages/welfare/index",
    iconNormal: "/static/kaju/tabbar/icon2-normal.png",
    iconSelected: "/static/kaju/tabbar/icon2-active.png",
  },
  {
    text: "抽卡机",
    title: "抽卡机",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kaju/tabbar/icon3-normal.png", // 缺失图片: item3.png
    iconSelected: "/static/kaju/tabbar/icon3-active.png",
  },
  {
    text: "盒柜",
    title: "盒柜",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kaju/tabbar/icon4-normal.png",
    iconSelected: "/static/kaju/tabbar/icon4-active.png",
  },
  {
    text: "我的",
    title: "我的",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kaju/tabbar/icon5-normal.png",
    iconSelected: "/static/kaju/tabbar/icon5-active.png",
  },
];
