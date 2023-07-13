/**
 * WatchElement.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	watchElementOnce,
	watchElementAlways
}

/** 监视元素出现 */
function watchElementOnce( aimQuerySelector: string, callback: Function = () => {
} ) {
	
	
	const elementObserver = new MutationObserver( ( e ) => {
		e.forEach( ( mutationRecord ) => {
			const aimElement = ( <HTMLElement> mutationRecord.target )?.querySelector( aimQuerySelector );
			if ( aimElement ) {
				console.log( aimElement );
				callback();
				elementObserver.disconnect();
				return 'get element successfully.';
			}
		} )
	} )
	elementObserver.observe( document, {
		subtree: true,
		childList: true,
	} );
	
}

function watchElementAlways( aimQuerySelector: string, callback: Function = () => {
} ) {
	
	
	const elementObserver = new MutationObserver( e => {
		console.log( e );
		const aimElement = document.querySelector( aimQuerySelector );
		if ( aimElement ) {
			console.log( aimElement );
			callback();
			return 'get element successfully.';
		}
	} )
	elementObserver.observe( document, {
		subtree: true,
		childList: true,
	} );
	
}
