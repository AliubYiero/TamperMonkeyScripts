/**
 * DynamicLoad.ts
 * created by 2023/9/2
 * @file B站动态加载类
 * @author  Yiero
 * */

export {
	DynamicLoad
}

/** 动态加载类 */
class DynamicLoad {
	constructor() {
		// 绑定动态更新监听
		this.updateObserver();
	}
	
	/**
	 * 获取当前所有动态
	 * @return { Node[] }
	 * */
	get items(): Node[] {
		// 将NodeList转化成
		return Array.from( document.querySelectorAll( '.bili-dyn-list__item' ) );
	}
	
	/**
	 * 动态加载监听器, 当动态更新时(加载), 分发一个事件(dynamicUpdate)提示动态更新, 并返回新加载的动态NodeList
	 * */
	private updateObserver(): void {
		const dynamicUpdateObserver = new MutationObserver( ( recordList ) => {
			// 新加载的动态
			const appendDynamicList: Node[] = [];
			
			// 将新加载的动态转化成Array<Node>的形式
			recordList.forEach( record => {
				appendDynamicList.push( ...Array.from( record.addedNodes ) );
			} )
			
			// 分发事件`dynamicUpdate`, 返回新动态
			window.dispatchEvent( new CustomEvent( 'dynamicUpdate', {
				detail: appendDynamicList
			} ) )
		} );
		
		dynamicUpdateObserver.observe( <HTMLElement> document.querySelector( '.bili-dyn-list__items' ), {
			childList: true
		} );
	}
}
