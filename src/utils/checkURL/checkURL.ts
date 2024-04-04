/**
 * checkURL.ts
 * created by 2024/4/5
 * @file 检查当前的URL属于哪个板块
 * @author  Yiero
 * */

import { URLModuleMapper } from '../interfaces/URLModuleMapper.ts';
import { urlModuleMapper } from './config/urlModuleMapper.ts';

/**
 * 检查当前的URL属于哪个板块
 * */
export const checkURL = (): URLModuleMapper[keyof URLModuleMapper] | undefined => {
	// 通过 URL 构造函数处理掉网页参数
	const originURL = new URL( document.URL );
	const cleanURL: string = originURL.origin + originURL.pathname;
	
	return urlModuleMapper[ cleanURL ] || undefined;
};
