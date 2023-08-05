/**
 * MenuConfig.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { registerMenu, unregisterMenu } from '../../../../../lib/GM_Lib'
import { configStorage } from './Storage'
import { mathRandom } from '../../../../../lib/Math'
import { nanoid } from 'nanoid'
import { sendDanmuku } from './Send'
import { print } from '../index'

export {
	autoSendData,
	autoSendEvent,
	autoSendUIConfig,
}

/**
 * 菜单配置数据类
 * @class
 * */
class AutoSendData {
	constructor() {}
	
	/** 开启自动发送 */
	open() {
		sessionStorage.setItem( 'isOpenAutoSend', 'true' );
	}
	
	/** 关闭自动发送 */
	close() {
		sessionStorage.removeItem( 'isOpenAutoSend' );
	}
	
	/** 判断开关状态 */
	isOpenAutoSend(): boolean {
		return !!sessionStorage.getItem( 'isOpenAutoSend' );
	}
}

/**
 * 自动发送菜单交互类, 用于执行弹幕发送
 * @class
 * */
class AutoSendEvent {
	// @ts-ignore
	timer: NodeJS.Timer;
	pageTimer?: NodeJS.Timeout
	
	constructor() {
	}
	
	private _contentIndex: number = 0;
	
	/** 获取文本的当前索引getter */
	get contentIndex(): number {
		// 随机模式
		if ( configStorage.config.sendWay ) {
			return ( mathRandom( configStorage.config.contentList.length - 1 ) );
		}
		// 循环模式
		else {
			return ( this._contentIndex++ % configStorage.config.contentList.length );
		}
	}
	
	/** 开启自动发送弹幕事件 */
	open() {
		// // test: 开启随机模式
		// configStorage.config.sendWay = SendWay.random;
		// // test: 关闭乱码模式
		configStorage.config.openRandomCode = true;
		// // test: 定时刷新网页
		// configStorage.config.freshPageDelayPerMinute = 1;
		// // test: 刷新网页后开启自动发送
		// configStorage.config.isOpenFreshAutoSend = true;
		
		/* 定时刷新 */
		if ( configStorage.config.freshPageDelayPerMinute ) {
			this.freshPageOpen();
		}
		
		/* 自动发送弹幕 */
		const callback = () => {
			print.log( this.getContentFromContentList() );
			sendDanmuku( this.getContentFromContentList() );
		}
		this.timer = setInterval( callback, configStorage.config.sendDelayPerSecond * 1000 );
	}
	
	/** 关闭自动发送弹幕时间 */
	close() {
		clearInterval( this.timer );
		this.freshPageClose();
	}
	
	/** 给文本添加后缀 */
	private addSuffixToContent( content: string ) {
		return `${ content }_${ nanoid( 4 ) }`;
	}
	
	/** 随机获取文本 */
	private getContentFromContentList(): string {
		// 乱码后缀文本
		if ( configStorage.config.openRandomCode ) {
			return this.addSuffixToContent( configStorage.config.contentList[ this.contentIndex ] );
		}
		// 正常文本
		return configStorage.config.contentList[ this.contentIndex ];
	}
	
	/** 定时刷新网页 */
	private freshPageOpen() {
		this.pageTimer = setTimeout( () => {
			location.reload();
		}, configStorage.config.freshPageDelayPerMinute * 1000 * 60 );
	}
	
	/** 关闭定时刷新网页, 在关闭弹幕发送的同时 */
	private freshPageClose() {
		clearTimeout( this.pageTimer );
	}
}


/**
 * 自动发送菜单UI类, 用于更新油猴的配置菜单
 * @class
 * */
class AutoSendUIConfig {
	
	menuId: undefined | number
	
	constructor() {
	
	}
	
	/** 添加开启选项 */
	open() {
		// 当前处于关闭状态, 点击开启
		this.menuId = registerMenu( '[自动发送] 开启', () => {
			// 更新状态数据 - 开启自动发送
			autoSendData.open();
			
			// 更新油猴UI菜单
			this.fresh();
			
			// 开启自动发送功能
			autoSendEvent.open();
		} )
	}
	
	/** 添加关闭选项 */
	close() {
		// 当前处于开启状态, 点击关闭
		this.menuId = registerMenu( '[自动发送] 关闭', () => {
			// 更新状态数据 - 关闭自动发送
			autoSendData.close();
			
			// 更新油猴UI菜单
			this.fresh();
			
			// 关闭自动发送功能
			autoSendEvent.close();
		} )
	}
	
	/** 刷新选项 */
	fresh() {
		// 注销原菜单
		if ( this.menuId ) {
			unregisterMenu( this.menuId );
		}
		
		// 开启 / 关闭选项
		if ( autoSendData.isOpenAutoSend() ) {
			// 当前处于开启状态, 显示关闭UI
			this.close();
		}
		else {
			// 当前处于关闭状态, 显示开启UI
			this.open();
		}
	}
}

const autoSendData = new AutoSendData();
const autoSendEvent = new AutoSendEvent();
const autoSendUIConfig = new AutoSendUIConfig();
