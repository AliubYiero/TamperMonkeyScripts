/**
 * Storage.ts
 * created by 2023/8/6
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { GMStorage } from '../../../../../lib/GM_Lib'

export {
	config
}

class Config {
	constructor() {}
	
	// 读取是否滚动(滚动状态)
	get isScroll(): boolean {
		return this.isScrollStorage.get( false );
	}
	
	// 写入是否滚动(滚动状态)
	set isScroll( newScrollStatus: boolean ) {
		this.isScrollStorage.set( newScrollStatus );
	}
	
	// 读取滚动速度(一次滚动多少像素)
	get scrollSpeed(): number {
		return this.scrollSpeedStorage.get( 5 );
	}
	
	// 写入滚动速度
	set scrollSpeed( newSpeed: number ) {
		this.scrollSpeedStorage.set( newSpeed );
	}
	
	// 滚动储存
	private get isScrollStorage() {
		return new GMStorage( 'isScroll' );
	}
	
	// 注册滚动速度储存
	private get scrollSpeedStorage() {
		return new GMStorage( 'scrollSpeed' );
	}
}

const config = new Config;
