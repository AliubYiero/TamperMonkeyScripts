import { elementWaiter } from '../../libs/ElementWaiter'
import { config } from '../config/config'

/**
 * 初始化脚本
 * */
export async function init() {
	/**
	 * 等待视频容器加载
	 * */
	await elementWaiter( config.nodeContainer );
	
	/**
	 * 添加初始样式 (hide 屏蔽类)
	 * */
	GM_addStyle( '.feed-card.hide, .bili-video-card.hide { display: none !important; }' );
}
