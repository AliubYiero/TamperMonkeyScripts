import { resolve } from 'path'
import { readJson, writeJson } from '../../../../Fs/index.js'

/**
 * 读取缓存的时间戳
 * @return { CacheTimestamp } timestamp 储存的时间戳对象
 * */
export function getEntitiesTimestamp() {
	// 储存的时间戳文件地址
	// 用于读取时间戳, 判断现在的时间戳是否与之前的时间戳是否相同
	const prevTimestampFilePath = resolve( 'Config', 'timestamp.json' );
	
	/**
	 * @typedef { {} } ProjectBranch 储存的时间戳分支对象
	 * @type { ProjectBranch }
	 * @property { {version: string, timestamp: EntityTimestampInfo} } build 生产环境的时间戳分支
	 * @property { { timestamp: EntityTimestampInfo} } dev 开发环境的时间戳分支
	 * */
	/** @typedef { { [projectName: string]: ProjectBranch } } CacheTimestamp 储存的时间戳对象 */
	/**
	 * 声明储存的时间戳对象
	 * @type { CacheTimestamp }
	 * */
	let timestamp = {};
	
	/* 读取储存的时间戳 */
	try {
		timestamp = readJson( prevTimestampFilePath );
	} catch ( error ) {
		// 如果不存在储存文件, 则创建储存文件
		writeJson( prevTimestampFilePath, timestamp );
	}
	
	return timestamp;
}
