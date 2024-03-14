/**
 * ReadHistory.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */
import { createStore, get as getIdb, setMany as setListIdb, UseStore, values as keysIdb } from 'idb-keyval'

export {
	ReadHistory
}

class ReadHistory {
	private store: UseStore;
	
	constructor() {
		this.store = createStore( 'animax-post', 'post-view-history' );
	}
	
	/** 判断: 是否存在键 */
	async has( key: IDBValidKey ): Promise<boolean> {
		return !!await getIdb( key, this.store );
	}
	
	getAll() {
		return keysIdb( this.store );
	}
	
	async setList( historyList: { id: number, date: number }[] ) {
		const entries: [ IDBValidKey, any ][] = [];
		historyList.forEach( ( history ) => {
			// @ts-ignore
			entries.push( [ void 0, history ] );
		} )
		await setListIdb( entries, this.store );
	}
}
