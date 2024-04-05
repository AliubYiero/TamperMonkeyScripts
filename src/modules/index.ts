/**
 * index.ts
 * created by 2024/4/5
 * @file 入口文件
 * @author  Yiero
 * */

export * from './Index/index.ts';
export * from './Video/index.ts';
export { getVideoId } from './Video/CurrentVideo/getVideoId.ts';
export {
	addVideoToStorage,
} from './Video/CurrentVideo/addVideoToStorage.ts';
