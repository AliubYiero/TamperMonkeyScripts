/**
 * observeElement.ts
 * created by 2023/7/25
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { getElement } from './getElement'
import { Info } from '../../../Base/Info'

export {
	observeChildElementAdd,
	observeChildElementAddAll,
	observeChildTextChangeAll,
}
// @ts-ignore
const print = new Info( 'observeElement' );
/**
 * 检测子元素的增删
 * @param fatherElementSelector
 * @param childElementSelector
 * @param callback
 * */
const observeChildElementAdd = async ( fatherElementSelector: string, childElementSelector: string, callback: ( e: HTMLElement ) => void ) => {
	const observeElement = await getElement( void 0, fatherElementSelector ) as HTMLElement;
	const observer = new MutationObserver( ( e ) => {
		e.forEach( ( record ) => {
			const item = record.addedNodes[ 0 ] as HTMLElement;
			// 不是新增动态，退出访问
			if ( !item || !item?.classList?.contains( childElementSelector.replace( /^\./, '' ) || '' ) ) {
				return;
			}
			
			// 写入屏蔽规则
			callback( item );
		} )
	} );
	
	observer.observe( observeElement, {
		childList: true,
	} )
}


/**
 * 检测所有子元素的增删
 * @return {}
 * @param fatherElementSelector
 * @param childElementSelectorList
 * @param callback
 * */
const observeChildElementAddAll = async ( fatherElementSelector: string, childElementSelectorList: string | string[], callback: ( e: HTMLElement ) => void ) => {
	const observeElement = await getElement( void 0, fatherElementSelector ) as HTMLElement;
	const observer = new MutationObserver( ( e ) => {
		e.forEach( ( record ) => {
			const item = record.addedNodes[ 0 ] as HTMLElement;
			// 不是新增动态，退出访问
			if ( Array.isArray( childElementSelectorList ) ) {
				for ( const childElement of childElementSelectorList ) {
					if ( !item || !item?.classList?.contains( childElement.replace( /^\./, '' ) || '' ) ) {
						return;
					}
				}
			}
			else if ( !item || !item?.classList?.contains( childElementSelectorList.replace( /^\./, '' ) || '' ) ) {
				return;
			}
			
			// 写入屏蔽规则
			callback( item );
		} )
	} );
	
	observer.observe( observeElement, {
		subtree: true,
		childList: true,
	} )
}


type ElementSelector = {
	father: string,
	aimToken: string,
	textChangeToken: string,
}
/**
 * 检测所有子元素文本的修改
 * @return {}
 * @param elementSelector
 * @param callback
 * */
const observeChildTextChangeAll = async ( elementSelector: ElementSelector, callback: ( e: HTMLElement ) => void ) => {
	const observer = new MutationObserver( ( e ) => {
		e.forEach( ( record ) => {
			let item = record.target.parentElement as HTMLElement;
			// 不是新增动态，退出访问
			if ( !item || !item?.classList.contains( elementSelector.textChangeToken.replace( /^\./, '' ) || '' ) ) {
				return;
			}
			
			// 获取目标元素
			while ( item ) {
				item = item.parentElement as HTMLElement;
				
				if ( item?.classList.contains( elementSelector.aimToken ) ) {
					// 写入屏蔽规则
					callback( item );
					return;
				}
			}
			
		} )
	} );
	
	getElement( document.body, elementSelector.father ).then(
		( item ) => {
			observer.observe( <HTMLElement> item, {
				subtree: true,
				characterData: true,
			} )
		}
	);
	
}
