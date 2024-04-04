/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */


import { checkURL } from './utils';
import { listenIndex } from './modules';

( async () => {
	// 判断当前处于哪个模块
	const currentUrl = checkURL();
	if ( !currentUrl ) {
		return;
	}
	
	if ( currentUrl === 'index' ) {
		await listenIndex();
	}
} )();
