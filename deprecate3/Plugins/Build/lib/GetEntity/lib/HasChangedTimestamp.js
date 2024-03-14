import { deepEqualObj } from '../../DeepEqualObject.js'
import { Print } from '../../../../Console/lib/Print.js'

/**
 * 比较时间戳是否相等
 * @param { boolean } isProduction
 * @param { EntityInfo } entityInfo
 * @param { { [propName: string]: ProjectBranch } } entitiesTimestamp
 * @return { EntityInfo | false } 如果返回false, 则说明时间戳信息相等; 否则返回项目实体信息
 * */
export function hasChangedTimestamp( isProduction, entityInfo, entitiesTimestamp ) {
	// 生产环境
	if ( isProduction ) {
		// 生产环境的缓存时间戳
		
		/*
		* 获取生产环境的缓存时间戳和缓存版本号
		* 当获取不到时, 说明不存在当前项目的时间戳信息
		*  */
		let entityTimestamp;
		let entityVersion;
		try {
			entityTimestamp = entitiesTimestamp[entityInfo.projectName].build.timestamp;
			entityVersion = entitiesTimestamp[entityInfo.projectName].build.version;
		} catch ( e ) {
			// 获取不到当前项目的时间戳信息, 直接返回项目实体信息
			return entityInfo;
		}
		
		/* 判断时间戳是否改变 */
		// 时间戳改变了, 且版本号改变了
		if (
			!deepEqualObj( entityTimestamp, entityInfo.timestamp ) &&
			entityVersion !== entityInfo.version
		) {
			return entityInfo;
		}
		/*
		* 时间戳改变了, 但版本号没改变
		* 报错, 提示用户改变版本号
		* */
		else if (
			!deepEqualObj( entityTimestamp, entityInfo.timestamp ) &&
			entityVersion === entityInfo.version
		) {
			console.error( Print.cyan( `发现修改过的项目: [${ entityInfo.projectPath } ], 但是存在版本号相同的问题. ` ) );
			throw new Error( `Found the same version in project: ${ entityInfo.projectPath }` );
		}
	}
	// 开发环境
	else {
		// 开发环境的缓存时间戳
		
		/*
		* 获取开发环境的缓存时间戳
		* 当获取不到时, 说明不存在当前项目的时间戳信息
		*  */
		let entityTimestamp;
		try {
			entityTimestamp = entitiesTimestamp[entityInfo.projectName].dev.timestamp;
		} catch ( e ) {
			// 获取不到当前项目的时间戳信息, 直接返回项目实体信息
			return entityInfo;
		}
		
		/* 判断时间戳是否改变 */
		// 时间戳改变了
		if ( !deepEqualObj( entityTimestamp, entityInfo.timestamp ) ) {
			return entityInfo;
		}
	}
	
	return false;
}
