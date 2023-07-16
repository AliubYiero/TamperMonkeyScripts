/**
 * ElementMutationObserver.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */


export { ElementMutationObserverOnce, ElementMutationObserverAlways }

function ElementMutationObserverOnce( fatherElementSelector: string, aimElementSelector: string, callback?: Function ) {
	const fatherElement = document.querySelector( fatherElementSelector ) as Element;
	const observer = new MutationObserver( ( e ) => {
		const aimElement = fatherElement.querySelector( aimElementSelector ) as Element;
		if ( aimElement ) {
			// 关闭监听
			observer.disconnect();
			
			// 回调函数
			if ( callback ) {
				callback( aimElement );
			} else {
				console.log( e );
			}
		}
	} )
	
	observer.observe( fatherElement, {
		subtree: true,
		childList: true
	} )
}

function ElementMutationObserverAlways( fatherElementSelector: string, aimElementSelector: string, callback?: Function ) {
	const fatherElement = document.querySelector( fatherElementSelector ) as Element;
	const observer = new MutationObserver( ( e ) => {
		const aimElement = fatherElement.querySelector( aimElementSelector ) as Element;
		if ( aimElement ) {
			
			// 回调函数
			if ( callback ) {
				callback();
			} else {
				console.log( e );
			}
		}
	} )
	
	observer.observe( fatherElement, {
		subtree: true,
		childList: true
	} )
}
