<template>
  <view class="log-test-page">
    <view class="header">
      <text class="title">日志插件测试</text>
    </view>

    <!-- 基础日志测试 -->
    <view class="section">
      <view class="section-title">基础日志测试</view>
      <view class="button-group">
        <button class="btn btn-debug" @click="testDebug">测试 DEBUG</button>
        <button class="btn btn-info" @click="testInfo">测试 INFO</button>
        <button class="btn btn-warn" @click="testWarn">测试 WARN</button>
        <button class="btn btn-error" @click="testError">测试 ERROR</button>
      </view>
    </view>

    <!-- 对象日志测试 -->
    <view class="section">
      <view class="section-title">对象日志测试</view>
      <view class="button-group">
        <button class="btn btn-primary" @click="testObjectLog">记录对象数据</button>
      </view>
    </view>

    <!-- 性能测试 -->
    <view class="section">
      <view class="section-title">性能监控</view>
      <view class="button-group">
        <button class="btn btn-primary" @click="testPerformance">测试性能监控</button>
      </view>
      <view v-if="perfResult" class="result">
        <text>性能结果: {{ perfResult }}</text>
      </view>
    </view>

    <!-- API 日志 -->
    <view class="section">
      <view class="section-title">API 请求日志</view>
      <view class="button-group">
        <button class="btn btn-primary" @click="testApiLog">模拟 API 请求</button>
      </view>
    </view>

    <!-- 日志管理 -->
    <view class="section">
      <view class="section-title">日志管理</view>
      <view class="button-group">
        <button class="btn btn-secondary" @click="getTodayLog">获取今日日志</button>
        <button class="btn btn-secondary" @click="getLogStats">获取日志统计</button>
        <button class="btn btn-success" @click="exportLogs">导出日志</button>
        <button class="btn btn-danger" @click="clearLogs">清空日志</button>
      </view>
    </view>

    <!-- 结果显示 -->
    <view v-if="logContent" class="section">
      <view class="section-title">日志内容</view>
      <scroll-view class="log-content" scroll-y>
        <text class="log-text">{{ logContent }}</text>
      </scroll-view>
    </view>

    <view v-if="statsInfo" class="section">
      <view class="section-title">统计信息</view>
      <view class="stats-box">
        <text class="stats-item">文件数: {{ statsInfo.totalFiles }}</text>
        <text class="stats-item">总大小: {{ statsInfo.totalSizeReadable }}</text>
        <text class="stats-item">目录: {{ statsInfo.logDirectory }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useLog, usePerformanceLog, useApiLog } from '@/composables/useLog';

// 使用日志 composable
const { logger, getTodayLog: fetchTodayLog, getStats, exportLogs: doExportLogs, clearLogs: doClearLogs } = useLog({
  tag: 'LogTestPage'
});
const perf = usePerformanceLog();
const apiLog = useApiLog();

// 响应式数据
const logContent = ref('');
const statsInfo = ref<any>(null);
const perfResult = ref('');

// 页面显示时记录日志
onShow(() => {
  logger.info('日志测试页面显示');
});

// 基础日志测试
const testDebug = () => {
  logger.debug('这是一条 DEBUG 日志');
  uni.showToast({ title: 'DEBUG 日志已记录', icon: 'none' });
};

const testInfo = () => {
  logger.info('这是一条 INFO 日志');
  uni.showToast({ title: 'INFO 日志已记录', icon: 'none' });
};

const testWarn = () => {
  logger.warn('这是一条 WARN 日志');
  uni.showToast({ title: 'WARN 日志已记录', icon: 'none' });
};

const testError = () => {
  logger.error('这是一条 ERROR 日志');
  uni.showToast({ title: 'ERROR 日志已记录', icon: 'none' });
};

// 对象日志测试
const testObjectLog = () => {
  const testData = {
    userId: 12345,
    userName: '测试用户',
    timestamp: Date.now(),
    data: {
      score: 100,
      level: 5
    }
  };
  logger.info(testData, 'ObjectTest');
  uni.showToast({ title: '对象日志已记录', icon: 'none' });
};

// 性能测试
const testPerformance = async () => {
  perf.start('test_operation');

  // 模拟耗时操作
  await new Promise(resolve => setTimeout(resolve, 500));

  const duration = perf.end('test_operation');
  perfResult.value = `操作耗时: ${duration}ms`;
};

// API 日志测试
const testApiLog = async () => {
  apiLog.request('/api/user/info', { userId: 123 });

  // 模拟请求延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  apiLog.response('/api/user/info', { name: '张三', age: 25 });

  // 模拟错误请求
  apiLog.request('/api/error', { id: 999 });
  apiLog.error('/api/error', new Error('请求超时'));

  uni.showToast({ title: 'API 日志已记录', icon: 'none' });
};

// 获取今日日志
const getTodayLog = async () => {
  try {
    const log = await fetchTodayLog();
    logContent.value = log || '暂无日志内容';
    logger.info('获取今日日志成功');
  } catch (error) {
    uni.showToast({ title: '获取失败', icon: 'error' });
  }
};

// 获取日志统计
const getLogStats = async () => {
  try {
    const stats = await getStats();
    if (stats) {
      statsInfo.value = stats;
      logger.info('获取日志统计成功');
    }
  } catch (error) {
    uni.showToast({ title: '获取失败', icon: 'error' });
  }
};

// 导出日志
const exportLogs = async () => {
  try {
    const path = await doExportLogs();
    if (path) {
      uni.showModal({
        title: '导出成功',
        content: `日志路径: ${path}`,
        showCancel: false
      });
    }
  } catch (error) {
    uni.showToast({ title: '导出失败', icon: 'error' });
  }
};

// 清空日志
const clearLogs = () => {
  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有日志吗？',
    success: (res) => {
      if (res.confirm) {
        doClearLogs();
        logContent.value = '';
        statsInfo.value = null;
        uni.showToast({ title: '日志已清空', icon: 'success' });
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.log-test-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60rpx 40rpx;
  margin-bottom: 30rpx;

  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
}

.section {
  background: #fff;
  margin: 20rpx 30rpx;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    padding-bottom: 15rpx;
    border-bottom: 2rpx solid #f0f0f0;
  }
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;

  .btn {
    min-width: 180rpx;
    padding: 20rpx 30rpx;
    border-radius: 12rpx;
    font-size: 28rpx;
    color: #fff;
    border: none;

    &-debug {
      background: #9ca3af;
    }

    &-info {
      background: #3b82f6;
    }

    &-warn {
      background: #f59e0b;
    }

    &-error {
      background: #ef4444;
    }

    &-primary {
      background: #667eea;
    }

    &-secondary {
      background: #6b7280;
    }

    &-success {
      background: #10b981;
    }

    &-danger {
      background: #dc2626;
    }
  }
}

.result {
  margin-top: 20rpx;
  padding: 20rpx;
  background: #f3f4f6;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #374151;
}

.log-content {
  max-height: 400rpx;
  background: #1f2937;
  border-radius: 8rpx;
  padding: 20rpx;

  .log-text {
    font-family: monospace;
    font-size: 24rpx;
    color: #e5e7eb;
    white-space: pre-wrap;
    word-break: break-all;
  }
}

.stats-box {
  background: #f3f4f6;
  border-radius: 8rpx;
  padding: 20rpx;

  .stats-item {
    display: block;
    font-size: 28rpx;
    color: #4b5563;
    margin-bottom: 10rpx;
  }
}
</style>
