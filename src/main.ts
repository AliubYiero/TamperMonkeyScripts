/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import { getUserUid } from './utils';
import {
	addNewFavorite,
	checkFavoriteIsFull,
	getReadFavouriteList,
	getVideoAvId,
	registerMenu,
} from './module';
import { FavoriteInfo } from './interfaces';
import { api_isFavorVideo } from './api/lib/api_isFavorVideo.ts';
import { getElement } from './lib';

( async () => {
	// 注册油猴菜单
	registerMenu();
	
	// 判断当前视频是否已经被收藏
	let isFavorVideo = await api_isFavorVideo();
	console.log( '当前视频已经被收藏:', isFavorVideo );
	
	// 如果已经收藏过了, 则直接返回
	if ( isFavorVideo ) {
		return;
	}
	
	// 获取用户uid
	const userUid = await getUserUid();
	
	if ( !userUid ) {
		throw new Error( '获取用户uid失败' );
	}
	
	// 获取用户收藏夹目录
	const readFavouriteList: FavoriteInfo[] = await getReadFavouriteList( userUid );
	
	// 获取当前视频AV号
	const videoId = getVideoAvId();
	
	// 判断最新一个收藏夹是否已满
	const isFullInFavorite = checkFavoriteIsFull( readFavouriteList[ 0 ] );
	// 如果未满, 则添加到最新一个收藏夹
	if ( !isFullInFavorite ) {
		const latest = readFavouriteList[ 0 ];
		await addNewFavorite( videoId, latest );
	}
	
	// @todo 如果已满, 则新增收藏夹
	
	// 再检查一遍当前视频是否已经被收藏过了
	isFavorVideo = await api_isFavorVideo();
	
	// 如果仍未收藏, 则报错
	if ( !isFavorVideo ) {
		throw new Error( '收藏失败' );
	}
	
	// 给收藏夹按钮添加上已添加的样式, 以提示用户已添加
	const favButtonDom = await getElement( document, '.video-fav.video-toolbar-left-item:not(.on)' );
	
	if ( favButtonDom ) {
		favButtonDom.classList.add( 'on' );
	}
	
	// @todo 发送弹窗, 提示用户已收藏
} )();
