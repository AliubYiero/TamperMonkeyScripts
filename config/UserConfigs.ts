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
		favouriteTitle: {
			title: '指定收藏夹标题',
			description: '更改指定收藏夹标题',
			type: 'text',
			default: 'fun',
		},
		userUid: {
			title: '用户uid',
			description: '设置用户uid',
			type: 'text',
			default: '',
		},
	},
};
