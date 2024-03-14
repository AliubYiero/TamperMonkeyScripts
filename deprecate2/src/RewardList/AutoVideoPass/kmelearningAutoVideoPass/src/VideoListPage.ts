/**
 * VideoListPage.ts
 * created by 2023/8/3
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { domList } from './VideoPage'
import { getElement } from '../../../../../lib/Listener/ElementAdd'
import { Sleep } from '../../../../../lib/Base/Sleep'
import { print } from '../index'

export {
	getAllNotFinishedVideoList,
	getNotFinishedVideoList,
	getUnFinishedChildVideoList
}

/* 获取所有未完成的列表 */
async function getAllNotFinishedVideoList() {
	await getElement( document.body, '.panelHeader' );
	await Sleep.time( 0.5 );
	domList.videoList = document.querySelectorAll( '.panelHeader:not(:has(.completeLabel))' ) as NodeList;
}

/* 选取其中一个未完成的列表 */
async function getNotFinishedVideoList() {
	const videoListContainer = ( <NodeList> domList.videoList )[ 0 ];
	if ( videoListContainer ) {
		domList.videoListContainer = videoListContainer as HTMLElement;
		domList.videoListContainer.click();
		await Sleep.time( 0.5 );
		return true;
	}
	else {
		return false;
	}
}

/* 在未完成的列表中获取未完成的视频 */
function getUnFinishedChildVideoList() {
	const childVideoListNodeList = document.querySelectorAll( '.panelContent' );
	for ( const childVideoList of childVideoListNodeList ) {
		const isFinishDom = childVideoList.querySelector( 'use' ) as SVGUseElement;
		if ( isFinishDom.getAttribute( 'xlink:href' ) === '#.' ) {
			print.log( '进入未完成的视频' );
			( <HTMLElement> childVideoList ).click();
		}
	}
}
