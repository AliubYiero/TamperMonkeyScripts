/**
 * AddStyle.ts
 * created by 2023/9/2
 * @file
 * @author  Yiero
 * */

import { PrefSelectorList } from './interfaces/PrefSelectorList'
import { HideSelectorList } from './interfaces/HideSelectorList'
import { CSSRule } from './CSSRule'
import { transformedHideSelectorList, transformedPrefSelectorList } from './TransformedToArray'

export {
	addHideStyle,
	addPrefStyle
}

/**
 * 添加隐藏样式
 * @param cssRule
 * */
function addHideStyle( cssRule: HideSelectorList ) {
	new CSSRule()
		.pushHideList( transformedHideSelectorList( cssRule ) )
		.submit();
}

/**
 * 添加CSS样式
 * */
function addPrefStyle( cssRule: PrefSelectorList ) {
	new CSSRule()
		.pushImportantList( transformedPrefSelectorList( cssRule ) )
		.submit();
}
