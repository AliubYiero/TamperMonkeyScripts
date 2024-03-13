/**
 * index.ts
 * created by 2024/3/11
 * @file 入口文件
 * @author  Yiero
 * */

export * from './Storage/UserUid/getUserUid.ts';
export * from './Storage/UserUid/setUserUid.ts';

export * from './Storage/FavouriteTitle/getFavouriteTitle.ts';
export * from './Storage/FavouriteTitle/setFavouriteTitle.ts';
export * from './Storage/FavouriteTitle/hasFavouriteTitle.ts';

export * from './VideoIdTransform/avIdToBvId.ts';
export * from './VideoIdTransform/bvIdToAvId.ts';

export * from './ScriptCatEnvironment/checkScriptCatEnvironment.ts';
