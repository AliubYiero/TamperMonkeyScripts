/* entry */
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { addStyle, registerMenu } from '../../../../lib/GM_Lib'
import { Info } from '../../../../lib/Base/Info'
import { BandData, ConfigUI } from './src/ConfigUI'
import { Sleep } from '../../../../lib/Base/Sleep'

interface ObserverSelectorList {
	waitLoadElementSelector: string;
	observeElementSelector: string;
	
	upNameSelector: string;
	
	filterToken?: string;
	tabsItemListSelector?: string;
}

type BandType = 'dynamic' | 'video' | 'live';

( async () => {
	const print = new Info( 'BiliBiliHideDynamic' );
	
	addStyle( `.hide {display: none !important}` )
	
	
	print.info( '引入UI' );
	const configUI = new ConfigUI();
	
	await Sleep.windowLoad();
	console.log( configUI.data );
	
	// 观察动态是否出现
	class Observer {
		constructor() {
		}
		
		async observe( observerSelectorList: ObserverSelectorList, callback: Function ) {
			await getElement( document.body, observerSelectorList.waitLoadElementSelector );
			const observer = new MutationObserver( ( e ) => {
				e.forEach( ( record ) => {
					const item = record.addedNodes[ 0 ] as HTMLElement;
					// 不是新增动态，退出访问
					if ( !item || !item?.classList?.contains( observerSelectorList.filterToken || '' ) ) {
						return;
					}
					
					// 写入屏蔽规则
					callback( item );
				} )
			} );
			
			observer.observe( <HTMLElement> document.querySelector( observerSelectorList.observeElementSelector ), {
				childList: true,
			} )
		}
	}
	
	
	class BandEvent {
		bandList: Map<string, BandData>
		bandTypeList: [ 'dynamic', 'video' ] = [ 'dynamic', 'video' ];
		
		constructor( bandList: Map<string, BandData> ) {
			this.bandList = bandList;
		}
		
		/** 判断当前动态的Up主是否在屏蔽列表中，如果是则隐藏 */
		band( item: HTMLElement, upNameSelector: string, bandType: BandType ) {
			const upName = ( <HTMLElement> item.querySelector( upNameSelector ) )?.innerText;
			
			let bandTypeKey: { dynamic: 'isBandDynamic'; video: 'isBandVideo'; live: 'isBandLive' }
			bandTypeKey = {
				dynamic: 'isBandDynamic',
				video: 'isBandVideo',
				live: 'isBandLive',
			}
			if ( this.bandList.has( upName ) && ( <BandData> this.bandList.get( upName ) )[ bandTypeKey[ bandType ] ] ) {
				item.classList.add( 'hide' );
			}
		}
		
		/**
		 * 获取当前所处的动态卡片编号，并根据动态卡片编号，返回不同的BandType
		 * */
		judgeBandType( tabsItemListSelector: string ) {
			// 判断当前处于哪个动态卡片区
			let tabsItemIndex: number = 0;
			const tabsItemList = document.querySelectorAll( tabsItemListSelector ) as NodeList;
			for ( let i = 0; i < tabsItemList.length; i++ ) {
				const tabsItem = tabsItemList[ i ] as HTMLElement;
				
				if ( tabsItem.classList.contains( 'active' ) ) {
					tabsItemIndex = i;
					break;
				}
			}
			
			// 根据所处的动态卡片区，返回不同的BandType
			return this.bandTypeList[ tabsItemIndex ] as BandType;
		}
		
	}
	
	// 观察者，观察动态的载入情况
	let domSelector: {
		dynamic: ObserverSelectorList
		live: ObserverSelectorList
	} = {
		dynamic: {
			waitLoadElementSelector: '.bili-dyn-list',
			observeElementSelector: '.bili-dyn-list__items',
			upNameSelector: '.bili-dyn-title__text',
			tabsItemListSelector: '.bili-dyn-list-tabs__item',
		},
		live: {
			waitLoadElementSelector: '.be-live-list-content',
			observeElementSelector: '.be-live-list-content',
			filterToken: 'be-live-list-item',
			upNameSelector: '.be-live-list-item-user',
		}
	}
	const observer = new Observer();
	const bandEvent = new BandEvent( <Map<string, BandData>> configUI.data.data );
	// 观察动态的载入情况
	await observer.observe( domSelector.dynamic, ( item: HTMLElement ) => {
		const bandType = bandEvent.judgeBandType( <string> domSelector.dynamic.tabsItemListSelector );
		bandEvent.band( item, domSelector.dynamic.upNameSelector, bandType );
	} );
	
	// 观察者，观察直播的载入情况
	await observer.observe( domSelector.live, ( item: HTMLElement ) => {
		bandEvent.band( item, domSelector.live.upNameSelector, 'live' );
	} );
	
	
	// 绑定配置开启菜单（油猴菜单）
	registerMenu( '添加屏蔽', () => {
		configUI.show();
	} )
	
} )();
