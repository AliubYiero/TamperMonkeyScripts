import { Info } from '../../../lib/Base/Info.ts'
import {
	freshListenerPushState
} from '../../../lib/Listener/Page/FreshListener.ts'
import { clickElement } from './src/ClickElement.ts'
import { GMConfigMenu } from '../../../lib/GM_Lib'
import { clickInputElement } from './src/ClickInputElement.ts'

export {
	print
}
const print = new Info( 'SubsidiaryBiliBiliSignManually' );

async function clickEvent() {
	// 关闭自动连播
	await clickElement( '.switch-button.on', '关闭自动连播', 20 );
	// 点击关闭弹幕
	await clickInputElement( '.bui-danmaku-switch-input', '关闭弹幕' );
	// 点击观看标记按钮
	await clickElement( '.video-info-detail > .btnNotView', '点击观看标记按钮' );
	// 点击快速收藏按钮
	await clickElement( '.be-quick-favorite.video-toolbar-left-item:not(.on)', '点击快速收藏按钮' );
	// 关闭自动连播(页面可能存在一次热刷新, 会再次将自动连播唤醒, 继续关闭)
	await clickElement( '.switch-button.on', '关闭自动连播', 20, 10 );
}

/* entry */
( async () => {
	await clickEvent();
	
	/* 视频跳转点击(页面热更新) */
	freshListenerPushState( async () => {
		await clickEvent();
	}, 5 );
	
	// 出现问题时手动点击按钮更新
	new GMConfigMenu( async () => {
		await clickEvent();
	} ).open( '手动关闭' );
} )();
