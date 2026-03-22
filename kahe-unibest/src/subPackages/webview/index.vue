<template>
  <view class="webview-container">
    <web-view
      :src="url"
      @message="onMessage"
      @on-post-message="onPostMessage"
    />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

import { ref } from 'vue'

const url = ref('')

onLoad((options) => {
  if (options.url) {
    // 解码 URL
    url.value = decodeURIComponent(options.url)
  }
  else if (options.title && options.link) {
    // 或者传递标题和链接
    url.value = decodeURIComponent(options.link)
    uni.setNavigationBarTitle({
      title: decodeURIComponent(options.title),
    })
  }
})

// 接收 H5 页面发送的消息
function onMessage(event) {
  console.log('收到 H5 消息:', event.detail)
}

// 监听 postMessage
function onPostMessage(event) {
  console.log('postMessage:', event)
}
</script>

<style lang="scss" scoped>
.webview-container {
  height: 100vh;
}
</style>
