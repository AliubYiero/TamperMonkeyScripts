/* entry */
import { freshListenerPopstate, freshListenerPushState } from '../../../../lib/Listener/Page/FreshListener'
import { Info } from '../../../../lib/Base/Info'

import { judgeStudyPage, judgeVideoPage } from './src/PageListener'
import {
	checkVideoList,
	domList,
	getVideoElement,
	getVideoList,
	playVideo,
	videoEndEvent,
	videoObserver
} from './src/VideoPage'
import { getAllNotFinishedVideoList, getNotFinishedVideoList, getUnFinishedChildVideoList } from './src/VideoListPage'


const print = new Info( 'kmelearningAutoVideoPass' );

export {
	print
}

( () => {
	async function main() {
		// 判断是否进入视频页面
		if ( judgeVideoPage() ) {
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
			
			// 绑定视频结束事件
			videoEndEvent();
			return;
		}
		else if ( judgeStudyPage() ) {
			print.log( '进入学习目录页面' );
			
			// 获取视频列表
			await getAllNotFinishedVideoList();
			
			// 检测是否存在未完成的列表
			if ( !await getNotFinishedVideoList() ) {
				return;
			}
			
			// 进入未完成的视频
			getUnFinishedChildVideoList();
		}
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
	/* 通过历史跳转的页面跳转是否在视频页面 */
	freshListenerPopstate( () => {
		main();
	} )
	
	/* 注册菜单, 开启选项 */
	// registerMenu('开启', main);
} )();
