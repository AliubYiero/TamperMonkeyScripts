import { Info } from '../../../lib/Base/Info'

import { GlobalAutoScroll, isReachedPageBottom } from './src/AutoScroll/GlobalAutoScroll'
import { GMConfigMenu } from '../../../lib/GM_Lib'
import { LocalStorage, SessionStorage } from '../../../lib/Listener'
import { fireKeyEvent } from '../../../lib/Listener/Event'

export {
	scrollStatusStorage,
	print
}
const print = new Info( 'WeChatReadAutoScroll' );
const scrollStatusStorage = new SessionStorage( 'scrollStatus' );
/* entry */
( async () => {
	
	/* 滚动速度配置 */
	const scrollSpeedController = new GMConfigMenu( () => {
		const result = prompt( '页面滚动速度(px/s)', localStorage.getItem( 'scrollSpeed' ) || '100' );
		if ( !result ) {
			return;
		}
		localStorage.setItem( 'scrollSpeed', result );
	} );
	scrollSpeedController.open( '[配置] 滚动速度' );
	
	/* 滚动开启延时配置 */
	const scrollDelayController = new GMConfigMenu( () => {
		const result = prompt( '滚动开启延时 ( auto | (auto / 2) | number ) (ms)', localStorage.getItem( 'scrollDelay' ) || 'auto' );
		if ( !result ) {
			return;
		}
		localStorage.setItem( 'scrollDelay', result );
	} );
	scrollDelayController.open( '[配置] 滚动开启延时' );
	
	/* 开关切换配置 */
	function scrollSwitch() {
		let globalAutoScroll: GlobalAutoScroll;
		
		/* 开启滚动配置菜单 */
		const scrollOpenController = new GMConfigMenu( scrollOpenMenuCallback );
		
		/* 开启滚动回调函数 */
		function scrollOpenMenuCallback() {
			/* 获取滚动速度 */
			const scrollSpeedStorage = new LocalStorage( 'scrollSpeed' );
			/* 获取滚动延时 */
			const scrollDelayStorage = new LocalStorage( 'scrollDelay' );
			
			/* 定义滚动对象 */
			globalAutoScroll = new GlobalAutoScroll(
				+( <string> scrollSpeedStorage.get( '100' ) ),
				<string> scrollDelayStorage.get( 'auto' ),
				60
			);
			
			// 开启滚动
			globalAutoScroll.open();
			
			/* 事件: 滚动时点击, 停止滚动 */
			window.addEventListener( 'click', () => {
				globalAutoScroll.close();
			}, {
				once: true,
			} )
			/* 空格按下事件, 停止滚动 */
			window.addEventListener( 'keydown', ( e ) => {
				if ( ![ ' ' ].includes( e.key ) ) {
					return;
				}
				e.preventDefault();
				
				globalAutoScroll.close();
			}, {
				once: true,
			} )
			
			/* 关闭 [开启] 配置, 开启 [关闭] 配置 */
			scrollOpenController.close();
			scrollCloseController.open( '关闭滚动' );
		}
		
		/* 停止滚动配置菜单 */
		const scrollCloseController = new GMConfigMenu( scrollCloseMenuCallback );
		
		/* 关闭滚动回调函数 */
		function scrollCloseMenuCallback() {
			/* 关闭 [关闭] 配置项 */
			scrollCloseController.close();
			/* 开启 [开启] 配置 */
			scrollOpenController.open( '开启滚动' );
			
			/* 快捷键开启 */
			window.addEventListener( 'keydown', ( e ) => {
				if ( ![ 'PageDown', ' ' ].includes( e.key ) || scrollStatusStorage.get() === 'scroll-end' ) {
					return;
				}
				e.preventDefault();
				
				scrollOpenMenuCallback();
			}, { once: true } );
		}
		
		// init
		scrollCloseMenuCallback();
		
		/* 设置滚动状态监听器 */
		scrollStatusStorage.set( 'scroll-start' );
		window.addEventListener( 'storageUpdate', ( e ) => {
			const event = e as CustomEvent;
			
			/* 更新状态为滚动结束, 关闭 [关闭滚动] 入口, 开启 [开启滚动] 入口 */
			if ( event.detail.key === 'scrollStatus' && event.detail.newValue === 'scroll-end' ) {
				/* 切换开关选项 */
				scrollCloseMenuCallback();
				
				/* 判断触底, 切换章节 */
				if ( isReachedPageBottom() ) {
					/* 模拟 '→' 键, 切换下一章 */
					fireKeyEvent( document, 'keydown', 39 );
					
					scrollOpenMenuCallback();
				}
			}
		} );
	}
	
	/* 初始化滚动开关 */
	scrollSwitch();
} )();
