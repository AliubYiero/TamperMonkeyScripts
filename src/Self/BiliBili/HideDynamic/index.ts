/* entry */
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { addStyle } from '../../../../lib/GM_Lib'
import { BandList } from './src/LoadBandList'
import { Info } from '../../../../lib/Base/Info'

( async () => {
	const print = new Info( 'BiliBiliHideDynamic' );
	
	addStyle( `.hide {display: none !important}` )
	
	// 写入屏蔽列表
	// const bandList: BandList = getBandList();
	const bandList: BandList = {
		videoUpList: [
			'钱默吟', '四娃万岁', '孙兴华zz', '品诺美食开课啦', '未明子', '巴老师的小号', '唯有入梦' ],
		dynamicUpList: [
			'小fa朵实验室', '孙兴华zz', 'AstrolabeGames', '烨梵天', '吃貨小飞飞',
			'生命中国', '卦者那啥子靈風', 'oeasy', '万象灵依', '奥莉安娜的微笑', '吾爱破解论坛',
			'纯全三色对对和', '鬼嶋さよ咕噜', '蓝毒-浅滩律动', '唯有入梦'
		],
		liveUpList: [ 'Virsaladze', '尊驾何人', '加班第一帅', '卦者那啥子靈風' ]
	}
	
	
	// 根据屏蔽列表屏蔽动态
	function bandDyn( dynItem: HTMLElement, thisBandList: string[] ) {
		const upName = ( <HTMLElement> dynItem.querySelector( '.bili-dyn-title__text' ) )?.innerText;
		
		// 可能存在空白动态，跳过空白动态
		if ( !upName ) {
			return;
		}
		
		if ( thisBandList.indexOf( upName ) !== -1 ) {
			dynItem.classList.add( 'hide' );
		}
	}
	
	/**
	 * 根据屏蔽列表屏蔽侧边直播
	 * */
	function bandLive( liveLinkItem: HTMLElement ) {
		const upName = ( <HTMLElement> liveLinkItem.querySelector( '.be-live-list-item-user' ) ).innerText;
		
		if ( bandList.liveUpList.indexOf( upName ) !== -1 ) {
			liveLinkItem.classList.add( 'hide' );
		}
	}
	
	/**
	 * 获取当前所处的动态卡片编号，并根据动态卡片编号，返回不同的屏蔽列表
	 * */
	function getLocalDynamicTab() {
		// 判断当前处于哪个动态卡片区
		let tabsItemIndex: number = 0;
		const tabsItemList = document.querySelectorAll( '.bili-dyn-list-tabs__item' ) as NodeList;
		for ( let i = 0; i < tabsItemList.length; i++ ) {
			const tabsItem = tabsItemList[ i ] as HTMLElement;
			
			if ( tabsItem.classList.contains( 'active' ) ) {
				tabsItemIndex = i;
			}
		}
		// 根据所处的动态卡片区，执行不同的屏蔽列表
		let thisBandList: string[] = [];
		switch ( tabsItemIndex ) {
			case 0:
				print.info( '切换动态屏蔽列表' )
				thisBandList = bandList.dynamicUpList;
				break;
			case 1:
				print.info( '切换视频屏蔽列表' );
				thisBandList = bandList.videoUpList;
				break;
		}
		return thisBandList;
	}
	
	// 观察者，观察动态的载入情况
	await getElement( document.body, '.bili-dyn-list' );
	( function observeDynamic() {
		const observer = new MutationObserver( ( e ) => {
			
			// 获取当前的动态卡片屏蔽列表
			const thisBandList = getLocalDynamicTab();
			
			e.forEach( ( record ) => {
				const dynItem = record.addedNodes[ 0 ] as HTMLElement;
				// 不是新增动态，退出访问
				if ( !dynItem ) {
					return;
				}
				
				// 写入屏蔽规则
				bandDyn( dynItem, thisBandList );
			} )
		} );
		
		observer.observe( <HTMLElement> document.querySelector( '.bili-dyn-list__items' ), {
			childList: true,
		} )
	} )();
	
	// 观察者，观察直播的载入情况
	await getElement( document.body, '.be-live-list-content' );
	( function observeLive() {
		const observer = new MutationObserver( ( e ) => {
			e.forEach( ( record ) => {
				const liveItem = record.addedNodes[ 0 ] as HTMLElement;
				// 不是新增动态，退出访问
				if ( !liveItem || !liveItem?.classList?.contains( 'be-live-list-item' ) ) {
					return;
				}
				
				// 写入屏蔽规则
				bandLive( liveItem );
			} )
		} );
		
		observer.observe( <HTMLElement> document.querySelector( '.be-live-list-content' ), {
			childList: true,
		} )
	} )();
	
	
} )();
