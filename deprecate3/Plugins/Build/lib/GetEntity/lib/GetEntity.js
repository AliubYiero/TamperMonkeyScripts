/**
 * GetEntity.js
 * created by 2023/8/7
 * @file 获取项目实体
 * @author  Yiero
 * @version beta1.0.0
 * */

import { resolve } from 'path'
import { Print } from '../../../../Console/lib/Print.js'
import { hasChangedTimestamp } from './HasChangedTimestamp.js'
import { writeProjectTimestamp } from './WriteProjectTimestamp.js'
import { getEntitiesTimestamp } from './GetEntitiesTimestamp.js'
import { getAllProjectPath } from './GetAllProjectPath.js'
import { getEntityInfo } from './GetEntityInfo.js'
import { GlobalConfig } from '../../../../../Config/config.global.js'

export {
	getEntity
}

/**
 * 名词解释:
 * Project: 工程
 * Entity: 项目实体
 * */

/**
 * 获取时间戳改变的项目实体
 * @param { boolean } isProduction 是否为生产环境
 * @return { EntityInfo }
 * */
function getEntity( isProduction ) {
	/* 获取所有项目的绝对值路径 */
	const EntityDirList = getAllProjectPath( resolve( 'src' ) );
	
	/* 获取储存的时间戳 */
	const entitiesTimestamp = getEntitiesTimestamp();
	
	/* 遍历获取项目的信息 */
	for ( const entityDirPath of EntityDirList ) {
		// 获取项目信息
		const entityInfo = getEntityInfo( entityDirPath );
		
		/* 判断当前项目是否为忽略项目, 如果是, 则跳过该项目(不构建) */
		if ( GlobalConfig.ignore.project.includes( entityInfo.projectName ) ) {
			continue;
		}
		
		/* 判断时间戳信息是否与缓存信息相等 */
		// 返回false, 说明时间戳信息相等
		if ( !hasChangedTimestamp( isProduction, entityInfo, entitiesTimestamp ) ) {
			// 跳过当前循环
			continue;
		}
		
		/* 获取改变的时间戳信息 */
		// 写入当前的项目的时间戳信息到缓存中
		writeProjectTimestamp( isProduction, entityInfo, entitiesTimestamp )
		// 返回项目实体文件
		return entityInfo;
	}
	
	// 遍历完所有项目都没有获取到改变的时间戳
	// 说明不存在改变的文件
	// 报错, 不用构建
	console.error( Print.cyan( '查找不到更改过的项目. ' ) );
	throw new Error( 'Cannot found changed project.' );
}

/** @typedef { { [filePath: string]: number } } EntityTimestampInfo */
/** @typedef { { [userinfoConfig: string]: any } } UserInfo*/
