import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { tabBar } from './src/tabbar/config'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#FDEFCC',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FDEFCC',
    disableScroll: true,
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
      '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
      '^tn-(.*)-(item|group)$': '@tuniao/tnui-vue3-uniapp/components/$1/src/$1-$2.vue',
      '^tn-(.*)': '@tuniao/tnui-vue3-uniapp/components/$1/src/$1.vue',
    },
  },
  // tabbar 的配置统一在 “./src/tabbar/config.ts” 文件中
  tabBar: tabBar as any,
  subPackages: [
    {
      root: 'subPackages/webview',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '网页' } },
      ],
    },
    {
      root: 'subPackages/xingyao',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '星耀欧皇' } },
      ],
    },
    {
      root: 'subPackages/gift',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '优惠礼包' } },
      ],
    },
    {
      root: 'subPackages/order',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '订单列表' } },
        { path: 'detail', style: { navigationBarTitleText: '订单详情' } },
      ],
    },
    {
      root: 'subPackages/collect',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '集赏行动' } },
        { path: 'detail/index', style: { navigationBarTitleText: '集赏详情' } },
        { path: 'record/index', style: { navigationBarTitleText: '集赏记录' } },
      ],
    },
    {
      root: 'subPackages/groupBuy',
      pages: [
        { path: 'index/index', style: { navigationBarTitleText: '拼团' } },
        { path: 'detail/index', style: { navigationBarTitleText: '拼团详情' } },
        { path: 'list/index', style: { navigationBarTitleText: '卡密列表' } },
        { path: 'mine/index', style: { navigationBarTitleText: '我的卡密' } },
        { path: 'submit/index', style: { navigationBarTitleText: '确认订单' } },
        { path: 'result/index', style: { navigationBarTitleText: '拼团结果' } },
      ],
    },
    {
      root: 'subPackages/mine',
      pages: [
        { path: 'favorite/index', style: { navigationBarTitleText: '我的收藏' } },
        { path: 'address/index', style: { navigationBarTitleText: '地址管理' } },
        { path: 'address/detail', style: { navigationBarTitleText: '地址编辑' } },
        { path: 'vip/index', style: { navigationBarTitleText: 'VIP会员' } },
        { path: 'coupon/index', style: { navigationBarTitleText: '我的优惠券' } },
        { path: 'rank/index', style: { navigationBarTitleText: '排行榜' } },
        { path: 'invite/index', style: { navigationBarTitleText: '邀请有奖' } },
      ],
    },
    {
      root: 'subPackages/mall',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '卡牌商城' } },
      ],
    },
    {
      root: 'subPackages/infinite',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '积分福利' } },
      ],
    },
    {
      root: 'subPackages/welfare',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '福利大厅' } },
      ],
    },
    {
      root: 'subPackages/merchant',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '商户信息' } },
      ],
    },
    {
      root: 'subPackages/discount',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '优惠礼包' } },
      ],
    },
    {
      root: 'subPackages/pet',
      pages: [
        { path: 'introduce/index', style: { navigationBarTitleText: '宠物图鉴' } },
        { path: 'eggs/index', style: { navigationBarTitleText: '宠物孵化' } },
        { path: 'exploration/index', style: { navigationBarTitleText: '探险' } },
        { path: 'merge/index', style: { navigationBarTitleText: '融合' } },
      ],
    },
    {
      root: 'subPackages/product',
      pages: [
        { path: 'state/index', style: { navigationBarTitleText: '品相定义' } },
        { path: 'detail/index' },
        { path: 'mall/index', style: { navigationBarTitleText: '兑换商城' } },
        { path: 'card/index' },
        { path: 'welfare/index', style: { navigationBarTitleText: '福利活动' } },
        { path: 'welfare-detail/index', style: { navigationBarTitleText: '抽奖活动详情' } },
        { path: 'reward-code/index', style: { navigationBarTitleText: '我的抽奖码' } },
      ],
    },
    {
      root: 'subPackages/setting',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '设置' } },
        { path: 'password/index', style: { navigationBarTitleText: '设置' } },
        { path: 'bindPhone/index', style: { navigationBarTitleText: '绑定手机号' } },
      ],
    },
    {
      root: 'subPackages/dailyWelfare',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '每日领券' } },
      ],
    },
    {
      root: 'subPackages/activity',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '福利活动' } },
      ],
    },
    {
      root: 'subPackages/box',
      pages: [
        { path: 'box/index', style: { navigationBarTitleText: '寄存柜' } },
        { path: 'index' },
        { path: 'chest/index', style: { navigationBarTitleText: '我的宝箱' } },
        { path: 'redBag/index', style: { navigationBarTitleText: '分享红包' } },
      ],
    },
    {
      root: 'subPackages/agreement',
      pages: [
        { path: 'index', style: { navigationBarTitleText: '用户协议' } },
      ],
    },
  ] as any,
})
