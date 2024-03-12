/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import { getFavouriteTitle, getUserUid } from './utils';
import {
	addVideoToFavorite,
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
	debugger
	
	if ( !userUid ) {
		throw new Error( '获取用户uid失败' );
	}
	
	// 获取用户收藏夹目录
	const readFavouriteList: FavoriteInfo[] = await getReadFavouriteList( userUid );
	
	// 获取当前视频AV号
	const videoId = getVideoAvId();
	
	// 判断最新一个收藏夹是否已满
	// 获取最新一个收藏夹
	const latestFavourite: FavoriteInfo = readFavouriteList[ 0 ];
	const isFullInFavorite = checkFavoriteIsFull( latestFavourite );
	// 如果未满, 则添加到最新一个收藏夹
	if ( !isFullInFavorite ) {
		// 将视频添加到最新的收藏夹中
		await addVideoToFavorite( videoId, latestFavourite );
	}
	
	const latestFavouriteIndex = latestFavourite.title.slice( 0, getFavouriteTitle().length );
	console.log( latestFavouriteIndex );
	// @todo 如果已满, 则新增收藏夹
	if ( isFullInFavorite ) {
		// 获取最新一个收藏夹的编号
		const latestFavouriteIndex = latestFavourite.title.slice( 0, getFavouriteTitle().length );
		console.log( latestFavouriteIndex );
		// createFavourite();
	}
	
	// 再检查一遍当前视频是否已经被收藏过了
	isFavorVideo = await api_isFavorVideo();
	
	// 如果仍未收藏, 则报错
	if ( !isFavorVideo ) {
		throw new Error( '收藏失败' );
	}
	
	// 给收藏夹按钮添加上已添加的样式, 以提示用户已添加
	const favButtonSelector = '.video-fav.video-toolbar-left-item:not(.on)';
	const favButtonDom = await getElement( document, favButtonSelector );
	
	if ( favButtonDom ) {
		favButtonDom.classList.add( 'on' );
	}
	
	// @todo 发送弹窗, 提示用户已收藏
} )();

/**
 * 新建一个收藏夹
 *
 * @param title 新增的收藏夹标题
 */
// const createFavourite = ( title: string ) => {
// 	api_createFavorites( title ).then( r => {
// 		console.log( r );
// 	} );
// }; 