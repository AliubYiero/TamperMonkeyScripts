/**
 * vite.config.ts
 * created by 2024/3/5
 * @author  Yiero
 * @file vite配置文件
 * */

import { defineConfig } from 'vite';
import { BuildConfigs } from './config/BuildConfigs';

import banner from 'vite-plugin-banner';
import {
	info,
	parseScriptInfoOptions,
	scriptInfoStringify,
	warn,
} from './build';
import replace from '@rollup/plugin-replace';
import { resolve } from 'path';
import {
	defaultTerserOptions,
} from './build/config/defaultTerserOptions';

export default defineConfig( ( { mode } ) => {
	/*
	* 获取当前的构建环境
	* */
	const isProduction = mode === 'production';
	
	/*
	* 是否移除 console.log()
	* */
	const removeConsoleLog = isProduction && BuildConfigs.productionRemoveConsoleLog;
	removeConsoleLog && warn( '[Terser] 清除所有 console.log() 日志已开启.' );
	
	/*
	* 是否开启代码热更新
	* */
	const openWatchConfig =
		( BuildConfigs.devHotUpdate && !isProduction )
		|| ( BuildConfigs.productionHotUpdate && isProduction );
	openWatchConfig && warn( '[Watch] 代码热更新已开启.' );
	
	/*
	* 是否混淆代码
	* */
	const isMinifyCode =
		( BuildConfigs.productionMinify && isProduction )
		|| ( BuildConfigs.devMinify && !isProduction );
	isMinifyCode && warn( '[Minify] 代码混淆已开启.' );
	
	/*
	* 是否加密代码
	* */
	const isTerserCode =
		!isMinifyCode
		&& BuildConfigs.productionTerser
		&& isProduction;
	isTerserCode && warn( '[Terser] 代码加密已开启.' );
	
	
	/*
	* 将脚本配置信息赋予默认信息,
	* 并添加上额外配置值
	* */
	const scriptInfoOptions = parseScriptInfoOptions( isProduction );
	
	
	// 提示打包信息
	info( `[Info] 开始打包文件, 当前的构建环境是: ${ isProduction ? '生产环境' : '开发环境' }.` );
	// 提示打包文件地址
	info( `[Info] 文件将打包到: [file:///${
		encodeURI(
			resolve( 'dist', scriptInfoOptions.outputFileName as string )
				.replace( /\\/g, '/' ),
		)
	}]` );
	
	/*
	* 返回vite配置对象
	* */
	return {
		build: {
			// 是否压缩混淆代码
			minify: isMinifyCode
				? true
				: isTerserCode
					? 'terser'
					: false,
			// 是否加密代码
			terserOptions: isTerserCode
				? defaultTerserOptions
				: void 0,
			
			// 清空打包目录
			emptyOutDir: false,
			
			/* 是否在开发环境中热更新代码 */
			watch: openWatchConfig
				? {
					include: [ 'src/**', 'config/**' ],
				}
				: null,
			
			// rollup打包配置
			rollupOptions: {
				/*
				* 项目 io 配置
				* */
				input: 'src/main.ts',
				output: {
					entryFileNames: scriptInfoOptions.outputFileName,
					format: 'es',
					manualChunks() {
						// 把项目文件夹里面的文件都打包到一个文件中
						return scriptInfoOptions.outputFileName;
					},
				},
				
				/*
				* 插件配置
				* */
				plugins: [
					/*
					* 添加顶部信息
					* */
					banner( {
						content: () => {
							return scriptInfoStringify( scriptInfoOptions );
						},
						// 关闭注释合法性校验
						verify: false,
					} ),
					
					/*
					* 自定义替换代码
					* */
					replace( {
						preventAssignment: true,
						values: removeConsoleLog ? {
							// 生产环境移除log输出
							'console.log': '(() => {})',
						} : {},
						delimiters: [ '', '' ],
					} ),
				],
			},
		},
	};
} );
