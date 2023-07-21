/* entry */
import { FreshListenerPushState } from '../../../../lib/Listener/Page/FreshListener'
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { Sleep } from '../../../../lib/Base/Sleep'

( () => {
	
	// 视频改变类
	class Video {
		domList: { video: HTMLVideoElement }
		
		constructor() {
			this.domList = {
				video: document.querySelector( '.video-play video' ) as HTMLVideoElement,
			}
		}
		
		changeTimeToEnd() {
			this.updateTime( this.domList.video.duration - 1 );
		}
		
		// 改变视频时间
		updateTime( s: number ) {
			this.domList.video.currentTime = s;
		}
	}
	
	;( function pageChangeObserver() {
		let video: Video;
		
		function changeVideo() {
			video = new Video();
			video.domList.video.oncanplay = ( e ) => {
				console.log( '可以播放', e );
				Sleep.time().then(
					() => {
						video.changeTimeToEnd();
					}
				)
				video.domList.video.oncanplay = () => {
				};
			};
		}
		
		
		// 监听视频元素是否出现
		bindVideoObserver();
		
		// 监听页面改变
		FreshListenerPushState( bindVideoObserver );
		
		async function bindVideoObserver() {
			console.log( '检测到页面改变' );
			await getElement( document.body, '.video-play video' );
			new MutationObserver( ( e ) => {
				console.log( e );
				e.forEach( ( record ) => {
					if ( ( <HTMLElement> record.target ).className === 'video' ) {
						console.log( '空降视频结尾...' );
						changeVideo();
					}
				} )
			} ).observe( <HTMLElement> document.querySelector( '.details.black' ), {
				subtree: true,
				childList: true
			} );
			
			changeVideo();
			
		}
	} )();
} )();
