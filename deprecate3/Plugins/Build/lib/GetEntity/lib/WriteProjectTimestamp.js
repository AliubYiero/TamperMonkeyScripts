import { resolve } from 'path'
import { writeJson } from '../../../../Fs/index.js'

/**
 * 写入当前的时间戳信息到缓存文件中
 * @param { boolean } isProduction 是否为生产环境
 * @param { CacheTimestamp } oldTimestamp
 * @param { EntityInfo } entityInfo
 * */
export function writeProjectTimestamp( isProduction, entityInfo, oldTimestamp ) {
	// 储存的时间戳文件地址
	// 用于写入时间戳
	const prevTimestampFilePath = resolve( 'Config', 'timestamp.json' );
	
	// 写入新的时间戳对象
	let newTimestamp = { ...oldTimestamp };
	
	// 生产环境
	if ( isProduction ) {
		// 如果不存在生产环境的时间戳, 则声明一个对象
		if ( !newTimestamp[entityInfo.projectName] ) {
			newTimestamp[entityInfo.projectName] = {
				build: {},
			};
		}
		
		// 写入新的时间戳对象, 覆盖原来的时间戳
		newTimestamp[entityInfo.projectName].build = {
			version: entityInfo.version,
			timestamp: entityInfo.timestamp,
		};
	}
	// 开发环境
	else {
		// 如果不存在开发环境的时间戳, 则声明一个对象
		if ( !newTimestamp[entityInfo.projectName] ) {
			newTimestamp[entityInfo.projectName] = {
				dev: {},
			};
		}
		
		// 写入新的时间戳对象, 覆盖原来的时间戳
		newTimestamp[entityInfo.projectName].dev = {
			timestamp: entityInfo.timestamp,
		};
	}
	
	// 写入新的时间戳对象
	writeJson( prevTimestampFilePath, newTimestamp, { space: '\t' } );
}
