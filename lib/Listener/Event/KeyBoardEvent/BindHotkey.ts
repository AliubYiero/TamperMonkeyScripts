/**
 * BindHotkey.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { stringToCapitalizeCase } from '../../../String'

export { bindHotkey }

type BindKey = {
	ctrlKey?: boolean,
	altKey?: boolean,
	shiftKey?: boolean,
	key: string,
}
/**
 * 绑定热键到元素上
 * @param hotkey 热键
 * @param aimElement 绑定按键到哪个元素上
 * @param callback 回调函数
 *  */
const bindHotkey = ( () => {
	let prevEvent: Function | null;
	return ( hotkey: string | BindKey, aimElement: HTMLElement | Document, callback: () => void ) => {
		const bindKey: BindKey = {
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			key: '',
		};
		
		// 解析热键
		if ( typeof hotkey === 'string' ) {
			const keys = hotkey.split( '+' );
			
			keys.forEach( key => {
				switch ( key.trim().toLowerCase() ) {
					case 'ctrl':
					case 'control':
						bindKey.ctrlKey = true;
						break;
					case 'alt':
						bindKey.altKey = true;
						break;
					case 'shift':
						bindKey.shiftKey = true;
						break;
					default:
						bindKey.key = stringToCapitalizeCase( key );
				}
			} )
		}
		
		
		// 清除之前的绑定
		if ( prevEvent ) {
			aimElement.removeEventListener( 'keydown', <EventListenerOrEventListenerObject> prevEvent );
		}
		
		// 添加按键监听
		aimElement.addEventListener( 'keydown', keydownCallback )
		
		function keydownCallback( event: Event ) {
			const e = event as KeyboardEvent;
			if (
				e.ctrlKey === bindKey.ctrlKey &&
				e.altKey === bindKey.altKey &&
				e.shiftKey === bindKey.shiftKey &&
				e.key.toLowerCase() === bindKey.key.toLowerCase()
			) {
				callback();
			}
		}
		
		prevEvent = keydownCallback;
	}
} )();
