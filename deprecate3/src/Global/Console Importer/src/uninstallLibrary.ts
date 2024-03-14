/**
 * uninstallLibrary.ts
 * created by 2023/9/18
 * @file 卸载全局库
 * @author  Yiero
 * */

import { urlList } from '../config/config.ts';
import { print } from '../index.ts';
import { getUrl } from './getUrl.ts'

/**
 * 卸载全局库
 * @param { string } url 需要导入的链接
 * @return { Promise<void> }
 * */
export async function uninstallLibrary( url: string ): Promise<void> {
	// 信息分组
	print.group();
	/* 删除元素 */
	// 加载元素
	const element = urlList.get( await getUrl( url ) );
	
	/* 判断当前库是否在本地环境中 */
	// 不存在则报错, 并输出日志
	if ( !element ) {
		print.warn( '当前页面未安装库: \n', url );
		// 结束分组
		print.groupEnd();
		return;
	}
	
	// 存在库, 删除库
	element?.remove();
	print.info( `当前库已删除: \n`, url );
	
	// 清空配置储存
	urlList.delete( url );
	
	// 结束分组
	print.groupEnd();
}
