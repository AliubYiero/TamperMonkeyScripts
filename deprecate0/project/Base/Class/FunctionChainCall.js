/**
 * 链式调用类（职责链）
 * @class
 * */
class FunctionChainCall {
	constructor() {
		this.callChain = [];
	}
	
	set(fn, params=[]) {
		this.callChain.push([fn, params]);
	}
	
	setList(array) {
		array.forEach( fn => {
			// 非数组不带参数的函数
			if (!Array.isArray(fn)) {
				this.set(fn)
				return;
			}
			
			// 数组带参数函数
			this.set(...fn);
		})
	}
	
	async call() {
		let returnString;	// 函数执行判断器
		while (this.callChain[0]) {
			if (returnString === 'stop') {
				return;
			} else if (returnString === 'skip') {
				this.callChain.shift();
				continue;
			}
			const fn = this.callChain[0]
			returnString = await fn[0].apply(null, fn[1]);
			this.callChain.shift();
		}
	}
}
