import { VideoLoadedListener } from './modules/videoLoadedListener'
import { init } from './modules/init'


/**
 * 运行脚本
 * */
const run = ( async () => {
	await init();
	
	/**
	 * 处理视频信息
	 * */
	VideoLoadedListener();
	
	/**
	 * 测试函数
	 * */
	( () => {
		// // fixme debugger
		// console.log( '当前屏蔽的视频列表: ', GM_getValue( 'BandVideoList' ) );
	} )();
} )();
