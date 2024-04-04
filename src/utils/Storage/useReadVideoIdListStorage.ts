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

export class useReadVideoIdListStorage {
	static instance: useReadVideoIdListStorage;
	private videoIdMap: VideoIdMap = new Map();
	
	private constructor() {
		this.init();
	}
	
	/**
	 * 获取唯一实例
	 * */
	static getInstance(): useReadVideoIdListStorage {
		if ( !this.instance ) {
			this.instance = new useReadVideoIdListStorage();
		}
		
		return this.instance;
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
	 * 处理BV1前缀
	 * */
	private handleVideoIdPrefix( videoId: `BV1${ string }` ): {
		videoId: string;
		videoIdPrefix: string;
	} {
		return {
			videoId: videoId.slice( 2 ),
			videoIdPrefix: videoId.slice( 2, 4 ),
		};
	}
	
	
	/**
	 * 初始化获取已经收藏过的所有视频id
	 * */
	private async init() {
		this.videoIdMap = await getAllFavoriteVideoIdList();
	}
}
