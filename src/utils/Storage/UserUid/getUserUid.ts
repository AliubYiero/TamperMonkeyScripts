import { getElement, GMStorage } from '../../../lib';
import { userUidConfig } from './config/userUidConfig.ts';

/**
 * 从存储中检索用户UID，或从页面中提取用户UID。
 *
 * @return {Promise<string>} 字符串形式的用户UID。
 */
export const getUserUid = async (): Promise<string> => {
	// 如果当前存储中有用户uid, 则直接使用
	let userUid: string = GMStorage.getItem( userUidConfig.key, '' );
	
	// 如果没有, 从页面中获取
	if ( !userUid ) {
		// 用户信息dom选择器
		const selector = 'a.header-entry-mini[href^="//space.bilibili.com/"]';
		
		// 等待用户信息加载
		await getElement(
			document,
			selector,
			60_000,
		);
		
		// 获取用户信息dom
		const userDom = document.querySelector( selector ) as HTMLLinkElement | null;
		
		// 如果没有用户信息, 则返回空字符串
		if ( !userDom ) {
			return '';
		}
		
		// 获取链接中的用户uid
		userUid = new URL( userDom.href ).pathname.split( '/' )[ 1 ];
	}
	
	// 返回用户uid
	return Promise.resolve( userUid );
};
