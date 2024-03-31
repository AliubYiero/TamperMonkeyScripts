import {
	isReachedPageBottom,
	ReachedBottomPauseTimeStorage,
	Scroll,
} from '../../utils';
import { switchNextPage } from './utils/switchNextPage.ts';

/**
 * 页面触底事件类
 * */
export class PageReachedBottomEvent {
	private static freshTimer: number;
	
	/**
	 * 监听页面触底
	 * */
	static listen() {
		// 监听滚动
		if ( !isReachedPageBottom() ) {
			return;
		}
		
		// 输出页面滚动底部信息
		// console.log( '页面滚动到底部' );
		
		// 清除定时器
		clearTimeout( this.freshTimer );
		
		// 关闭滚动
		Scroll.close();
		
		// 停止3秒 (可配置), 翻页
		this.freshTimer = window.setTimeout( () => {
			// 翻页
			switchNextPage();
		}, ReachedBottomPauseTimeStorage.get() * 1000 );
	}
}
