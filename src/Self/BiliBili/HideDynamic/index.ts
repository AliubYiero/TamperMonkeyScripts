/* entry */
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { addStyle, registerMenu } from '../../../../lib/GM_Lib'
import { Info } from '../../../../lib/Base/Info'
import { BandData, ConfigUI } from './src/ConfigUI'
import { Sleep } from '../../../../lib/Base/Sleep'

// 观察者需要用到的选择器接口
interface ObserverSelectorList {
	
	// 等待加载的元素容器选择器
	waitLoadElementSelector: string;
	
	// mutationObserver的观察元素容器的选择器
	observeElementSelector: string;
	
	// Up名的元素容器选择器
	upNameSelector: string;
	
	// 动态的标签容器的选择器（动态、视频、番剧、专栏）
	tabsItemListSelector?: string;
	
	// 目标容器的选择器
	aimElementSelector: string;
	
	// 目标容器的Token
	filterToken?: string;
}

// 坐标类
interface Position {
	x: number;
	y: number;
}

// 屏蔽类型
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
					console.log( item );
					// 写入屏蔽规则
					callback( item );
				} )
			} );
			
			console.log( observerSelectorList.observeElementSelector );
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
			const upName = ( <HTMLElement> item.querySelector( upNameSelector ) )?.innerText.trim();
			let bandTypeKey: { dynamic: 'isBandDynamic'; video: 'isBandVideo'; live: 'isBandLive' }
			bandTypeKey = {
				dynamic: 'isBandDynamic',
				video: 'isBandVideo',
				live: 'isBandLive',
			}
			if ( this.bandList.has( upName ) && ( <BandData> this.bandList.get( upName ) )[ bandTypeKey[ bandType ] ] ) {
				item.classList.add( 'hide' );
			} else {
				// console.log( this.bandList, upName );
				// console.log( item, this.bandList.has( upName ) );
				item.classList.remove( 'hide' );
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
		
		/** 刷新页面数据 */
		fresh( observerSelectorList: ObserverSelectorList, bandType: BandType ) {
			const { aimElementSelector, upNameSelector } = observerSelectorList;
			const upNameNodeList = document.querySelectorAll( aimElementSelector ) as NodeList;
			upNameNodeList.forEach( ( aimElement ) => {
				this.band( <HTMLElement> aimElement, upNameSelector, bandType );
			} )
		}
		
		// 刷新动态卡片 / 视频卡片数据
		freshDynamic( dynamicSelectorList: ObserverSelectorList ) {
			const bandType = this.judgeBandType( <string> dynamicSelectorList.tabsItemListSelector );
			bandEvent.fresh( dynamicSelectorList, bandType );
		}
		
		// 刷新直播数据
		freshLive( liveSelectorList: ObserverSelectorList ) {
			bandEvent.fresh( liveSelectorList, 'live' );
		}
	}
	
	// 观察者，观察动态的载入情况
	let domSelector: {
		// 动态Selector列表
		dynamic: ObserverSelectorList
		// 直播(Bilibili-Evolved)Selector列表
		live: ObserverSelectorList
		// 直播(旧版)Selector列表
		oldLive: ObserverSelectorList
		// 直播(新版)Selector列表
		newLive: ObserverSelectorList
	} = {
		dynamic: {
			waitLoadElementSelector: '.bili-dyn-list',
			observeElementSelector: '.bili-dyn-list__items',
			upNameSelector: '.bili-dyn-title__text',
			tabsItemListSelector: '.bili-dyn-list-tabs__item',
			filterToken: 'bili-dyn-list__item',
			aimElementSelector: '.bili-dyn-list__item',
		},
		// Bilibili-Evolved直播侧边栏
		live: {
			waitLoadElementSelector: '.be-live-list-content',
			observeElementSelector: '.be-live-list-content',
			upNameSelector: '.be-live-list-item-user',
			filterToken: 'be-live-list-item',
			aimElementSelector: '.be-live-list-item',
		},
		// 旧版直播侧边栏
		oldLive: {
			waitLoadElementSelector: '.bili-dyn-live-users__body',
			observeElementSelector: '.bili-dyn-live-users__body',
			upNameSelector: '.bili-dyn-live-users__item__uname',
			filterToken: 'bili-dyn-live-users__item',
			aimElementSelector: '.bili-dyn-live-users__item',
		},
		// 新版直播侧边栏
		newLive: {
			waitLoadElementSelector: '.bili-dyn-live-users__body',
			observeElementSelector: '.bili-dyn-live-users__body',
			upNameSelector: '.bili-dyn-live-users__item__uname',
			filterToken: 'bili-dyn-live-users__container',
			aimElementSelector: '.bili-dyn-live-users__container',
		}
	};
	
	;( function judgeBiliUiVersion() {
		// 新版page-header ( 原生新版 )
		if ( document.querySelector( '#bili-header-container' ) && document.querySelector( '.bili-header.fixed-header' ) ) {
			domSelector.live = domSelector.newLive;
		}
		// Bilibili-Evolved
		else if ( document.querySelector( '#bili-header-container' ) ) {
			// 闲置，因为默认就是Bilibili-Evolved的选择器组
		}
		// 旧版page-header
		else {
			domSelector.live = domSelector.oldLive;
		}
	} )();
	
	
	// 创建元素观察者
	const observer = new Observer();
	const bandEvent = new BandEvent( <Map<string, BandData>> configUI.data.data );
	// 观察动态的载入情况
	await observer.observe( domSelector.dynamic, ( item: HTMLElement ) => {
		const bandType = bandEvent.judgeBandType( <string> domSelector.dynamic.tabsItemListSelector );
		bandEvent.band( item, domSelector.dynamic.upNameSelector, bandType );
	} );
	
	// 再次刷新动态数据，防止数据因为网络延迟没有及时更新
	bandEvent.freshDynamic( domSelector.dynamic );
	
	
	// 观察者，观察直播的载入情况
	await observer.observe( domSelector.live, ( item: HTMLElement ) => {
		bandEvent.band( item, domSelector.live.upNameSelector, 'live' );
	} );
	
	// 再次刷新直播数据，防止数据因为网络延迟没有及时更新
	bandEvent.freshLive( domSelector.live );
	
	
	// 绑定配置开启菜单（油猴菜单）
	registerMenu( '添加屏蔽', () => {
		configUI.show();
	} )
	
	// 创建拖拽事件
	class DragEvent {
		// Dom集合
		domList: { [ propName: string ]: HTMLElement }
		
		// 坐标集合
		position: { start: Position, end: Position, relative: Position }
		
		constructor() {
			this.domList = {
				main: document.querySelector( '.bili-band-config-container' ) as HTMLElement,
			}
			
			this.position = {
				start: { x: 0, y: 0 },
				end: { x: 0, y: 0 },
				relative: { x: 0, y: 0 },
			}
			
			// TODO 改变拖拽时鼠标的样式，不再是禁止样式
			// 绑定拖拽事件开始
			this.domList.main.addEventListener( 'dragstart', ( e ) => {
				this.getStartPosition( e );
			} )
			
			// 绑定拖拽事件结束
			this.domList.main.addEventListener( 'dragend', ( e ) => {
				e.preventDefault();
				this.getEndPosition( e );
			} )
		}
		
		getStartPosition( e: MouseEvent ) {
			const { pageX, pageY } = e;
			this.position.start = {
				x: pageX,
				y: pageY,
			}
		}
		
		getEndPosition( e: MouseEvent ) {
			const { pageX, pageY } = e;
			this.position.end = {
				x: pageX,
				y: pageY,
			}
			this.getRelativePosition();
			this.changeDomPosition()
		}
		
		getRelativePosition() {
			this.position.relative = {
				x: this.position.relative.x + this.position.end.x - this.position.start.x,
				y: this.position.relative.y + this.position.end.y - this.position.start.y,
			}
		}
		
		changeDomPosition() {
			this.domList.main.style.transform = `translate(${ this.position.relative.x }px, ${ this.position.relative.y }px)`
		}
	}
	
	;( () => {
		const domList: { [ propName: string ]: HTMLElement } = {
			closeBtn: document.querySelector( '[lay-event=close]' ) as HTMLElement,
		}
		
		// 给配置菜单的关闭绑定页面数据刷新事件
		domList.closeBtn.addEventListener( 'click', () => {
			bandEvent.freshDynamic( domSelector.dynamic );
			bandEvent.freshLive( domSelector.live );
		} );
		
		// 实例化拖拽事件
		new DragEvent();
	} )();
	
	
} )();
