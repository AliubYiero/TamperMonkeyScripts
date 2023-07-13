// @ts-ignore
import path from 'path';

export { UserInfo, formatter };

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
	
	/** 项目名 */
	projectName?: string,
	
	/** 是否引用自己（用于测试本地脚本）  */
	isRequireSelf?: boolean,
	
	/* 添加索引签名 */
	[ key: string ]: any;
}

function formatter( config: UserInfo, isProduction: boolean = false ) {
	const TamperMonkeyConfig = config;
	
	/** 写入配置项，并配置项默认值设置 */
	function initConfig() {
		TamperMonkeyConfig.author ||= 'Yiero';
		TamperMonkeyConfig.namespace ||= 'https://github.com/AliubYiero/TamperMonkeyScripts';
		TamperMonkeyConfig.license ||= 'GPL';
		TamperMonkeyConfig.icon = `${ ( <string[]> TamperMonkeyConfig.match[ 0 ].match( /^.*?:\/\/.*?\// ) )[ 0 ] }favicon.ico`;
		
		// 更新链接
		const updateUrl = `https://github.com/AliubYiero/TamperMonkeyScripts/blob/master/dist/assets/${ TamperMonkeyConfig.projectName }.js`;
		TamperMonkeyConfig.updateURL = updateUrl;
		TamperMonkeyConfig.downloadUrl = updateUrl;
		if ( !isProduction ) {
			if ( !TamperMonkeyConfig.require ) {
				TamperMonkeyConfig.require = [];
			}
			TamperMonkeyConfig.require.push( 'file://' + path.resolve( 'dist', 'assets', config.name + '.js' ) )
		}
		TamperMonkeyConfig.projectName = void 0;
		TamperMonkeyConfig.isRequireSelf = void 0;
	}
	
	
	/** 格式化配置项 */
	function formatterConfig() {
		// 配置头
		let userScriptConfig = [ '// ==UserScript==' ];
		for ( let tamperMonkeyConfigKey in TamperMonkeyConfig ) {
			const tamperMonkeyConfigValue = TamperMonkeyConfig[ tamperMonkeyConfigKey ];
			if ( typeof tamperMonkeyConfigValue === 'string' ) {    // 字符串配置
				// 空字符跳过
				if ( !tamperMonkeyConfigValue ) {
					continue;
				}
				// 写入用户配置
				userScriptConfig.push( `// @${ tamperMonkeyConfigKey }\t\t${ tamperMonkeyConfigValue }` );
			} else if ( Array.isArray( tamperMonkeyConfigValue ) ) { // 数组配置
				for ( const tamperMonkeyConfigChildValue of tamperMonkeyConfigValue ) {
					// 空字符跳过
					if ( !tamperMonkeyConfigChildValue ) {
						continue;
					}
					// 写入用户配置
					userScriptConfig.push( `// @${ tamperMonkeyConfigKey }\t\t${ tamperMonkeyConfigChildValue }` );
				}
			}
		}
		// 配置尾
		userScriptConfig.push( '// ==/UserScript==' );
		return userScriptConfig.join( '\n' );
	}
	
	initConfig();
	return formatterConfig();
}
