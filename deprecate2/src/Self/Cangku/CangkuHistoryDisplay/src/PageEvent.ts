/**
 * PageEvent.ts
 * created by 2023/7/25
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */


import { StorageData } from './StorageData'
import { ReadHistory } from './ReadHistory'

export type {
	PageType
}
export {
	PageEvent
}

type PageType = 'index' | 'archive' | 'category' | 'rank' | '';

/**
 * 页面事件
 * @class
 * */
class PageEvent {
	pageType?: PageType;
	private storageData: StorageData
	
	constructor( pathname: string, storageData: StorageData ) {
		this.storageData = storageData;
		
		let _pageType = this.judgePage( pathname );
		Object.defineProperty( this, 'pageType', {
			get(): PageType {
				return _pageType as 'index' | 'archive' | 'category' | 'rank';
			},
			set( pathname: string ) {
				const type = this.judgePage( pathname );
				if ( type ) {
					_pageType = type;
				}
			}
		} )
	}
	
	
	/**
	 * 向本地储存中发送存储数据
	 * @return {}
	 * @param achieveId
	 * */
	sendNewAchieve( achieveId: number ) {
		this.storageData.keys.add( achieveId );
		localStorage.setItem( 'new-achieve', String( achieveId ) );
	}
	
	/**
	 * 判断当前页面处于哪个子页面（主页、帖子、分类、排名）
	 * @param {string} pathname
	 * @return {PageType} 页面类型
	 * */
	judgePage( pathname: string ): PageType {
		const path = pathname;
		
		// 主页
		if ( path === '/' ) {
			return 'index';
		}
		// 帖子
		else if ( path.match( 'archives' ) ) {
			return 'archive';
		}
		// 分类
		else if ( path.match( 'category/' ) ) {
			return 'category';
		}
		// 排名
		else if ( path.match( 'rank' ) ) {
			return 'rank';
		}
		// 否则无
		else {
			return '';
		}
	}
	
	
	/**
	 * 从本地存储中监听数据更改，如果存在数据更改，则重新刷新页面
	 * */
	getNewAchieve( readHistory: ReadHistory ) {
		window.addEventListener( 'storage', ( e ) => {
			if ( e.key === 'new-achieve' ) {
				// 延时等待数据写入数据库
				this.storageData.keys.add( +( <string> e.newValue ) );
				readHistory.parse( false );
			}
		} )
	}
}
