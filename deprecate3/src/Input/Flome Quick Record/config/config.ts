/**
 * config.ts
 * created by 2023/9/21
 * @file 配置接口
 * @author  Yiero
 * */
import { GMStorage } from '../../../../lib/GM_Lib'

export const config = new class Config {
	private tagListStorage: GMStorage = new GMStorage( 'tagList' );
	private apiStorage: GMStorage = new GMStorage( 'api' );
	private historyStorage: GMStorage = new GMStorage( 'history' );
	
	/**
	 * Returns the list of tags stored in GMStorage.
	 * @returns {string[]} The list of tags.
	 */
	get tagList(): string[] {
		return this.tagListStorage.get( [] ) as string[];
	}
	
	/**
	 * Setter for the tagList property.
	 * @param value - An array of strings representing the tag list.
	 */
	set tagList( value: string[] ) {
		// Set the 'tagList' key in GMStorage to the provided value.
		this.tagListStorage.set( value );
	}
	
	/**
	 * Get the value of the 'api' key from the GMStorage.
	 *
	 * @returns {string} The value of the 'api' key.
	 */
	get api(): string {
		return this.apiStorage.get( '' ) as string;
	}
	
	/**
	 * Set the value of the 'api' property in GMStorage.
	 *
	 * @param value - The new value for the 'api' property.
	 */
	set api( value: string ) {
		this.apiStorage.set( value );
	}
	
	/**
	 * Retrieves the list of tags stored in GMStorage.
	 *
	 * @returns {Map<string, string>} The list of tags.
	 */
	get history(): Map<string, string> {
		// Retrieve the historyStorage data and convert it to an array of key-value pairs
		const historyData: [ string, string ][] = this.historyStorage.get( [] ) as [ string, string ][];
		
		// Create a new Map using the historyData array
		// Return the created Map
		return new Map( historyData );
	}
	
	/**
	 * Setter for the history property.
	 * @param value - A map of strings representing the history.
	 */
	set history( value: Map<string, string> ) {
		// Set the 'history' key in GMStorage to the provided value.
		this.historyStorage.set( Array.from( value ) );
	}
}
