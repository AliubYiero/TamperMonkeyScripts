/**
 * LocalStorage.ts
 * created by 2023/8/20
 * @file
 * @author  Yiero
 * */

import { Storage } from './interfaces/Storage'

export {
	LocalStorage
}

class LocalStorage implements Storage {
	readonly key: string
	
	constructor( key: string ) {
		this.key = key;
	}
	
	get( defaultValue?: string ): string {
		return localStorage.getItem( this.key ) || defaultValue || '';
	}
	
	remove(): void {
		const oldValue = this.get();
		const newValue = void 0;
		dispatchEvent( new CustomEvent( 'storageUpdate', {
			detail: {
				key: this.key,
				newValue,
				oldValue,
			}
		} ) )
		localStorage.removeItem( this.key );
	}
	
	set( value: string ): void {
		const oldValue = this.get();
		const newValue = value;
		dispatchEvent( new CustomEvent( 'storageUpdate', {
			detail: {
				key: this.key,
				newValue,
				oldValue,
			}
		} ) )
		localStorage.setItem( this.key, value );
	}
}
