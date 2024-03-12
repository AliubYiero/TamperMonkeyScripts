import { api_createFavorites } from '../../api';

/**
 * 创建新收藏夹
 * */
export const createNewFavorite = ( title: string ): Promise<any> => {
	console.log( '创建新收藏夹:', title );
	return api_createFavorites( title );
};
