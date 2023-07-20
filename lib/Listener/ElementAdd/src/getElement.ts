/**
 * getElement.ts
 * created by 2023/7/19
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	getElement
}

function getElement( parent: Element, selector: string, timeout = 0 ) {
	return new Promise( resolve => {
		let result = parent.querySelector( selector );
		if ( result ) return resolve( result );
		let timer: NodeJS.Timeout;
		// @ts-ignore
		const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
		if ( mutationObserver ) {
			const observer = new mutationObserver( mutations => {
				for ( let mutation of mutations ) {
					for ( let addedNode of mutation.addedNodes ) {
						if ( addedNode instanceof Element ) {
							result = addedNode.matches( selector ) ? addedNode : addedNode.querySelector( selector );
							if ( result ) {
								observer.disconnect();
								timer && clearTimeout( timer );
								return resolve( result );
							}
						}
					}
				}
			} );
			observer.observe( parent, {
				childList: true,
				subtree: true
			} );
			if ( timeout > 0 ) {
				timer = setTimeout( () => {
					observer.disconnect();
					return resolve( null );
				}, timeout );
			}
		} else {
			const listener = ( e: any ) => {
				if ( e.target instanceof Element ) {
					result = e.target.matches( selector ) ? e.target : e.target.querySelector( selector );
					if ( result ) {
						parent.removeEventListener( 'DOMNodeInserted', listener, true );
						timer && clearTimeout( timer );
						return resolve( result );
					}
				}
			};
			parent.addEventListener( 'DOMNodeInserted', listener, true );
			if ( timeout > 0 ) {
				timer = setTimeout( () => {
					parent.removeEventListener( 'DOMNodeInserted', listener, true );
					return resolve( null );
				}, timeout );
			}
		}
	} );
}
