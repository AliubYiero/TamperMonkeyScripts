export {
	DomObserver
}

/*
* Dom观察者
* */
class DomObserver extends MutationObserver {
	dom: Node | null;
	
	constructor( dom: Node | null, callback?: MutationCallback ) {
		callback = callback || function ( e ) {
			// 默认输出观察对象
			console.log( e );
		}
		super( callback );
		
		
		this.dom = dom;
	}
	
	
	// checkDomExist( dom: Node | null, delay: number = 500 ): Node {
	// 	if ( !dom ) {
	// 		setTimeout( () => {
	//
	// 		}, delay )
	// 	}
	//
	// 	// return dom;
	// }
	
	start() {
		// 开启观察者
		if ( this.dom ) {
			this.observe( this.dom, {
				childList: true
			} );
		}
	}
}
