/**
 * ReadHistory.ts
 * created by 2023/7/25
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
import { getArchiveId, StorageData } from './StorageData'
import {
	observeChildElementAdd,
	observeChildElementAddAll,
	observeChildTextChangeAll
} from '../../../../../lib/Listener/ElementAdd'
import { DomSelectors } from '../index'
import { PageType } from './PageEvent'


export {
	ReadHistory
}
export type {
	PageSelector
}

interface PageSelector {
	// 页面加载器（用于判断页面是否加载完成）
	father: string;
	// 子元素Token加载器（用于获取content和link）
	childToken: string;
	// 文本修改Token加载器（用于检测文本改变从而定位到修改的元素）
	textChangeToken: string;
	// 内容加载器（用于获取加载已看/未看的内容）
	content: string;
	// 链接加载器（用于获取帖子链接）
	link: string;
	
	[ propName: string ]: string
}

class ReadHistory {
	pageType: PageType;
	private readonly domSelectors: DomSelectors;
	private readonly storageData: StorageData;
	
	constructor( pageType: PageType, domSelectors: DomSelectors, storageData: StorageData ) {
		this.pageType = pageType || '';
		this.domSelectors = domSelectors;
		this.storageData = storageData;
	}
	
	addStyle( item: HTMLElement, postDirection: 'left' | 'right', selectorList: PageSelector ) {
		const linkSelector = selectorList.link as string;
		const contentSelector = selectorList.content as string;
		
		const archiveId = getArchiveId( item.querySelector( linkSelector ) as HTMLLinkElement );
		if ( !archiveId ) {
			return;
		}
		// @ts-ignore
		const contentDom = item.querySelector( contentSelector ) as HTMLElement;
		// @ts-ignore
		const isRead = this.storageData.parseLinkStatus( archiveId );
		if ( isRead ) {
			contentDom.classList.remove( `is-not-read-${ postDirection }` );
			contentDom.classList.add( `is-read-${ postDirection }` );
		}
		else {
			contentDom.classList.remove( `is-read-${ postDirection }` );
			contentDom.classList.add( `is-not-read-${ postDirection }` );
		}
	}
	
	
	/** 解析首页 */
	parse( isBandObserver: boolean = true ) {
		if ( !this.pageType ) {
			return;
		}
		const pageSelectorList = this.domSelectors[ this.pageType ];
		
		
		for ( let i = 0; i < pageSelectorList.fatherList.length; i++ ) {
			const postDirection = i ? 'right' : 'left';
			
			const selectorList: PageSelector = {
				father: pageSelectorList.fatherList[ i ],
				childToken: pageSelectorList.childTokenList[ i ],
				textChangeToken: pageSelectorList.textChangeTokenList[ i ],
				content: pageSelectorList.contentList[ i ],
				link: pageSelectorList.linkList[ i ],
			}
			
			document.querySelectorAll( `.${ selectorList.childToken }` ).forEach( ( item ) => {
				this.addStyle( item as HTMLElement, postDirection, selectorList );
			} )
			
			if ( isBandObserver ) {
				// 绑定页面热更新观察者
				observeChildTextChangeAll( {
					father: selectorList.father,
					aimToken: selectorList.childToken,
					textChangeToken: selectorList.textChangeToken,
				}, ( item ) => {
					this.addStyle( item, postDirection, selectorList );
				} );
				
				
				// 侧边栏，额外加载处理
				// 侧边栏第一次加载时涉及到dom增删 
				if ( i ) {
					// 第一次加载，从node更新中更新信息
					observeChildElementAddAll( selectorList.father, 'fade-fast-enter', ( item ) => {
						this.addStyle( item, postDirection, selectorList );
					} );
				}
				
				// 绑定排名页面新增元素观察者
				if ( this.pageType === 'rank' ) {
					observeChildElementAdd( `${ selectorList.father } .row`, '.post', ( item ) => {
						this.addStyle( item, postDirection, selectorList );
					} );
				}
			}
		}
		
	}
	
	
}
