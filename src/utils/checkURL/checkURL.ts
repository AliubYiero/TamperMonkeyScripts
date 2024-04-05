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
	console.log( cleanURL );
	
	// 当前模块
	let currentModule = '';
	
	// 遍历模块映射表, 查找当前模块
	for ( let urlModuleMapperKey in urlModuleMapper ) {
		// 如果是正则匹配 (以 `*` 结尾), 将字符串转化为正则表达式, 并进行匹配
		if ( urlModuleMapperKey.endsWith( '*' ) ) {
			const isMatched = new RegExp( urlModuleMapperKey.slice( 0, -1 ) ).test( cleanURL );
			isMatched && ( currentModule = urlModuleMapper[ urlModuleMapperKey ] );
		}
		// 如果是正常字符串, 则直接完全匹配
		else {
			const isMatched = urlModuleMapperKey === cleanURL;
			isMatched && ( currentModule = urlModuleMapper[ urlModuleMapperKey ] );
		}
		
		// 如果当前模块已经存在, 退出循环
		if ( currentModule ) {
			break;
		}
	}
	
	return currentModule || undefined;
};
