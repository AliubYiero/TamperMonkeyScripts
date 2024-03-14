import { isIframe } from './utils/isIframe.ts'
import { GMConfigMenu } from '../../../lib/GM_Lib'
import { setNotification } from './src/notification.ts'
import { alertAlways } from './src/alertAlways.ts'


( async () => {
	// 如果当前是 iframe 页面, 不执行脚本
	if ( isIframe() ) {
		return;
	}
	
	alertAlways();
	
	new GMConfigMenu( () => {
		setNotification();
	} ).open( '开启事件提醒' );
} )(); 
