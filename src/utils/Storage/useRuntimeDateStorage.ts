/**
 * useRuntimeDateStorage.ts
 * created by 2024/4/5
 * @file 储存运行日期储存
 * @author  Yiero
 * */

export class useRuntimeDateStorage {
	private static STORE_NAME = 'date';
	
	
	/**
	 * 移除本地储存的日期
	 * */
	static remove() {
		GM_deleteValue( this.STORE_NAME );
	}
	
	/**
	 * 从本地获取当前日期
	 * */
	static get(): string {
		return GM_getValue( this.STORE_NAME, '' );
	}
	
	/**
	 * 将当前日期存入本地
	 * */
	static set() {
		const today = new Date().toLocaleDateString();
		GM_setValue( this.STORE_NAME, today );
	}
	
	/**
	 * 判断当前日期和本地储存的日期是否一致
	 * */
	static existTodayDate(): boolean {
		const today = new Date().toLocaleDateString();
		const localDate = this.get();
		
		return today === localDate;
	}
}
