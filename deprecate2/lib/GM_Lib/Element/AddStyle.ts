/**
 * AddStyle.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	addStyle,
	addHideClass
}

/**
 * 添加样式
 * @param {string} cssString css样式文本
 * */
const addStyle = ( cssString: string ) => {
	// @ts-ignore
	GM_addStyle( cssString )
}

/**
 * 添加样式
 * */
const addHideClass = () => {
	// @ts-ignore
	GM_addStyle( `.hide {display: none !important}` )
}
