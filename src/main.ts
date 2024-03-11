/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import { getUserUid } from './utils';
import {
	checkFavoriteIsFull,
	getReadFavouriteList,
	getVideoAvId,
	registerMenu,
} from './module';
import { FavoriteInfo } from './interfaces';
import { api_collectVideoToFavorite } from './api';

( async () => {
	// 注册油猴菜单
	registerMenu();
	
	// 判断当前视频是否已经被收藏
	
	// 获取用户uid
	const userUid = await getUserUid();
	
	// 获取用户收藏夹目录
	const readFavouriteList: FavoriteInfo[] = await getReadFavouriteList( userUid );
	
	// 获取当前视频AV号
	const videoId = getVideoAvId();
	
	// 判断最新一个收藏夹是否已满
	const isFullInFavorite = checkFavoriteIsFull( readFavouriteList[ 0 ] );
	// 如果未满, 则添加到最新一个收藏夹
	if ( !isFullInFavorite ) {
		// 请求
		const latestFavoriteId = String( readFavouriteList[ 0 ].id );
		const res = await api_collectVideoToFavorite( videoId, latestFavoriteId );
		const successfullyAdd = res?.success_num === 0;
		if ( !successfullyAdd ) {
			return;
		}
		
		console.log( `当前视频已添加至收藏夹 [${ readFavouriteList[ 0 ].title }]` );
	}
	
	// 如果已满, 则新增收藏夹
} )();

/**
 * 将当前视频收藏到最新的收藏夹中
 * */
// const addNewFavorite = () => {
//
// };
