import { NodeListLoader } from '../lib/NodeLoader'
import { config } from '../config/config'
import { bandVideo } from './bandVideo'

/**
 * 监听视频加载
 * */
export function VideoLoadedListener() {
	/* 创建监听器 */
	const dynamicLoader = new NodeListLoader( config.nodeContainer, config.dispatchEventName );
	
	/* 获取当前已加载的视频节点元素 */
	let currentVideoNodeList = dynamicLoader.items;
	bandVideo( currentVideoNodeList );
	
	/**
	 * 监听视频容器加载信息
	 * */
	window.addEventListener( config.dispatchEventName, ( e: Event ) => {
		/* 获取当前已加载的视频节点元素 */
		currentVideoNodeList = ( <CustomEvent> e ).detail as Node[];
		bandVideo( currentVideoNodeList );
		
		// // fixme debugger
		// console.log( '当前屏蔽的视频列表: ', GM_getValue( 'BandVideoList' ) );
	} )
}
