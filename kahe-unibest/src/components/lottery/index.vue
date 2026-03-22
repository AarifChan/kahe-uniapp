<template>
  <view v-if="show" class="lottery-container">
    <view class="lottery-bg" v-if="!isSkip">
      <lottery-card
        v-for="(item, index) in list"
        :key="'lottery-card' + index"
        :class="
          list.length <= 3
            ? 'lottery-simple' + (index + 1)
            : 'lottery-card' + (index + 1)
        "
        :item="item"
        :is-animating="isCurrent(index)"
        :style="{ transform: `scale(${getScale()})` }"
        :is-open="isCurrent(index) && openList[index] !== -1"
        @tap.stop="tapAction(index)"
      />
      <view class="lottery-bottom">
        <view
          class="lottery-close theme-font"
          :class="list.length <= 5 ? 'lottery-near' : ''"
          @tap.stop="close"
          >继续抽赏
        </view>
        <view
          class="lottery-all theme-font"
          :class="list.length <= 5 ? 'lottery-near' : ''"
          @tap.stop="openAll"
          >一键翻牌
        </view>
      </view>
    </view>
    <image v-if="gifShow && isReady" class="gifImage" :src="gifPath" />
  </view>
</template>

<script lang="ts">
import { reactive, toRefs, watch, computed, onMounted, ref } from "vue";
import type { PropType } from "vue";
import LotteryCard from "./card.vue";
// import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'

export interface LotteryModel {
  image: string;
  title: string;
  level: number; // 1: SP，2：A 3：B 4：C 5：D
  rawLevel: number;
  levelImage: string;
}

export default {
  name: "LotteryIndex",
  components: {
    LotteryCard,
  },
  props: {
    show: {
      default: false,
      type: Boolean,
    },
    list: {
      default: [] as LotteryModel[],
      type: Array as PropType<LotteryModel[]>,
    },
    isSkip: {
      default: false,
      type: Boolean,
    },
    skipGif: {
      default: false,
      type: Boolean,
    },
  },
  emits: ["didTapContinue", "update:show"],
  setup(props, context) {
    const vShow = ref(false);
    const dataMap = reactive({
      select: [] as number[],
      openList: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      isAnimating: false,
      gifShow: true,
      gifUrl: "https://jms.85gui7.com/common/resources/reward-240829.gif",
      isReady: false,
      gifPath: "",
      isAllOpen: computed(() => {}),
      start: () => {
        dataMap.select = [];
      },
      getScale: () => {
        if (props.list?.length > 5) {
          return 1;
        } else if (props.list?.length >= 3) {
          return 1.1;
        } else {
          return 1.6;
        }
      },
      isCurrent: (num: number) => {
        let isOpen = false;
        dataMap.select.forEach((item) => {
          if (item === num) {
            isOpen = true;
          }
        });
        return isOpen;
      },
      tapAction: (index: number) => {
        if (dataMap.isCurrent(index)) {
          return;
        }
        dataMap.select.push(index);

        setTimeout(() => {
          dataMap.openList[index] = 1;
        }, 400);
      },
      openAll: () => {
        if (dataMap.isAnimating) {
          return;
        }
        dataMap.isAnimating = true;
        for (let i = 0; i < props.list.length; i++) {
          dataMap.select.push(i);
        }

        setTimeout(() => {
          const tmp: number[] = [];
          dataMap.openList.forEach((item) => {
            item = 1;
            tmp.push(item);
          });
          dataMap.openList = tmp;
          setTimeout(() => {
            dataMap.isAnimating = false;
            // dataMap.close()
          }, 2000);

          // dataMap.target = randomNum(1, 5)
        }, 400);
      },
      close: () => {
        if (dataMap.isAnimating) {
          return;
        }

        context.emit("update:show", false);
        context.emit("didTapContinue");
      },
      preloadImage: (url: string) => {
        return new Promise((resolve, reject) => {
          uni.getStorage({
            key: "cachedGifPathKahe",
            success: (res) => {
              console.log("缓存gif:", res.data);
              dataMap.gifPath = res.data; // 如果已缓存，则使用缓存路径
              resolve(res.data);
              dataMap.isReady = true;
            },
            fail: () => {
              // 如果没有缓存，首次下载 GIF
              uni.downloadFile({
                url: url, // GIF 的 URL
                success: (res) => {
                  console.log("下载gif:", res.tempFilePath);
                  if (res.statusCode === 200) {
                    dataMap.gifPath = res.tempFilePath;
                    resolve(res.tempFilePath);
                    dataMap.isReady = true;
                    uni.setStorage({
                      key: "cachedGifPathKahe",
                      data: res.tempFilePath, // 缓存路径到本地
                    });
                  }
                },
                fail: (err) => {
                  console.error("GIF 下载失败", err);
                },
              });
            },
          });
        });
      },
      playAudio: () => {
        const audio = uni.createInnerAudioContext();
        audio.src = "https://jms.85gui7.com/common/resources/audio-240829.mp3";
        audio.play();
      },
    });

    watch(
      () => props.show,
      (value) => {
        if (value) {
          dataMap.openList = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
          dataMap.select = [];
        }

        /// 只有开到 SP才有开赏动画
        const spLevel = props.list.filter((n) => n.level === 118);
        if (props.isSkip && props.skipGif) {
          dataMap.close();
        } else {
          if (spLevel.length !== 0 && value && !props.skipGif) {
            dataMap.gifShow = true;
            dataMap.playAudio();
            setTimeout(() => {
              dataMap.gifShow = false;
              if (props.isSkip) {
                dataMap.close();
              }
            }, 4000);
          } else {
            dataMap.gifShow = false;
            if (props.isSkip) {
              dataMap.close();
            }
          }
        }
      }
    );

    watch(
      () => props.show,
      (value) => {
        vShow.value = value;
      }
    );

    onMounted(() => {
      // dataMap.preloadImage(dataMap.gifUrl)
    });

    return {
      vShow,
      ...toRefs(dataMap),
    };
  },
};
</script>
<style lang="scss">
.lottery-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.gifImage {
  position: fixed;
  left: 0;
  top: 0;
  width: 750rpx;
  z-index: 999;
  height: calc(750rpx / 415 * 905);
}

.lottery-bg {
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 30rpx;
  height: 100vh;
  z-index: 999;
  box-sizing: border-box;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.8);
}

.lottery {
  &-simple2 {
    position: absolute;
    left: -20rpx;
    top: calc(410rpx * 1.1 - 120rpx);
  }

  &-simple1 {
    position: absolute;
    left: calc(-78rpx + 274rpx * 1.1);
    top: calc(410rpx * 1.1 - 120rpx);
  }

  &-simple3 {
    position: absolute;
    right: -20rpx;
    top: calc(410rpx * 1.1 - 120rpx);
  }

  &-card4 {
    position: absolute;
    left: -20rpx;
    top: 80rpx;
  }

  &-card2 {
    position: absolute;
    left: -20rpx;
    top: calc(410rpx * 1.1 - 60rpx);
  }

  &-card6 {
    position: absolute;
    left: -20rpx;
    top: calc(410rpx * 1.1 * 2 - 200rpx);
  }

  &-card10 {
    position: absolute;
    left: calc(-78rpx + 274rpx * 1.1);
    top: -20rpx;
  }

  &-card1 {
    position: absolute;
    left: calc(-78rpx + 274rpx * 1.1);
    top: calc(410rpx * 1.1 - 160rpx);
  }

  &-card7 {
    position: absolute;
    left: calc(-78rpx + 274rpx * 1.1);
    top: calc(410rpx * 1.1 * 2 - 300rpx);
  }

  &-card8 {
    position: absolute;
    left: calc(-78rpx + 274rpx * 1.1);
    top: calc(410rpx * 1.1 * 3 - 440rpx);
  }

  &-card5 {
    position: absolute;
    right: -20rpx;
    top: 80rpx;
  }

  &-card3 {
    position: absolute;
    right: -20rpx;
    top: calc(410rpx * 1.1 - 60rpx);
  }

  &-card9 {
    position: absolute;
    right: -20rpx;
    top: calc(410rpx * 1.1 * 2 - 200rpx);
  }

  &-bottom {
    position: fixed;
    bottom: 5%;
    left: 100rpx;
    width: calc(100% - 200rpx);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &-all {
    width: 248rpx;
    height: 78rpx;
    background-image: url("https://jms.85gui7.com/hhs/lottery/btn-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: white;
    font-size: 40rpx;
    text-align: center;
    line-height: 78rpx;
  }

  &-close {
    width: 248rpx;
    height: 78rpx;
    background-image: url("https://jms.85gui7.com/hhs/lottery/btn-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: white;
    font-size: 40rpx;
    text-align: center;
    line-height: 78rpx;
  }

  &-near {
    bottom: 25%;
  }
}
</style>
