/**
 * UserInfo.ts
 * created by 2023/7/20
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
export type {
	Grant
}
export {
	UserInfo
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
