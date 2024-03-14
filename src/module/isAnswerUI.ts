import { bindPageReloadEvent } from './bindPageReloadEvent.ts';

/** 判断是否为答题界面 */
export function isAnswerUI() {
	const localURL = document.URL.split( '/' );
	console.log( localURL[ localURL.length - 2 ] );
	if ( [ 'online', 'simulation' ].indexOf( localURL[ localURL.length - 2 ] ) === -1 ) {
		console.info( '非答题界面，已退出' );
		bindPageReloadEvent();
		return 'stop';
	}
}
