/**
 * main.ts
 * created by 2024/3/27
 * @file 项目入口文件
 * @author  Yiero
 * */

import {
	listenVideoCardLoad,
	observeContainerLoad,
	observeVideoCardLoad,
} from './module';

// 初始化
const init = async () => {
	// 监听页面加载完成
	const element = await observeContainerLoad();
	// console.log( 'container loaded', element );
	
	// 声明视频卡片加载回调 (先声明回调, 再监听元素加载)
	listenVideoCardLoad();
	
	// 监听视频卡片加载
	observeVideoCardLoad( <HTMLElement> element );
};

/*
* 启动项目
* */
( async () => {
	await init();
} )();
