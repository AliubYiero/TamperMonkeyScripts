import { addReadStyle } from './src/AddStyle'
import { Info } from '../../../../lib/Base/Info'
import { getElement, } from '../../../../lib/Listener/ElementAdd'
import { getArchiveId, StorageData } from './src/StorageData'
import { freshListenerPushState } from '../../../../lib/Listener/Page/FreshListener'
import { ReadHistory } from './src/ReadHistory'
import { PageEvent, PageType } from './src/PageEvent'
import { HistoryBackup } from './src/HistoryBackup'

const print = new Info( 'CangkuHistoryDisplay' );
print.log( '载入脚本' );

export type {
	PageSelectorList,
	DomSelectors
}


interface PageSelectorList {
	// 页面加载器（用于判断页面是否加载完成）
	fatherList: string[];
	// 子元素Token加载器（用于获取content和link）
	childTokenList: string[];
	// 文本修改Token加载器（用于检测文本改变从而定位到修改的元素）
	textChangeTokenList: string[];
	// 内容加载器（用于获取加载已看/未看的内容）
	
	contentList: string[];
	// 链接加载器（用于获取帖子链接）
	linkList: string[];
	
	[ propName: string ]: string[]
}

interface DomSelectors {
	index: PageSelectorList;
	archive: PageSelectorList;
	category: PageSelectorList;
	rank: PageSelectorList
}

/* entry */
( async () => {
	/** 初始化 */
	// 添加样式
	addReadStyle();
	
	// 不同页面的载入加载器
	let domSelectors: DomSelectors;
	domSelectors = {
		// 首页，主卡片（>18）和侧边卡片（3）
		index: {
			fatherList: [ '.post-list', '.sidebar-rank-post-card' ],
			childTokenList: [ 'post-card', 'sidebar-rank-post-wrap' ],
			textChangeTokenList: [ 'date', 'text-truncate' ],
			contentList: [ '.post-card-content', 'a[href^="/archives"]' ],
			linkList: [ 'a[href^="/archives"]', 'a[href^="/archives"]' ],
		},
		archive: {
			fatherList: [ '.related-post-wrap', '.sidebar-rank-post-card' ],
			childTokenList: [ 'related-post-card', 'sidebar-rank-post-wrap' ],
			textChangeTokenList: [ 'text-truncate', 'text-truncate' ],
			contentList: [ '.post-card-content', 'a[href^="/archives"]' ],
			linkList: [ 'a[href^="/archives"]', 'a[href^="/archives"]' ],
		},
		category: {
			fatherList: [ '.category-post' ],
			childTokenList: [ 'post-card' ],
			textChangeTokenList: [ 'date' ],
			contentList: [ '.post-card-content' ],
			linkList: [ 'a[href^="/archives"]' ],
		},
		rank: {
			fatherList: [ '.rank-post' ],
			childTokenList: [ 'post-card' ],
			textChangeTokenList: [ 'date' ],
			contentList: [ '.post-card-content' ],
			linkList: [ 'a[href^="/archives"]' ],
		},
	};
	
	// 实例化数据对象
	const storageData = new StorageData();
	
	// 实例化历史储存对象
	const historyBackup = new HistoryBackup();
	// 储存备份
	setTimeout( () => {
		historyBackup.saveToGMStorage( storageData );
	}, 2000 )
	
	// 实例化页面事件
	const pageEvent = new PageEvent( location.pathname, storageData );
	print.info( '当前页面', pageEvent.pageType );
	
	// 等待页面加载
	// @ts-ignore
	await getElement( null, domSelectors[ pageEvent.pageType ].contentList[ 0 ] );
	
	// 页面解析
	let readHistory = new ReadHistory( <PageType> pageEvent.pageType, domSelectors, storageData );
	readHistory.parse();
	
	// 页面通讯，保持页面数据同步
	// 发送页面通讯
	if ( pageEvent.pageType === 'archive' ) {
		pageEvent.sendNewAchieve( getArchiveId( location.pathname ) );
	}
	// 接受页面通讯
	pageEvent.getNewAchieve( readHistory );
	
	// 页面跳转事件
	freshListenerPushState( async () => {
		pageEvent.pageType = location.pathname as PageType;
		
		if ( pageEvent.pageType === 'archive' ) {
			pageEvent.sendNewAchieve( getArchiveId( location.pathname ) );
		}
		
		// 页面切换
		if ( readHistory.pageType !== pageEvent.pageType ) {
			print.info( '页面切换', pageEvent.pageType );
			// @ts-ignore
			await getElement( null, domSelectors[ pageEvent.pageType ].contentList[ 0 ] );
			readHistory.pageType = pageEvent.pageType as PageType;
			readHistory.parse();
		}
	} );
	
} )();
