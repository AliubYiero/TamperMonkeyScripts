/**
 * UserInfo.js
 * created by 2023/8/22
 * @file 用户输入: 脚本配置信息
 * @author  Yiero
 * */

import { GlobalConfig } from '../../../../Config/config.global.js'
import {
	getScriptCatUserinfoBackgroundGrantFunction,
	getScriptCatUserinfoCloudGrantFunction,
	getScriptCatUserinfoExportCookie,
	getScriptCatUserinfoExportValue,
	getScriptCatUserinfoGrantFunction,
	getScriptCatUserinfoIcon,
	getScriptCatUserinfoRunAtTime,
	getUserinfoAuthor,
	getUserinfoDescription,
	getUserinfoFileStyle,
	getUserinfoGrantFunction,
	getUserinfoIcon,
	getUserinfoLicense,
	getUserinfoMatch,
	getUserinfoName,
	getUserinfoNamespace,
	getUserinfoRunAtTime,
	isUseScriptCatUserinfoCrontabConfig
} from './Prompts/index.js'

export {
	inputUserinfo
}

// config: 用户信息映射, 根据用户选择的不同脚本类型, 添加数据配置项
const userinfoTypeMap = [
	/* 不使用脚本猫(使用油猴脚本) */
	[
		( entity ) => !entity.isUseScriptCat,
		async ( commonUserinfo ) => {
			const userinfo = {};
			
			// 脚本图标@icon
			userinfo.icon = await getUserinfoIcon( commonUserinfo.match );
			// 脚本运行时机@run-at
			userinfo['run-at'] = await getUserinfoRunAtTime();
			// 脚本油猴函数API@grant
			userinfo.grant = await getUserinfoGrantFunction();
			// 脚本命名空间@namespace
			userinfo.namespace = await getUserinfoNamespace(
				GlobalConfig.userinfo.config.namespace
				|| 'http://tampermonkey.net/'
			);
			
			return userinfo;
		},
	],
	// 脚本猫后台脚本
	[
		( entity ) => entity.isUseScriptCat.includes( 'useBackgroundScript' ),
		async () => {
			const userinfo = {};
			
			/* 脚本猫定时脚本独立配置项 */
			// 脚本函数API@grant
			userinfo.grant = await getScriptCatUserinfoBackgroundGrantFunction();
			
			return userinfo;
		},
	],
	// 脚本猫定时脚本
	[
		( entity ) => entity.isUseScriptCat.includes( 'useIntervalScript' ),
		async () => {
			const userinfo = {};
			/* 脚本猫定时脚本独立配置项 */
			// 脚本函数API@grant
			userinfo.grant = await getScriptCatUserinfoBackgroundGrantFunction();
			userinfo.crontab = await isUseScriptCatUserinfoCrontabConfig();
			
			return userinfo;
		},
	],
	// 脚本猫云端脚本
	[
		( entity ) => entity.isUseScriptCat.includes( 'useCloudScript' ),
		async () => {
			const userinfo = {};
			
			/* 脚本猫前台脚本独立配置项 */
			// 脚本函数API@grant
			userinfo.grant = await getScriptCatUserinfoCloudGrantFunction();
			userinfo.exportValue = await getScriptCatUserinfoExportValue();
			userinfo.exportCookie = await getScriptCatUserinfoExportCookie();
			
			return userinfo;
		},
	],
	// 脚本猫前台脚本
	[
		( entity ) => true,
		async () => {
			const userinfo = {};
			
			/* 脚本猫前台脚本独立配置项 */
			// 脚本函数API@grant
			userinfo.grant = await getScriptCatUserinfoGrantFunction();
			
			return userinfo;
		},
	],
]

/**
 * 让用户输入userinfo配置信息
 * @param { Entity } entity
 * @return { UserInfo }
 * */
async function inputUserinfo( entity ) {
	/**
	 * @typedef { {} } UserInfo
	 * @type { UserInfo }
	 * @property { 'json' | 'yaml' } useLanguage 配置脚本的使用的语言
	 * @property { string } name 脚本的名称
	 * @property { string } description 脚本的描述
	 * @property { string[] } match 脚本捕获的网站
	 * @property { string } author 脚本的作者
	 * @property { string } icon 脚本的图标
	 * @property { string } namespace 脚本的命名空间
	 * @property { string } license 脚本的版权信息
	 * @property { string[] } grant 油猴函数声明
	 * @property { string[] } connect 声明域
	 * @property { string[] } require 外部依赖声明
	 * @property { { [propName: string]: string } } resource 外部资源声明
	 * @property { 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu'} run-at 脚本运行时机声明
	 * */
	/**
	 * 用户输入的项目实体信息, 用于初始化构建一个项目
	 * @type { UserInfo }
	 * */
	/* 公共脚本配置项 */
	let commonUserinfo = {};
	
	// 脚本使用风格(json / yaml)
	commonUserinfo.useLanguage = await getUserinfoFileStyle();
	// 脚本名@name
	commonUserinfo.name = await getUserinfoName( entity.projectName );
	commonUserinfo['name:en'] = entity.projectName;
	// 脚本描述@description
	commonUserinfo.description = await getUserinfoDescription( commonUserinfo.name );
	commonUserinfo['description:en'] = commonUserinfo.description + '.';
	// 脚本作者@author
	commonUserinfo.author = await getUserinfoAuthor( GlobalConfig.userinfo.config.author || 'No Name' );
	// 脚本版本@version
	commonUserinfo.version = GlobalConfig.userinfo.config.version;
	// 脚本作用域@match
	commonUserinfo.match = await getUserinfoMatch();
	// 脚本使用许可证@license
	commonUserinfo.license = await getUserinfoLicense( GlobalConfig.userinfo.config.license || 'GPL' );
	
	/* 脚本猫配置项 */
	let scriptCatUserinfo = {};
	/* 脚本猫独立配置项 */
	if ( entity.isUseScriptCat ) {
		// 脚本图标@icon
		scriptCatUserinfo.icon = await getScriptCatUserinfoIcon( commonUserinfo.match );
		// 脚本运行时机@run-at
		scriptCatUserinfo['run-at'] = await getScriptCatUserinfoRunAtTime();
		// 脚本命名空间@namespace
		scriptCatUserinfo.namespace = await getUserinfoNamespace(
			GlobalConfig.userinfo.config.namespace
			|| 'https://bbs.tampermonkey.net.cn/'
		);
	}
	
	/* 总配置项 */
	const userinfo = {
		/* 公共配置项 */
		...commonUserinfo,
		/* 脚本猫单独配置项 */
		...scriptCatUserinfo,
		/* 独立脚本类型配置项(油猴 / 脚本猫前台 / 脚本猫后台 / 脚本猫定时 / 脚本猫云端) */
		...await userinfoTypeMap.find( value => value[0] )[1]( commonUserinfo ),
		/* 分离配置项 */
		connect: [ "" ],
		require: [ "" ],
		resource: { "": "" },
	}
	
	console.log( userinfo );
	return userinfo;
}
