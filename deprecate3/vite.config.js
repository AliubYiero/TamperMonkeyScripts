import { defineConfig } from 'vite';
import { getEntity } from './Plugins/Build/index.js';
/** @tutorial https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.zh-CN.md */
import banner from 'vite-plugin-banner';

import replace from '@rollup/plugin-replace'
import { Print } from './Plugins/Console/lib/Print.js'
import { parse } from './Plugins/UserInfo/index.js'
import { resolve } from 'path'

export default defineConfig( ( { mode } ) => {
	// 获取构建方式信息
	const isProduction = mode === 'production';
	
	/**
	 * @typedef { {} } EntityInfo
	 * @type { EntityInfo }
	 * @property { string } projectName 项目名
	 * @property { string } projectPath 项目的绝对路径地址
	 * @property { string } projectRelativePath 项目的相对路径地址(相对于src目录)
	 * @property { string } projectEntryPath 项目的入口文件绝对路径地址
	 * @property { string } projectDevelopmentOutputPath 项目的开发环境输出地址(相对)
	 * @property { string } projectProductionOutputPath 项目的生产环境输出地址(相对)
	 * @property { UserInfo } userinfo 用户信息
	 * @property { string } version 最后一次构造(build)的版本号
	 * @property { EntityTimestampInfo } timestamp 项目中所有文件的时间戳
	 * */
	/**
	 * 项目实体
	 * @type { EntityInfo }
	 * */
	let entity
	try {
		entity = getEntity( isProduction );
	} catch ( e ) {
		throw new Error( e );
	}
	console.log( Print.cyan( `开始构建项目: [${ entity.projectName }]` ) );
	
	// console.log( entity.projectEntryPath, isProduction ? entity.projectProductionOutputPath : entity.projectDevelopmentOutputPath );
	// 获取项目实体对象数组
	return {
		build: {
			// 打包rollup配置
			rollupOptions: {
				input: entity.projectEntryPath,
				output: {
					entryFileNames: isProduction ? entity.projectProductionOutputPath : entity.projectDevelopmentOutputPath,
					format: 'es',
					manualChunks() {
						// 把项目文件夹里面的文件都打包到一个文件中
						// 防止vite自动将异步模块分块
						return entity.projectName;
					}
				},
				plugins: [
					/* 之后的插件在这里配置 */
					
					// 添加用户配置注释
					banner( {
						// 注释内容
						content: () => {
							const userinfo = entity.userinfo;
							
							/* 开发环境额外信息 */
							if ( !isProduction ) {
								/* 开发环境添加自我引用, 方便开发测试 */
								userinfo.require.unshift( `file://${ resolve( 'dist', entity.projectDevelopmentOutputPath ) }` )
								
								/* 开发环境版本号添加为测试版本 */
								userinfo.version = userinfo.version.startsWith( 'beta' )
									? userinfo.version
									: `beta_${ userinfo.version }`;
							}
							
							/* 解析userinfo为字符串 */
							return parse( userinfo );
						},
						// 关闭合法性验证
						verify: false,
					} ),
					
					// 自定义替换
					replace( {
						preventAssignment: true,
						values: isProduction ? {
							// 生产环境移除log输出
							'console.log': '(() => {})',
						} : {},
						delimiters: [ '', '' ],
					} ),
				],
				// 不导入依赖
				external: [],
			},
			
			// 生产环境开启terser, 清空注释和输出
			// 关闭压缩和混淆代码
			minify: isProduction ? 'terser' : '',
			terserOptions: isProduction ? {
				compress: false,
				mangle: false,
				format: {
					comments: false,
					beautify: true,
					ascii_only: true,
				},
			} : void 0,
			
			// 关闭清空输出文件夹 (如果打开会让输出文件夹只存在最后构建的项目)
			emptyOutDir: false
		}
	}
} )
