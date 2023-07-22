/**
 * GetEntries.js
 * created by 2023/7/16
 * @file 获取所有项目的入口文件
 * @author  Yiero
 * @version beta1.0.0
 * */

import { getFileChangeTime, readFileInDir, readJson, writeJson } from './Fs/index.js'

import { basename, dirname, join, relative, resolve } from 'path'

export {
	getAllProjectPath,
	userInfoFormat,
	switchEntities,
	getEntities,
	getEntries,
}

function deepEqual( obj1, obj2 ) {
	if ( typeof obj1 !== 'object' || typeof obj2 !== 'object' ) {
		return obj1 === obj2; // 基本类型直接比较
	}
	
	const keys1 = Object.keys( obj1 );
	const keys2 = Object.keys( obj2 );
	
	if ( keys1.length !== keys2.length ) {
		return false; // 属性数量不同，直接返回 false
	}
	
	for ( let key of keys1 ) {
		if ( !deepEqual( obj1[key], obj2[key] ) ) {
			return false; // 属性值不同，直接返回 false
		}
	}
	
	return true; // 所有属性值都相同，返回 true
}

/**
 * 获取所有项目的绝对值地址
 * @param {string} srcPath src的绝对路径
 * @return {string[]} 项目的路径数组
 * */
function getAllProjectPath( srcPath ) {
	const projectPathList = [];
	readFileInDir( srcPath ).forEach( file => {
		if ( basename( file ) === 'index.ts' ) {
			projectPathList.push( dirname( file ) );
		}
	} );
	return projectPathList;
}

/**
 * 获取项目实体信息，并根据时间戳信息，判断是否将其引入到输出中
 * @param {string} srcPath src的绝对路径
 * @return {entity[]} 时间戳更改过的项目的项目实体对象数组
 * */
const getEntities = ( srcPath ) => {
	const entities = [];
	
	// 获取所有项目的绝对路径(获取`index.ts`文件的上一层路径)
	const projectPathList = getAllProjectPath( srcPath );
	
	// 获取上次时间戳信息
	const timestampConfigPath = resolve( 'Config', 'timestamp' );
	const prevTimestamp = readJson( timestampConfigPath );
	
	// 获取所有项目的名字和绝对路径
	for ( const projectPath of projectPathList ) {
		// 获取项目名
		const projectName = basename( projectPath );
		
		// 注册项目对象
		/** @type {{
		 *  projectName: string,
		 *  absolutePath: string,
		 *  entryPath: string,
		 *  timestamp: Object,
		 *  prevTimestamp: Object,
		 *  userInfoConfig: UserInfo,
		 * }} entity
		 * */
		const entity = {};
		
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
			entity.timestamp[filePath] = timestamp;
		} )
		entity.prevTimestamp = prevTimestamp[projectName];
		
		// 获取所有项目的配置信息
		entity.userInfoConfig = readJson( join( projectPath, 'userinfo' ) )
		
		// 根据时间戳是否变动写入项目
		if ( !deepEqual( entity.timestamp, entity.prevTimestamp ) ) {
			entities.push( entity );
		}
	}
	
	// 返回项目实体对象数组
	return entities;
}

/**
 * 获取所有实体的时间戳
 * @param {Entity[]} entities
 * */
function getPrevTimestamp( entities ) {
	const prevTimestampList = {};
	entities.forEach( entity => {
		prevTimestampList[entity.projectName] = entity.prevTimestamp;
	} )
	return prevTimestampList;
}

/**
 * 从实体对象数组中，选择一个实体对象
 * */
const switchEntities = ( function () {
	const timestampConfigPath = resolve( 'Config', 'timestamp' );
	const prevTimestamp = readJson( timestampConfigPath );
	let switchEntityCounter = 0;
	return function ( entities ) {
		const entity = entities[switchEntityCounter++] || {}
		prevTimestamp[entity.projectName] = entity.timestamp;
		// 写入时间戳
		writeJson( timestampConfigPath, prevTimestamp );
		return [ entity ];
	}
} )();

/**
 * 获取项目入口对象集
 * */
const getEntries = ( entities ) => {
	const entries = {};
	entities.forEach( entity => {
		entries[entity.projectName] = entity.entryPath;
	} )
	return entries;
}

function userInfoFormat( config, projectName, isProduction = false ) {
	// 配置初始icon
	const match = config.match[0]?.match( /^.*?:\/\/.*?\// );
	config.icon = match ? `${ match[0] }favicon.ico` : '';
	
	// 配置require依赖
	if ( !isProduction ) {
		config.require ||= [];
		config.require.push( 'file://' + resolve( 'dist', projectName + '.js' ) );
	}
	
	// layui预先配置项
	if ( config.require.indexOf( 'layui' ) !== -1 ) {
		config.require = config.require.filter( res => {
			if ( res !== 'layui' ) {
				return;
			}
		} )
		config.resource.layuiCss = 'https://cdn.staticfile.org/layui/2.8.11/css/layui.min.css';
	}
	
	// 配置GM函数依赖
	if ( config.grant[0] ) {
		// 声明添加的函数
		const newGrants = [];
		
		// grant预先配置项
		const extraGrantMap = new Map();
		extraGrantMap.set( 'element', [ 'GM_addStyle' ] );
		extraGrantMap.set( 'style', [ 'GM_addStyle' ] );
		extraGrantMap.set( 'menu', [ 'GM_registerMenuCommand', 'GM_unregisterMenuCommand' ] );
		extraGrantMap.set( 'storage', [ 'GM_setValue', 'GM_getValue', 'GM_deleteValue', 'GM_listValues' ] );
		
		// 遍历重写grant配置项
		config.grant.forEach( ( grant ) => {
			if ( extraGrantMap.has( grant.toLowerCase() ) ) {
				newGrants.push( ...extraGrantMap.get( grant.toLowerCase() ) );
			}
			else {
				newGrants.push( grant );
			}
		} )
		
		config.grant = newGrants;
	}
	
	// 配置其他默认值
	const configMap = {
		name: config.name || '',
		author: config.author || 'Yiero',
		description: config.description || 'No Description.',
		version: config.version || 'beta',
		namespace: config.namespace || 'https://github.com/AliubYiero/TamperMonkeyScripts',
		match: config.match || void 0,
		icon: config.icon,
		require: config.require,
		resource: config.resource || void 0,
		license: config.license || 'GPL',
		grant: config.grant || void 0,
		"run-at": config["run-at"] || void 0,
		updateUrl: config.projectName && config.updateUrl || `https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/${ projectName }.js`,
		downloadUrl: config.projectName && config.downloadUrl || `https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/${ projectName }.js`,
	};
	
	const userScriptConfig = [ '// ==UserScript==' ];
	let extraMessage = [];
	for ( const key in configMap ) {
		const value = configMap[key];
		// 数组类配置项，如match、grant、require
		if ( Array.isArray( value ) ) {
			for ( const val of value ) {
				if ( val ) {
					userScriptConfig.push( `// @${ key }\t\t${ val }` );
				}
			}
		}
		// 对象类配置项，如resource
		else if ( value.toString() === '[object Object]' ) {
			for ( const key2 in value ) {
				const val = value[key2];
				if ( val ) {
					userScriptConfig.push( `// @${ key }\t\t${ key2 } ${ val }` );
					extraMessage.push( `GM_addStyle( GM_getResourceText( '${ key2 }' ) )` );
					
					if ( configMap.grant.indexOf( 'GM_addStyle' ) === -1 ) {
						configMap.grant.push( 'GM_addStyle' );
					}
					else if ( configMap.grant.indexOf( 'GM_getResourceText' ) === -1 ) {
						configMap.grant.push( 'GM_getResourceText' );
					}
				}
			}
		}
		// 字符串类配置项，如name、description
		else if ( value ) {
			userScriptConfig.push( `// @${ key }\t\t${ value }` );
		}
	}
	
	userScriptConfig.push( '// ==/UserScript==' );
	
	// 写入额外信息，如resource解析等;
	userScriptConfig.push( ...extraMessage );
	
	return userScriptConfig.join( '\n' );
}
