/**
 * ScriptInfoConfigs.ts
 * created by 2024/3/5
 * @file 脚本信息配置项
 * @author  Yiero
 * */
import { GlobalScriptsConfigInterface } from './interfaces';

/**
 * 用户脚本顶部的 ==UserScript== 配置项,
 * 放置脚本信息中属于脚本的信息 (如脚本名, 脚本简介, 脚本描述, 脚本作用域等...)
 *
 * 优先级最高
 * */
export const ScriptInfoConfigs: Partial<GlobalScriptsConfigInterface> = {
	/* 脚本名 */
	name: 'Bilibili视频标记',
	/* 脚本简介 */
	description: '通过收藏夹中的视频判断视频是否已看',
	/* 脚本当前版本号 */
	version: '0.1.0-b',
	/* 脚本作用域 (脚本作用网站) */
	match: [
		// 首页 (包括其它子区域)
		'https://www.bilibili.com/*',
	],
	/* 脚本图标 (不输入默认使用 match 的域名下的图标, 如果无法识别 match 域名, 则使用油猴默认图标) */
	icon: '',
	/* 脚本依赖的第三方脚本库 */
	require: [],
	/* 脚本依赖的第三份资源库 */
	resource: [],
	/* 脚本授权的GM函数 */
	grant: [
		'GM_addStyle',
	],
	/* 脚本载入时机 */
	'run-at': 'document-idle',
};
