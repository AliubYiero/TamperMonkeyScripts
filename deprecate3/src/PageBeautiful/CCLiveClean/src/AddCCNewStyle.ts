/**
 * AddCCNewStyle.ts
 * created by 2023/8/23
 * @file
 * @author  Yiero
 * */

import { CSSRule } from '../../CssStyleClass/CSSRule'
import { hideSelectorList, prefSelectorList } from '../Config/SelectorList.config'
import { transformedHideSelectorList, transformedPrefSelectorList } from '../../CssStyleClass/TransformedToArray'

export {
	addCCNewStyle
}


/* 添加新的CSS规则 */
function addCCNewStyle( type: 'main' | 'anchor_end_countdown' ) {
	const cssRule = new CSSRule();
	
	/* 屏蔽列表  */
	// 返回对象的值集合, 扁平化, 解压
	cssRule.pushHideList( transformedHideSelectorList( hideSelectorList[ type ] ) );
	
	/* 优化页面 */
	// 将对象解析为可识别的数组对象
	cssRule.pushImportantList( transformedPrefSelectorList( prefSelectorList ) );
	
	// 提交CSS
	cssRule.submit();
}
