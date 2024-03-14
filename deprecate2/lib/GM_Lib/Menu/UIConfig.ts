/**
 * UIConfig.ts
 * created by 2023/8/6
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { registerMenu, unregisterMenu } from '../index'

export {
	UIConfig
}

export type {
	UIData
}

interface UIData {
	open: () => void;
	close: () => void;
	
	isOpen: () => boolean;
}

/**
 * 自动发送菜单UI类, 用于更新油猴的配置菜单
 * @class
 * */
class UIConfig {
	
	data: UIData
	private menuId: undefined | number
	private title: string;
	
	constructor( data: UIData, title?: string ) {
		this.data = data;
		
		if ( title ) {
			this.title = `[${ title }] `
		}
		else {
			this.title = '';
		}
		
	}
	
	/** 添加开启选项 */
	open() {
		// 当前处于关闭状态, 点击开启
		this.menuId = registerMenu( `${ this.title }开启`, () => {
			// 更新状态数据 - 开启自动发送
			this.data.open();
			
			// 更新油猴UI菜单
			this.fresh();
		} )
	}
	
	/** 添加关闭选项 */
	close() {
		// 当前处于开启状态, 点击关闭
		this.menuId = registerMenu( `${ this.title }关闭`, () => {
			// 更新状态数据 - 关闭自动发送
			this.data.close();
			
			// 更新油猴UI菜单
			this.fresh();
		} )
	}
	
	/** 刷新选项 */
	fresh() {
		// 注销原菜单
		if ( this.menuId ) {
			unregisterMenu( this.menuId );
		}
		
		// 开启 / 关闭选项
		if ( this.data.isOpen() ) {
			// 当前处于开启状态, 显示关闭UI
			this.close();
		}
		else {
			// 当前处于关闭状态, 显示开启UI
			this.open();
		}
	}
}
