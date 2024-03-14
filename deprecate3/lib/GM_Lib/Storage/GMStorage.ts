/**
 * GMStorage.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.1.0
 * */
import { YStorage } from './interfaces/YStorage'

export { GMStorage };

// @ts-ignore
class GMStorage implements YStorage {
	private readonly key: string;
	
	constructor( key: string ) {
		this.key = key;
	}
	
	/**
	 * Get the value for a given key from the storage.
	 * @param {string} key - The key to retrieve the value for.
	 * @param {string} defaultValue - The default value to return if the key is not found.
	 * @returns {string} - The value for the given key.
	 */
	static get( key: string, defaultValue: unknown = '' ): unknown {
		return GM_getValue( key, defaultValue );
	}
	
	/**
	 * Sets a value in the GM storage and dispatches an event to notify listeners.
	 *
	 * @param key - The key to set the value for.
	 * @param value - The value to set.
	 */
	static set( key: string, value: unknown ) {
		// Dispatches an event to notify listeners about the storage update
		dispatchEvent( new CustomEvent( 'GMStorageUpdate', {
			detail: {
				newValue: value,
				oldValue: this.get( key ),
				target: key
			}
		} ) );
		
		// Sets the value in the GM storage
		GM_setValue( key, value );
	}
	
	/** 设置/更新键 */
	/**
	 * Sets or updates the value of the key.
	 *
	 * @param value - The new value to be set.
	 * @returns void
	 */
	set( value: any ): void {
		// Dispatches the 'GMStorageUpdate' event.
		dispatchEvent(
			new CustomEvent( 'GMStorageUpdate', {
				detail: {
					newValue: value,
					oldValue: this.get(),
					target: this.key
				}
			} )
		);
		
		// Updates the value using GM_setValue.
		// @ts-ignore
		GM_setValue( this.key, value );
	}
	
	/**
	 * Get the value from GM_getValue.
	 * @param defaultValue - The default value to return if the key is not found.
	 * @returns The value stored in GM_getValue or the defaultValue if the key is not found.
	 */
	get( defaultValue: any = null ): unknown {
		// Ignore type checking for the GM_getValue function
		// @ts-ignore
		return GM_getValue( this.key, defaultValue );
	}
	
	/**
	 * Remove the value associated with the key.
	 */
	remove(): void {
		// Dispatch the 'GMStorageUpdate' event
		dispatchEvent( new CustomEvent( 'GMStorageUpdate', {
			detail: {
				newValue: null,
				oldValue: this.get(),
				target: this.key
			}
		} ) );
		
		// Remove the value using GM_deleteValue
		// @ts-ignore
		GM_deleteValue( this.key );
	}
}
