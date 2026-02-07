import type { UIProductBoxModel } from "@/model";

const toString = Object.prototype.toString;

export const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min - 1) + min);
};
const firstLevel: number[] = [502, 401, 302];

const lastLevel: number[] = [501, 402, 301];
export function divideAndTruncate(a: number, b: number): number {
  const result = a / b;
  const factor = Math.pow(10, 4); // 10^4 = 10000
  return Math.floor(result * factor) / factor; // 截断小数部分
}
export const useSortFun = function sortBoxItemByLevel(
  list: UIProductBoxModel[]
): UIProductBoxModel[] {
  list = list.sort((n1, n2) => n2.level - n1.level);
  let finalArr = Array<UIProductBoxModel>();
  let firstArr = Array<UIProductBoxModel>();
  let lastArr = Array<UIProductBoxModel>();
  const totalArr = Array<UIProductBoxModel>();
  list.forEach((item) => {
    if (firstLevel.indexOf(item.level) !== -1) {
      firstArr.push(item);
    } else if (lastLevel.indexOf(item.level) !== -1) {
      lastArr.push(item);
    } else if (
      item.level === 205 ||
      item.level === 202 ||
      item.level === 201 ||
      item.level === 204 ||
      item.level === 203
    ) {
      finalArr.push(item);
    } else {
      totalArr.push(item);
    }
  });
  firstArr = firstArr.sort((n1, n2) => n2.level - n1.level);
  lastArr = lastArr.sort((n1, n2) => n2.level - n1.level);
  finalArr = finalArr.sort((n1, n2) => n2.level - n1.level);

  return [...finalArr, ...firstArr, ...lastArr, ...totalArr];
};

export const formatNumToString = (num: number): string => {
  switch (num) {
    case 1:
      return "一";
    case 2:
      return "二";
    case 3:
      return "三";
    case 4:
      return "四";
    case 5:
      return "五";
    case 6:
      return "六";
    case 7:
      return "七";
    case 8:
      return "八";
    case 9:
      return "九";
    case 10:
      return "十";
    default:
      return num + "";
  }
};

export const getPageOptions = (): any => {
  const routes = getCurrentPages();
  const route = routes[routes.length - 1] as any;
  let options;
  // #ifdef MP-WEIXIN
  options = route.options as any;
  // #endif
  // #ifdef H5 || APP-PLUS
  options = route.$page.options as any;
  // #endif
  return options;
};

export const handleMobile = (phone: string) => {
  if (phone) {
    const pat = /(\d{3})\d*(\d{4})/;
    return phone.replace(pat, "$1****$2");
  } else {
    return "";
  }
};
export function formatPrice(price: number, isPrice = true) {
  if (price < 10000) {
    if (isPrice) {
      return price.toFixed(2) + "";
    } else {
      return price + "";
    }
  } else if (price < 10000 * 10000) {
    return (price / 10000).toFixed(2) + "万";
  } else {
    return (price / (10000 * 10000)).toFixed(2) + "亿";
  }
}

export function handleTime(time: number) {
  const second = time / 1000;

  if (second < 60) {
    return second + "秒";
  } else if (second < 60 * 60) {
    return second / 60 + "分钟";
  } else if (second < 60 * 60 * 24) {
  }
}

export function isPhone(phone: string) {
  const reg = /^1[3-9][0-9]{9}/;
  if (reg.test(phone)) {
    return true;
  } else {
    return false;
  }
}

export * from "./util";
