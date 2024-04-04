/**
 * NodeLoader.ts
 * created by 2023/12/31
 * @file 节点加载监听器
 * @author  Yiero
 * */

/** 动态加载类 */
export class NodeListLoader {
	private readonly nodeContainer: string;
	private readonly dispatchEventName: string;
	/**
	 * @constructor
	 * @param nodeContainer - 节点加载的主容器的 Selector (该 Selector 的子元素为动态加载的节点)
	 * @param [dispatchEventName = 'NodeUpdate'] - 分发Node节点加载时触发的事件名称
	 * */
	constructor(nodeContainer: string, dispatchEventName: string = 'NodeUpdate') {
		// 绑定节点加载容器
		this.nodeContainer = nodeContainer;
		// 绑定事件名称
		this.dispatchEventName = dispatchEventName;
		
		// 初始化
		try {
			this.init();
		} catch ( e ) {
			console.error('Error: Node not found.\n目标节点未加载/不存在. ');
			return;
		}
		
		// 绑定动态更新监听
		this.updateObserver();
	}
	
	/**
	 * 初始化事件, 检测节点是否存在
	 * */
	private init() {
		/**
		 * 监听容器是否存在, 若不存在, 则报错
		 * */
		if ( !document.querySelector( this.nodeContainer ) ) {
			throw new Error('Node not found.')
		}
	}
	
	/**
	 * 获取当前所有动态
	 *
	 * @Return { Node[] }
	 * */
	get items(): Node[] {
		// 为了返回的动态列表风格统一, 将NodeList转成Array<Node>
		return Array.from( document.querySelectorAll( this.nodeContainer ) );
	}
	
	/**
	 * 节点加载监听器, 当节点更新时(加载), 分发一个事件(dynamicUpdate)提示动态更新, 并返回新加载的节点 Node[]
	 * */
	private updateObserver(): void {
		const nodeUpdateObserver = new MutationObserver( ( recordList ) => {
			// 新加载的节点
			const appendNodeList: Node[] = [];
			
			// 将新加载的节点转化成Array<Node>的形式
			recordList.forEach( record => {
				appendNodeList.push( ...Array.from( record.addedNodes ) );
			} )
			
			// 分发事件, 返回新节点
			window.dispatchEvent( new CustomEvent( this.dispatchEventName, {
				detail: appendNodeList
			} ) )
		} );
		
		nodeUpdateObserver.observe( <HTMLElement> document.querySelector( this.nodeContainer ), {
			childList: true
		} );
	}
}
