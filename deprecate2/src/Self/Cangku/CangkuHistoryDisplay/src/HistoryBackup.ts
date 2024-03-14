/**
 * HistoryBackup.ts
 * created by 2023/7/25
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { GMStorage } from '../../../../../lib/GM_Lib'
import { StorageData } from './StorageData'

export {
	HistoryBackup
}

/**
 * 历史备份类
 * 通过GMStorage进行数据备份，并基于GMStorage的脚本跨网站储存机制保存
 * @class
 * */
class HistoryBackup {
	private storage: GMStorage;
	
	constructor() {
		this.storage = new GMStorage( 'CangkuHistory' );
	}
	
	/**
	 * 从GMStorage中获取值
	 * */
	getFromGMStorage() {
		return this.storage.get( [] ) as number[];
	}
	
	/** 向GMStorage中进行存储 */
	saveToGMStorage( storageData: StorageData ) {
		const historySet = storageData.keys;
		let backupList: number[] = this.getFromGMStorage();
		console.log( backupList );
		console.log( historySet );
		if ( historySet.size >= backupList.length ) {
			this.storage.set( [ ...historySet ] );
		}
		else {
			const backupSet = new Set( [ ...backupList, ...historySet ] ) as Set<number>;
			console.log( '进行备份...', backupSet );
			this.writeToIndexDB( backupSet );
			this.storage.set( [ ...backupSet ] );
		}
	}
	
	/**
	 * 向IndexDb写入数据
	 * */
	writeToIndexDB( backupSet: Set<number> ) {
		const storageData = new StorageData();
		storageData.setValues( backupSet );
	}
	
}
