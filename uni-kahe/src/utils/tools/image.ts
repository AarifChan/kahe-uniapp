export const levelDict = {
  502: "First",
  501: "Last",
  // 401: "first-2",
  // 402: "last-2",
  // 302: "first-3",
  // 301: "last-3",
  204: "非酋",
  203: "展示",
  202: "终赏",
  201: "全局赏",
  // 120: "SSS赏",
  // 119: "SS赏",
  118: "SP赏",
  117: "A赏",
  116: "B赏",
  115: "C赏",
  114: "D赏",
  113: "E赏",
  112: "F赏",
  111: "G赏",
  110: "H赏",
  109: "I赏",
  108: "J赏",
  107: "K赏",
  106: "L赏",
  105: "M赏",
  104: "N赏",
  103: "O赏",
  102: "P赏",
  101: "Q赏",
  100: "R赏",
};
export function limitLevelName(level: number) {
  switch (level) {
    case 118:
      return "SP";
    case 117:
      return "A";
    case 116:
      return "B";
    case 115:
      return "C";
    case 114:
      return "D";
    default:
      return "E";
  }
}

export const formatCardLevel = (level: number) => {
  switch (level) {
    case 118:
      return "HR";
    case 117:
      return "UR";
    case 116:
      return "SR/CSR";
    case 115:
      return "RR/RRR";
    case 114:
      return "R/C/U闪";
    case -1:
      return "全部";
    default:
      return "R/CU";
  }
};

export const levelStyle = (level: number) => {
  let style = "";
  switch (level) {
    case 118:
      return (style +=
        "color:#FF7F7F;text-shadow: -1px -1px 0 #A43E3E, 1px -1px 0 #A43E3E, -1px 1px 0 #A43E3E, 1px 1px 0 #A43E3E;");
    case 117:
      return (style +=
        "color:#BE7FFF;text-shadow: -1px -1px 0 #6D32AB, 1px -1px 0 #6D32AB, -1px 1px 0 #6D32AB, 1px 1px 0 #6D32AB;");
    case 116:
      return (style +=
        "color:#7FB2FF;text-shadow: -1px -1px 0 #3248AB, 1px -1px 0 #3248AB, -1px 1px 0 #3248AB, 1px 1px 0 #3248AB;");
    case 115:
      return (style +=
        "color:#51E8FF;text-shadow: -1px -1px 0 #03a9f4, 1px -1px 0 #03a9f4, -1px 1px 0 #03a9f4, 1px 1px 0 #03a9f4;");
    default:
      return (style +=
        "color:#888888;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;");
  }
};
export const levelColor = (level: number) => {
  let style = "";
  switch (level) {
    case 118:
      return (style += "color:#FF7F7F;");
    case 117:
      return (style += "color:#BE7FFF;");
    case 116:
      return (style += "color:#7FB2FF;");
    case 115:
      return (style += "color:#51E8FF;");
    default:
      return (style += "color:#888888;");
  }
};

export function getLevelNum(level: number) {
  switch (level) {
    case 118:
      return 1;
    case 117:
      return 2;
    case 116:
      return 3;
    case 115:
      return 4;
    case 114:
      return 5;
    default:
      return 5;
  }
}

export function getLevelCNName(level: number): string {
  switch (level) {
    case 502:
    case 401:
    case 302:
      return "First赏";
    case 501:
    case 402:
    case 301:
      return "Last赏";
    case 205:
      return "串串赏";
    case 204:
      return "非酋赏";
    case 203:
      return "展示";
    case 202:
      return "终赏";
    case 201:
      return "全局赏";
    case 120:
    case 119:
    case 118:
      return "SP赏";
    case 117:
      return "A赏";
    case 116:
      return "B赏";
    case 115:
      return "C赏";
    case 114:
      return "D赏";
    case 113:
      return "E赏";
    case 112:
      return "F赏";
    case 111:
      return "G赏";
    case 110:
      return "H赏";
    case 109:
      return "I赏";
    case 108:
      return "J赏";
    case 107:
      return "K赏";
    case 106:
      return "L赏";
    case 105:
      return "M赏";
    case 104:
      return "N赏";
    case 103:
      return "O赏";
    case 102:
      return "P赏";
    case 101:
      return "Q赏";
    case 100:
      return "R赏";
    default:
      return "";
  }
}

export function getMainTagName(tag: number): string {
  switch (tag) {
    case 1:
      return "梦想";
    case 2:
      return "限购";
    case 3:
      return "尊享";
    case 4:
      return "福利";
    case 5:
      return "活动";
    case 6:
      return "对决";
    case 7:
      return "捡漏";
    case 8:
      return "一番赏";
    case 9:
      return "现货";
    case 10:
      return "预告";
    case 11:
      return "龙珠";
    case 12:
      return "火影";
    case 13:
      return "海贼";
    case 14:
      return "女神";
    case 15:
      return "主题";
    case 16:
      return "无限";
    case 17:
      return "预售";
    case 18:
      return "高爆";
    case 19:
      return "福袋";
    case 20:
      return "满人开";
    case 21:
      return "冲榜";
    default:
      return "未定义";
  }
}

export function getMainTagImagePath(tag: number): string {
  switch (tag) {
    case 1:
      return "https://jms.85gui7.com/kahe/tags/dream.png";
    case 2:
      return "https://jms.85gui7.com/kahe/tags/limit.png";
    case 3:
      return "https://jms.85gui7.com/kahe/tags/enjoy.png";
    case 4:
      return "https://jms.85gui7.com/kahe/tags/welfare.png";
    case 5:
      return "https://jms.85gui7.com/kahe/tags/activity.png";
    case 6:
      return "https://jms.85gui7.com/kahe/tags/battle.png";
    case 7:
      return "https://jms.85gui7.com/kahe/tags/picker.png";
    case 8:
      return "https://jms.85gui7.com/kahe/tags/yifanshang.png";
    case 9:
      return "https://jms.85gui7.com/kahe/tags/goods.png";
    case 10:
      return "https://jms.85gui7.com/kahe/tags/notice.png";
    case 11:
      return "https://jms.85gui7.com/kahe/tags/longzhu.png";
    case 12:
      return "https://jms.85gui7.com/kahe/tags/huoying.png";
    case 13:
      return "https://jms.85gui7.com/kahe/tags/haizei.png";
    case 14:
      return "https://jms.85gui7.com/kahe/tags/nvshen.png";
    case 15:
      return "https://jms.85gui7.com/kahe/tags/theme.png";
    case 16:
      return "https://jms.85gui7.com/kahe/tags/infinite.png";
    case 17:
      return "https://jms.85gui7.com/kahe/tags/presales.png";
    case 18:
      return "https://jms.85gui7.com/kahe/tags/gaobao.png";
    case 19:
      return "https://jms.85gui7.com/kahe/tags/fudai.png";
    case 20:
      return "https://jms.85gui7.com/kahe/tags/manrenkai.png";
    case 21:
      return "https://jms.85gui7.com/kahe/tags/chongbang.png";
    default:
      return "https://jms.85gui7.com/kahe/tags/theme.png";
  }
}

export function getSubTagImagePath(tag: number): string {
  switch (tag) {
    case 1:
      return "https://jms.85gui7.com/kahe/tags/infinite.pn";
    case 2:
      return "https://jms.85gui7.com/kahe/tags/yifanshang.png";
    case 3:
      return "https://jms.85gui7.com/kahe/tags/battle.png";
    case 4:
      return "https://jms.85gui7.com/kahe/tags/welfare.png";
    case 5:
      return "https://jms.85gui7.com/kahe/tags/fudai.png";
    case 6:
      return "";
    case 7:
      return "";
    case 8:
      return "";
    default:
      return "https://jms.85gui7.com/kahe/tags/single.png";
  }
}

export function getLevelFullImagePath(level: number, _ = false): string {
  return "https://jms.85gui7.com/yqoh/level/" + getLevelName(level) + ".png";
  // return isLucky
  //   ? getLuckyLevelImagePath(enum)
  //   : 'https://jms.85gui7.com/kahe/enum/' + getLevelName(enum) + '.png';
}

const limitLevel = [118, 117, 116, 115, 114];

export function getLuckyLevelImagePath(level: number): string {
  if (limitLevel.filter((n) => n === level).length > 0) {
    return "https://jms.85gui7.com/kahe/limit/" + getLevelName(level) + ".png";
  } else {
    return "https://jms.85gui7.com/kahe/enum/" + getLevelName(level) + ".png";
  }
}

export const specLevel = [116, 117, 118];

export function getLevelName(level: number): string {
  switch (level) {
    case 502:
    case 401:
    case 302:
      return "first";
    case 501:
    case 402:
    case 301:
      return "last";
    case 205:
      return "strandGoods";
    case 204:
      return "fei";
    case 203:
      return "show";
    case 202:
      return "end";
    case 201:
      return "all";
    case 120:
    case 119:
    case 118:
      return "sp";
    case 117:
      return "a";
    case 116:
      return "b";
    case 115:
      return "c";
    case 114:
      return "d";
    case 113:
      return "e";
    case 112:
      return "f";
    case 111:
      return "g";
    case 110:
      return "h";
    case 109:
      return "i";
    case 108:
      return "j";
    case 107:
      return "k";
    case 106:
      return "l";
    case 105:
      return "m";
    case 104:
      return "n";
    case 103:
      return "o";
    case 102:
      return "p";
    case 101:
      return "q";
    case 100:
      return "r";
    default:
      return "r";
  }
}
