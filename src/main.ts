/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */


import { checkURL, useWatchedVideoIdListStorage } from './utils';
import { listenIndex, listenVideo } from './modules';

( async () => {
	// 判断当前处于哪个模块
	const currentUrl = checkURL();
	if ( !currentUrl ) {
		return;
	}
	
	/*
	* 初始化数据库
	* */
	await useWatchedVideoIdListStorage.getInstance().init();
	/*
	* 目标模块回调隐射
	* */
	const urlCallbackMapper: {
		[ module: string ]: () => Promise<void>;
	} = {
		'index': listenIndex.bind( null ),
		'video': listenVideo.bind( null ),
	};
	
	/*
	* 查找对应模块
	* */
	for ( let urlCallbackMapperKey in urlCallbackMapper ) {
		// 如果没找到, 则直接跳过
		if ( urlCallbackMapperKey !== currentUrl ) {
			continue;
		}
		
		// 找到了, 执行回调
		await urlCallbackMapper[ <string> urlCallbackMapperKey ]();
		return;
	}
} )();
