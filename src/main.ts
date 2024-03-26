/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import {
	checkScriptCatEnvironment,
	freshListenerPushState,
} from './utils';
import { autoAddVideoToFavourites, registerMenu } from './module';

// 注册油猴菜单
!checkScriptCatEnvironment() && registerMenu();

// 自动添加视频到收藏夹
autoAddVideoToFavourites();

// 页面刷新是重新进行一次收藏生命周期
freshListenerPushState( async () => {
	console.log( 'page change' );
	await autoAddVideoToFavourites();
}, 5 );
