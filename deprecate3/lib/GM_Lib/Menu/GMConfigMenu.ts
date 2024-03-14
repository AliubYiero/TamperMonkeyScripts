/**
 * GMConfigMenu.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * */

import { ConfigMenu } from './interface/ConfigMenu'

export {
	GMConfigMenu
}

// @ts-ignore - 忽略未使用类报错
class GMConfigMenu implements ConfigMenu {
	/** 配置菜单Id, 用于识别配置菜单, 关闭配置菜单 */
	private menuId: number = 0;
	
	/** 回调函数 */
	private readonly callback: Function;
	
	constructor( callback: Function ) {
		this.callback = callback;
	}
	
	/**
	 * 注册油猴菜单配置项
	 * @param {string} title 配置项提示文本
	 * */
	open( title: string ) {
		if ( this.menuId ) {
			this.close();
		}
		
		// @ts-ignore - 忽略没有声明的油猴函数报错
		this.menuId = GM_registerMenuCommand( title, this.callback );
	}
	
	/**
	 * 注销油猴菜单配置项
	 * */
	close(): void {
		// @ts-ignore - 忽略没有声明的油猴函数报错
		GM_unregisterMenuCommand( this.menuId );
		this.menuId = 0;
	}
}
