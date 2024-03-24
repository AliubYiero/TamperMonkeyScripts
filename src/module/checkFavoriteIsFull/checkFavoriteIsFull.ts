import { FavoriteInfo } from '../../interfaces';
import { config } from '../../config/config.ts';

/**
 * 判断最新一个收藏夹是否已满
 * */
export const checkFavoriteIsFull = ( favoriteInfo: FavoriteInfo ) => {
	return favoriteInfo.media_count === config.MAX_MEDIA_COUNT;
};
