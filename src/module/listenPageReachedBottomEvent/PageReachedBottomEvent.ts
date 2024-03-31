import {
	isReachedPageBottom,
	ReachedBottomPauseTimeStorage,
	Scroll,
	ScrollSpeedStorage,
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
			
			// 监听页面刷新
			observePageFresh();
			
			// 接收页面加载完成回调
			handlePageLoad();
		}, ReachedBottomPauseTimeStorage.get() * 1000 );
	}
}

/**
 * 监听页面刷新
 * */
const observePageFresh = () => {
	const observer = new MutationObserver( ( mutationRecordList ) => {
		for ( let mutationRecord of mutationRecordList ) {
			for ( let addedNode of mutationRecord.addedNodes ) {
				if ( addedNode.nodeType !== Node.ELEMENT_NODE ) {
					return;
				}
				
				// 如果新增了 readerContentHeader 类的元素, 则说明新章节已经加载完成
				if ( ( <HTMLElement> addedNode ).classList.contains( 'readerContentHeader' ) ) {
					// 关闭监听器
					observer.disconnect();
					
					// 发送时间, 表示页面加载完成
					setTimeout( () => {
						window.dispatchEvent( new Event( 'PageLoad' ) );
					}, 0.4 * 1000 );
					
					return true;
				}
			}
		}
	} );
	
	observer.observe( <HTMLElement> document.querySelector( '.app_content' ), {
		childList: true,
	} );
};


/**
 * 接收页面加载完成回调
 * */
const handlePageLoad = () => {
	let scrollWaiterTimer: number = 0;
	window.addEventListener( 'PageLoad', () => {
			// 跳转到章节名处
			window.scrollTo( 0, 90 );
			
			
			// 暂停页面时间后再开始滚动
			const waitTime = window.innerHeight / ( ScrollSpeedStorage.get() / 5 * 60 );
			clearTimeout( scrollWaiterTimer );
			scrollWaiterTimer = window.setTimeout( () => {
				// 打开滚动
				Scroll.open();
			}, waitTime * 1000 );
		},
	);
};
