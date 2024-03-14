/**
 * Change.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	inputEvent,
	changeEvent
}

/** 输入文本事件 */
function inputEvent( aimElement: HTMLInputElement | HTMLTextAreaElement, inputContent: string ) {
	// 输入文本
	aimElement.value = inputContent;
	
	// 进行文本校验
	aimElement.dispatchEvent( new Event( 'focus' ) );
	aimElement.dispatchEvent( new Event( 'change' ) );
	aimElement.dispatchEvent( new Event( 'input' ) );
	aimElement.dispatchEvent( new Event( 'blur' ) );
}

/** 输入文本事件 */
const changeEvent = inputEvent;
