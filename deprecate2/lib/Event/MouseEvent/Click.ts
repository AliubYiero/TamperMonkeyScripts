/**
 * Click.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	clickEvent
}

/** 点击事件 */
function clickEvent( aimElement: HTMLElement ) {
	aimElement.dispatchEvent( new Event( 'click' ) );
}
