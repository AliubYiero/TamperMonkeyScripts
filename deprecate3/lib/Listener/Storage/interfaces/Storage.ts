/**
 * Storage.ts
 * created by 2023/8/20
 * @file
 * @author  Yiero
 * */

export type {
	Storage
}

/** 单键储存接口 */
interface Storage {
	readonly key: string;
	
	/** 获取键值 */
	get: ( defaultValue?: string ) => string;
	
	/** 移除键值 */
	remove(): void;
	
	/** 设置键值 */
	set( value: string ): void;
}
