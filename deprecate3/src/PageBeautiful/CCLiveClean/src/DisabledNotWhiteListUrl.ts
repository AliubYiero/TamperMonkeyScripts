/**
 * DisabledNotWhiteListUrl.ts
 * created by 2023/8/27
 * @file 拒绝非白名单的CC网站访问
 * @author  Yiero
 * */

import { whiteList } from './implements/WhiteList'

export {
	disabledNotWhiteListUrl
}

function disabledNotWhiteListUrl( liveId: number ) {
	/* 判断当前直播间是否存在在白名单中 */
	// 不存在, 关闭网页
	if ( !whiteList.has( liveId ) ) {
		window.close();
	}
}
