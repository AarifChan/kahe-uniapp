/**
 * 根据环境变量 VITE_APP_AUDIT 切换 pages.json 中的原生 tabBar：
 * - 审核版本（VITE_APP_AUDIT=true）：仅保留 首页/盒柜/我的 三个 tab
 * - 正常版本：恢复完整的五个 tab
 *
 * 该脚本通过 package.json 的 pre 钩子（predev:mp-weixin / prebuild:mp-weixin 及
 * 对应 :audit 变体）在每次 dev/build 前执行，输出是幂等的。
 */
const fs = require("fs");
const path = require("path");

const pagesPath = path.join(__dirname, "../src/pages.json");
const isAudit = process.env.VITE_APP_AUDIT === "true";

const fullList = [
  {
    pagePath: "pages/home/index",
    text: "首页",
    iconPath: "/static/kaju/tabbar/icon1-normal.png",
    selectedIconPath: "/static/kaju/tabbar/icon1-active.png",
  },
  {
    pagePath: "pages/merchant/index",
    text: "商家",
    iconPath: "/static/kaju/tabbar/icon2-normal.png",
    selectedIconPath: "/static/kaju/tabbar/icon2-active.png",
  },
  {
    pagePath: "pages/machine/index",
    text: "抽卡机",
    iconPath: "/static/kaju/tabbar/icon3-normal.png",
    selectedIconPath: "/static/kaju/tabbar/icon3-active.png",
  },
  {
    pagePath: "pages/box/index",
    text: "盒柜",
    iconPath: "/static/kaju/tabbar/icon4-normal.png",
    selectedIconPath: "/static/kaju/tabbar/icon4-active.png",
  },
  {
    pagePath: "pages/mine/index",
    text: "我的",
    iconPath: "/static/kaju/tabbar/icon5-normal.png",
    selectedIconPath: "/static/kaju/tabbar/icon5-active.png",
  },
];

const auditKeepPaths = ["pages/home/index", "pages/box/index", "pages/mine/index"];
const targetList = isAudit
  ? fullList.filter((item) => auditKeepPaths.includes(item.pagePath))
  : fullList;

// pages.json 中 tabBar list 的缩进风格：item 5 空格，key 7 空格
const rendered = targetList
  .map((item) =>
    JSON.stringify(item, null, 2)
      .split("\n")
      .map((line) => "     " + line)
      .join("\n")
  )
  .join(",\n");

const content = fs.readFileSync(pagesPath, "utf8");
const tabBarIndex = content.indexOf('"tabBar"');
if (tabBarIndex === -1) {
  console.error("[apply-audit-tabbar] pages.json 中未找到 tabBar 配置");
  process.exit(1);
}
const listStart = content.indexOf('"list": [', tabBarIndex);
const listEnd = content.indexOf("\n   ]", listStart);
if (listStart === -1 || listEnd === -1) {
  console.error("[apply-audit-tabbar] 无法定位 tabBar.list 区块");
  process.exit(1);
}

const next =
  content.slice(0, listStart + '"list": ['.length) +
  "\n" +
  rendered +
  content.slice(listEnd);

if (next === content) {
  console.log(
    `[apply-audit-tabbar] tabBar 已处于目标状态（${isAudit ? "审核版 3 tabs" : "完整版 5 tabs"}），无需修改`
  );
  process.exit(0);
}

fs.writeFileSync(pagesPath, next);
console.log(
  `[apply-audit-tabbar] tabBar 已切换为${isAudit ? "审核版（首页/盒柜/我的）" : "完整版（首页/商家/抽卡机/盒柜/我的）"}`
);
