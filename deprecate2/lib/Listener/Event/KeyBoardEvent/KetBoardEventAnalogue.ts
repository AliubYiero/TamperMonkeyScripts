/**
 * KetBoardEventAnalogue.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	fireKeyEvent
}

// /**
//  * 模拟按键
//  * @param {Document} el
//  * @param {string} evtType 按键事件
//  * @param {number} keyCode 按键Code码
//  * */
// function fireKeyEvent( el: Document | Element = document, evtType: string, keyCode: number ) {
// 	let evtObj;
// 	if ( document.createEvent ) {
// 		// firefox 浏览器下模拟事件
// 		// @ts-ignore
// 		if ( window.KeyEvent ) {
// 			evtObj = document.createEvent( "KeyEvents" );
// 			// @ts-ignore
// 			evtObj.initKeyEvent( evtType, true, true );
// 			el.dispatchEvent( evtObj );
// 			return;
// 		}
//
// 		// chrome 浏览器下模拟事件
// 		evtObj = document.createEvent( "UIEvents" );
// 		evtObj.initUIEvent( evtType, true, true );
// 		// @ts-ignore
// 		delete evtObj.keyCode;
// 		//为了模拟keycode
// 		// @ts-ignore
// 		if ( typeof evtObj.keyCode === "undefined" ) {
// 			Object.defineProperty( evtObj, "keyCode", { value: keyCode } );
// 		} else {
// 			// @ts-ignore
// 			evtObj.key = String.fromCharCode( keyCode );
// 		}
//
// 		// @ts-ignore
// 		if ( typeof evtObj.ctrlKey === "undefined" ) {
// 			//为了模拟ctrl键
// 			Object.defineProperty( evtObj, "ctrlKey", { value: true } );
// 		} else {
// 			// @ts-ignore
// 			evtObj.ctrlKey = true;
// 		}
//
// 		el.dispatchEvent( evtObj );
// 		return;
// 	}
// }

function fireKeyEvent( targetElement: Document | Element = document, i: number ) {
	const keyDownEvent = new KeyboardEvent( 'keydown', {
		key: i.toString(),
		keyCode: 48 + i,
		which: 48 + i,
		code: `Digit${ i }`
	} );
	
	targetElement.dispatchEvent( keyDownEvent );
	
	const keyUpEvent = new KeyboardEvent( 'keyup', {
		key: i.toString(),
		keyCode: 48 + i,
		which: 48 + i,
		code: `Digit${ i }`
	} );
	
	targetElement.dispatchEvent( keyUpEvent );
}
