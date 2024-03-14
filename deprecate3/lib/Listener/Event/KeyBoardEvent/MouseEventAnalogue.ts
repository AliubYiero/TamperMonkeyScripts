/**
 * MouseEventAnalogue.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { clickEvent, mouseDownEvent, mouseEnterEvent, mouseUpEvent } from './MouseEvent'

export {
	fireClick
}

async function fireClick( aimElement: Element ) {
	
	aimElement.dispatchEvent( mouseEnterEvent );
	
	aimElement.dispatchEvent( mouseDownEvent );
	console.log( '触发鼠标按下' );
	
	
	aimElement.dispatchEvent( mouseUpEvent );
	console.log( '触发鼠标弹起' );
	
	aimElement.dispatchEvent( clickEvent );
	console.log( '触发鼠标点击' );
	
}
