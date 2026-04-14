/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GRID_COUNT = 42;

export const CONTINENTS = [
  { id: 'asia', name: '亚洲', bg: 'bg-amber-50', accent: 'text-amber-800' },
  { id: 'europe', name: '欧洲', bg: 'bg-blue-50', accent: 'text-blue-800' },
  { id: 'africa', name: '非洲', bg: 'bg-orange-50', accent: 'text-orange-800' },
  { id: 'north_america', name: '北美洲', bg: 'bg-red-50', accent: 'text-red-800' },
  { id: 'south_america', name: '南美洲', bg: 'bg-green-50', accent: 'text-green-800' },
  { id: 'oceania', name: '大洋洲', bg: 'bg-cyan-50', accent: 'text-cyan-800' },
  { id: 'antarctica', name: '南极洲', bg: 'bg-slate-50', accent: 'text-slate-800' },
];

export type GridType = 'reward' | 'surprise' | 'blank';

export interface GridReward {
  type: GridType;
  name: string;
  tokens?: number;
  items?: string[];
  description?: string;
}

export const GRIDS: Record<number, GridReward> = {
  // 奖励格 (10格)
  38: { type: 'reward', name: '一等奖', tokens: 500, description: '活动代币' },
  12: { type: 'reward', name: '二等奖', tokens: 200, description: '活动代币' },
  22: { type: 'reward', name: '二等奖', tokens: 200, description: '活动代币' },
  32: { type: 'reward', name: '二等奖', tokens: 200, description: '活动代币' },
  5: { type: 'reward', name: '三等奖', tokens: 100, description: '活动代币' },
  10: { type: 'reward', name: '三等奖', tokens: 100, description: '活动代币' },
  17: { type: 'reward', name: '三等奖', tokens: 100, description: '活动代币' },
  27: { type: 'reward', name: '三等奖', tokens: 100, description: '活动代币' },
  35: { type: 'reward', name: '三等奖', tokens: 100, description: '活动代币' },
  40: { type: 'reward', name: '三等奖', tokens: 100, description: '活动代币' },

  // 随机惊喜格 (12格) - 示例位置
  2: { type: 'surprise', name: '随机惊喜' },
  7: { type: 'surprise', name: '随机惊喜' },
  14: { type: 'surprise', name: '随机惊喜' },
  19: { type: 'surprise', name: '随机惊喜' },
  24: { type: 'surprise', name: '随机惊喜' },
  29: { type: 'surprise', name: '随机惊喜' },
  34: { type: 'surprise', name: '随机惊喜' },
  39: { type: 'surprise', name: '随机惊喜' },
  4: { type: 'surprise', name: '随机惊喜' },
  16: { type: 'surprise', name: '随机惊喜' },
  26: { type: 'surprise', name: '随机惊喜' },
  36: { type: 'surprise', name: '随机惊喜' },
};

// 其余为 空白保底格 (20格)
for (let i = 1; i <= GRID_COUNT; i++) {
  if (!GRIDS[i]) {
    GRIDS[i] = { type: 'blank', name: '保底奖励', tokens: 10, description: '固定奖励' };
  }
}

export const SURPRISE_REWARDS = [
  { name: 'VIP体验卡', type: 'item' },
  { name: '博物馆主题头像框', type: 'item' },
  { name: '聊天气泡', type: 'item' },
  { name: '20活动代币', type: 'tokens', value: 20 },
  { name: '文物小彩蛋+50代币', type: 'tokens', value: 50, trivia: true },
];

export const TASKS = [
  { id: 'vip_like', name: '点赞他人帖文', reward: 1, type: 'vip', limit: 1 },
  { id: 'daily_sign', name: '每日签到', reward: 1, type: 'daily', limit: 1 },
  { id: 'watch_ad', name: '看广告', reward: 1, type: 'daily', limit: 1 },
  { id: 'post_topic', name: '发布 #国际博物馆日 帖文', reward: 1, type: 'daily', limit: 1 },
  { id: 'post_likes', name: '帖文点赞≥30', reward: 1, type: 'daily', limit: 1 },
  { id: 'share_activity', name: '分享活动', reward: 1, type: 'once', limit: 1 },
  { id: 'post_gift', name: '帖文送礼', reward: 1, type: 'unlimited' },
];

export const SHOP_ITEMS = [
  { id: 'gift_low', name: '低价值礼物', price: 100, image: '🎁' },
  { id: 'gift_mid', name: '中价值礼物', price: 500, image: '💎' },
  { id: 'gift_high', name: '高价值礼物', price: 2000, image: '🏆' },
  { id: 'gift_ultimate', name: '终极大奖', price: 10000, image: '👑' },
];
