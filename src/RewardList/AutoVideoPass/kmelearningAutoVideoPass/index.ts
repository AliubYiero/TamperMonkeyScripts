/* entry */
import { freshListenerPushState } from '../../../../lib/Listener/Page/FreshListener'
import { Info } from '../../../../lib/Base/Info'
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { Sleep } from '../../../../lib/Base/Sleep'


const print = new Info( 'kmelearningAutoVideoPass' );
( () => {
	function jedgeVideoPage(): boolean {
		return !!document.URL.match( /^https:\/\/pc.kmelearning.com\/jxccb\/home\/courseplay\/.*/g );
		
	}
	
	let domList: { [ propName: string ]: HTMLElement } = {};
	
	/* 获取视频列表 */
	async function getVideoList() {
		domList.videoList = await getElement( document.body, '.course-menu-container' ) as HTMLElement;
		await Sleep.time( 0.5 );
	}
	
	/* 检测已看 / 未看的视频 */
	function checkVideoList() {
		const videoList = domList.videoList;
		const notReadVideoList = videoList.querySelectorAll( '.course-menu-item:not(.isChapter) .course-menu-dot:not(:has(.anticon))' ) as NodeList;
		const videoPage = notReadVideoList[ 0 ] as HTMLElement;
		videoPage.click();
	}
	
	
	/* 获取视频 */
	async function getVideoElement() {
		await Sleep.time( 2 );
		domList.video = await getElement( document.body, 'video' ) as HTMLElement;
	}
	
	/* 播放视频 */
	function playVideo() {
		let videoElement = domList.video as HTMLVideoElement;
		
		// 静音视频
		videoElement.volume = 0;
		// 开启自动播放
		videoElement.autoplay = true;
		// 播放视频
		videoElement.play();
	}
	
	/* 检测是否进入新视频(视频在视频界面跳转使用局部更新数据) */
	async function videoObserver( callback: Function ) {
		// 判断是否进入视频页面
		if ( !jedgeVideoPage() ) {
			return;
		}
		
		domList.videoContainer = await getElement( document.body, '.course-content-play-area' ) as HTMLVideoElement;
		const observer = new MutationObserver( ( e ) => {
			e.forEach( ( record ) => {
				const removeDom = <HTMLElement> record.removedNodes[ 0 ] as HTMLElement;
				if ( removeDom && removeDom.toString() === '[object HTMLDivElement]' && removeDom?.classList.contains( 'course-player' ) ) {
					print.log( '视频跳转' );
					setTimeout( callback, 2000 );
				}
			} );
		} );
		
		observer.observe( domList.videoContainer, {
			subtree: true,
			childList: true,
		} )
	}
	
	async function main() {
		// 判断是否进入视频页面
		if ( !jedgeVideoPage() ) {
			return;
		}
		print.log( '进入视频页面' );
		
		// 获取视频列表
		await getVideoList();
		// 检测视频列表
		await checkVideoList();
		
		// 获取视频元素
		await getVideoElement();
		
		// 播放视频
		print.log( '播放视频', domList.video );
		playVideo();
	}
	
	/* 是否进入视频页面 */
	// 初始化是否在视频页面
	main();
	// 判断视频界面的视频跳转
	videoObserver( main );
	// 页面跳转是否在视频页面
	freshListenerPushState( () => {
		main();
		// 判断视频界面的视频跳转
		videoObserver( main );
	} );
	
	
} )();
