/**
 * Watch.js
 * created by 2023/8/7
 * @file 持续监听文件更新, 构造开发环境打包文件
 * @author  Yiero
 * */
import { useCommand } from '../lib/BuildFiles.js'
import { Print } from '../../Console/lib/Print.js'
import { watch } from 'chokidar'

// 要监视的目录路径列表
const directoryPaths = [ 'src' ];

// 要执行的打包命令
const buildCommand = 'npm run Dev';

// 初始化一个数组来存储监视器实例
const watchers = [];

// 使用 chokidar 监视每个目录中的所有文件更改
directoryPaths.forEach( ( directoryPath ) => {
	const watcher = watch( directoryPath, {
		ignored: /(^|[\/\\])\../, // 忽略隐藏文件和目录
		persistent: true, // 持续监听
	} );
	
	// 监听到文件更改时执行打包命令
	watcher.on( 'change', () => {
		console.log( Print.cyan( '监听到文件更改，开始执行打包任务...' ) );
		useCommand( buildCommand ).then( ( { outputString, outputErrorString } ) => {
			console.log( outputErrorString );
			console.log( outputString );
		} ).catch(
			( error ) => {
				console.error( Print.cyan( error ) );
			}
		)
	} );
	
	// 将监视器实例添加到数组中
	watchers.push( watcher );
	
	console.info( Print.cyan( `正在监听 ${ directoryPath } 目录下的文件更改...` ) );
} );
