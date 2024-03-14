/**
 * JumpDisabled.ts
 * created by 2023/8/23
 * @file 屏蔽页面跳转
 * @author  Yiero
 * */

import { freshListenerPushState } from '../../../../lib/Listener/Page/FreshListener'

export {
	live,
	equalLiveId
}
/* 声明 */
const live: { id: string, historyId: string } = {
	id: '',
	historyId: ''
};

/* 当前页面直播ID */
Object.defineProperty( live, 'id', {
	get(): string {
		const liveIdMatch = document.URL.match( /https:\/\/cc.163.com\/(\d+)/ );
		if ( liveIdMatch && liveIdMatch[ 1 ] ) {
			const liveId = liveIdMatch[ 1 ];
			// 记录当前页直播Id
			sessionStorage.setItem( 'localLiveId', liveId );
			// 返回当前页直播Id
			return liveId;
		}
		return '';
	}
} )

/* 获取储存Id */
Object.defineProperty( live, 'historyId', {
	get(): string {
		return sessionStorage.getItem( 'localLiveId' ) || '';
	}
} )

/* 检测到页面热更新时监听跳转后页面是否与记录页面相同 */
function equalLiveId() {
	// 页面热更新时触发函数
	freshListenerPushState( () => {
		/* 判断不等时, 关闭当前页面 */
		if ( live.historyId !== live.id ) {
			window.close();
		}
	} )
}
