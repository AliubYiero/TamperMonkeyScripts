import { defineConfig } from 'vite';
/** @tutorial https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.zh-CN.md */
import banner from 'vite-plugin-banner'
import { formatter } from './lib/UserInfo/Formatter.js'
import config from './Config/global.config.json'
import replace from '@rollup/plugin-replace'
import { resolve } from 'path'

// 扁平化的projectInfo
config.projectInfoFlat = {};
// 从配置文件中获取所有入口文件（所有项目）
const getEntries = () => {
	const entries = {};
	for ( let projectBelongName in config.projectInfo ) {
		for ( let projectName in config.projectInfo[projectBelongName] ) {
			config.projectInfoFlat[projectName] = config.projectInfo[projectBelongName][projectName];
			entries[projectName] = resolve( 'src', projectBelongName, projectName, 'index.ts' );
		}
	}
	return entries;
}
const entries = getEntries();

export default defineConfig( ( { mode } ) => {
	const isProduction = mode === 'production';
	
	return {
		build: {
			rollupOptions: {
				input: entries,
				output: {
					entryFileNames: `assets/[name].js`,
					chunkFileNames: 'assets/[name].chunk.js',
					format: 'es',
					globals: [],
					manualChunks( id ) {
						for ( let entryKey in entries ) {
							// 把项目文件夹里面的文件都打包到一个文件中
							if ( id.includes( entryKey ) ) {
								return entryKey
							}
						}
					}
				},
				plugins: [
					banner( {
						content: ( fileName ) => {
							const projectName = fileName.match( /assets\/(.*?)\.js$/ )[1];
							
							return `${ formatter( config.projectInfoFlat[projectName], isProduction ) }\n`
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
				// external: isProduction ? [ 'axios' ] : [],
				external: [ 'axios' ],
				
			},
			minify: false,
		},
	}
} );
