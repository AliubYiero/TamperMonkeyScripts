/**
 * FreshListener.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	freshListenerHash,
	freshListenerPushState,
	freshListenerPopstate
}

function freshListenerHash( callback: Function, s: number = 1 ) {
	window.addEventListener( 'hashchange', () => {
		setTimeout( callback, s * 1000 );
	} );
}

function freshListenerPopstate( callback: Function, s: number = 1 ) {
	window.addEventListener( 'popstate', () => {
		setTimeout( callback, s * 1000 );
	} );
}

function freshListenerPushState( callback: Function, s: number = 1 ) {
	let _pushState = window.history.pushState;
	window.history.pushState = function () {
		setTimeout( callback, s * 1000 );
		
		// @ts-ignore
		return _pushState.apply( this, <IArguments> arguments );
	}
}
