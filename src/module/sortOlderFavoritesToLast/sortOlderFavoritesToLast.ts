import { FavoriteInfo } from '../../interfaces';
import { api_listAllFavorites, api_sortFavorites } from '../../api';
import { getFavouriteTitle } from '../../utils';
import { config } from '../../config/config.ts';

/**
 * 将已满的收藏夹排序到最后
 *
 * 排序顺序:
 * [默认收藏夹, 最新创建的指定收藏夹, ...原来的其它收藏夹(按照原来的顺序), ...其它指定收藏夹(按编号从大到小排序)]
 *
 * @param {string} userUid - 用户uid
 * */
export const sortOlderFavoritesToLast = async ( userUid: string ) => {
	// 获取所有收藏夹信息
	const favoriteList: FavoriteInfo[] = await api_listAllFavorites( userUid );
	
	// 获取用于检索的收藏夹标题
	const favoriteTitle = getFavouriteTitle();
	
	// 获取指定收藏夹
	let readFavouriteList = favoriteList.filter( ( favoriteInfo ) => {
		return favoriteInfo.title.startsWith( favoriteTitle );
	} );
	// 获取其它收藏夹
	let otherFavouriteList = favoriteList.filter( ( favoriteInfo ) => {
		return !favoriteInfo.title.startsWith( favoriteTitle );
	} );
	
	// 重新排序所有指定收藏夹
	readFavouriteList.sort( ( a, b ) => {
		// 获取 a 和 b 的索引
		const aIndex = Number( a.title.slice( favoriteTitle.length ) );
		const bIndex = Number( b.title.slice( favoriteTitle.length ) );
		// 比较索引值的大小
		return bIndex - aIndex;
	} );
	
	// 如果最新一个收藏夹已满, 则报错
	// 最新一个收藏夹已满的情况下不应该进入到当前函数中, 应该先创建一个新收藏夹
	if ( readFavouriteList[ 0 ].media_count >= config.MAX_MEDIA_COUNT ) {
		throw new Error( 'The latest favorite folder is full.' );
	}
	
	// 提取出最新一个收藏夹
	const latestFavourite = readFavouriteList[ 0 ];
	readFavouriteList = readFavouriteList.slice( 1 );
	
	// 提取出默认收藏夹, 默认收藏夹一定要是第一个
	const defaultFavourite = otherFavouriteList[ 0 ];
	otherFavouriteList = otherFavouriteList.slice( 1 );
	
	// 创建新的收藏夹id顺序
	// 将其它收藏夹按原来顺序添加到所有指定收藏夹的前面
	const newFavoriteIdList: number[] = [
		defaultFavourite,
		latestFavourite,
		...otherFavouriteList,
		...readFavouriteList,
	].map( info => info.id );
	
	// 发送请求, 进行排序
	api_sortFavorites( newFavoriteIdList );
};
