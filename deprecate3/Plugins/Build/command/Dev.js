/**
 * Dev.js
 * created by 2023/8/7
 * @file 构造开发环境打包文件
 * @author  Yiero
 * */

import { useCommand } from '../lib/BuildFiles.js'
import { Print } from '../../Console/lib/Print.js'
import { resolve } from 'path'

const buildCommand = 'tsc && vite build --mode development';
useCommand( buildCommand ).then( ( { outputString, outputErrorString } ) => {
	console.log( outputErrorString );
	console.log( outputString );
	
	/* 输出项目地址 */
	console.log( '项目成功构建: [%s]',
		( ( 'file:///' )
			.concat(
				resolve( 'dist' ),
				'/',
				// 获取构建目录
				outputString.substring( outputString.indexOf( 'dist' ), outputString.lastIndexOf( '.js' ) + 3 )
			) )
			// 替换分隔符 ( '\' 分隔符无法在控制台中输出文件路径 )
			.replace( /\\/g, '/' )
			// 删除控制台颜色
			.replace( 'dist/\x1B[22m\x1B[36m', '' )
			.replace( / /g, '%20' )
	);
} ).catch(
	( error ) => {
		console.error( Print.cyan( error ) );
	}
)
