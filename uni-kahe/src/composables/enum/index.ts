export function useEnum() {
  const getLevelImageByLevel = (level: number): string => {
    if (level > 120) {
      return getLevelImage(level);
    }
    switch (level) {
      case 120:
      case 119:
      case 118:
        return "https://jms.85gui7.com/kahe-202510/level/normal1.png";
      case 117:
        return "https://jms.85gui7.com/kahe-202510/level/normal2.png";
      case 116:
        return "https://jms.85gui7.com/kahe-202510/level/normal3.png";
      case 115:
        return "https://jms.85gui7.com/kahe-202510/level/normal4.png";
      default:
        return "https://jms.85gui7.com/kahe-202510/level/normal5.png";
    }
  };

  const getLevelImageNameByLevel = (level: number): string => {
    if (level > 120) {
      return getLevelImage(level);
    }
    switch (level) {
      case 120:
      case 119:
      case 118:
        return "https://jms.85gui7.com/kahe-202510/level/infinite1.png";
      case 117:
        return "https://jms.85gui7.com/kahe-202510/level/infinite2.png";
      case 116:
        return "https://jms.85gui7.com/kahe-202510/level/infinite3.png";
      case 115:
        return "https://jms.85gui7.com/kahe-202510/level/infinite4.png";
      default:
        return "https://jms.85gui7.com/kahe-202510/level/infinite5.png";
    }
  };

  const getNormalLevelNameByLevel = (level: number): string => {
    if (level > 120) {
      return getHighLevelName(level);
    }
    switch (level) {
      case -1:
        return "全部";
      case 206:
        return "天选赏";
      case 120:
      case 119:
      case 118:
        return "SAR";
      case 117:
        return "UR";
      case 116:
        return "SSR";
      case 115:
        return "SR";
      default:
        return "R";
    }
  };

  const getSpecLevelBgTitleByLevel = (level: number): string => {
    switch (level) {
      case 120:
      case 119:
      case 118:
        return "https://jms.85gui7.com/kahe-202510/level/infinite-bg1.png";
      case 117:
        return "https://jms.85gui7.com/kahe-202510/level/infinite-bg2.png";
      case 116:
        return "https://jms.85gui7.com/kahe-202510/level/infinite-bg3.png";
      case 115:
        return "https://jms.85gui7.com/kahe-202510/level/infinite-bg4.png";
      default:
        return "https://jms.85gui7.com/kahe-202510/level/infinite-bg5.png";
    }
  };

  const getLevelImage = (level: number): string => {
    return "https://jms.85gui7.com/kahe-202510/level/" + getLevelName(level) + ".png";
  };

  const getHighLevelName = (level: number) => {
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
      default:
        return "";
    }
  };

  const getLevelName = (level: number): string => {
    switch (level) {
      case 502:
      case 401:
      case 302:
        return "first";
      case 501:
      case 402:
      case 301:
        return "last";
      case 206:
        return "tianxuan";
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
  };
  const levelTypeBg = (level: number) => {
    switch (level) {
      case 118:
        return "https://jms.85gui7.com/kahe-202510/images/goods-item-decorate.png";
      case 117:
        return "https://jms.85gui7.com/kahe-202510/images/goods-item-decorate1.png";
      case 116:
        return "https://jms.85gui7.com/kahe-202510/images/goods-item-decorate2.png";
      case 115:
        return "https://jms.85gui7.com/kahe-202510/images/goods-item-decorate3.png";
      case 114:
        return "https://jms.85gui7.com/kahe-202510/images/goods-item-decorate4.png";
      default:
        return "https://jms.85gui7.com/kahe-202510/images/goods-item-decorate5.png";
    }
  };
  return {
    levelTypeBg,
    getLevelName,
    getLevelImage,
    getLevelImageByLevel,
    getNormalLevelNameByLevel,
    getSpecLevelBgTitleByLevel,
    getLevelImageNameByLevel,
  };
}
