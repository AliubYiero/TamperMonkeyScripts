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
		limitTime: {
			title: '设置屏蔽网站和限制时间',
			description: '设置限时访问的网站和限制时间',
			type: 'textarea',
			default: '<url>, <start_time>, <end_time>, <limit_way = \'limit\'>\n' +
				'https://www.example.com/, 18, 20, open  ' +
				'// -->  从 18:00-20:00 开放访问 https://www.example.com/ (普通匹配)\n' +
				'https://www.example.com/, 18:30, 20:30, limit  ' +
				'// -->  从 18:30-20:30 限制访问 https://www.example.com/ (普通匹配), 其余时间开放访问\n' +
				'/https?:\/\/www\.example\.com\/.* /, 18, 20  ' +
				'// -->  从 18:00-20:00 限制访问 https://www.example.com/.* (正则匹配), 其余时间开放访问',
		},
	},
};
