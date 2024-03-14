/**
 * MouseEvent.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	mouseEnterEvent,
	mouseDownEvent,
	mouseUpEvent,
	clickEvent
}
const mouseEnterEvent = new MouseEvent( 'mouseenter', {
	button: 0,
	bubbles: true,
	cancelable: true,
	clientX: 819,
	clientY: 413,
} );

const mouseDownEvent = new MouseEvent( 'mousedown', {
	bubbles: true,
	cancelable: true,
	button: 0,
} );

const mouseUpEvent = new MouseEvent( 'mouseup', {
	bubbles: true,
	cancelable: true,
	button: 0,
} );

const clickEvent = new MouseEvent( 'click', {
	bubbles: true,
	cancelable: true,
	button: 0,
} );
