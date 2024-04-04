import chokidar from 'chokidar';
import child_process from 'child_process';

const { exec } = child_process;

// 要监视的目录路径列表
const directoryPaths = [ 'src' ];

// 要执行的打包命令
const buildCommand = 'npm run dev:origin';

// 初始化一个数组来存储监视器实例
const watchers = [];

// 使用 chokidar 监视每个目录中的所有文件更改
directoryPaths.forEach( ( directoryPath ) => {
	const watcher = chokidar.watch( directoryPath, {
		ignored: /(^|[\/\\])\../, // 忽略隐藏文件和目录
		persistent: true, // 持续监听
	} );
	
	// 监听到文件更改时执行打包命令
	watcher.on( 'change', () => {
		console.log( '监听到文件更改，开始执行打包任务...' );
		exec( buildCommand, ( error, stdout, stderr ) => {
			if ( error ) {
				console.error( `Error: ${ error.message }` );
			}
			else {
				console.log( stdout );
				console.log( stderr );
				console.info( '文件打包完成.' );
			}
		} );
	} );
	
	// 将监视器实例添加到数组中
	watchers.push( watcher );
	
	console.info( `正在监听 ${ directoryPath } 目录下的文件更改...` );
} );