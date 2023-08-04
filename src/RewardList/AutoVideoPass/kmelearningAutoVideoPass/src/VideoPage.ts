/**
 * VideoPage.ts
 * created by 2023/8/3
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
import { getElement } from '../../../../../lib/Listener/ElementAdd'
import { Sleep } from '../../../../../lib/Base/Sleep'
import { judgeStudyPage, judgeVideoPage } from './PageListener'
import { main, print } from '../index';

export {
	domList,
	getVideoList,
	checkVideoList,
	backHistoryInStudyList,
	getVideoElement,
	playVideo,
	videoObserver,
	videoEndEvent,
}

let domList: { [ propName: string ]: HTMLElement | NodeList } = {};

/* 获取视频列表 */
async function getVideoList() {
	domList.videoList = await getElement( document.body, '.course-menu-container' ) as HTMLElement;
	await Sleep.time( 0.5 );
}

/* 检测已看 / 未看的视频 */
function checkVideoList() {
	const videoList = domList.videoList;
	const notReadVideoList = ( <HTMLElement> videoList ).querySelectorAll( '.course-menu-item:not(.isChapter) .course-menu-dot:not(:has(.anticon))' ) as NodeList;
	const videoPage = notReadVideoList[ 0 ] as HTMLElement;
	
	print.log( '检查视频列表', videoPage );
	// 如果存在未看视频, 则跳转观看视频
	if ( videoPage ) {
		videoPage.click();
	}
	// 如果不存在未看视频, 则后退一页历史
	else {
		print.log( '全部视频已经完成观看' );
		backHistoryInStudyList();
	}
}

/* 后退历史直到到列表页面 */
function backHistoryInStudyList() {
	if ( judgeStudyPage() ) {
		return;
	}
	else {
		const studyId = localStorage.getItem( 'studyId' );
		if ( studyId ) {
			location.href = `https://pc.kmelearning.com/jxccb/home/training/study/${ studyId }`;
			return;
		}
		history.go( -1 );
	}
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

/* 视频结束检测, 防止当前列表中的最后一个视频无法跳转 */
function videoEndEvent() {
	let videoElement = domList.video as HTMLVideoElement;
	videoElement.addEventListener( 'ended', () => {
		print.log( '视频结束' );
		setTimeout( main, 2000 );
	} )
}

/* 检测是否进入新视频(视频在视频界面跳转使用局部更新数据) */
async function videoObserver( callback: Function ) {
	// 判断是否进入视频页面
	if ( !judgeVideoPage() ) {
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
