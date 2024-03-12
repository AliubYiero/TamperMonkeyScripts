/**
 * getDefaultTerserOptions.ts
 * created by 2024/3/12
 * @file 获取默认 Terser 配置数据
 * @author  Yiero
 * */
import {
	defaultTerserOptions,
} from '../../config/defaultTerserOptions';
import {
	defaultTerserOptionsType,
	PartialTerserOptionInterface,
} from '../../interfaces';

/**
 * 根据提供的可选选项生成默认的 Terser 选项。
 *
 * @param {PartialTerserOptionInterface} partialTerserOptions - Terser 的可选选项。
 * @return {defaultTerserOptionsType} 默认的 Terser 选项。
 */
export const getDefaultTerserOptions = ( partialTerserOptions: PartialTerserOptionInterface ): defaultTerserOptionsType => {
	const terserOptions: defaultTerserOptionsType = {
		...defaultTerserOptions,
	};
	
	// 解构代码
	const {
		removeConsoleLog,
		compressOption,
	} = partialTerserOptions;
	
	// 添加移除 console.log() 选项
	removeConsoleLog
	&& terserOptions.compress.pure_funcs.push( 'console.log' );
	
	// 复杂压缩代码配置
	( compressOption === 'complex' || compressOption === true )
	&& ( terserOptions.compress.defaults = true );
	
	// 简单压缩代码配置
	( compressOption === 'simple' )
	&& ( terserOptions.compress.defaults = false );
	
	return terserOptions;
};
