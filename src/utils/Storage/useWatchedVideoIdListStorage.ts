/**
 * useReadVideoIdListStorage.ts
 * created by 2024/4/5
 * @file 已经读取到的视频id列表存储
 * @author  Yiero
 * */
import { VideoIdMap } from '../interfaces/VideoIdMap.ts';
import {
	getAllFavoriteVideoIdList,
} from '../getAllFavoriteVideoIdList/getAllFavoriteVideoIdList.ts';

export class useWatchedVideoIdListStorage {
	private static instance: useWatchedVideoIdListStorage;
	private videoIdMap: VideoIdMap = new Map();
	
	private constructor() {
	}
	
	/**
	 * 获取唯一实例
	 * */
	static getInstance(): useWatchedVideoIdListStorage {
		if ( !this.instance ) {
			this.instance = new useWatchedVideoIdListStorage();
		}
		
		return this.instance;
	}
	
	/**
	 * 输出当前收藏中所有的视频列表
	 * */
	show(): VideoIdMap {
		return this.videoIdMap;
	}
	
	/**
	 * 比较视频id是否存在
	 * */
	existVideoId( videoBvId: `BV1${ string }` ): boolean {
		const {
			videoId,
			videoIdPrefix,
		} = this.handleVideoIdPrefix( videoBvId );
		
		// 如果Map中不存在对应的Set, 则说明不存在
		if ( !this.videoIdMap.has( videoIdPrefix ) ) {
			return false;
		}
		
		// 如果存在Map但是不在Set中, 则说明不存在, 返回 false
		// 如果存在, 返回 true
		const videoSet = this.videoIdMap.get( videoIdPrefix ) as Set<string>;
		console.log( videoSet );
		return videoSet.has( videoId );
	}
	
	/**
	 * 向本地储存中写入新的值
	 * */
	set( videoBvId: `BV1${ string }` ) {
		const {
			videoId,
			videoIdPrefix,
		} = this.handleVideoIdPrefix( videoBvId );
		
		// 如果Map中不存在对应的Set, 先创建Set
		if ( !this.videoIdMap.has( videoIdPrefix ) ) {
			this.videoIdMap.set( videoIdPrefix, new Set() );
		}
		
		// 如果Map中存在对应的Set, 向对应Set中写入
		const videoSet = this.videoIdMap.get( videoIdPrefix ) as Set<string>;
		videoSet.add( videoId );
	}
	
	/**
	 * 初始化获取已经收藏过的所有视频id
	 * */
	async init() {
		this.videoIdMap = await getAllFavoriteVideoIdList();
	}
	
	/**
	 * 处理BV1前缀
	 * */
	private handleVideoIdPrefix( videoId: `BV1${ string }` ): {
		videoId: string;
		videoIdPrefix: string;
	} {
		return {
			videoId: videoId.slice( 3 ),
			videoIdPrefix: videoId.slice( 3, 4 ),
		};
	}
}
