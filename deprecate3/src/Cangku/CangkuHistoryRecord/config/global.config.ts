/**
 * global.config.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

import { GMStorage } from '../../../../lib/GM_Lib'

export {
	globalConfig,
	globalConfigStorage
}

type GlobalConfig = {
	displayBtn: boolean;
	getElementDelayPerSecond: number;
	opacity: number;
}

const globalConfig: GlobalConfig = {
	// 已看帖子透明度
	opacity: .3,
	// 按钮显示 (true表示显示按钮, false表示关闭按钮)
	displayBtn: true,
	// 获取到元素之后的相应延时
	getElementDelayPerSecond: .5,
};


const globalConfigStorage = ( function uploadConfig() {
	let config = {
		// 已看帖子透明度
		opacity: new GMStorage( 'opacity' ),
		// 按钮显示
		displayBtn: new GMStorage( 'displayBtn' ),
		// 获取到元素之后的相应延时
		getElementDelayPerSecond: new GMStorage( 'getElementDelayPerSecond' ),
	};
	
	config.opacity.set( globalConfig.opacity );
	config.displayBtn.set( globalConfig.displayBtn );
	config.getElementDelayPerSecond.set( globalConfig.getElementDelayPerSecond );
	
	return config;
} )();
