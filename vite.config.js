import { defineConfig } from 'vite';
/** @tutorial https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.zh-CN.md */
import banner from 'vite-plugin-banner'
import { formatter } from './lib/UserInfo/Formatter.js'

import replace from '@rollup/plugin-replace'
import { join, resolve } from 'path'
import fs from 'fs-extra'

// 遍历目录
function getDirectories( directory ) {
	const files = fs.readdirSync( directory );
	const directories = [];
	
	for ( const file of files ) {
		const filePath = join( directory, file );
		const stats = fs.statSync( filePath );
		
		if ( stats.isDirectory() ) {
			directories.push( file );
		}
	}
	
	return directories;
}

// 从配置文件中获取所有入口文件（所有项目）
const entries = {};
const jsonFiles = {};

function getPath( aimFileName, projectName, projectBelongName ) {
	return resolve( 'src', projectBelongName, projectName, aimFileName );
}

( function getEntries() {
	getDirectories( './src/RewardList' ).forEach( projectName => {
		entries[projectName] = getPath( 'index.ts', projectName, 'RewardList' );
		jsonFiles[projectName] = getPath( 'userinfo.json', projectName, 'RewardList' );
	} )
	getDirectories( './src/Self' ).forEach( projectName => {
		entries[projectName] = getPath( 'index.ts', projectName, 'Self' );
		jsonFiles[projectName] = getPath( 'userinfo.json', projectName, 'Self' );
	} )
} )();

// 合并配置文件
const mergedData = {};

async function mergeJSONFiles() {
	
	for ( const projectName in jsonFiles ) {
		const filePath = jsonFiles[projectName];
		try {
			mergedData[projectName] = await fs.readJson( resolve( filePath ) );
			mergedData[projectName].projectName = projectName;
		} catch ( err ) {
			console.error( `Failed to read JSON file: ${ file }`, err );
		}
	}
}

await mergeJSONFiles();

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
							
							return `${ formatter( mergedData[projectName], isProduction ) }\n`
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
