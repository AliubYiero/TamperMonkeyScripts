import { parseVideoInfo } from './parseVideoInfo'
import { BandVideoStorage } from '../storage/BandVideoStorage'
import {
	BandReadInterface,
	BandVideoType
} from '../interfaces/BandReadInterface'
import { VideoInfo } from '../interfaces/VideoInfo'
import { BandVideoByTypeParser } from './BandVideoByTypeParser'

/**
 * 读取数据库, 隐藏已屏蔽的视频
 *
 * @param {Node[]} currentVideoNodeList - 当前加载的视频列表
 * */
export const bandVideo = ( currentVideoNodeList: Node[] ) => {
	/*
	* 遍历当前已加载的视频节点元素, 过滤掉非视频节点
	* */
	currentVideoNodeList = currentVideoNodeList.filter( ( videoNode ) => {
		const videoContainer = videoNode as HTMLElement;
		
		/* 过滤文本节点 */
		if ( !videoContainer.classList ) {
			return false;
		}
		
		/* 过滤非视频节点 */
		return videoContainer.classList.contains( 'feed-card' ) || ( videoContainer.classList.contains( 'bili-video-card' ) && videoContainer.classList.contains( 'is-rcmd' ) && videoContainer.querySelector( '.bili-video-card__info--author + .bili-video-card__info--date' ) )
	} );
	
	/*
	* 遍历当前已加载的视频节点元素, 处理成视频信息
	* */
	const parseVideoInfoList = currentVideoNodeList.map( videoContainer => parseVideoInfo( videoContainer as HTMLElement ) );
	
	/**
	 * 屏蔽视频
	 * */
	const bandVideoFromNode = () => {
		const bandVideoStorage = BandVideoStorage.getInstance();
		
		/**
		 * 遍历视频信息, 如果屏蔽列表存在屏蔽的视频, 则将对应视频屏蔽 (添加 hide 类)
		 * */
		parseVideoInfoList.forEach( videoInfo => {
			const { target, up, bv, title } = videoInfo;
			
			Object.entries( videoInfo ).forEach( ( item: [ string, Node | string ] ) => {
				const key = item[ 0 ] as string & keyof VideoInfo;
				const value = item[ 1 ] as string;
				
				/**
				 * 不处理 target
				 * */
				if ( key === 'target' ) {
					return;
				}
				
				const BandVideoList = bandVideoStorage.get();
				
				/* 定义枚举 (BandVideoTypeEnum) 反向映射 */
				const typeEnumMapper = [ 'up', 'title', 'bv', 'av' ];
				// @ts-ignore
				const BandVideoListGroupByTypeObject = Object.groupBy( BandVideoList, ( bandVideoItem: BandReadInterface ) => {
					/**
					 * 如果 BandVideoList 为空, 直接返回
					 * */
					if ( !bandVideoItem ) {
						return;
					}
					
					/**
					 * 按类型返回
					 * */
					return typeEnumMapper[ bandVideoItem.type ];
				} ) as Record<'UP' | 'Title' | 'BV' | 'AV', BandReadInterface[]>;
				
				
				// @ts-ignore
				BandVideoByTypeParser[ key ]( value, target, BandVideoListGroupByTypeObject[ key ] || [] );
				
			} )
		} )
	};
	bandVideoFromNode();
	
	/**
	 * 数据库存储.
	 * 将当前加载的视频信息存储到本地存储中
	 * */
	const operateStorage = () => {
		const bandVideoStorage = BandVideoStorage.getInstance();
		const appendVideoList = parseVideoInfoList.map( videoInfo => {
			return {
				type: BandVideoType.BV,
				content: videoInfo.bv,
			}
		} );
		// // fixme debugger
		// console.log( 'appendVideoList: ', appendVideoList, parseVideoInfoList );
		bandVideoStorage.set( appendVideoList );
	};
	operateStorage();
}
