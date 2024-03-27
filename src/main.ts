/**
 * main.ts
 * created by 2024/3/27
 * @file 项目入口文件
 * @author  Yiero
 * */

import { elementWaiter } from './elementWaiter.ts';

// 监听页面的元素
const observeContainerLoad = async () => {
	const containerSelector = '.recommended-container_floor-aside > .container';
	
	const element = await elementWaiter( containerSelector );
	console.log( element );
};

// 初始化
const init = async () => {
	await observeContainerLoad();
};

init();
