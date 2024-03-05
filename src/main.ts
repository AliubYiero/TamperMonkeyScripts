/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */
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

Counter.add();
