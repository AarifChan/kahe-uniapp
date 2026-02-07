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
  
  // 隐藏系统 TabBar（所有平台）
  // #ifdef APP-PLUS
  // APP 平台延迟隐藏，确保原生 TabBar 已加载
  setTimeout(() => {
    uni.hideTabBar({
            animation: false, // 离线打包建议先关闭动画尝试
            success: () => console.log('隐藏成功'),
            fail: (err) => console.log('隐藏失败', err)
        });
  }, 300);
  // #endif
  
  // #ifndef APP-PLUS
  uni.hideTabBar({
            animation: false, // 离线打包建议先关闭动画尝试
            success: () => console.log('隐藏成功'),
            fail: (err) => console.log('隐藏失败', err)
        });
  // #endif
});
onShow(() => {
  console.log("App Show");
  const env = currentEnv();
  console.log("currentEnv:", env);
    // #ifdef H5
    setTimeout(() => {
      uni.hideTabBar({
            animation: false, // 离线打包建议先关闭动画尝试
            success: () => console.log('隐藏成功'),
            fail: (err) => console.log('隐藏失败', err)
        });
  }, 1000);
  // #endif
  
  // #ifdef APP-PLUS
  // APP 平台再次确保隐藏 TabBar
  setTimeout(() => {
        uni.hideTabBar({
            animation: false, // 离线打包建议先关闭动画尝试
            success: () => console.log('隐藏成功'),
            fail: (err) => console.log('隐藏失败', err)
        });
    }, 100); // 延迟 100ms 左右
  // #endif

  PetModule.getConfig();
  

});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import "@tuniao/tn-style/dist/uniapp/index.css";

@font-face {
  font-family: "YouSheBiaoTiHei";
  src: url("https://jms.85gui7.com/sources/YouSheBiaoTiHei.ttf");
}

@font-face {
  font-family: "AccidentalPresidency";
  src: url("https://jms.85gui7.com/font/AccidentalPresidency.ttf");
}

@font-face {
  font-family: "ZiHunYuWanTi";
  src: url("https://jms.85gui7.com/font/ZiHunYuWanTi.ttf");
}
@font-face {
  font-family: "STHupo";
  src: url("https://jms.85gui7.com/font/STHupo.ttf");
}

@font-face {
  font-family: "SimHei";
  src: url("https://jms.85gui7.com/font/SimHei.ttf");
}
</style>
