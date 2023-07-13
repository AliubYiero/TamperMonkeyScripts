/**
 * RemoveStyle.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */


export { disabledStyle, disabledStyleList }

function disabledStyle( selector: string ) {
	// @ts-ignore
	GM_addStyle( `${ selector } {display: none !important}` )
}

function disabledStyleList( selectorList: string[] ) {
	const selectors: string = selectorList.join( ',' );
	// @ts-ignore
	GM_addStyle( `${ selectors } {display: none !important}` )
}
