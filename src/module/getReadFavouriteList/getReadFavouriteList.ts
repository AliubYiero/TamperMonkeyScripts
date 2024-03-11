import { FavoriteInfo } from '../../interfaces';
import { api_listAllFavorites } from '../../api';
import { getFavouriteTitle } from '../../utils';

/**
 * 获取用户用于收藏已看视频的收藏夹目录
 * */
export const getReadFavouriteList = async ( userUid: string ) => {
	// 获取所有收藏夹目录
	const favoriteList: FavoriteInfo[] = await api_listAllFavorites( userUid );
	
	// 获取用于检索的收藏夹标题
	const favouriteTitle = getFavouriteTitle();
	
	// 过滤掉不是用于检索的收藏夹
	const readFavouriteList = favoriteList.filter( ( favoriteInfo ) => {
			return favoriteInfo.title.match( new RegExp( `^${ favouriteTitle }\\d+$` ) );
		},
	);
	
	// 将收藏夹按从大到小排序
	readFavouriteList.sort( ( a, b ) => {
		// 获取 a 和 b 的索引
		const aIndex = Number( a.title.slice( favouriteTitle.length ) );
		const bIndex = Number( b.title.slice( favouriteTitle.length ) );
		// 比较索引值的大小
		return bIndex - aIndex;
	} );
	
	// 返回用于收藏已看视频的收藏夹目录
	return readFavouriteList;
};
