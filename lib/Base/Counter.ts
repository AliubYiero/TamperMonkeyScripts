/**
 * Counter.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	Counter
}

class Counter {
	private static counter: number = 0;
	
	static add() {
		return this.counter++;
	}
	
	static clear() {
		this.counter = 0;
	}
	
	static reset() {
		this.counter = 0;
	}
	
	static info() {
		return this.counter;
	}
}
