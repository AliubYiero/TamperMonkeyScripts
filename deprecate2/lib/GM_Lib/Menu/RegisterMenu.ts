/**
 * RegisterMenu.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	registerMenu,
	unregisterMenu
}

/**
 * 注册油猴菜单配置项
 * @param {string} title 配置项提示文本
 * @param {function} callback 回调函数
 * @return {number} 配置菜单Id, 用于注销配置菜单
 * */
const registerMenu = ( title: string, callback: Function ): number => {
	// @ts-ignore
	return GM_registerMenuCommand( title, function () {
		callback();
	} );
}


/**
 * 注销油猴菜单配置项
 * @param menuId 配置菜单Id, 用于注销配置菜单
 * */
const unregisterMenu = ( menuId: number ) => {
	// @ts-ignore
	GM_unregisterMenuCommand( menuId );
}
