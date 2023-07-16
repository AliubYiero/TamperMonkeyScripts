import { defineConfig } from 'vite';
/** @tutorial https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.zh-CN.md */
import banner from 'vite-plugin-banner'

import replace from '@rollup/plugin-replace'
import { basename, dirname, resolve } from 'path'
import { getEntities, getEntries, userInfoFormat } from './Plugins/GetEntities.ts'

export default defineConfig( ( { mode } ) => {
	// 获取构建方式信息
	const isProduction = mode === 'production';
	
	// 获取项目实体对象数组
	const entities = getEntities( resolve( 'src' ) );
	console.info( '正在获取项目信息...' );
	
	// 无文件修改，抛出异常
	if ( entities.length === 0 ) {
		console.error( '没有文件修改，无法获取文件' );
		throw new Error( '没有文件修改，无法重新文件' );
	}
	
	// 获取修改后项目入口文件
	const entries = getEntries( entities );
	
	console.info( '开始打包文件...' );
	// 返回vite配置对象
	return {
		build: {
			rollupOptions: {
				input: entries,
				output: {
					entryFileNames: `[name].js`,
					format: 'es',
					globals: [],
					manualChunks( id ) {
						// 把项目文件夹里面的文件都打包到一个文件中
						for ( const entity of entities ) {
							const projectName = basename( dirname( id ) );
							if ( projectName === entity.projectName ) {
								return projectName;
							}
						}
					}
				},
				plugins: [
					banner( {
						content: ( fileName ) => {
							const projectName = basename( fileName, '.js' );
							for ( let entity of entities ) {
								if ( entity.projectName === projectName ) {
									return `${ userInfoFormat( entity.userInfoConfig, projectName, isProduction ) }\n`
								}
							}
						},
						verify: false,
					} ),
					replace( {
						preventAssignment: true,
						values: isProduction ? {
							'import axios from "axios";': '',
							'console.log': '(() => {})',
						} : { 'import axios from "axios";': '', },
						delimiters: [ '', '' ],
					} )
				],
				external: [ 'axios' ],
			},
			// 关闭压缩和混淆代码
			minify: false,
			// 不清空打包目录
			emptyOutDir: false,
		},
	}
} );
