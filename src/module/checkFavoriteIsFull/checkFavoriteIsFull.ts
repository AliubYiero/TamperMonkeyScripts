import { FavoriteInfo } from '../../interfaces';

/**
 * 判断最新一个收藏夹是否已满
 * */
export const checkFavoriteIsFull = ( favoriteInfo: FavoriteInfo ) => {
	return favoriteInfo.media_count === 1000;
};
