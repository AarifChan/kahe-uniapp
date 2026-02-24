<template>
  <view class="guide-overlay" v-if="show">
    <view class="guide-popup">
      <text class="popup-title">请使用原生浏览器打开</text>
      <text class="popup-message">
        为了您能获得更好的体验，请点击右上角的菜单按钮（⋮ 或 ...），然后选择：
      </text>

      <text class="popup-action">“在浏览器打开” 或 “复制链接”</text>

      <view class="popup-tip-row">
        <image src="/static/svg/browser_icon.svg" class="tip-image"></image>
        <image src="/static/svg/menu_icon.svg" class="tip-image"></image>
      </view>

      <text class="popup-close" @tap="closePopup">我已知晓</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
//

defineProps({
  show: {
    default: Boolean,
    type: Boolean,
  },
})
const emit = defineEmits(['update:show'])
const closePopup = () => {
  emit('update:show', false)
}
</script>

<style lang="scss" scoped>
/* 覆盖层：固定在屏幕上，半透明黑色背景 */
.guide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999; /* 确保在最上层 */
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 弹窗主体 */
.guide-popup {
  width: 80%;
  max-width: 300px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.popup-message {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.popup-action {
  font-size: 15px;
  font-weight: bold;
  color: #2196f3; /* 蓝色突出显示关键操作 */
  padding: 8px 10px;
  border: 1px dashed #bbdefb;
  border-radius: 4px;
  margin-bottom: 20px;
}

.popup-tip-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
}

.tip-image {
  width: 60px; /* 假设您提供了引导操作的截图 */
  height: 60px;
  border-radius: 4px;
  background-color: #eee; /* 占位符颜色 */
  /* 实际使用时，请放置/static/目录下的实际引导图 */
}

.popup-close {
  font-size: 16px;
  color: white;
  background-color: #007aff;
  padding: 10px 30px;
  border-radius: 6px;
  margin-top: 15px;
}

/* -------------------------------------- */
/* 页面内容样式 */
/* -------------------------------------- */
.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
