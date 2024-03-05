/**
 * BuildConfigs.ts
 * created by 2024/3/5
 * @file 当前脚本打包时的配置
 * @author  Yiero
 * */
import {
	BuildConfigsInterface,
} from './interfaces/BuildConfigsInterface';

export const BuildConfigs: BuildConfigsInterface = {
	/* 是否在开发环境中压缩混淆代码 */
	devMinify: true,
	/* 是否在生产环境中压缩混淆代码 */
	productionMinify: true,
	/* 是否在生产环境中加密代码 */
	productionTerser: true,
	
	/* 是否在开发环境中版本号添加 beta 后缀 */
	devVersionSuffix: true,
	/* 是否在开发环境中热更新代码 (每次更新代码就重新打包一次文件) */
	devHotUpdate: true,
	/* 是否在开发环境中添加默认自我引用方便开发调试 */
	devSelfLink: true,
	
	/* 是否在生产环境中移除 console.log() */
	productionRemoveConsoleLog: true,
	/* 是否在生产环境中热更新代码 (每次更新代码就重新打包一次文件) */
	productionHotUpdate: false,
	/* 是否在生产环境中检查版本更新 */
	productionCheckVersion: true,
};
