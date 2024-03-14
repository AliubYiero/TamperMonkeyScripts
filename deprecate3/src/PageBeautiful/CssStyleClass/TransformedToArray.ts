/**
 * TransformedToArray.ts
 * created by 2023/8/27
 * @file 将对象转化为CSSRule可识别的数组
 * @author  Yiero
 * */

import { PrefSelectorList } from './interfaces/PrefSelectorList'
import { HideSelectorList } from './interfaces/HideSelectorList'

export {
	transformedHideSelectorList,
	transformedPrefSelectorList,
}

/**
 * 将对象转化成一维字符串数组, CSSRule.pushHideList()
 * @param { HideSelectorList } prefSelectorList
 * @return { string[] }
 * */
function transformedHideSelectorList( prefSelectorList: HideSelectorList ) {
	return Object.values( prefSelectorList ).flat()
}

/**
 * 将对象转化成一维对象数组, 用于CSSRule.pushList()
 * @param { PrefSelectorList } prefSelectorList
 * @return { { selector: string, rule: [propName: string]: string | boolean | number } }
 * */
function transformedPrefSelectorList( prefSelectorList: PrefSelectorList ) {
	return Object.entries(
		Object.values( prefSelectorList )
			.flat()
			.reduce( ( result, current ) => ( {
				...result,
				...current
			} ) )
	).map(
		( [ selector, rule ] ) => ( { selector, rule } )
	)
}
