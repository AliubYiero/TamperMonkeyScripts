/**
 * SessionStorage.ts
 * created by 2023/8/20
 * @file
 * @author  Yiero
 * */

import { Storage } from './interfaces/Storage'

export {
	SessionStorage
}

class SessionStorage implements Storage {
	readonly key: string
	
	constructor( key: string ) {
		this.key = key;
	}
	
	get( defaultValue?: string ): string {
		return sessionStorage.getItem( this.key ) || defaultValue || '';
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
		sessionStorage.removeItem( this.key );
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
		sessionStorage.setItem( this.key, value );
	}
}
