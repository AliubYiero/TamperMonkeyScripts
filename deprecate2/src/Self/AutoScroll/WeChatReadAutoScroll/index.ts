import { Info } from '../../../../lib/Base/Info'

import SmartAlert from 'sweetalert2'
import { registerMenu } from '../../../../lib/GM_Lib'
import { GlobalAutoScroll } from './src/AutoScroll/implementations/AutoScroll'

export {
	domList,
	print
}
const print = new Info( 'WeChatReadAutoScroll' );
const domList: { [ propName: string ]: HTMLElement } = {};

/* entry */
( async () => {
	SmartAlert.fire( {
		title: '1'
	} )
	
	registerMenu( '开启滚动', () => {
		new GlobalAutoScroll( 0, undefined, undefined )
	} )
} )();
 
