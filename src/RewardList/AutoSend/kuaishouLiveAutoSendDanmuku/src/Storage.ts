/**
 * Storage.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { Config, SendConfig } from './sendConfig'

export {
	configStorage
}


class ConfigStorage {
	
	config: SendConfig;
	
	constructor() {
		this.config = new Config();
	}
	
	/** 添加文本 */
	addContentToContentList( content: string ) {
		configStorage.config.contentList = [ ...( new Set( [ ...this.config.contentList, content ] ) ) ];
	}
	
	/** 删除文本 */
	removeContentFromContentList( content: string ) {
		const contentList = new Set( this.config.contentList );
		contentList.delete( content );
		this.config.contentList = [ ...contentList ];
	}
	
}

const configStorage = new ConfigStorage();
