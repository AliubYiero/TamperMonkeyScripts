/**
 * 选项更新观察者类
 * @class
 * @extends MutationObserver
 * */
export class OptionObserver extends MutationObserver {
	constructor( node: Node, callback: MutationCallback ) {
		super( callback );
		
		super.observe( node, {
			childList: true,
		} );
	}
}
