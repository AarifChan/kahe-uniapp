<template>
  <view class="min-h-screen bg-[#f5f5f5] pb-40">
    <view class="p-60 px-40 mb-30 bg-gradient-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
      <text class="block text-48 font-bold text-white text-center">日志插件测试</text>
    </view>

    <!-- 基础日志测试 -->
    <view class="bg-white m-20 mx-30 rounded-16 p-30 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.1)]">
      <view class="text-32 font-bold text-[#333] mb-20 pb-15 border-b-2 border-[#f0f0f0]">基础日志测试</view>
      <view class="flex flex-wrap gap-20">
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#9ca3af]" @click="testDebug">测试 DEBUG</button>
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#3b82f6]" @click="testInfo">测试 INFO</button>
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#f59e0b]" @click="testWarn">测试 WARN</button>
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#ef4444]" @click="testError">测试 ERROR</button>
      </view>
    </view>

    <!-- 对象日志测试 -->
    <view class="bg-white m-20 mx-30 rounded-16 p-30 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.1)]">
      <view class="text-32 font-bold text-[#333] mb-20 pb-15 border-b-2 border-[#f0f0f0]">对象日志测试</view>
      <view class="flex flex-wrap gap-20">
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#667eea]" @click="testObjectLog">记录对象数据</button>
      </view>
    </view>

    <!-- 性能测试 -->
    <view class="bg-white m-20 mx-30 rounded-16 p-30 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.1)]">
      <view class="text-32 font-bold text-[#333] mb-20 pb-15 border-b-2 border-[#f0f0f0]">性能监控</view>
      <view class="flex flex-wrap gap-20">
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#667eea]" @click="testPerformance">测试性能监控</button>
      </view>
      <view v-if="perfResult" class="mt-20 p-20 bg-[#f3f4f6] rounded-8 text-28 text-[#374151]">
        <text>性能结果: {{ perfResult }}</text>
      </view>
    </view>

    <!-- API 日志 -->
    <view class="bg-white m-20 mx-30 rounded-16 p-30 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.1)]">
      <view class="text-32 font-bold text-[#333] mb-20 pb-15 border-b-2 border-[#f0f0f0]">API 请求日志</view>
      <view class="flex flex-wrap gap-20">
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#667eea]" @click="testApiLog">模拟 API 请求</button>
      </view>
    </view>

    <!-- 日志管理 -->
    <view class="bg-white m-20 mx-30 rounded-16 p-30 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.1)]">
      <view class="text-32 font-bold text-[#333] mb-20 pb-15 border-b-2 border-[#f0f0f0]">日志管理</view>
      <view class="flex flex-wrap gap-20">
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#6b7280]" @click="getTodayLog">获取今日日志</button>
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#6b7280]" @click="getLogStats">获取日志统计</button>
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#10b981]" @click="exportLogs">导出日志</button>
        <button class="min-w-180 p-20 px-30 rounded-12 text-28 text-white border-none bg-[#dc2626]" @click="clearLogs">清空日志</button>
      </view>
    </view>

    <!-- 结果显示 -->
    <view v-if="logContent" class="bg-white m-20 mx-30 rounded-16 p-30 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.1)]">
      <view class="text-32 font-bold text-[#333] mb-20 pb-15 border-b-2 border-[#f0f0f0]">日志内容</view>
      <scroll-view class="max-h-400 bg-[#1f2937] rounded-8 p-20" scroll-y>
        <text class="font-mono text-24 text-[#e5e7eb] whitespace-pre-wrap word-break-break-all">{{ logContent }}</text>
      </scroll-view>
    </view>

    <view v-if="statsInfo" class="bg-white m-20 mx-30 rounded-16 p-30 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.1)]">
      <view class="text-32 font-bold text-[#333] mb-20 pb-15 border-b-2 border-[#f0f0f0]">统计信息</view>
      <view class="bg-[#f3f4f6] rounded-8 p-20">
        <text class="block text-28 text-[#4b5563] mb-10">文件数: {{ statsInfo.totalFiles }}</text>
        <text class="block text-28 text-[#4b5563] mb-10">总大小: {{ statsInfo.totalSizeReadable }}</text>
        <text class="block text-28 text-[#4b5563] mb-10">目录: {{ statsInfo.logDirectory }}</text>
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

<style lang="scss" scoped></style>
