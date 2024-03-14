/**
 * GMStorage.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
import { tupleToObject } from '../../Array'

export { GMStorage }

interface GM_Storage {
	
	set: ( key: string, value: any ) => void;
	
	setList: ( keyValueObject: { [ propName: string ]: any } ) => void;
	
	get: ( key: string ) => any;
	
	getList: ( keys: string[] ) => any[];
	
	remove: ( key: string ) => void;
	
	keys: () => string[];
	
	values: () => any[];
	getAll: () => { [ propName: string ]: any };
	clear: () => void;
}

// @ts-ignore
class GMStorage implements GM_Storage {
	private readonly key: string | undefined;
	
	constructor( key?: string ) {
		this.key = key;
	}
	
	/** 设置/更新键 */
	static set( key: string, value: any ): void {
		// @ts-ignore
		GM_setValue( key, value );
	}
	
	/** 获取值 */
	static get( key: string, defaultValue: any = null ): any {
		// @ts-ignore
		return GM_getValue( key, defaultValue );
	}
	
	/** 移除键 */
	static remove( key: string ): void {
		// @ts-ignore
		GM_deleteValue( key );
	}
	
	/** 设置/更新键 */
	set( value: any ): void {
		// @ts-ignore
		GM_setValue( this.key, value );
	}
	
	/** 批量设置/更新键 */
	setList( keyValueObject: { [ propName: string ]: any } ): void {
		for ( let key in keyValueObject ) {
			const value = keyValueObject[ key ];
			GMStorage.set( key, value );
		}
	}
	
	/** 获取值 */
	get( defaultValue: any = null ): any {
		// @ts-ignore
		return GM_getValue( this.key, defaultValue );
	}
	
	/** 批量获取值 */
	getList( keys: string[], defaultValue: any = null ): any[] {
		const values: any[] = [];
		keys.forEach( ( key: string ) => {
			// @ts-ignore
			values.push( GMStorage.get( key, defaultValue ) );
		} )
		return values;
	}
	
	/** 移除键 */
	remove(): void {
		// @ts-ignore
		GM_deleteValue( this.key );
	}
	
	/**
	 * 返回所有键
	 * */
	keys(): string[] {
		// @ts-ignore
		return GM_listValues();
	}
	
	/** 返回所有值 */
	values(): any[] {
		// 声明值列表
		const values: any[] = [];
		
		// 获取所有键列表
		const keys = this.keys();
		
		// 遍历获取值
		keys.forEach( ( key: string ) => {
			values.push( GMStorage.get( key ) );
		} )
		
		return values;
	}
	
	
	/** 返回所有键值对对象 */
	getAll(): { [ propName: string ]: any } {
		const keys = this.keys();
		const values = this.values();
		
		return tupleToObject( keys, values );
	}
	
	/** 清除所有储存 */
	clear(): void {
		const keys = this.keys();
		keys.forEach( key => {
			GMStorage.remove( key );
		} )
	}
}
