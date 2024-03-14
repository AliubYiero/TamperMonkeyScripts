/**
 * DouyinAddNewStyle.ts
 * created by 2023/8/24
 * @file
 * @author  Yiero
 * */

import { CSSRule } from '../../CssStyleClass/CSSRule'
import { transformedHideSelectorList, transformedPrefSelectorList } from '../../CssStyleClass/TransformedToArray'
import { hideSelectorList, prefSelectorList } from '../config/CSSRule.config'

export {
	douyinAddNewStyle
}

function douyinAddNewStyle() {
	const cssRule = new CSSRule();
	
	cssRule
		.pushHideList( transformedHideSelectorList( hideSelectorList ) )
		.pushImportantList( transformedPrefSelectorList( prefSelectorList ) )
		.submit();
}
