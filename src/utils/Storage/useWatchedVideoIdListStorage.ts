/**
 * useWatchedVideoIdListStorage.ts
 * created by 2024/4/5
 * @file 已经读取到的视频id列表存储
 * @author  Yiero
 * */
import { VideoIdMap } from '../interfaces/VideoIdMap.ts';

export class useWatchedVideoIdListStorage {
	private static STORE_NAME = 'watchedVideoIdList';
	
	/**
	 * 获取数据
	 * */
	private static data: string[] = [];
	
	/**
	 * 向本地存储中储存收藏视频信息
	 * */
	static set( watchedVideoIdMap: VideoIdMap ) {
		const watchedVideoIdList = this.parse( watchedVideoIdMap );
		// console.log( '储存到本地存储: ', watchedVideoIdList );
		GM_setValue( this.STORE_NAME, watchedVideoIdList );
	}
	
	/**
	 * 从本地存储中获取收藏视频信息
	 * */
	static get(): VideoIdMap {
		// 如果作用域中有值, 则直接返回
		if ( !this.data.length ) {
			this.data = GM_getValue( this.STORE_NAME, [] );
		}
		return this.stringify( this.data );
	}
	
	/**
	 * 往本地储存中添加一个新值
	 * */
	static add( videoId: `BV1${ string }` ) {
		if ( !this.data.length ) {
			this.data = GM_getValue( this.STORE_NAME, [] );
		}
		this.data.push( videoId.slice( 3 ) );
		const videoIdMap = this.stringify( this.data );
		console.log( '添加视频到本地储存: ', this.data );
		this.set( videoIdMap );
	}
	
	
	/**
	 * 移除储存
	 * */
	static remove() {
		GM_deleteValue( this.STORE_NAME );
	}
	
	/**
	 * 将Map解析成数组
	 * */
	private static parse( watchedVideoIdMap: VideoIdMap ): string[] {
		const watchedVideoIdList: string[] = Array.from( watchedVideoIdMap ).map( item => {
			return Array.from( item[ 1 ] );
		} ).flat();
		return watchedVideoIdList;
	}
	
	/**
	 * 将数组解析成Map
	 * */
	private static stringify( watchedVideoIdList: string[] ): VideoIdMap {
		const watchedVideoIdMap: VideoIdMap = new Map();
		watchedVideoIdList.forEach( videoId => {
			const videoIdPrefix = videoId.slice( 0, 1 );
			// 如果不存在对应Set, 先创建一个Set
			if ( !watchedVideoIdMap.has( videoIdPrefix ) ) {
				watchedVideoIdMap.set( videoIdPrefix, new Set() );
			}
			// 向对应Set中添加值
			( <Set<string>> watchedVideoIdMap.get( videoIdPrefix ) ).add( videoId );
		} );
		return watchedVideoIdMap;
	}
}
