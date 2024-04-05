/**
 * useReadVideoIdListStorage.ts
 * created by 2024/4/5
 * @file 已经读取到的视频id列表事件处理器
 * @author  Yiero
 * */
import { VideoIdMap } from '../interfaces/VideoIdMap.ts';
import {
	getAllFavoriteVideoIdList,
} from '../getAllFavoriteVideoIdList/getAllFavoriteVideoIdList.ts';
import { useRuntimeDateStorage } from './useRuntimeDateStorage.ts';
import {
	useWatchedVideoIdListStorage,
} from './useWatchedVideoIdListStorage.ts';

/**
 * 处理已经观看过的视频列表事件处理器
 * */
export class handleParseWatchedVideoIdList {
	private static instance: handleParseWatchedVideoIdList;
	private videoIdMap: VideoIdMap = new Map();
	
	private constructor() {
	}
	
	/**
	 * 输出当前收藏中所有的视频列表
	 * */
	get data(): VideoIdMap {
		return this.videoIdMap;
	}
	
	/**
	 * 获取唯一实例
	 * */
	static getInstance(): handleParseWatchedVideoIdList {
		if ( !this.instance ) {
			this.instance = new handleParseWatchedVideoIdList();
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
		console.log( '当前已看视频列表: ', videoSet );
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
		console.info( '[bilibili-video-browsing-history-sign] 正在初始化...' );
		/*
		* 判断当天是否已经初始化过,
		* 如果已经初始化过, 直接从本地获取数据
		* */
		if ( useRuntimeDateStorage.existTodayDate() ) {
			this.videoIdMap = useWatchedVideoIdListStorage.get();
		}
		// console.log( '已经初始化: ', useRuntimeDateStorage.existTodayDate() );
		
		/*
		* 如果存在数据, 则不发送网络请求
        * 如果不存在数据, 则发送网络请求获取数据
        *
        * 这一步主要是防止初始化后用户直接关闭页面导致的数据丢失
		* */
		if ( this.videoIdMap.size ) {
			return;
		}
		
		// console.log( 'videoIdMap: ', this.videoIdMap );
		/*
		* 如果没有初始化过, 发送网络请求获取数据
		* */
		this.videoIdMap = await getAllFavoriteVideoIdList();
		// 将数据储存到本地
		useWatchedVideoIdListStorage.set( this.videoIdMap );
		// 修改初始化日期
		useRuntimeDateStorage.set();
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
