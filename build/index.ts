/**
 * index.ts
 * created by 2024/3/5
 * @file 打包工具函数入口
 * @author  Yiero
 * */

export * from './parseScriptInfoOptions/parseScriptInfoOptions';
export * from './scriptInfoStringify/scriptInfoStringify';
export type {
	ScriptInfoOptions,
} from '../config/interfaces/ScriptInfoOptions';
export * from './utils/console';
