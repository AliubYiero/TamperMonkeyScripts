/**
 * AddReadStyle.ts
 * created by 2023/8/27
 * @file 添加按钮样式
 * @author  Yiero
 * */
import { readStyle } from '../config/ReadStyle.config'
import { transformedPrefSelectorList } from '../../../PageBeautiful/CssStyleClass/TransformedToArray'
import { CSSRule } from '../../../PageBeautiful/CssStyleClass/CSSRule'

export {
	addReadStyle
}

/** 添加按钮样式 */
function addReadStyle( cssRule: CSSRule ) {
	
	cssRule
		.pushList( transformedPrefSelectorList( readStyle ) )
		.submit();
} 
