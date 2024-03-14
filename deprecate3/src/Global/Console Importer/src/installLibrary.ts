/**
 * uninstallLibrary.ts
 * created by 2023/9/17
 * @file 安装全局库
 * @author  Yiero
 * */

import { isCSS } from '../lib/isCSS.ts'
import { urlList } from '../config/config.ts'
import {
	GMHttpRequest
} from '../../../../lib/GM_Lib/Ajax/GMHttpRequest.ts'
import { print } from '../index.ts';
import { getUrl } from './getUrl.ts'

export {
	installLibrary
}

function installLibrary( library: string ): void
function installLibrary( url: string ): void;
/**
 * 获取require
 * @return { void }
 * @param {string} urlOrLibrary
 * */
async function installLibrary( urlOrLibrary: string ): Promise<void> {
	// 将信息分组
	print.group();
	
	const url = await getUrl( urlOrLibrary );
	
	// 判断当前页面中是否已存在库
	if ( urlList.has( url ) ) {
		print.error( `获取数据失败...\n当前页面中已存在库 [${ url }]` );
		// 结束分组
		print.groupEnd();
		return;
	}
	
	print.info( '正在加载数据...' );
	// 从链接中获取URl字符串
	GMHttpRequest( url ).then(
		( res ) => {
			// 请求不成功
			if ( res.status === 404 ) {
				print.error( `获取数据失败...\nError: page not found, request an error url: ${ url }` );
				// 结束分组
				print.groupEnd();
				return;
			}
			else if ( res.status !== 200 ) {
				print.error( `获取数据失败...\nError: ${ res.responseText }` );
				// 结束分组
				print.groupEnd();
				return;
			}
			
			const scriptText = res.responseText;
			
			// 保存判断值
			const isScript = !isCSS( url );
			const displayObj = {
				tag: isScript ? 'script' : 'style',
				content: isScript ? '脚本' : '样式表'
			}
			
			// output tips to user
			print.info( `成功获取${ displayObj.content }, 正在载入页面...` );
			
			// get element which insert into page.
			const element = GM_addElement(
				document.head,
				displayObj.tag,
				{
					textContent: scriptText,
				}
			);
			/* 保存当前的脚本信息到配置项中, 防止重复写入脚本 */
			// save this url to config.
			urlList.set( url, element );
			
			// output tips to user
			print.info( `${ displayObj.content }载入成功.\n${ url }`, );
			// 结束分组
			print.groupEnd();
		},
		( error ) => {
			print.error( '获取数据失败...\nError: ', error.error );
			// 结束分组
			print.groupEnd();
		}
	);
}
