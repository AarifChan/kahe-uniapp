import { type TabBarItem } from "@/model";

export const tabBarItems: TabBarItem[] = [
  {
    text: "首页",
    title: "首页",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kahe-202510/ka-he/tab-bar/item1.png",
    iconSelected: "/static/kahe-202510/ka-he/tab-bar/item1-active.png",
  },
  {
    text: "商家",
    title: "商家",
    selectPath: "/pages/welfare/index",
    iconNormal: "/static/kahe-202510/ka-he/tab-bar/item2.png",
    iconSelected: "/static/kahe-202510/ka-he/tab-bar/item2-active.png",
  },
  {
    text: "抽卡机",
    title: "抽卡机",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kahe-202510/ka-he/tab-bar/item3.png", // 缺失图片: item3.png
    iconSelected: "/static/kahe-202510/ka-he/tab-bar/item3-active.png",
  },
  {
    text: "盒柜",
    title: "盒柜",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kahe-202510/ka-he/tab-bar/item4.png",
    iconSelected: "/static/kahe-202510/ka-he/tab-bar/item4-active.png",
  },
  {
    text: "我的",
    title: "我的",
    selectPath: "/pages/home/index",
    iconNormal: "/static/kahe-202510/ka-he/tab-bar/item5.png",
    iconSelected: "/static/kahe-202510/ka-he/tab-bar/item5-active.png",
  },
];
