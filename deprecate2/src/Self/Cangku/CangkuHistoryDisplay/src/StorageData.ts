/**
 * StorageData.ts
 * created by 2023/7/25
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */


import { createStore, keys as idbKeys, setMany as idbSetMany, UseStore } from 'idb-keyval'

export {
	getArchiveId,
	StorageData,
}

/**
 * IndexDB数据类
 * @class
 * */
class StorageData {
	store: UseStore
	keys: Set<number> = new Set();
	
	constructor() {
		this.store = createStore( 'animax-post', 'post-view-history' );
		
		;( async () => {
			this.keys = await this.getKeys();
		} )();
	}
	
	/** 获取所有的键值 */
	getKeys(): Promise<Set<number>> {
		return new Promise( resolve => {
			idbKeys( this.store ).then(
				( keys ) => {
					resolve( new Set( keys ) as Set<number> )
				}
			)
		} )
	}
	
	/** 设置新键值 */
	setValues( values: Set<number> ) {
		const entries: [ IDBValidKey, any ][] = [];
		values.forEach( value => {
			// @ts-ignore 
			entries.push( [ void 0, { id: value, date: new Date().getTime() } ] );
		} )
		idbSetMany( entries, this.store )
	}
	
	/**
	 * 解析链接状态
	 * @param {number} link 链接id
	 * @return {boolean} 当前链接是否已读
	 * */
	parseLinkStatus( link: number ) {
		return this.keys.has( link );
	}
}

/**
 * 获取帖子id
 * @return {number}
 * */
const getArchiveId = ( linkNodeOrlinkString: HTMLLinkElement | string ): number => {
	let idList: string[]
	if ( typeof linkNodeOrlinkString === 'string' ) {
		idList = linkNodeOrlinkString.match( /(?<=\/)\d+/g ) as string[];
	}
	else {
		idList = linkNodeOrlinkString?.href.match( /(?<=\/)\d+/g ) as string[];
	}
	if ( idList ) {
		return +( idList[ 0 ] );
	}
	else {
		return 0;
	}
}
