/**
 * EnvConfig.ts
 * created by 2023/10/15
 * @file 环境变量
 * @author  Yiero
 * */

// Warframe Market api host
export const API_PREV_URL = 'https://api.warframe.market/v1/items/';

// 玩家最后在线的限制时间
export const TIMEOUT_EXPIRE = {
	ONE_DAY: 1 * 24 * 60 * 60 * 1000,     // 1天
	TWO_DAY: 2 * 24 * 60 * 60 * 1000,     // 2天
	THREE_DAY: 3 * 24 * 60 * 60 * 1000,     // 3天
	SEVEN_DAY: 7 * 24 * 60 * 60 * 1000,     // 7天
}
