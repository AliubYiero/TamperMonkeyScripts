/**
 * ElementWaiter.ts
 * created by 2023/12/31
 * @file 获取元素工具函数, 当目标元素未加载时, 等待页面载入
 * @author  Yiero
 * */

/**
 * 元素载入等待器, 提供Promise和Event两种触发方式
 * @return { Promise<HTMLElement | Error> }
 * @param { string } selector 目标元素选择器
 * @param config
 * @param { Element | null | undefined } [config.parent = document.body] 父元素监听器
 * @param { number } [config.timeoutPerSecond = 0] 超时触发器, 超时会直接reject, 0为不超时计算
 * @param { number } [config.delayPerSecond = 0] 获取元素后, 延时多少s触发, 用于当元素框架载入时, 可能有资源没载入下的等待使用
 * */
function elementWaiter(
	selector: string,
	config?: {
		parent?: Element | null,
		timeoutPerSecond?: number,
		delayPerSecond?: number
	}
): Promise<HTMLElement | Error>;


/**
 * 元素载入等待器, 提供Promise和Event两种触发方式
 * @return { Promise<HTMLElement | Error> }
 * @param { string } selector 目标元素选择器
 * @param { Element | null | undefined } [parent = document.body] 父元素监听器
 * @param { number } [timeoutPerSecond = 0] 超时触发器, 超时会直接reject, 0为不超时计算
 * @param { number } [delayPerSecond = 0] 获取元素后, 延时多少s触发, 用于当元素框架载入时, 可能有资源没载入下的等待使用
 * */
function elementWaiter(
	selector: string,
	parent?: Element | null,
	timeoutPerSecond?: number,
	delayPerSecond?: number ): Promise<HTMLElement | Error>;

function elementWaiter(
	selector: string,
	config: Element | null | {
		parent?: Element | null
		timeoutPerSecond?: number,
		delayPerSecond?: number
	} = document.body,
	timeoutPerSecond: number = 0,
	delayPerSecond: number = 0
): Promise<HTMLElement | Error> {
	// 默认值赋予
	let parent = document.body;
	if ( config && 'parent' in config ) {
		delayPerSecond = config.delayPerSecond || 0;
		timeoutPerSecond = config.timeoutPerSecond || 0;
		parent = <HTMLElement> config.parent || document.body;
	}
	
	return new Promise( ( resolve, reject ) => {
		
		/**
		 * 工具函数: 延时返回目标元素函数
		 * 提供两种获取目标元素的方式:
		 * 1. 通过 Promise 返回值获取元素
		 * 2. 根据分发的事件 'ElementGetter', 获取回调, 回调参数 e.detail 为目标元素
		 * */
		function returnElement( element?: HTMLElement ) {
			// 空元素, 抛出异常
			if ( !element ) {
				reject( new Error( 'Void Element' ) );
				return;
			}
			
			// 延时触发
			setTimeout( () => {
				// 触发事件 (element = e.detail);
				window.dispatchEvent( new CustomEvent( 'ElementGetter', { detail: element } ) )
				
				// 返回元素
				resolve( element );
			}, delayPerSecond * 1000 );
		}
		
		// 分支1 - 元素已经载入, 直接获取到元素
		if ( !!document.querySelector( selector ) ) {
			returnElement( document.querySelector( selector ) as HTMLElement );
			return;
		}
		
		// 分支2 - 元素未载入, 使用MutationObserver获取元素
		else if ( !!MutationObserver ) {
			// 声明定时器
			const timer: number = timeoutPerSecond && window.setTimeout( () => {
				// 关闭监听器
				observer.disconnect();
				
				// 返回元素 reject
				returnElement();
			}, ( <number> timeoutPerSecond ) * 1000 );
			
			
			// 声明监听器
			const observer = new MutationObserver( observeElementCallback );
			
			function observeElementCallback( mutations: MutationRecord[] ) {
				mutations.forEach( ( mutation ) => {
					mutation.addedNodes.forEach( ( addNode ) => {
						if ( !( addNode instanceof HTMLElement ) ) {
							return;
						}
						
						// 获取元素
						const element = addNode.matches( selector ) ? addNode : addNode.querySelector( selector ) as HTMLElement;
						
						// 如果获取到元素
						if ( element ) {
							// 清空定时器
							timer && clearTimeout( timer );
							
							// 返回元素
							returnElement( element );
						}
					} )
				} )
			}
			
			observer.observe( <HTMLElement> parent, {
				subtree: true,
				childList: true,
			} )
		}
			
			// 分支3 - 元素未载入, 浏览器无MutationObserver类, 使用定时器获取元素
		// 定时器延时: 500ms, 默认超时时间20s
		else {
			const intervalDelay = 500;
			
			let intervalCounter = 0;
			const maxIntervalCounter = Math.ceil( ( ( <number> timeoutPerSecond ) * 1000 || 20 * 1000 ) / intervalDelay );
			
			const timer = window.setInterval( () => {
				// 定时器计数
				if ( ++intervalCounter > maxIntervalCounter ) {
					// 超时清除计数器
					clearInterval( timer );
					// reject访问
					returnElement();
					return;
				}
				
				// 尝试获取元素
				const element = ( <HTMLElement> parent ).querySelector( selector ) as HTMLElement;
				
				// 获取到元素时
				if ( element ) {
					clearInterval( timer );
					returnElement( element );
				}
			}, intervalDelay );
		}
	} )
}

export {
	elementWaiter
}
