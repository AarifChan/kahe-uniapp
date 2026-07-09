<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { UserModule } from "@/store/modules/user";
import PetModule from "@/store/modules/pet";
import { currentEnv } from "@/utils";
import { AppModule } from "@/store/modules/app";
onLaunch(() => {
  console.log("App Launch");
  console.log("App Show");
  UserModule.preLogin();
  AppModule.getSystemInfo();
  UserModule.getUserInfo();
});
onShow(() => {
  console.log("App Show");
  const env = currentEnv();
  console.log("currentEnv:", env);
  // #ifdef H5
  //   setTimeout(() => {
  //     uni.hideTabBar({
  //           animation: false, // 离线打包建议先关闭动画尝试
  //           success: () => console.log('隐藏成功'),
  //           fail: (err) => console.log('隐藏失败', err)
  //       });
  // }, 1000);
  // #endif

  // #ifdef APP-PLUS
  // APP 平台再次确保隐藏 TabBar
  // setTimeout(() => {
  //   uni.hideTabBar({
  //     animation: false, // 离线打包建议先关闭动画尝试
  //     success: () => console.log("隐藏成功"),
  //     fail: (err) => console.log("隐藏失败", err),
  //   });
  // }, 100); // 延迟 100ms 左右
  // #endif

  PetModule.getConfig();
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import "@tuniao/tn-style/dist/uniapp/index.css";

/* #ifdef APP-PLUS */
/* APP平台禁止H5页面滚动，只允许scroll-view内部滚动 */
page {
  overflow: hidden;
  overscroll-behavior: none;
}

/* 确保scroll-view可以正常滚动 */
scroll-view {
  overflow: auto;
  overscroll-behavior: contain;
}
/* #endif */

@font-face {
  font-family: "YouSheBiaoTiHei";
  src: url("https://cdn.richcw.cn/sources/YouSheBiaoTiHei.ttf");
}

@font-face {
  font-family: "AccidentalPresidency";
  src: url("/static/font/AccidentalPresidency.ttf");
}

@font-face {
  font-family: "ZiHunYuWanTi";
  src: url("/static/font/ZiHunYuWanTi.ttf");
}
@font-face {
  font-family: "STHupo";
  src: url("/static/font/STHupo.ttf");
}

@font-face {
  font-family: "SimHei";
  src: url("/static/font/SimHei.ttf");
}

@font-face {
  font-family: "AlibabaPuHuiTi";
  src: url("https://cdn.richcw.cn/sources/AlibabaPuHuiTi3.0-105-Heavy.ttf");
}

/* 全局动画定义 - 挑战游戏摇晃动画 */
@keyframes shake-box {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

.box-shake {
  animation: shake-box 0.5s ease-in-out;
}

/* 弹幕滚动动画 */
.barrage {
  animation: move 20s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0rpx);
  }
  100% {
    transform: translateY(-1640rpx);
  }
}

/* 跑马灯位移动画 */
.animate-move1 {
  animation: move1 linear;
  -webkit-animation: move1 linear;
}

@keyframes move1 {
  from {
    transform: translateX(170%);
  }
  to {
    transform: translateX(-170%);
  }
}

/* 重置小程序 button 默认边框/背景 */
button::after {
  border: none;
  background-color: transparent;
}

/* 抽卡翻牌动画 */
.turnCard {
  animation: turnCardAnimate 1.5s;
}

@keyframes turnCardAnimate {
  0% {
    transform: perspective(150px) rotateY(180deg);
  }
}

/* 抽卡结果弹窗布局 */
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

.lottery-simple2 {
  position: absolute;
  left: -20rpx;
  top: calc(410rpx * 1.1 - 120rpx);
}

.lottery-simple1 {
  position: absolute;
  left: calc(-78rpx + 274rpx * 1.1);
  top: calc(410rpx * 1.1 - 120rpx);
}

.lottery-simple3 {
  position: absolute;
  right: -20rpx;
  top: calc(410rpx * 1.1 - 120rpx);
}

.lottery-card4 {
  position: absolute;
  left: -20rpx;
  top: 80rpx;
}

.lottery-card2 {
  position: absolute;
  left: -20rpx;
  top: calc(410rpx * 1.1 - 60rpx);
}

.lottery-card6 {
  position: absolute;
  left: -20rpx;
  top: calc(410rpx * 1.1 * 2 - 200rpx);
}

.lottery-card10 {
  position: absolute;
  left: calc(-78rpx + 274rpx * 1.1);
  top: -20rpx;
}

.lottery-card1 {
  position: absolute;
  left: calc(-78rpx + 274rpx * 1.1);
  top: calc(410rpx * 1.1 - 160rpx);
}

.lottery-card7 {
  position: absolute;
  left: calc(-78rpx + 274rpx * 1.1);
  top: calc(410rpx * 1.1 * 2 - 300rpx);
}

.lottery-card8 {
  position: absolute;
  left: calc(-78rpx + 274rpx * 1.1);
  top: calc(410rpx * 1.1 * 3 - 440rpx);
}

.lottery-card5 {
  position: absolute;
  right: -20rpx;
  top: 80rpx;
}

.lottery-card3 {
  position: absolute;
  right: -20rpx;
  top: calc(410rpx * 1.1 - 60rpx);
}

.lottery-card9 {
  position: absolute;
  right: -20rpx;
  top: calc(410rpx * 1.1 * 2 - 200rpx);
}

.lottery-bottom {
  position: fixed;
  bottom: 5%;
  left: 100rpx;
  width: calc(100% - 200rpx);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.lottery-all,
.lottery-close {
  width: 248rpx;
  height: 78rpx;
  background-image: url("/static/hhs/lottery/btn-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
  font-size: 40rpx;
  text-align: center;
  line-height: 78rpx;
}

.lottery-near {
  bottom: 25%;
}
</style>
