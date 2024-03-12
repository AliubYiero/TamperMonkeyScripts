/**
 * index.ts
 * created by 2024/3/11
 * @file api入口文件
 * @author  Yiero
 * */

export * from './lib/api_collectVideoToFavorite.ts';
export * from './lib/api_createFavorites.ts';
export * from './lib/api_listAllFavorites.ts';
export * from './lib/api_showFavoriteInfo.ts';
export { xhrRequest } from './xhr_request.ts';