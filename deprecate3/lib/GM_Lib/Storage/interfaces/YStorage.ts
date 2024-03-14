/**
 * YStorage.ts
 * created by 2023/8/20
 * @file
 * @author  Yiero
 * */

export type {
	YStorage
}

interface YStorage {
	readonly key: string;
	
	set: ( value: any ) => void;
	
	get: () => any;
	
	remove: () => void;
}
