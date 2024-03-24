/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import {
	checkScriptCatEnvironment,
	getFavouriteTitle,
	getUserUid,
	sleep,
} from './utils';
import {
	addVideoToFavorite,
	checkFavoriteIsFull,
	createNewFavorite,
	getReadFavouriteList,
	getVideoAvId,
	registerMenu,
	sortOlderFavoritesToLast,
} from './module';
import { FavoriteInfo } from './interfaces';
import { api_isFavorVideo } from './api/lib/api_isFavorVideo.ts';
import { getElement } from './lib';


const autoAddVideoToFavourites = async () => {
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
	
	// 判断当前用户是否存在指定收藏夹, 如果不存在 (`readFavouriteList.length === 0`) 则创建新目录
	if ( !readFavouriteList.length ) {
		const favoriteTitle = getFavouriteTitle();
		// 创建第一个收藏夹
		await createNewFavorite( favoriteTitle + '1' );
		
		// 重新执行一遍添加收藏
		await autoAddVideoToFavourites();
		return;
	}
	
	// 获取当前视频AV号
	const videoId = getVideoAvId();
	
	// 获取最新一个收藏夹
	const latestFavourite: FavoriteInfo = readFavouriteList[ 0 ];
	// 判断最新一个收藏夹是否已满
	const isFullInFavorite = checkFavoriteIsFull( readFavouriteList[ 0 ] );
	// 如果未满, 则添加到最新一个收藏夹
	if ( !isFullInFavorite ) {
		// 将视频添加到最新的收藏夹中
		await addVideoToFavorite( videoId, latestFavourite );
	}
	
	// 如果收藏夹已满, 则新增收藏夹
	if ( isFullInFavorite ) {
		const favoriteTitle = getFavouriteTitle();
		// 获取最新一个收藏夹的编号
		const latestFavouriteId = Number( latestFavourite.title.slice( favoriteTitle.length ) );
		// 创建新收藏夹
		await createNewFavorite( `${ favoriteTitle }${ latestFavouriteId + 1 }` );
		
		// 等待 1s , 防止网络响应延迟导致收藏夹仍未新建成功
		await sleep( 1 );
		
		// 将已满收藏夹排序到收藏夹最后
		await sortOlderFavoritesToLast( userUid );
		
		// 重新执行一遍添加收藏
		await autoAddVideoToFavourites();
		return;
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
};

// 注册油猴菜单
!checkScriptCatEnvironment() && registerMenu();

// 自动添加视频到收藏夹
autoAddVideoToFavourites();
