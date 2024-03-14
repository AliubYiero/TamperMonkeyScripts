/* entry */
import { registerMenu } from '../../../../lib/GM_Lib'
import { autoSendData, autoSendEvent, autoSendUIConfig } from './src/MenuConfig'
import { Info } from '../../../../lib/Base/Info'
import { configStorage } from './src/Storage'
import { UiMenu } from './src/UIMenu';

export {
	domList,
	print
}
const print = new Info( 'kuaishouLiveAutoSendDanmuku' );
const domList: { [ propName: string ]: HTMLElement } = {};
( async () => {
	/* 注册选项 */
	const uiMenu = new UiMenu();
	// 配置 选项
	registerMenu( '配置', () => {
		uiMenu.showForm();
	} );
	
	// 判断自动发送弹幕是否开启 
	// 需要定时刷新页面开启 且 开启刷新页面后自动发送弹幕
	console.log( autoSendData.isOpenAutoSend() );
	if ( autoSendData.isOpenAutoSend() && configStorage.config.freshPageDelayPerMinute && configStorage.config.isOpenFreshAutoSend ) {
		// 自动发送弹幕开启
		autoSendEvent.open();
	}
	else {
		// 自动发送弹幕关闭, 需要把储存中的自动发送数据关闭
		autoSendData.close();
	}
	
	// [开启 / 关闭] 选项
	autoSendUIConfig.fresh();
} )();
