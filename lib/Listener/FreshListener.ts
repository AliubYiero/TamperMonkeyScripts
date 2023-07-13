/**
 * FreshListener.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	FreshListenerHash,
	FreshListenerPushState,
	FreshListenerPopstate
}

function FreshListenerHash( callback: Function, delay: number = 1 ) {
	window.addEventListener( 'hashchange', () => {
		setTimeout( callback, delay * 1000 );
	} );
}

function FreshListenerPopstate( callback: Function, delay: number = 1 ) {
	window.addEventListener( 'popstate', () => {
		setTimeout( callback, delay * 1000 );
	} );
	
}

function FreshListenerPushState( callback: Function, delay: number = 1 ) {
	let _pushState = window.history.pushState;
	window.history.pushState = function () {
		setTimeout( callback, delay * 1000 );
		
		// @ts-ignore
		return _pushState.apply( this, <IArguments> arguments );
	}
	
}
