/**
 * GetEntries.js
 * created by 2023/7/16
 * @file 获取所有项目的入口文件
 * @author  Yiero
 * @version beta1.0.0
 * */

import { getFileChangeTime, readFileInDir, readJson, writeJson } from './Fs'
import { basename, dirname, join, relative, resolve } from 'path'
import { deepEqual } from '../lib/Object/deepEqual.js'

export type {
	UserInfo
}
export {
	userInfoFormat,
	getEntities,
	getEntries,
}


/**
 * 获取项目实体信息
 * @param {string} srcPath src的绝对路径
 * @return {Entity[]} 项目实体对象数组
 * */
const getEntities = ( srcPath: string ): Entity[] => {
	const entities = [];
	
	// 获取所有项目的绝对路径(获取`index.ts`文件的上一层路径)
	const projectPathList = [];
	readFileInDir( srcPath ).forEach( file => {
		if ( basename( file ) === 'index.ts' ) {
			projectPathList.push( dirname( file ) );
		}
	} );
	
	// 获取上次时间戳信息
	const timestampConfigPath = resolve( 'Config', 'timestamp' );
	const prevTimestamp = readJson( timestampConfigPath );
	const thisTimestamp = {};
	
	// 获取所有项目的名字和绝对路径
	projectPathList.forEach( projectPath => {
		// 获取项目名
		const projectName = basename( projectPath );
		
		// 注册项目对象
		const entity: Entity = {};
		
		// 获取项目名
		entity.projectName = projectName;
		
		// 获取项目绝对路径
		entity.absolutePath = projectPath;
		
		// 获取项目入口
		entity.entryPath = join( projectPath, 'index.ts' );
		
		// 获取所有项目中所有文件的实时修改时间戳
		entity.timestamp = {};
		readFileInDir( projectPath ).forEach( file => {
			const timestamp = getFileChangeTime( file );
			const filePath = relative( projectPath, file );
			entity.timestamp[ filePath ] = timestamp;
		} )
		thisTimestamp[ projectName ] = entity.timestamp;
		
		// 获取所有项目的配置信息
		entity.userInfoConfig = readJson( join( projectPath, 'userinfo' ) )
		
		// 根据时间戳是否变动写入项目
		if ( !deepEqual( entity.timestamp, prevTimestamp[ projectName ] ) ) {
			entities.push( entity );
		}
	} )
	
	// 写入时间戳
	writeJson( timestampConfigPath, thisTimestamp );
	
	// 返回项目实体对象数组
	return entities;
}

/**
 * 获取项目入口对象集
 * */
const getEntries = ( entities: Entity[] ) => {
	const entries = {};
	entities.forEach( entity => {
		entries[ entity.projectName ] = entity.entryPath;
	} )
	return entries;
}


interface Entity {
	projectName?: string,
	absolutePath?: string,
	entryPath?: string,
	timestamp?: { [ filePath: string ]: number },
	userInfoConfig?: UserInfo
}


function userInfoFormat( config: UserInfo, projectName: string, isProduction: boolean = false ) {
	// 配置初始icon
	const match = config.match[ 0 ]?.match( /^.*?:\/\/.*?\// );
	config.icon = match ? `${ match[ 0 ] }favicon.ico` : '';
	
	// 配置require依赖
	if ( !isProduction ) {
		config.require ||= [];
		config.require.push( 'file://' + resolve( 'dist', projectName + '.js' ) );
	}
	
	// 配置GM函数依赖
	if ( config.grant[ 0 ] ) {
		// 声明添加的函数
		const newGrants = [];
		
		// 预先配置项
		const extraGrantMap = new Map();
		extraGrantMap.set( 'element', [ 'GM_addStyle' ] );
		extraGrantMap.set( 'style', [ 'GM_addStyle' ] );
		extraGrantMap.set( 'menu', [ 'GM_registerMenuCommand', 'GM_unregisterMenuCommand' ] );
		extraGrantMap.set( 'storage', [ 'GM_setValue', 'GM_getValue', 'GM_deleteValue', 'GM_listValues' ] );
		
		// 遍历重写grant配置项
		config.grant.forEach( ( grant ) => {
			if ( extraGrantMap.has( grant.toLowerCase() ) ) {
				newGrants.push( ...extraGrantMap.get( grant.toLowerCase() ) );
			} else {
				newGrants.push( grant );
			}
		} )
		
		config.grant = newGrants;
	}
	
	// 配置其他默认值
	const configMap: UserInfo = {
		name: config.name || '',
		author: config.author || 'Yiero',
		description: config.description || '',
		version: config.version || 'beta',
		namespace: config.namespace || 'https://github.com/AliubYiero/TamperMonkeyScripts',
		icon: config.icon,
		match: config.match || void 0,
		require: config.require,
		resource: config.resource || void 0,
		license: config.license || 'GPL',
		grant: config.grant || void 0,
		updateUrl: config.projectName && config.updateUrl || `https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/${ projectName }.js`,
		downloadUrl: config.projectName && config.downloadUrl || `https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/${ projectName }.js`,
	};
	
	const userScriptConfig = [ '// ==UserScript==' ];
	
	for ( const key in configMap ) {
		const value = configMap[ key ];
		
		if ( Array.isArray( value ) ) {
			for ( const val of value ) {
				if ( val ) {
					userScriptConfig.push( `// @${ key }\t\t${ val }` );
				}
			}
		} else if ( value ) {
			userScriptConfig.push( `// @${ key }\t\t${ value }` );
		}
	}
	
	userScriptConfig.push( '// ==/UserScript==' );
	
	return userScriptConfig.join( '\n' );
}

type Grant =
// 添加元素
	'GM_addElement' |
	'GM_addStyle' |
	'GM_download' |
	'GM_getResourceText' |
	'GM_getResourceURL' |
	// 信息输出
	'GM_info' |
	'GM_log' |
	'GM_notification' |
	
	'GM_openInTab' |
	'GM_registerMenuCommand' |
	'GM_unregisterMenuCommand' |
	'GM_setClipboard' |
	'GM_getTab' |
	'GM_saveTab' |
	'GM_getTabs' |
	// 油猴储存
	'GM_setValue' |
	'GM_getValue' |
	'GM_deleteValue' |
	'GM_listValues' |
	
	'GM_addValueChangeListener' |
	'GM_removeValueChangeListener' |
	
	'GM_xmlhttpRequest' |
	'GM_webRequest' |
	
	'GM_cookie.list' |
	'GM_cookie.set' |
	'GM_cookie.delete'
	;

/** 所有油猴配置信息 */
interface UserInfo {
	/** 脚本名 */
	name: string,
	
	/**
	 * 作者
	 * @default Yiero
	 * */
	author?: string,
	
	/** 脚本描述 */
	description: string,
	
	/** 版本号 */
	version: string,
	
	/** 捕获网站 */
	match: string[],
	
	/** 引入油猴函数 */
	grant?: Grant[],
	
	/** 引入外部js库 */
	require?: string[],
	
	/** 引入外部静态资源 */
	resource?: string[],
	
	/**
	 * 油猴脚本显示图标
	 * @default
	 * */
	icon?: string,
	
	/**
	 * 脚本命名空间
	 * @default https://github.com/AliubYiero/TemperScripts
	 * */
	namespace?: string,
	
	/**
	 * 许可证
	 * @default GPL
	 * */
	license?: string,
	
	
	/** 远程更新链接 */
	updateUrl?: string,
	downloadUrl?: string,
	
	
	/* 添加索引签名 */
	[ key: string ]: any;
}
