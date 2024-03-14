
/** 职责链控制器
 * @class
 * */
export class FunctionChainCall {
	private readonly callChain: Array<[ Function, any[] ]>;
	
	constructor() {
		this.callChain = [];
	}
	
	set( fn: Function, params = [] ) {
		this.callChain.push( [ fn, params ] );
	}
	
	
	
	setList( array: Array<Function | [ Function, any[] ]> ) {
		array.forEach( ( fn: Function | [ Function, any[] ] ) => {
			// 非数组不带参数的函数
			if ( !Array.isArray( fn ) ) {
				this.set( fn );
				return;
			}
			
			// 数组带参数函数
			this.set( fn[ 0 ], <any>fn[ 1 ] );
		} );
	}
	
	show() {
		console.info( this.callChain );
	}
	
	// @ts-ignore
	async call() {
		let returnString;	// 函数执行判断器
		while ( this.callChain[ 0 ] ) {
			if ( returnString === 'stop' ) {
				return;
			}
			else if ( returnString === 'skip' ) {
				this.callChain.shift();
				continue;
			}
			const fn = this.callChain[ 0 ];
			returnString = await fn[ 0 ].apply( null, fn[ 1 ] );
			this.callChain.shift();
		}
	}
}
