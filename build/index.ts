/**
 * index.ts
 * created by 2024/3/5
 * @file 打包工具函数入口
 * @author  Yiero
 * */

export *
	from './module/parseScriptInfoOptions/parseScriptInfoOptions';
export * from './module/scriptInfoStringify/scriptInfoStringify';
export * from './util/console';
export * from './config/defaultScriptsConfigs';
export *
	from './module/getDefaultTerserOptions/getDefaultTerserOptions';
export {
	defaultTerserOptionsType,
} from './interfaces/defaultTerserOptionsType';
export {
	PartialTerserOptionInterface,
}
	from './interfaces/partialTerserOptionInterface';
