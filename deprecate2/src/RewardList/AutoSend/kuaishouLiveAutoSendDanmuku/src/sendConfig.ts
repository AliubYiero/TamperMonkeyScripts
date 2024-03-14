/**
 * config.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */


import { GMStorage } from '../../../../../lib/GM_Lib'

export type {
	SendConfig
}
export {
	SendWay,
	Config
}

enum SendWay {
	loop,
	random
}

interface SendConfig {
	/** 弹幕发送延时 (s) */
	sendDelayPerSecond: number;
	
	/** 弹幕发送最大延时 (s) */
	sendDelayMaxPerSecond: number;
	
	/** 发送方式 (0-loop | 1-random) */
	sendWay: SendWay;
	
	/** 开启定时刷新后自动发送弹幕 */
	isOpenFreshAutoSend: boolean;
	
	/** 定时刷新页面延时 (s); 0表示关闭定时刷新页面 */
	freshPageDelayPerMinute: number;
	
	/** 输入文本 */
	contentList: string[];
	
	/** 开启文本乱码后缀 */
	openRandomCode: boolean;
}


class Config implements SendConfig {
	get openRandomCodeStorage(): GMStorage {
		return new GMStorage( 'openRandomCode' + this.spaceId );
	}
	
	get openFreshAutoSendStorage(): GMStorage {
		return new GMStorage( 'sendWay' + this.spaceId );
	}
	
	get contentListStorage(): GMStorage {
		return new GMStorage( 'freshPageDelayPerSecond' + this.spaceId );
	}
	
	get freshPageDelayStorage(): GMStorage {
		return new GMStorage( 'contentList' + this.spaceId );
	}
	
	get sendWayStorage(): GMStorage {
		return new GMStorage( 'openFreshAutoSend' + this.spaceId );
	}
	
	get sendDelayStorage(): GMStorage {
		return new GMStorage( 'sendDelayPerSecond' + this.spaceId );
	}
	
	get sendDelayMaxStorage(): GMStorage {
		return new GMStorage( 'sendDelayMaxStorage' + this.spaceId );
	}
	
	/** 发送延时getter */
	get sendDelayPerSecond(): number {
		return this.sendDelayStorage.get( 5 );
	}
	
	/** 发送延时setter */
	set sendDelayPerSecond( s: number ) {
		this.sendDelayStorage.set( s );
	}
	
	/** 发送延时getter */
	get sendDelayMaxPerSecond(): number {
		return this.sendDelayMaxStorage.get( 6 );
	}
	
	/** 发送延时setter */
	set sendDelayMaxPerSecond( s: number ) {
		this.sendDelayMaxStorage.set( s );
	}
	
	/** 开启文本乱码后缀getter */
	get openRandomCode(): boolean {
		return this.openRandomCodeStorage.get( true );
	}
	
	/** 开启文本乱码后缀setter */
	set openRandomCode( status: boolean ) {
		this.openRandomCodeStorage.set( status );
	}
	
	/** 弹幕发送方式getter  */
	get sendWay(): SendWay {
		return this.sendWayStorage.get( SendWay.loop );
	}
	
	/** 弹幕发送方式setter  */
	set sendWay( way: SendWay ) {
		this.sendWayStorage.set( way );
	}
	
	/** 弹幕发送方式getter  */
	get isOpenFreshAutoSend(): boolean {
		return this.openFreshAutoSendStorage.get( true );
	}
	
	/** 弹幕发送方式setter  */
	set isOpenFreshAutoSend( status: boolean ) {
		this.openFreshAutoSendStorage.set( status );
	}
	
	/** 页面刷新延时getter */
	get freshPageDelayPerMinute(): number {
		return this.freshPageDelayStorage.get( 0 );
	}
	
	/** 页面刷新延时setter */
	set freshPageDelayPerMinute( s: number ) {
		this.freshPageDelayStorage.set( s );
	}
	
	/** 文本列表getter  */
	get contentList(): string[] {
		return this.contentListStorage.get( [
			'测试自定义文本1',
		] );
	}
	
	set contentList( contentList: string[] ) {
		this.contentListStorage.set( contentList );
	}
	
	private get spaceId() {
		const spaceId = document.URL.match( /(?<=u\/)[^/]*/g );
		if ( spaceId ) {
			return spaceId[ 0 ];
		}
		return '';
	}
	
}
