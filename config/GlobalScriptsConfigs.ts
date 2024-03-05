/**
 * GlobalScriptsConfigs.ts
 * created by 2024/3/5
 * @file 脚本的全局配置文件
 * @author  Yiero
 * */
import {
	GlobalScriptsConfigInterface,
} from './interfaces/GlobalScriptsConfigInterface';

/**
 * 全局配置文件, 用户脚本顶部的配置
 * */
export const GlobalScriptsConfigs: GlobalScriptsConfigInterface = {
	name: 'Demo',
	description: 'Demo Project.',
	author: 'Yiero',
	version: '1.0.0',
	icon: '',
	license: '',
	match: [
		'https://*/*',
		'https://www.bilibili.com/*',
	],
	namespace: '',
	require: [],
	grant: [],
	'run-at': 'document-idle',
};
