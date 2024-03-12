/**
 * defaultTerserOptions.ts
 * created by 2024/3/12
 * @file 默认Terser配置文件
 * @author  Yiero
 * */
import { defaultTerserOptionsType } from '../interfaces';

/**
 * 默认 Terser 打包配置
 * */
export const defaultTerserOptions: defaultTerserOptionsType = {
	// 压缩选项
	compress: {
		/**
		 * 是否进行默认的压缩代码操作
		 * */
		defaults: true,
		
		/**
		 * 去除副作用 (清除对应函数)
		 *
		 * @example ['console.log'] 清除 console.log() 函数
		 * */
		pure_funcs: [],
	},
	// 混淆选项
	mangle: false,
	// 格式化选项
	format: {
		// 清除所有注释
		comments: false,
		// 优化代码排版 (弃用属性)
		beautify: true,
		// 转义 Unicode 字符
		ascii_only: true,
	},
};
