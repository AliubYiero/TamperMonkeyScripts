/**
 * AddStyle.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	addStyle
}

const addStyle = ( cssString: string ) => {
	// @ts-ignore
	GM_addStyle( cssString )
}
