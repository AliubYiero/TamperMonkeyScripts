/**
 * parseVideoInfo.ts
 * created by 2023/12/31
 * @file 处理视频信息容器
 * @author  Yiero
 * */

import { VideoInfo } from '../interfaces/VideoInfo'

/**
 * 输入视频节点, 返回处理后的视频对象
 *
 * @parma videoNode - 视频容器节点
 * @return { VideoInfo } - 处理后的视频信息对象
 * */
export const parseVideoInfo = ( videoNode: HTMLElement ): VideoInfo => {
	/** 处理非正常视频容器, 直接抛出错误 */
	// if ( !( videoNode.classList.contains( 'feed-card' ) || ( videoNode.classList.contains( 'bili-video-card' ) && videoNode.classList.contains( 'is-rcmd' ) ) ) ) {
	// 	throw new Error( 'current node is not a video container' );
	// }
	
	
	/**
	 * 处理视频标题
	 * */
	const titleNode = videoNode.querySelector( '.bili-video-card__info--tit > a' ) as HTMLLinkElement;
	const title = titleNode.textContent as string;
	
	/**
	 * 处理BV号
	 * */
	/* BV号视频容器 */
	const bvLinkNode = videoNode.querySelector( '.bili-video-card__image--link' ) as HTMLLinkElement;
	const bvId = ( bvLinkNode.href.match( /(?<=\/)BV1.*$/ ) as RegExpMatchArray )[ 0 ] as `BV1${ string }`;
	
	/**
	 * 处理up主昵称
	 * */
	const upNameNode = document.querySelector( '.bili-video-card__info--author' ) as HTMLSpanElement;
	const upName = upNameNode.textContent as string;
	
	return {
		target: videoNode,
		title,
		bv: bvId,
		up: upName,
	}
}
