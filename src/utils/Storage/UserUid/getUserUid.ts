import { getElement } from '../../../lib';

/**
 * 从存储中检索用户UID，或从页面中提取用户UID。
 *
 * @return {Promise<string>} 字符串形式的用户UID。
 */
export const getUserUid = async (): Promise<string> => {
	// 如果当前存储中有用户uid, 则直接使用
	let userUid: string = GM_getValue( 'userUid', '' );
	console.log( userUid, !userUid );
	// 如果没有, 从页面中获取
	if ( !userUid ) {
		const userDom = await getElement(
			document,
			'a.header-entry-mini[href^="//space.bilibili.com/"]',
			5000,
		) as HTMLLinkElement | null;
		
		if ( !userDom ) {
			return '';
		}
		
		// 获取链接中的用户uid
		userUid = new URL( userDom.href ).pathname.split( '/' )[ 1 ];
	}
	return Promise.resolve( userUid );
};
