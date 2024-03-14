/**
 * CreateProject.js
 * created by 2023/8/24
 * @file 更新输入的信息创建项目
 * @author  Yiero
 * */

import { checkDirExist, createDir, createFileWithContent, writeJson } from '../../../Fs/index.js'
import { join } from 'path'
import { Print } from '../../../Console/lib/Print.js'
import YAML from 'yamljs'
import { GlobalConfig } from '../../../../Config/config.global.js'

export {
	createProject
}

/**
 * 根据用户输入创建项目文件
 * @param { Entity } entity
 * @param {{resource: {[p: string]: string}, author: string, match: string[], icon: string, description: string, require: string[], useLanguage: ("json"|"yaml"), license: string, name: string, namespace: string, grant: string[], connect: string[], 'run-at': ("document-start"|"document-body"|"document-end"|"document-idle"|"context-menu")}} userinfo
 * @return { void }
 * */
async function createProject( entity, userinfo, userConfig ) {
	/** 检查当前项目是否存在 / 是否能够创建 */
	// 不能创建
	if ( await checkDirExist( join( entity.projectDir, entity.projectName ) ) ) {
		console.clear();
		console.error( Print.red( `Cannot create Project: [${ join( entity.projectDir, entity.projectName ) }] has exist.` ) );
		return;
	}
	
	/* 创建index入口文件 */
	createIndexFile( entity );
	
	/* 创建src目录 */
	createSrcDir( entity );
	
	/* 创建userinfo文件 */
	createUserinfoFile( entity, userinfo );
	
	/* 创建README文件 */
	if ( entity.isCreateREADMEFile ) {
		createReadmeFile( entity );
	}
	
	/* 创建脚本猫配置项文件 */
	if ( entity.isUseScriptCat && entity.isUseScriptCat.includes( 'useUserConfig' ) ) {
		createUserConfigFile( entity, userinfo );
	}
}

/* 创建index入口文件 */
function createIndexFile( entity ) {
	createFileWithContent(
		join( entity.projectDir, entity.projectName, `index.${ entity.projectLanguage }` ),
		GlobalConfig.defaultContent.index
	);
}

/* 创建userinfo用户配置项文件 */
function createUserinfoFile( entity, userinfo ) {
	const { useLanguage } = userinfo;
	// 删除useLanguage字段, 该字段只用于判断当前的创建的userinfo文件类型
	delete userinfo.useLanguage;
	// 判断使用的语言
	switch ( useLanguage ) {
		/* 如果使用.json文件作为userinfo文件, 创建对应userinfo.json文件 */
		case 'json':
			// 写入json文件
			writeJson( join( entity.projectDir, entity.projectName, 'userinfo.json' ), userinfo, { spaces: '\t' } );
			break;
		/* 如果使用.yaml文件作为userinfo文件, 创建对应userinfo.yml文件 */
		case 'yml':
		case 'yaml':
			// 将对象解析成yaml格式的字符串
			const userinfoYamlString = YAML.stringify( userinfo, 4, 4 );
			createFileWithContent( join( entity.projectDir, entity.projectName, 'userinfo.yml' ), userinfoYamlString );
			break;
	}
}

/* 创建readme文件 */
function createReadmeFile( entity ) {
	createFileWithContent( join( entity.projectDir, entity.projectName, `README.md` ), `# ${ entity.projectName }` );
}

/* 创建src目录 */
function createSrcDir( entity ) {
	createDir( join( entity.projectDir, entity.projectName, 'src' ) );
}

/* 创建UserConfig脚本猫配置文件 */
function createUserConfigFile( entity, userConfig ) {
	const { useLanguage } = userConfig;
	delete userConfig.useLanguage;
	
	let userConfigString;
	// 配置文件是json格式
	if ( useLanguage === 'json' ) {
		userConfigString = JSON.stringify( userConfig, null, '\t' );
	}
	// 配置文件是yml格式
	else {
		userConfigString = YAML.stringify( userConfig, 4, 4 );
	}
	
	createFileWithContent(
		join( entity.projectDir, entity.projectName, `UserConfig.${ userConfig.useLanguage }` ),
		userConfigString
	);
}
