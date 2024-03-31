/**
 * UserConfigs.ts
 * created by 2024/3/13
 * @file 用户配置信息 (提供给 ScriptCat 使用)
 * @author  Yiero
 * */
import { UserConfigGroupInterface } from './interfaces';

/**
 * 用户配置项
 * */
export const UserConfigs: UserConfigGroupInterface = {
	/* 分组1 */
	'配置项': {
		scrollSpeed: {
			title: '滚动速度',
			description: '修改页面滚动速度',
			type: 'number',
			default: 1,
			min: 0,
		},
		reachedBottomPauseTime: {
			title: '页面触底暂停时间',
			description: '修改页面触底暂停时间',
			type: 'number',
			default: 3,
			min: 0,
		},
	},
};
