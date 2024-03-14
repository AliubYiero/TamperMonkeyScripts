/**
 * getElement.ts
 * created by 2023/7/19
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	getElement,
}

/**
 * 监听元素是否加载
 * 当元素加载完成后，异步返回该元素
 * @param {Element} parent 绑定用于观察的父元素，默认为body元素
 * @param {string} selector 目标元素的选择器
 * @param {number} timeoutPerSecond 超时时间(ms)，默认0为无限制
 * @param {number} getElementDelayPerSecond 延时多少秒(s)获取元素
 * */
function getElement(
	parent: Element = document.body,
	selector: string,
	timeoutPerSecond: number = 0,
	getElementDelayPerSecond: number = 0
): Promise<HTMLElement | null> {
	return new Promise( resolve => {
		let result: HTMLElement = parent.querySelector( selector ) as HTMLElement;
		if ( result ) {
			return resolve( result );
		}
		
		let timer: NodeJS.Timeout;
		// @ts-ignore
		const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
		if ( mutationObserver ) {
			const observer = new mutationObserver( mutations => {
				for ( let mutation of mutations ) {
					for ( let addedNode of mutation.addedNodes ) {
						if ( addedNode instanceof Element ) {
							result = <HTMLElement> ( addedNode.matches( selector ) ? addedNode : addedNode.querySelector( selector ) );
							if ( result ) {
								observer.disconnect();
								timer && clearTimeout( timer );
								setTimeout( () => {
									return resolve( result );
								}, getElementDelayPerSecond * 1000 );
							}
						}
					}
				}
			} );
			observer.observe( parent, {
				childList: true,
				subtree: true
			} );
			if ( timeoutPerSecond > 0 ) {
				timer = setTimeout( () => {
					observer.disconnect();
					return resolve( null );
				}, timeoutPerSecond * 1000 );
			}
		}
	} );
}
